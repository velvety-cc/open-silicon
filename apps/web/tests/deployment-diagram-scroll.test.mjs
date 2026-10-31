import test from 'node:test';
import assert from 'node:assert/strict';
import { scrollLayerState } from '../lib/deployment-diagram/scroll-state.mjs';

test('desktop tour follows all four layers in both scroll directions', () => {
  const base = { height: 1440, viewportHeight: 720, headerHeight: 89 };
  const checkpoints = [0, 1, 2, 3].map(index => ({ ...base, top: 89 - 809 * (index + .5) / 4 }));
  assert.deepEqual(checkpoints.map(p => scrollLayerState(p).index), [0, 1, 2, 3]);
  assert.deepEqual(checkpoints.toReversed().map(p => scrollLayerState(p).index), [3, 2, 1, 0]);
  assert.equal(scrollLayerState({ ...base, top: 90 }).index, -1);
  assert.equal(scrollLayerState({ ...base, top: 89 - 1440 }).index, -1);
  assert.equal(scrollLayerState({ ...base, top: -720 }).index, 3);
});

test('compact tour progresses while the illustration enters the viewport', () => {
  const base = { height: 1000, viewportHeight: 844, headerHeight: 72, compact: true };
  const indices = [0, 1, 2, 3].map(index => scrollLayerState({ ...base, top: 844 * .8 - 844 * .65 * (index + .5) / 4 }).index);
  assert.deepEqual(indices, [0, 1, 2, 3]);
  assert.equal(scrollLayerState({ ...base, top: 845 }).index, -1);
  assert.equal(scrollLayerState({ ...base, top: -1000 }).index, -1);
});

test('incomplete or temporarily zero geometry keeps the stack collapsed', () => {
  for (const patch of [{ top: NaN }, { height: 0 }, { viewportHeight: 0 }, { headerHeight: 900 }]) {
    assert.deepEqual(scrollLayerState({ top: 0, height: 1440, viewportHeight: 720, headerHeight: 89, ...patch }), { index: -1, progress: 0 });
  }
});
