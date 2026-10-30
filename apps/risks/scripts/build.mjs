import { cp, mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { appRoot, createReleaseDirectory } from './paths.mjs';
import { MODEL_VERSION } from '../model/inputs.mjs';
import { verifyReferences } from './verify-release.mjs';

const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--output')) throw Error('Usage: npm run build:risks -- --output /new/release');
const verified = await verifyReferences();
const destination = await createReleaseDirectory('risks', args[1]);
const files = ['index.html', 'style.css', 'app.mjs', 'worker.mjs', 'model', 'assets',
  'data/source-snapshot.json', 'data/live-source.json',
  'docs/SOURCE_AUDIT.md', 'docs/FORMULAS.md', 'docs/CALCULATION_PLAN.md',
  'docs/assumptions-dictionary.csv', 'docs/source-mapping.csv'];
for (const file of files) {
  await mkdir(join(destination, file, '..'), { recursive: true });
  await cp(join(appRoot, file), join(destination, file), { recursive: true, force: false, errorOnExist: true });
}
const fileSha256 = {};
async function record(directory, prefix = '') {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relative = prefix + entry.name;
    if (entry.isDirectory()) await record(join(directory, entry.name), relative + '/');
    else fileSha256[relative] = createHash('sha256').update(await readFile(join(directory, entry.name))).digest('hex');
  }
}
await record(destination);
await writeFile(join(destination, 'release-manifest.json'), JSON.stringify({ app: 'risks', modelVersion: MODEL_VERSION, createdAt: new Date().toISOString(), verified, fileSha256 }, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify({ output: destination, files: Object.keys(fileSha256).length, modelVersion: MODEL_VERSION }, null, 2));
