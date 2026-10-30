import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { resolve, relative } from 'node:path';

export const appRoot = fileURLToPath(new URL('./', import.meta.url));
export const repoRoot = resolve(appRoot, '../..');
export const sha256 = data => createHash('sha256').update(data).digest('hex');

export async function loadCatalog() {
  return JSON.parse(await readFile(new URL('./manifest.json', import.meta.url), 'utf8'));
}

export async function listMaterials({ includeArchived = false } = {}) {
  const { materials } = await loadCatalog();
  return materials.filter(material => includeArchived || material.status === 'current');
}

export async function loadMaterial(id) {
  const material = (await listMaterials({ includeArchived: true })).find(item => item.id === id);
  if (!material) throw new RangeError(`Unknown material: ${id}`);
  return material;
}

async function sourceFiles(material) {
  const assets = JSON.parse(await readFile(new URL('./assets.json', import.meta.url), 'utf8'));
  const files = [material.source, ...[material.styles].flat(), 'assets.json', 'manifest.json', 'render.mjs'];
  const contents = new Map();
  for (const file of files) contents.set(`apps/other-materials/${file}`, await readFile(resolve(appRoot, file)));
  contents.set('packages/brand/tokens.css', await readFile(resolve(repoRoot, 'packages/brand/tokens.css')));
  for (const asset of Object.values(assets)) {
    const path = resolve(repoRoot, asset.path);
    if (!path.startsWith(resolve(repoRoot, 'packages/brand') + '/') && !path.startsWith(resolve(appRoot, 'assets') + '/')) {
      throw Error(`Asset outside this app or shared brand: ${asset.path}`);
    }
    const data = await readFile(path);
    if (sha256(data) !== asset.sha256) throw Error(`Asset hash mismatch: ${asset.path}`);
    contents.set(relative(repoRoot, path).replaceAll('\\', '/'), data);
  }
  return { assets, contents };
}

export async function renderMaterial(id) {
  const material = await loadMaterial(id);
  const { assets, contents } = await sourceFiles(material);
  const getText = file => contents.get(`apps/other-materials/${file}`).toString('utf8');
  const brand = contents.get('packages/brand/tokens.css').toString('utf8');
  const styles = [material.styles].flat().map(getText).join('\n');
  let html = getText(material.source).replace('{{styles}}', `<style>\n${brand}\n${styles}</style>`);
  html = html.replace(/\{\{asset:([^}]+)\}\}/g, (_, key) => {
    const asset = assets[key];
    if (!asset) throw Error(`Unknown asset: ${key}`);
    return `data:${asset.mime};base64,${contents.get(asset.path).toString('base64')}`;
  });
  if (/\{\{(?:asset:|styles)/.test(html)) throw Error(`Unresolved placeholder in ${id}`);
  return html;
}

export async function materialSourceHash(id) {
  const { contents } = await sourceFiles(await loadMaterial(id));
  const hash = createHash('sha256');
  for (const [path, data] of [...contents].sort(([a], [b]) => a.localeCompare(b))) {
    hash.update(path).update('\0').update(data).update('\0');
  }
  return hash.digest('hex');
}
