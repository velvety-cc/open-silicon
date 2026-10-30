import { readFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const appRoot = fileURLToPath(new URL('../', import.meta.url));
export const repoRoot = resolve(appRoot, '../..');

export async function workspaceSettings() {
  try { return JSON.parse(await readFile(resolve(repoRoot, '.workspace.local.json'), 'utf8')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; return {}; }
}

export async function createReleaseDirectory(prefix, requested) {
  const settings = await workspaceSettings();
  const stamp = new Date().toISOString().replaceAll(':', '-').replace(/\.\d+Z$/, 'Z');
  const destination = requested ? resolve(requested) : resolve(repoRoot, settings.artifactsDirectory ?? '.artifacts', `${prefix}-${stamp}`);
  await mkdir(resolve(destination, '..'), { recursive: true });
  await mkdir(destination);
  return destination;
}
