import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyReferences } from '../scripts/verify-release.mjs';

test('both historical GPU risk examples reproduce their exact dated ledgers and recovery summaries', async () => {
  const results = await verifyReferences();
  assert.deepEqual(results.map(item => [item.name, item.ledgerRows, item.monthlyRows]), [
    ['standard', 2193, 73], ['throttled', 2193, 73],
  ]);
});
