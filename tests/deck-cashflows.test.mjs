import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/deck-cashflows.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { calculateCashFlows, parseInvestment } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));

test('default illustration separates amortized principal from interest', () => {
  const result = calculateCashFlows(250000, 12, 14, 'straight-line');
  assert.equal(result.principal, 25000000);
  assert.equal(result.interest, 1895834);
  assert.equal(result.total, 26895834);
  assert.equal(result.rows[0].interest, 291667);
  assert.equal(result.rows.at(-1).interest, 24306);
});

test('bullet illustration retains all principal until maturity and rounds interest monthly', () => {
  const result = calculateCashFlows(250000, 12, 14, 'bullet');
  assert.equal(result.interest, 3500004);
  assert(result.rows.slice(0, -1).every(row => row.principal === 0));
  assert.equal(result.rows.at(-1).principal, 25000000);
});

test('all offered terms and coupons reconcile to the cent, including small investments', () => {
  for (const amount of [250000, 123456.78, 1, .01]) {
    for (const term of [6, 9, 12]) {
      for (const coupon of [13, 14, 15, 16]) {
        for (const mode of ['straight-line', 'bullet']) {
          const result = calculateCashFlows(amount, term, coupon, mode);
          assert.equal(result.rows.length, term);
          assert.equal(result.rows.reduce((sum, row) => sum + row.principal, 0), Math.round(amount * 100));
          assert.equal(result.rows.at(-1).closing, 0);
          assert.equal(result.total, result.principal + result.interest);
          assert(result.rows.every(row => row.closing >= 0));
          if (mode === 'straight-line') {
            const payments = result.rows.map(row => row.principal);
            assert(Math.max(...payments) - Math.min(...payments) <= 1);
            assert(result.rows.every((row, i) => i === 0 || row.interest <= result.rows[i - 1].interest));
          }
        }
      }
    }
  }
});

test('invalid and fractional-cent amounts cannot produce stale or misleading receipts', () => {
  for (const value of ['', ' ', '-1', '0', '12.345', 'Infinity', 'NaN', '1e6', '999999999999999999']) assert.equal(parseInvestment(value), null);
  assert.equal(parseInvestment('250000'), 250000);
  assert.equal(parseInvestment('0.01'), .01);
  assert.equal(parseInvestment(' 123.45 '), 123.45);
  assert.throws(() => calculateCashFlows(0, 12, 14, 'bullet'), RangeError);
  assert.throws(() => calculateCashFlows(1000, 0, 14, 'bullet'), RangeError);
  assert.throws(() => calculateCashFlows(1000, 12, -1, 'bullet'), RangeError);
});
