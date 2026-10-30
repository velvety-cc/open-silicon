import test from 'node:test';
import assert from 'node:assert/strict';
import { loadDeck, renderSlide, renderDeck, deckSourceHash, canvasCSS } from '../../apps/deck/engine/render.mjs';
const textOf = html => html.replace(/<style>[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ');

test('current deck is a complete 14-page source with valid assets and consistent folios', async () => {
  const deck = await loadDeck();
  assert.equal(deck.slides.length, 14);
  for (const slide of deck.slides) {
    const html = await renderSlide(slide.page);
    assert.ok(!html.includes('{{asset:'), `unresolved asset on page ${slide.page}`);
    assert.ok(!/file:\/\/|\/Users\//.test(html), `machine path on page ${slide.page}`);
    if (![1, 13].includes(slide.page)) assert.ok(html.includes(`${String(slide.page).padStart(2, '0')} / 14`));
  }
  assert.match(await deckSourceHash(), /^[a-f0-9]{64}$/);
  await assert.rejects(loadDeck('../web'), RangeError);
  await assert.rejects(renderSlide(15), RangeError);
});

test('current financial assumptions and accumulated text edits survive migration', async () => {
  assert.match(await renderSlide(3), /target-irr-emphasis/);
  const profile = await renderSlide(6);
  assert.ok(textOf(profile).includes('15%'), 'proposed yield');
  assert.ok(textOf(profile).includes('~1.2x'), 'modeled DSCR');
  const risk = await renderSlide(10);
  for (const value of ['$120.1m', '42.9%', '$8.1m', '$64.5m', '23.0%', 'after 14 monthly payments']) assert.ok(textOf(risk).includes(value), value);
  assert.match(await renderSlide(12), /North America/);
  assert.match(await renderSlide(13), /mailto:capital-partnerships@opensilicon.ai/);
  const appendix = await renderSlide(14);
  assert.match(appendix, /Illustrative Portfolio Assumptions/);
  assert.ok(!appendix.includes('146.33'));
});

test('export uses every source slide and preserves isolated print styling', async () => {
  const html = await renderDeck();
  assert.equal((html.match(/<iframe /g) ?? []).length, 14);
  assert.equal((html.match(/class="export-page"/g) ?? []).length, 14);
  assert.ok(!html.includes('{{asset:'));
  assert.ok(!html.includes('opensilicon:slide-key'), 'offline print export has no viewer keyboard relay');
  assert.ok((await renderSlide(1, { interactive: true })).includes('opensilicon:slide-key'), 'canvas focus preserves viewer keyboard navigation');
  assert.equal(canvasCSS('@media print{a{color:red}}@media screen and (max-width:700px){a{color:blue}}'), '@media all {a{color:red}}@media not all {a{color:blue}}');
});
