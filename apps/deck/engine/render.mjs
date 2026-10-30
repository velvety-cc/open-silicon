import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolve, sep, basename, dirname, relative } from 'node:path';

const cwd = process.cwd();
const repo = resolve(process.env.OPENSILICON_SOURCE_ROOT ?? (basename(cwd) === 'deck' && basename(dirname(cwd)) === 'apps' ? resolve(cwd, '../..') : cwd));
const directory = pathToFileURL(resolve(repo, 'apps/deck/decks/fund-1') + sep);
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export async function loadDeck(id = 'fund-1') {
  if (id !== 'fund-1') throw new RangeError('Unknown deck');
  const deck = JSON.parse(await readFile(new URL('manifest.json', directory), 'utf8'));
  if (deck.slides.length !== 14 || deck.slides.some((slide, i) => slide.page !== i + 1)) throw Error('Invalid deck sequence');
  return deck;
}

async function hydrateAssets(text) {
  const assets = JSON.parse(await readFile(new URL('assets.json', directory), 'utf8'));
  const keys = [...new Set([...text.matchAll(/\{\{asset:([^}]+)\}\}/g)].map(match => match[1]))];
  for (const key of keys) {
    const asset = assets[key];
    if (!asset) throw Error(`Unknown asset: ${key}`);
    const path = resolve(repo, asset.path);
    if (!path.startsWith(resolve(repo, 'packages/brand/fonts') + sep) && !path.startsWith(resolve(repo, 'packages/brand/assets') + sep) && !path.startsWith(fileURLToPath(new URL('assets/', directory)))) throw Error('Asset outside its package');
    const data = await readFile(path);
    if (asset.sha256 && createHash('sha256').update(data).digest('hex') !== asset.sha256) throw Error(`Asset hash mismatch: ${key}`);
    text = text.replaceAll(`{{asset:${key}}}`, `data:${asset.mime};base64,${data.toString('base64')}`);
  }
  return text;
}

// The canvas follows the existing PDF styling. Reading mode keeps the source's
// responsive rules, while canvas mode consistently selects print media rules.
export function canvasCSS(css) {
  return css.replace(/@media\s+([^{}]+)\{/g, (_, query) => {
    if (/\bprint\b/.test(query)) return '@media all {';
    if (/\bscreen\b|(?:min|max)-(?:width|height)/.test(query)) return '@media not all {';
    return `@media ${query}{`;
  });
}

export async function renderSlide(page, { reading = false, interactive = false } = {}) {
  const deck = await loadDeck();
  const slide = deck.slides.find(slide => slide.page === Number(page));
  if (!slide) throw new RangeError('Unknown slide');
  const [fragment, ...styles] = await Promise.all([slide.file, ...slide.styles].map(file => {
    if (file.includes('..') || file.startsWith('/')) throw Error('Invalid source path');
    return readFile(new URL(file, directory), 'utf8');
  }));
  const brand = await readFile(resolve(repo, 'packages/brand/tokens.css'), 'utf8');
  const accent = brand.match(/--brand-accent:\s*(#[a-f\d]{3,8})\s*;/i)?.[1];
  if (!accent) throw Error('Missing shared brand accent');
  let css = `:root{--brand-accent:${accent}}\n` + styles.join('\n');
  if (!reading) css = canvasCSS(css);
  css += reading
    ? '\nhtml,body{margin:0!important;background:white!important;overflow-x:hidden}body.deck .sheet{margin:0!important;box-shadow:none!important}'
    : '\n@page{size:1280px 720px;margin:0}html,body{width:1280px;height:720px;margin:0!important;padding:0!important;background:white!important;overflow:hidden}body.deck .sheet{width:1280px!important;height:720px!important;min-height:0!important;margin:0!important;box-shadow:none!important;break-after:auto!important}';
  const reporter = reading ? `<script>const report=()=>parent.postMessage({type:'opensilicon:slide-size',page:${slide.page},height:Math.ceil(document.body.scrollHeight)},location.origin);new ResizeObserver(report).observe(document.body);document.fonts.ready.then(report);addEventListener('load',report);</script>` : interactive ? `<script>addEventListener('keydown',event=>{if(event.target.closest?.('a,button,input,select,textarea'))return;if(['Home','End','ArrowRight','ArrowDown','ArrowLeft','ArrowUp',' ','PageDown','PageUp'].includes(event.key)){event.preventDefault();parent.postMessage({type:'opensilicon:slide-key',key:event.key},location.origin);}});</script>` : '';
  return hydrateAssets(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(slide.title)} | OpenSilicon</title><style>${css}</style></head><body class="deck">${fragment}${reporter}</body></html>`);
}

export async function renderDeck() {
  const deck = await loadDeck();
  const pages = await Promise.all(deck.slides.map(slide => renderSlide(slide.page)));
  const frames = pages.map((source, index) => `<section class="export-page" aria-label="Slide ${index + 1}"><iframe title="${escape(deck.slides[index].title)}" srcdoc="${escape(source)}"></iframe></section>`).join('\n');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="robots" content="noindex,nofollow"><title>${escape(deck.title)} | OpenSilicon</title><style>@page{size:1280px 720px;margin:0}*{box-sizing:border-box}html,body{margin:0;padding:0;background:#fff}.export-page{width:1280px;height:720px;overflow:hidden;break-after:page}.export-page:last-child{break-after:auto}iframe{display:block;width:1280px;height:720px;border:0;margin:0} @media screen{.export-page{margin:24px auto;box-shadow:0 1px 12px #0002}body{background:#eae9ed}}</style></head><body>${frames}</body></html>`;
}

export async function deckSourceHash() {
  const { readdir } = await import('node:fs/promises');
  const hash = createHash('sha256');
  async function walk(base) {
    for (const entry of (await readdir(base, { withFileTypes: true })).sort((a,b) => a.name.localeCompare(b.name))) {
      const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), base);
      if (entry.isDirectory()) await walk(url);
      else { hash.update(relative(repo, fileURLToPath(url)).split(sep).join('/')); hash.update(await readFile(url)); }
    }
  }
  await walk(directory);
  hash.update(await readFile(resolve(repo, 'apps/deck/engine/render.mjs')));
  const assets = JSON.parse(await readFile(new URL('assets.json', directory), 'utf8'));
  hash.update(await readFile(resolve(repo, 'packages/brand/tokens.css')));
  for (const key of Object.keys(assets).sort()) hash.update(await readFile(resolve(repo, assets[key].path)));
  return hash.digest('hex');
}
