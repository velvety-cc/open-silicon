import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { listMaterials, loadMaterial, renderMaterial, materialSourceHash, sha256, appRoot } from '../../apps/other-materials/render.mjs';
import { createMaterialsServer } from '../../apps/other-materials/server.mjs';

const textOf = html => html.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');

test('current catalog keeps the earlier Fund 1 source explicitly archived', async () => {
  assert.deepEqual((await listMaterials()).map(item => item.id), ['fund-tear-sheet', 'broker-tear-sheet', 'offtaker-tear-sheet', 'vc-tear-sheet']);
  assert.equal((await listMaterials({ includeArchived: true })).length, 5);
  assert.equal((await loadMaterial('fund-1-tear-sheet')).status, 'archived');
  await assert.rejects(renderMaterial('../web'), RangeError);
});

test('all sheets preserve recorded text and render without old workspace files', async () => {
  for (const material of await listMaterials({ includeArchived: true })) {
    const html = await renderMaterial(material.id);
    assert.equal(sha256(textOf(html)), material.provenance.textSha256, material.id);
    assert.ok(!html.includes('{{'), `unresolved placeholder: ${material.id}`);
    assert.ok(!/file:\/\/|\/Users\/|<script\b/.test(html), `non-standalone source: ${material.id}`);
    assert.equal((html.match(/class="page(?: [^"]*)?"/g) ?? []).length, 1);
    assert.match(html, /@page\{size:A4 portrait;margin:0\}/);
    assert.equal((html.match(/data:font\/ttf;base64,/g) ?? []).length, 3);
    assert.match(await materialSourceHash(material.id), /^[a-f0-9]{64}$/);
  }
});

test('preview serves only catalog routes and excludes archived sheets from its index', async () => {
  const server = createMaterialsServer();
  await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
  const origin = `http://127.0.0.1:${server.address().port}`;
  try {
    const index = await fetch(origin);
    assert.match(index.headers.get('x-robots-tag'), /noindex/);
    const html = await index.text();
    assert.ok(html.includes('/fund-tear-sheet'));
    assert.ok(html.includes('/vc-tear-sheet'));
    assert.equal((await fetch(`${origin}/vc-tear-sheet`)).status, 200);
    assert.ok(!html.includes('/fund-1-tear-sheet'));
    assert.equal((await fetch(`${origin}/offtaker-tear-sheet`)).status, 200);
    assert.equal((await fetch(`${origin}/fund-1-tear-sheet`)).status, 200);
    assert.equal((await fetch(`${origin}/manifest.json`)).status, 404);
    assert.equal((await fetch(`${origin}/%2e%2e%2fweb/package.json`)).status, 404);
    assert.equal((await fetch(`${origin}/%ZZ`)).status, 404);
    assert.equal((await fetch(origin, { method: 'POST' })).status, 405);
  } finally { await new Promise(resolve => server.close(resolve)); }
});

test('HTML release contains all current standalone sheets, verifiable hashes and refuses reuse', async () => {
  const temporary = await mkdtemp(join(tmpdir(), 'opensilicon-materials-test-'));
  const output = join(temporary, 'release');
  const args = [join(appRoot, 'export.mjs'), '--html-only', '--output', output];
  try {
    await promisify(execFile)(process.execPath, args);
    const manifest = JSON.parse(await readFile(join(output, 'release-manifest.json'), 'utf8'));
    assert.equal(manifest.materials.length, 4);
    for (const material of manifest.materials) {
      assert.equal(material.status, 'current');
      assert.equal(sha256(await readFile(join(output, material.html.file))), material.html.sha256);
      assert.equal(material.sourceHash, await materialSourceHash(material.id));
    }
    const before = await readFile(join(output, 'release-manifest.json'), 'utf8');
    await assert.rejects(promisify(execFile)(process.execPath, args));
    assert.equal(await readFile(join(output, 'release-manifest.json'), 'utf8'), before);
  } finally { await rm(temporary, { recursive: true, force: true }); }
});
