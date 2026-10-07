import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const moduleUrl = source => 'data:text/javascript;base64,' + Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText).toString('base64');
const library = moduleUrl(await readFile(new URL('../lib/financing.ts', import.meta.url), 'utf8'));
const route = await import(moduleUrl((await readFile(new URL('../app/api/financing/route.ts', import.meta.url), 'utf8')).replace('"@/lib/financing"', JSON.stringify(library))));
const valid = { name: ' Alice ', company: 'Example Compute', email: 'alice@example.test', role: 'Operator', amount: 'EUR 8m for equipment and deployment', timeline: 'After site readiness', offtake: 'Signed contract', hardware: '256 × H200', location: 'Virginia', details: '<script>plain text only</script>', website: '' };
const request = (body = valid, headers = {}) => new Request('https://example.test/api/financing', { method: 'POST', headers: { origin: 'https://example.test', 'content-type': 'application/json', 'idempotency-key': '31bf67eb-2d24-4e1f-97b5-bd4c448fca33', ...headers }, body: typeof body === 'string' ? body : JSON.stringify(body) });

test('financing endpoint validates enquiries and handles Resend responses', async t => {
  const originalFetch = globalThis.fetch;
  const keys = ['RESEND_API_KEY', 'FINANCING_EMAIL_FROM', 'FINANCING_EMAIL_TO'];
  const previous = keys.map(key => process.env[key]);
  process.env.RESEND_API_KEY = 'test-key-not-real';
  process.env.FINANCING_EMAIL_FROM = 'Open Silicon <sender@example.test>';
  process.env.FINANCING_EMAIL_TO = 'owner@example.test';
  try {
    let calls = [];
    globalThis.fetch = async (url, options) => { calls.push({ url, options }); return Response.json({ id: 'test-email-id' }); };
    await t.test('valid enquiry sends to fixed recipient with customer Reply-To', async () => {
      const result = await route.POST(request({ ...valid, to: 'attacker@example.test' }));
      assert.equal(result.status, 200);
      assert.deepEqual(await result.json(), { ok: true });
      assert.equal(calls.length, 1);
      assert.equal(calls[0].url, 'https://api.resend.com/emails');
      const payload = JSON.parse(calls[0].options.body);
      assert.deepEqual(payload.to, ['owner@example.test']);
      assert.equal(payload.reply_to, valid.email);
      assert.match(payload.text, /Name: Alice\n/);
      assert.equal(payload.html, undefined);
      for (const value of [valid.role, valid.amount, valid.hardware, valid.location, valid.timeline, valid.offtake, valid.details]) assert.ok(payload.text.includes(value));
      assert.equal(calls[0].options.headers['Idempotency-Key'], 'financing-31bf67eb-2d24-4e1f-97b5-bd4c448fca33');
    });
    await t.test('only name, company and work email are required; optional status stays unspecified', async () => {
      calls = []; const result = await route.POST(request({ name: 'Alice', company: 'Compute Co', email: 'alice@example.test' }));
      assert.equal(result.status, 200);
      const payload = JSON.parse(calls[0].options.body);
      assert.match(payload.text, /Offtake status: Not specified/);
      assert.doesNotMatch(payload.text, /Signed contract/);
    });
    await t.test('retries forward the same idempotency key to the provider', async () => {
      calls = []; await route.POST(request()); await route.POST(request());
      assert.equal(calls[0].options.headers['Idempotency-Key'], calls[1].options.headers['Idempotency-Key']);
    });
    for (const [name, body] of [
      ['empty required field', { ...valid, name: '   ' }],
      ['invalid email', { ...valid, email: 'bad\nemail@example.test' }],
      ['wrong field type', { ...valid, company: [] }],
      ['invalid role', { ...valid, role: 'Something else' }],
      ['invalid offtake', { ...valid, offtake: 'Approved' }],
      ['oversized detail', { ...valid, details: 'a'.repeat(1501) }],
      ['filled honeypot', { ...valid, website: 'bot.test' }],
      ['invalid JSON', '{'],
    ]) await t.test(name, async () => { calls = []; assert.equal((await route.POST(request(body))).status, 400); assert.equal(calls.length, 0); });
    await t.test('accepts browser origin when Next normalizes its internal bind hostname', async () => {
      globalThis.fetch = async () => Response.json({ id: 'test-message' });
      assert.equal((await route.POST(request(valid, { host: '127.0.0.1:3000', origin: 'http://127.0.0.1:3000', 'x-forwarded-proto': 'http' }))).status, 200);
    });
    await t.test('rejects missing request identity', async () => { const req = request(); req.headers.delete('idempotency-key'); assert.equal((await route.POST(req)).status, 400); });
    await t.test('rejects non-JSON content', async () => assert.equal((await route.POST(request(valid, { 'content-type': 'text/plain' }))).status, 415));
    await t.test('rejects foreign origin', async () => assert.equal((await route.POST(request(valid, { origin: 'https://other.test' }))).status, 403));
    await t.test('rejects oversized request', async () => assert.equal((await route.POST(request('x'.repeat(16001)))).status, 413));
    await t.test('missing configuration cannot report success', async () => { delete process.env.RESEND_API_KEY; assert.equal((await route.POST(request())).status, 503); process.env.RESEND_API_KEY = 'test-key-not-real'; });
    await t.test('provider rejection is not exposed or reported as success', async () => { globalThis.fetch = async () => Response.json({ secret: 'provider detail' }, { status: 422 }); const response = await route.POST(request()); assert.equal(response.status, 502); assert.doesNotMatch(await response.text(), /provider detail/); });
    for (const id of [undefined, null, '', '   ', 123]) await t.test(`provider acknowledgement requires a nonempty message ID: ${id}`, async () => { globalThis.fetch = async () => Response.json({ id }); assert.equal((await route.POST(request())).status, 502); });
    await t.test('invalid provider response cannot report success', async () => { globalThis.fetch = async () => new Response('not-json'); assert.equal((await route.POST(request())).status, 502); });
    await t.test('network failure preserves error status', async () => { globalThis.fetch = async () => { throw new Error('network'); }; assert.equal((await route.POST(request())).status, 502); });
  } finally {
    globalThis.fetch = originalFetch;
    keys.forEach((key, index) => { if (previous[index] === undefined) delete process.env[key]; else process.env[key] = previous[index]; });
  }
});
