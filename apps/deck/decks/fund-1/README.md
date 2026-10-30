# Current Fund 1 deck

The current source reproduces the 14-page AI Infra Access Fund revision ending
with `deck-appendix-page11-layout-20261028`. Its reference PDF hash and the
original checkout state are recorded in `docs/migration/baseline.json`.

`manifest.json` owns page order, titles, source IDs, style order and page-level
provenance. `slides/01.html` through `14.html` are editable source, not generated
PDF screenshots. Inline diagrams remain native SVG. Historical source IDs are
kept because CSS selectors refer to them; the displayed order is the manifest's
`page` field. Keep visible footers aligned with that order.

`styles/` preserves shared and page-specific CSS from the original authoring
documents. The files are deduplicated by their migration-time content identity.
They are loaded in the manifest's original order. A page is rendered in an
isolated document to prevent another page's revisions from changing its layout.
Canvas mode follows print styles; reading mode keeps the original responsive CSS.

`assets.json` maps asset placeholders to tracked files and their hashes.
Fonts belong to `packages/brand/fonts`; other artwork belongs to this deck.
The shared brand accent is supplied by `packages/brand/tokens.css`.

`data/model-baseline.json` preserves the existing 15% nominal annual rate,
36-payment annuity model and its unrounded outputs. It is a reference snapshot;
the source slides retain the approved rounded presentation values. An intentional
model change must update the affected slides and verification together. The
14% fund target net IRR is a separate assumption from the 15% proposed asset yield.

The earlier metadata field `appendix_scope` in the numeric snapshot describes
its original revision. The current appendix scope is the rounded table in slide
14, as recorded by `data/reference-release.json`.

Both preview and complete export use `engine/render.mjs`. No historical PDF or
temporary work directory is needed at runtime. Use `npm run export:deck` from
the repository root to generate a new complete release.
