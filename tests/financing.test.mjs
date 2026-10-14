import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../lib/financing.ts', import.meta.url), 'utf8');
const moduleUrl = 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText).toString('base64');
const { sendEnquiry, formcarryEndpoint } = await import(moduleUrl);
const valid = { interest: 'Seeking capital', name: ' Alice ', email: 'alice@example.test', company: 'Example Compute', message: 'A brief introduction to our compute business.', _gotcha: '' };

test('browser enquiry submission validates fields and handles Formcarry responses', async t => {
  const originalFetch = globalThis.fetch;
  let calls = [];
  const accept = async (url, options) => { calls.push({ url, options }); return Response.json({ code: 200, status: 'success' }); };
  try {
    globalThis.fetch = accept;
    await t.test('connects to OpenSilicon Website Inquiry with named fields and standard email and honeypot', async () => {
      await sendEnquiry({ ...valid, to: 'attacker@example.test', endpoint: 'https://other.test' });
      assert.equal(calls.length, 1);
      assert.equal(formcarryEndpoint, 'https://formcarry.com/s/Z5g0C_SSqMR');
      assert.equal(calls[0].url, formcarryEndpoint);
      assert.deepEqual(JSON.parse(calls[0].options.body), { ...valid, name: 'Alice' });
      assert.deepEqual(calls[0].options.headers, { 'Content-Type': 'application/json', Accept: 'application/json' });
      assert.equal(calls[0].options.method, 'POST');
      assert.ok(calls[0].options.signal instanceof AbortSignal);
    });
    await t.test('capital providers can connect with only their interest, name and email', async () => {
      calls = []; await sendEnquiry({ interest: 'Providing capital', name: 'Alice', email: 'alice@example.test' });
      const payload = JSON.parse(calls[0].options.body);
      assert.equal(payload.interest, 'Providing capital');
      for (const field of ['company', 'message', '_gotcha']) assert.equal(payload[field], '');
    });
    await t.test('capital seekers can also leave company and message blank', async () => {
      calls = []; await sendEnquiry({ interest: 'Seeking capital', name: 'Alice', email: 'alice@example.test' });
      assert.deepEqual(JSON.parse(calls[0].options.body), { interest: 'Seeking capital', name: 'Alice', email: 'alice@example.test', company: '', message: '', _gotcha: '' });
    });
    await t.test('retired project fields do not reappear in submissions', async () => {
      calls = []; await sendEnquiry({ ...valid, role: 'Operator', amount: '8m', hardware: 'H200', location: 'Virginia', timeline: 'Soon', offtake: 'LOI', details: 'Old form fields' });
      assert.deepEqual(JSON.parse(calls[0].options.body), { ...valid, name: 'Alice' });
    });
    for (const [name, body] of [
      ['empty required field', { ...valid, name: '   ' }],
      ['invalid email', { ...valid, email: 'bad\nemail@example.test' }],
      ['wrong field type', { ...valid, company: [] }],
      ['missing interest', { ...valid, interest: '' }],
      ['invalid interest', { ...valid, interest: 'Something else' }],
      ['oversized message', { ...valid, message: 'a'.repeat(1501) }],
      ['filled honeypot', { ...valid, _gotcha: 'bot.test' }],
      ['non-object input', null],
    ]) await t.test(name, async () => { calls = []; await assert.rejects(sendEnquiry(body), /Check your project details/); assert.equal(calls.length, 0); });
    await t.test('provider rejection does not expose private response details', async () => {
      globalThis.fetch = async () => Response.json({ code: 422, message: 'private provider detail' }, { status: 422 });
      await assert.rejects(sendEnquiry(valid), error => error.message.includes('Your details are still here') && !error.message.includes('private provider detail'));
    });
    await t.test('rate limit asks the visitor to wait before retrying', async () => {
      globalThis.fetch = async () => Response.json({ code: 429 }, { status: 429 });
      await assert.rejects(sendEnquiry(valid), /wait 15 seconds/);
    });
    await t.test('paused or missing form gives a recoverable error', async () => {
      globalThis.fetch = async () => Response.json({ code: 401 }, { status: 401 });
      await assert.rejects(sendEnquiry(valid), /temporarily unavailable/);
    });
    for (const result of [null, [], {}, { id: 'old-resend-response' }, { code: '200', status: 'success' }, { code: 200, status: 'error' }, { code: 200 }, { code: 422, message: 'provider detail' }]) await t.test(`requires documented success acknowledgement: ${JSON.stringify(result)}`, async () => {
      globalThis.fetch = async () => Response.json(result);
      await assert.rejects(sendEnquiry(valid), /couldn’t confirm/);
    });
    await t.test('a successful body with a failed HTTP status cannot report success', async () => {
      globalThis.fetch = async () => Response.json({ code: 200, status: 'success' }, { status: 500 });
      await assert.rejects(sendEnquiry(valid), /couldn’t confirm/);
    });
    await t.test('invalid JSON cannot report success', async () => {
      globalThis.fetch = async () => new Response('not-json');
      await assert.rejects(sendEnquiry(valid), /couldn’t confirm/);
    });
    await t.test('network failure keeps the visitor-facing error recoverable', async () => {
      globalThis.fetch = async () => { throw new Error('private network detail'); };
      await assert.rejects(sendEnquiry(valid), error => error.message.includes('Your details are still here') && !error.message.includes('private network detail'));
    });
  } finally { globalThis.fetch = originalFetch; }
});
