// Read-only geometry -> layer selection. The scene keeps its existing springs.
export function scrollLayerState({ top, height, viewportHeight, headerHeight = 0, compact = false }) {
  if (![top, height, viewportHeight, headerHeight].every(Number.isFinite) || height <= 0 || viewportHeight <= headerHeight) {
    return { index: -1, progress: 0 };
  }
  const start = compact ? viewportHeight * .8 : headerHeight;
  const distance = compact ? viewportHeight * .65 : Math.max(1, height - (viewportHeight - headerHeight));
  if (top > start || top + height <= headerHeight) return { index: -1, progress: 0 };
  const progress = Math.max(0, Math.min(1, (start - top) / distance));
  return { index: Math.min(3, Math.floor(progress * 4)), progress };
}
