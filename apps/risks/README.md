# OpenSilicon GPU Financing Lab

The `apps/risks` workspace: a separate, local single-deal underwriting app with no runtime dependencies, account connections or public deployment. Existing website/deck and original workbook are unchanged.

Use the repository Node.js version (22.10+). From the repository root:

```sh
npm run dev:risks
```

From this folder, `npm start` remains supported.

Open **http://localhost:4318**. The server binds only to 127.0.0.1. Use `PORT=4320 npm start` for another port. Stop with Ctrl+C. Python 3 is needed only to repeat the read-only XLSX audit.

```sh
npm run test --workspace=@opensilicon/risks
npm run verify:risks
npm run build:risks
npm run examples:risks
npm run audit:risks
```

The app uses local ES modules and a Web Worker. Serve it over localhost rather than opening `index.html` as a file. No build or dependency install is required. Fonts, the brand symbol and license are generated from `packages/brand` through the root `assets:sync` allowlist; app copies are ignored.

Start with standard or throttled GB300 references. All new financing/timing/recovery terms are illustrative, and missing evidence is explicit. The initial selected event is an uncured borrower default one year after first wire. Sidebar sliders and numeric fields edit a working copy. Exact dates, repayment/PIK/balloon and the full provenance register are editable. Tabs compare five workouts, three deterministic scenarios, three two-variable grids, bounded candidate searches and exact/monthly ledgers. Freeze, duplicate, reset and import/export scenarios locally. No cloud storage or telemetry is used.

Use **Sources & assumptions** for every material input's value, unit, currency, source/date and status. Empty fields remain null. Required missing values block calculation. Explicitly unavailable rights block the corresponding action; missing rights make projected workouts conditional. Original principal, PIK, workout funding, interest and economic returns have separate balances. No candidate is an approved financing offer.

Included deliverables:

- `docs/SOURCE_AUDIT.md`: snapshot/current-source reconciliation and formula issues.
- `docs/CALCULATION_PLAN.md`, `docs/FORMULAS.md`: assumptions, exact event order, equations and boundaries.
- `docs/assumptions-dictionary.csv`, `docs/source-mapping.csv`: reusable input dictionary and source/formula mapping.
- `model/inputs.mjs`, `finance.mjs`, `engine.mjs`, `export.mjs`: validation, run, sensitivity, bounded search, structure comparison and review export functions.
- `tests/`: arithmetic acceptance fixtures and integrated edge/reconciliation tests.
- `examples/conservative-inputs.json`: editable conservative working input with no customer prepayment. `npm run examples:risks` regenerates standard/throttled review JSON, monthly/assumptions CSV and documentation tables in an external release. Import JSON through the app's source or saved-scenario view.
- `data/`: read-only extracted snapshot, bounded live Google Sheet read and compact migration reference results. Source hashes and exact-ledger checks are retained.

The original workbook stays in the external production materials workspace.
Configure ignored repository-root `.workspace.local.json` with `materialsDirectory`
pointing at that workspace's `materials` directory. Alternatively pass an explicit
file when auditing:

```sh
npm run audit:risks -- --source /absolute/path/to/GB300_Project_Budget_2026-10-21.xlsx
```

Audit reads the original XLSX and writes a new external JSON report; it never
overwrites source evidence. Builds, generated examples and audit reports follow
the root `artifactsDirectory`, falling back to ignored `.artifacts/`. Build and
example commands accept `--output /absolute/path/to/a/new-release`.

`npm run build:risks` produces a standalone static app with a release manifest.
Serve its output over localhost; the Web Worker requires HTTP. Building does not
publish the app. `npm run verify:risks -- /path/to/review.json` also replays a
downloaded review. `docs/MIGRATION.md` records the relocation and preservation
checks. The original reports and verification records remain in the archived
production app; the active repository keeps compact ledger hashes and summaries.

Material remaining assumptions: signed customer and financing terms, prepayment collectibility/refund, complete operating/capital costs and bundled scope, site/NRC responsibility, executable collateral bids/condition, priority/lien/account/site/removal/transfer documents, committed sponsor and workout funding, and collectible support. This first version supports one buyer followed by one replacement, two procurement/draw tranches, one uncured default, constant operating drivers, a parameterized resale curve or quote and one terminal sale. No legal enforcement opinion, business-day calendar, FX, stochastic default probabilities, multi-facility capital structure, fund/LP waterfall or realized-return claim is included. Termination text is evidence to review, not executable legal logic. Costs/collections/rights must be evidenced before underwriting reliance.

## Everyday view

The default page shows five paired slider/numeric controls (LTV, financing coupon,
loan term, compute price and utilization), a default date, and original principal
advanced, recovered and still exposed. A single recovery result shows the selected
strategy, additional lender funding and receipt timing. Expand **Compare recovery
options** to compare the five workouts.

**More assumptions** exposes equipment, site, resale, collection, repayment and
exact timing controls. **Advanced model** contains the full charts, dated ledger,
sensitivity grids, constrained searches, editable source register and saved
scenarios. Both views use the same versioned inputs and deterministic worker;
changing the presentation does not alter calculations or reference results.

## Visual system

The interface follows the OpenSilicon website: white and neutral gray surfaces,
Geist Sans, restrained Georgia display headings, purple selection/actions, fine
rules and pill header actions. Shared palette tokens are copied from
`packages/brand/tokens.css` by the existing `assets:sync` allowlist. Local app
styles own the calculator, charts, tables and dialogs; there is no dependency on
the website application. Model calculations and historical inputs are unchanged.

## Parameters and results layout

All primary parameters (configuration, the five financial/operating controls,
default date and recovery strategy) are in the left column. The right column
shows principal advanced/recovered/exposed, the monthly principal chart and the
selected recovery result. The chart reuses the same engine monthly data and
selected default marker as the advanced analysis. Small screens stack the two
columns; the chart scrolls within its own container.
