import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const code = ts.transpileModule(await readFile(new URL('../lib/research-headings.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { getResearchHeadings } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));

test('contents preserve source lines and disambiguate repeated section names', () => {
  const headings = getResearchHeadings('# Title\n## The **GPU** market\ntext\n## The GPU market\n## The GPU market-2\n## The GPU market');
  assert.deepEqual(headings, [
    { id: 'the-gpu-market', title: 'The GPU market', line: 2 },
    { id: 'the-gpu-market-2', title: 'The GPU market', line: 4 },
    { id: 'the-gpu-market-2-2', title: 'The GPU market-2', line: 5 },
    { id: 'the-gpu-market-3', title: 'The GPU market', line: 6 },
  ]);
});

test('code examples never become navigation entries, including nested-looking fences', () => {
  const content = ['## Start', '````md', '## Hidden', '```', '## Still hidden', '````', '~~~', '## Also hidden', '~~~', '### Subheading', '    ## Indented code', '## Finish'].join('\n');
  assert.deepEqual(getResearchHeadings(content).map(h => h.title), ['Start', 'Finish']);
});

test('contents handle markdown labels, closing hashes, CRLF and Unicode', () => {
  const content = '## [Price](https://example.test) and `value` ###\r\n## C#\r\n## 算力市场\r\n## !!!';
  assert.deepEqual(getResearchHeadings(content).map(h => [h.id, h.title]), [
    ['price-and-value', 'Price and value'], ['c', 'C#'], ['算力市场', '算力市场'], ['section', '!!!'],
  ]);
});
