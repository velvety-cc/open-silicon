import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { runScenario } from '../model/engine.mjs';
import { TEMPLATES, hash } from '../model/inputs.mjs';
import { appRoot } from './paths.mjs';

const sha = bytes => createHash('sha256').update(bytes).digest('hex');
export async function verifyReferences() {
  const baseline = JSON.parse(await readFile(join(appRoot, 'data/migration-baseline.json'), 'utf8'));
  const verified = [];
  for (const [name, expected] of Object.entries(baseline.templates)) {
    const result = runScenario(TEMPLATES[name], expected.settings);
    assert.equal(hash(TEMPLATES[name]), expected.inputHash, `${name}: reference inputs changed`);
    assert.equal(sha(JSON.stringify(result.ledger)), expected.ledgerSha256, `${name}: dated ledger changed`);
    assert.deepEqual(result.summary, expected.summary, `${name}: reference results changed`);
    verified.push({ name, inputHash: expected.inputHash, ledgerRows: result.ledger.length, monthlyRows: result.monthly.length });
  }
  return verified;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length > 3) throw Error('Usage: npm run verify:risks -- [review.json]');
  const verified = await verifyReferences();
  let reviewVerified = false;
  if (process.argv[2]) {
    const review = JSON.parse(await readFile(process.argv[2], 'utf8'));
    const result = runScenario(review.deal, review.result.settings);
    assert.equal(hash(review.deal), review.inputHash);
    assert.deepEqual(result.ledger, review.result.ledger);
    assert.deepEqual(result.summary, review.result.summary);
    reviewVerified = true;
  }
  console.log(JSON.stringify({ verified, reviewVerified }, null, 2));
}
