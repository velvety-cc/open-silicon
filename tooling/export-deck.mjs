import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { renderDeck, loadDeck, deckSourceHash } from '../apps/deck/engine/render.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = process.argv.slice(2);
let output, htmlOnly = false;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--output' && args[i + 1]) output = resolve(args[++i]);
  else if (args[i] === '--html-only') htmlOnly = true;
  else throw Error(`Unknown argument: ${args[i]}`);
}
let settings = {};
try { settings = JSON.parse(await readFile(new URL('../.workspace.local.json', import.meta.url), 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const deck = await loadDeck();
const stamp = new Date().toISOString().replaceAll(':', '-').replace(/\.\d+Z$/, 'Z');
const destination = output ?? resolve(root, settings.artifactsDirectory ?? '.artifacts', `fund-1-${stamp}`);
await mkdir(destination, { recursive: true });
// A release directory is immutable: never silently overwrite an earlier export.
const htmlPath = join(destination, 'AI-Infra-Access-Fund-Deck.html');
await writeFile(htmlPath, await renderDeck(), { flag: 'wx' });
const hash = data => createHash('sha256').update(data).digest('hex');
const manifest = {
  deck: deck.id, revision: deck.revision, createdAt: new Date().toISOString(),
  pageCount: deck.slides.length, canvas: deck.canvas,
  sourceHash: await deckSourceHash(),
  modelHash: hash(await readFile(new URL('../apps/deck/decks/fund-1/data/model-baseline.json', import.meta.url))),
  html: { file: 'AI-Infra-Access-Fund-Deck.html', sha256: hash(await readFile(htmlPath)) },
};
try {
  manifest.gitCommit = (await promisify(execFile)('git', ['rev-parse', 'HEAD'], { cwd: root })).stdout.trim();
  manifest.gitDirty = Boolean((await promisify(execFile)('git', ['status', '--porcelain'], { cwd: root })).stdout.trim());
}
catch { manifest.gitCommit = null; }
if (!htmlOnly) {
  const candidates = [process.env.CHROME_BIN, settings.chromeExecutable, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean);
  let chrome;
  for (const candidate of candidates) { try { await access(candidate); chrome = candidate; break; } catch {} }
  if (!chrome) throw Error(`HTML exported to ${htmlPath}. Set CHROME_BIN to a Chrome/Chromium executable for PDF export.`);
  const profile = await mkdtemp(join(tmpdir(), 'opensilicon-export-'));
  try {
    const pdf = join(destination, 'AI-Infra-Access-Fund-Deck.pdf');
    await promisify(execFile)(chrome, ['--headless', '--disable-gpu', '--disable-background-networking', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`, '--no-pdf-header-footer', '--virtual-time-budget=5000', `--print-to-pdf=${pdf}`, pathToFileURL(htmlPath).href], { timeout: 60000, maxBuffer: 2 * 1024 * 1024 });
    const data = await readFile(pdf);
    if (data.subarray(0, 5).toString() !== '%PDF-') throw Error('Chrome did not produce a PDF');
    manifest.pdf = { file: 'AI-Infra-Access-Fund-Deck.pdf', sha256: hash(data) };
  } finally { await rm(profile, { recursive: true, force: true }); }
}
await writeFile(join(destination, 'release-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify({ output: destination, pages: manifest.pageCount, sourceHash: manifest.sourceHash, pdf: Boolean(manifest.pdf) }, null, 2));
