import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/deployment-estimate.ts', import.meta.url), 'utf8');
const moduleUrl = 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText).toString('base64');
const { demoGpuModels, estimateDeployment } = await import(moduleUrl);
const input = { requestedGpus: 16, gpusPerServer: 8, serverPriceMin: 100_000, serverPriceMax: 120_000, infrastructurePercent: 20, contingencyPercent: 10, deliveryMin: 4, deliveryMax: 8, siteMin: 0, siteMax: 0, installationMin: 2, installationMax: 3 };

test('GPU counts price whole servers and disclose extra installed GPUs', () => {
  const exact = estimateDeployment(input);
  assert.equal(exact.servers, 2);
  assert.equal(exact.extraGpus, 0);
  const rounded = estimateDeployment({ ...input, requestedGpus: 17 });
  assert.equal(rounded.servers, 3);
  assert.equal(rounded.installedGpus, 24);
  assert.equal(rounded.extraGpus, 7);
  assert.equal(rounded.low.equipment, 300_000);
  assert.equal(estimateDeployment({ ...input, requestedGpus: 1 }).installedGpus, 8);
});

test('budget includes server costs, infrastructure and contingency without mixing GPU and server units', () => {
  const { low, high } = estimateDeployment(input);
  assert.deepEqual(low, { equipment: 200_000, infrastructure: 40_000, contingency: 24_000, total: 264_000 });
  assert.deepEqual(high, { equipment: 240_000, infrastructure: 48_000, contingency: 28_800, total: 316_800 });
  const noAllowances = estimateDeployment({ ...input, infrastructurePercent: 0, contingencyPercent: 0 });
  assert.equal(noAllowances.low.total, 200_000);
  const small = estimateDeployment({ ...input, requestedGpus: 1, serverPriceMin: 123.45, serverPriceMax: 123.45 });
  assert.deepEqual(small.low, { equipment: 123.45, infrastructure: 24.69, contingency: 14.81, total: 162.95 });
});

test('deployment waits for hardware and site work in parallel, then installation', () => {
  const ready = estimateDeployment(input);
  assert.deepEqual([ready.weeksMin, ready.weeksMax], [6, 11]);
  const siteLimited = estimateDeployment({ ...input, siteMin: 10, siteMax: 14 });
  assert.deepEqual([siteLimited.weeksMin, siteLimited.weeksMax], [12, 17]);
  const mixed = estimateDeployment({ ...input, siteMin: 2, siteMax: 12 });
  assert.deepEqual([mixed.weeksMin, mixed.weeksMax], [6, 15]);
});

test('incomplete, non-finite, reversed and unsupported assumptions cannot produce a misleading estimate', () => {
  for (const requestedGpus of [0, -1, 1.5, NaN, Infinity, 65_537]) assert.throws(() => estimateDeployment({ ...input, requestedGpus }), RangeError);
  for (const gpusPerServer of [0, 1.5, NaN, 73]) assert.throws(() => estimateDeployment({ ...input, gpusPerServer }), RangeError);
  for (const patch of [
    { serverPriceMin: 0 }, { serverPriceMax: Infinity }, { serverPriceMin: 130_000 },
    { infrastructurePercent: -1 }, { contingencyPercent: 101 }, { contingencyPercent: NaN },
    { deliveryMin: 9 }, { siteMin: -1 }, { installationMax: NaN }, { siteMax: 261 },
  ]) assert.throws(() => estimateDeployment({ ...input, ...patch }), RangeError);
});

test('B300 servers and both NVL72 racks price whole deployment units', () => {
  const b300 = demoGpuModels.find(model => model.id === 'b300');
  assert.equal(b300.unit, 'server');
  assert.equal(b300.gpusPerServer, 8);
  for (const [id, equipment] of [['gb200', 10_000_000], ['gb300', 12_000_000]]) {
    const rack = demoGpuModels.find(model => model.id === id);
    assert.equal(rack.unit, 'rack');
    assert.equal(rack.gpusPerServer, 72);
    const estimate = estimateDeployment({ ...input, ...rack, requestedGpus: 73 });
    assert.equal(estimate.servers, 2);
    assert.equal(estimate.installedGpus, 144);
    assert.equal(estimate.extraGpus, 71);
    assert.equal(estimate.low.equipment, equipment);
    assert.equal(estimate.high.equipment, equipment);
  }
});

test('supplied fixed system prices produce the expected complete-unit budgets', () => {
  for (const [id, requestedGpus, equipment, total] of [
    ['gb300', 72, 6_000_000, 7_920_000],
    ['gb200', 72, 5_000_000, 6_600_000],
    ['b300', 8, 600_000, 792_000],
    ['b200', 8, 535_000, 706_200],
  ]) {
    const model = demoGpuModels.find(item => item.id === id);
    const estimate = estimateDeployment({ ...input, ...model, requestedGpus });
    assert.equal(estimate.servers, 1);
    assert.equal(estimate.extraGpus, 0);
    assert.equal(estimate.low.equipment, equipment);
    assert.equal(estimate.low.total, total);
    assert.deepEqual(estimate.high, estimate.low);
  }
});
