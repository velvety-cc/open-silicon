# Other materials

- Maintain single-page material source here. Keep website routes in `apps/web`
  and presentation slides in `apps/deck`.
- `materials/` contains current copy and layouts. Preserve archived Fund 1 source
  under `archive/`; do not include it in default previews or exports.
- Fonts and the brand symbol belong to `packages/brand`. Update asset hashes in
  `assets.json` when intentionally changing an asset.
- Preview and export must use the same renderer and work without historical
  outputs, raw materials or another app's source.
- Keep generated deliverables in the configured output workspace or `.artifacts/`.
- Verify structural changes with the root architecture check, material tests,
  typecheck and HTML build. For print-layout changes, export and inspect PDFs.
