import { readFile, mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, sep } from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const assets = JSON.parse(await readFile(new URL('./assets.json', import.meta.url), 'utf8'));
for (const { source, targets } of assets) {
  for (const target of targets) {
    const from = resolve(root, source), to = resolve(root, target);
    if (!from.startsWith(root) || !to.startsWith(root) || !target.startsWith(`apps/`)) throw Error('Asset path outside its declared application');
    await mkdir(dirname(to), { recursive: true });
    await copyFile(from, to);
  }
}
console.log(`Synced ${assets.length} approved brand assets.`);
