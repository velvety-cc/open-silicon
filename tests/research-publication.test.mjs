import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import matter from 'gray-matter';

const code = ts.transpileModule(await readFile(new URL('../lib/research-publication.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { publishedResearchPost } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
const body = '## A concrete assessment\n' + 'This is a synthetic test fixture with a complete body, not research for publication. '.repeat(5);
const complete = { status: 'published', title: 'Synthetic test fixture', description: 'A test description', date: '2026-10-05', category: 'Test', author: 'Test author', cover: '/compute-rack.webp', coverAlt: 'A rack', takeaway: 'A specific assessment for the test.', sources: [{ title: 'Test source', url: 'https://example.test/research' }] };

test('publication requires explicit status and excludes examples regardless of status', () => {
  for (const status of [undefined, null, 'draft', 'Published', 'scheduled', true]) assert.equal(publishedResearchPost('test', { ...complete, status }, body), null);
  assert.equal(publishedResearchPost('test', { ...complete, example: true }, body), null);
  assert.equal(publishedResearchPost('test', { status: 'draft' }, ''), null);
  const post = publishedResearchPost('test', complete, body);
  assert.equal(post.slug, 'test'); assert.equal(post.author, 'Test author'); assert.equal(post.sources.length, 1);
});

test('incomplete published research fails closed', () => {
  for (const field of ['title', 'description', 'date', 'category', 'author', 'cover', 'coverAlt', 'takeaway', 'sources']) assert.throws(() => publishedResearchPost('test', { ...complete, [field]: undefined }, body));
  assert.throws(() => publishedResearchPost('test', complete, '## Placeholder'));
  assert.throws(() => publishedResearchPost('test', { ...complete, date: '2026-02-30' }, body));
  assert.throws(() => publishedResearchPost('test', { ...complete, sources: [{ title: 'Bad', url: 'javascript:alert(1)' }] }, body));
});

test('existing sample articles remain private', async () => {
  for (const name of ['from-gpus-to-usable-compute', 'the-infrastructure-behind-intelligence']) {
    const { data, content } = matter(await readFile(new URL(`../content/research/${name}.md`, import.meta.url), 'utf8'));
    assert.equal(data.status, 'draft'); assert.equal(publishedResearchPost(name, data, content), null);
  }
});
