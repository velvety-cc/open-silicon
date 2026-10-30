import { readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { appRoot } from './paths.mjs';

async function check(directory) {
  let count = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') count += await check(path);
    else if (entry.isFile() && path.endsWith('.mjs')) {
      execFileSync(process.execPath, ['--check', path], { stdio: 'inherit' });
      count++;
    }
  }
  return count;
}
console.log(`Risk app JavaScript syntax passed: ${await check(appRoot)} modules.`);
