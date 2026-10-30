import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { listMaterials, loadMaterial, materialSourceHash, renderMaterial, repoRoot, sha256 } from './render.mjs';

const exec = promisify(execFile);
let output, id, htmlOnly = false;
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--output' && args[i + 1]) output = resolve(args[++i]);
  else if (args[i] === '--material' && args[i + 1]) id = args[++i];
  else if (args[i] === '--html-only') htmlOnly = true;
  else throw Error(`Unknown or incomplete argument: ${args[i]}`);
}
let settings = {};
try { settings = JSON.parse(await readFile(resolve(repoRoot, '.workspace.local.json'), 'utf8')); }
catch (error) { if (error.code !== 'ENOENT') throw error; }
const materials = id ? [await loadMaterial(id)] : await listMaterials();
const stamp = new Date().toISOString().replaceAll(':', '-').replace(/\.\d+Z$/, 'Z');
const destination = output ?? resolve(repoRoot, settings.artifactsDirectory ?? '.artifacts', `other-materials-${stamp}`);
let chrome;
if (!htmlOnly) {
  const candidates = [process.env.CHROME_BIN, settings.chromeExecutable, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean);
  for (const candidate of candidates) { try { await access(candidate); chrome = candidate; break; } catch {} }
  if (!chrome) throw Error('Set CHROME_BIN to a Chrome/Chromium executable, or use --html-only.');
}
// Reserve a new directory before writing any files; never modify an existing release.
await mkdir(resolve(destination, '..'), { recursive: true });
await mkdir(destination);
const manifest = { app: 'other-materials', createdAt: new Date().toISOString(), materials: [] };
try {
  manifest.gitCommit = (await exec('git', ['rev-parse', 'HEAD'], { cwd: repoRoot })).stdout.trim();
  manifest.gitDirty = Boolean((await exec('git', ['status', '--porcelain'], { cwd: repoRoot })).stdout.trim());
} catch { manifest.gitCommit = null; }
for (const material of materials) {
  const htmlName = `${material.fileStem}.html`;
  const htmlPath = join(destination, htmlName);
  const html = await renderMaterial(material.id);
  await writeFile(htmlPath, html, { flag: 'wx' });
  const record = { id: material.id, title: material.title, status: material.status, sourceHash: await materialSourceHash(material.id), html: { file: htmlName, sha256: sha256(html) } };
  if (chrome) {
    const profile = await mkdtemp(join(tmpdir(), 'opensilicon-materials-'));
    try {
      const pdfName = `${material.fileStem}.pdf`;
      const pdfPath = join(destination, pdfName);
      await exec(chrome, ['--headless', '--disable-gpu', '--disable-background-networking', '--no-first-run', '--no-default-browser-check', `--user-data-dir=${profile}`, '--no-pdf-header-footer', '--virtual-time-budget=5000', `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href], { timeout: 60000, maxBuffer: 2 * 1024 * 1024 });
      const pdf = await readFile(pdfPath);
      if (pdf.subarray(0, 5).toString() !== '%PDF-') throw Error(`Invalid PDF: ${material.id}`);
      record.pdf = { file: pdfName, sha256: sha256(pdf) };
    } finally { await rm(profile, { recursive: true, force: true }); }
  }
  manifest.materials.push(record);
}
await writeFile(join(destination, 'release-manifest.json'), JSON.stringify(manifest, null, 2) + '\n', { flag: 'wx' });
console.log(JSON.stringify({ output: destination, materials: materials.map(item => item.id), pdf: !htmlOnly }, null, 2));
