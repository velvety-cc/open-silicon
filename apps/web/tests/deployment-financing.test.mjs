import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/deployment-financing.ts', import.meta.url), 'utf8');
const moduleUrl = 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText).toString('base64');
const { loanContributionTiers, estimateDeploymentFunding } = await import(moduleUrl);
const budget = { equipmentValue: 6_000_000, capitalBudget: 7_920_000 };
test('three loan tiers use equipment value while equity covers all remaining project costs', () => {
  assert.deepEqual(loanContributionTiers, [60, 70, 80]);
  for (const [loanPercent, loan, equity] of [[60, 3_600_000, 4_320_000], [70, 4_200_000, 3_720_000], [80, 4_800_000, 3_120_000]]) {
    const result = estimateDeploymentFunding({ ...budget, loanPercent });
    assert.deepEqual(result, { loan, equity, loanPercent });
    assert.equal(Math.round((result.loan + result.equity) * 100), 792_000_000);
  }
  assert.deepEqual(estimateDeploymentFunding({ equipmentValue: 123.45, capitalBudget: 162.95, loanPercent: 70 }), { loan: 86.42, equity: 76.53, loanPercent: 70 });
});

test('invalid funding amounts and unsupported contribution tiers cannot produce estimates', () => {
  for (const loanPercent of [0, 20, 30, 40, 65, NaN, Infinity]) assert.throws(() => estimateDeploymentFunding({ ...budget, loanPercent }), RangeError);
  assert.throws(() => estimateDeploymentFunding({ equipmentValue: 2, capitalBudget: 1, loanPercent: 70 }), RangeError);
  for (const patch of [
    { equipmentValue: NaN }, { equipmentValue: Infinity }, { equipmentValue: -1 }, { equipmentValue: 0 }, { equipmentValue: 0.001 }, { equipmentValue: 1e16 },
    { capitalBudget: NaN }, { capitalBudget: Infinity }, { capitalBudget: -1 }, { capitalBudget: 0 }, { capitalBudget: 1e16 },
  ]) assert.throws(() => estimateDeploymentFunding({ ...budget, loanPercent: 70, ...patch }), RangeError);
});
