# Risk app migration - 30 October 2026

The canonical source moved from the production workspace's `gpu-financing-app`
into `opensilicon/apps/risks`. Model 1.0.0, UI, worker, financial assumptions,
source evidence and the 32 original model tests are preserved byte for byte.
The standard and throttled reference cases retain 2,193 dated rows and 73
calendar months each. Compact expected summaries and ledger hashes live in
`data/migration-baseline.json`; a migration test replays both cases exactly.

Only workspace integration, asset copying, audit paths, report destinations and
verification scripts change. No model code moves into shared `core`: this model
currently has one consumer and uses a different cash-flow convention from the
fund deck. Source evidence remains app-owned and does not enter public content.

The original app, full generated review examples, test log and historical release
manifest remain under `Compute Lending Protocol/archive/risks-migration-20261030`.
The old `gpu-financing-app` path becomes a compatibility link to the canonical
app after verification. New outputs are external or ignored; original source
and historical release hashes are retained for provenance.
