import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const code = ts.transpileModule(await readFile(new URL('../lib/hero-media.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { getPlayableHeroSources, homeHeroMedia, aboutHeroMedia } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'));
const sources = aboutHeroMedia.sources;

test('video selection never requests a codec the browser rejects', async () => {
  assert.deepEqual(await getPlayableHeroSources(sources, type => type.includes('avc1') ? 'probably' : ''), [sources[2]]);
  assert.deepEqual(await getPlayableHeroSources(sources, () => ''), []);
});

test('smooth decoding wins over unsupported or slow decoding', async () => {
  const seen = [];
  const selected = await getPlayableHeroSources(sources, () => 'probably', async config => {
    seen.push(config.video);
    const type=config.video.contentType;
    return { supported: !type.includes('hvc1'), smooth: type.includes('avc1'), powerEfficient: type.includes('avc1') };
  });
  assert.deepEqual(selected, [sources[2], sources[0]]);
  assert.ok(seen.every(video => video.width===2160 && video.height===2160 && video.framerate===60));
});

test('capability API failures preserve native codec fallback', async () => {
  assert.deepEqual(await getPlayableHeroSources(sources, () => 'maybe', async () => { throw new Error('unavailable'); }), sources);
  assert.deepEqual(await getPlayableHeroSources(sources, () => 'probably'), sources);
});

test('Home and About preserve their original playback dimensions and rates', () => {
  assert.ok(homeHeroMedia.sources.every(source => source.width===3840 && source.height===2160 && source.framerate===30));
  assert.ok(aboutHeroMedia.sources.every(source => source.width===2160 && source.height===2160 && source.framerate===60));
});
