# OpenSilicon

Independent applications with shared brand assets, React primitives and pure calculations.

| App | Purpose | Local preview |
| --- | --- | --- |
| `apps/web` | Public website | `npm run dev:web -- --port 3200` |
| `apps/deck` | Current 14-page fund deck | `npm run dev:deck` |
| `apps/other-materials` | Fund, broker, offtaker and VC tear sheets | `npm run dev:other-materials` |
| `apps/risks` | GPU financing and principal recovery model | `npm run dev:risks` |

Install from the repository root with `npm ci`. Shared packages are under `packages/`; historical source is under `archive/`. Applications never import one another. Original workbooks and generated deliverables remain outside tracked source.

## Website release scope

The deployed Home, About, Research articles and Contact implementation are preserved from main at `eca47c08`. The release adds `/startups-and-enterprises`, its navigation entry, and the updated shared footer. It does not publish the local investor page, new draft articles, preview labels, experimental homepages or other website content revisions. The original live Formcarry enquiry behavior remains in place.

Existing redirects and hero media are preserved. The former internal website deck/archive routes remain unavailable in production; the current deck has its own application.

For the existing Vercel website project, use `apps/web` as Root Directory, retain Next.js framework defaults and include shared files outside that directory. Set the Install Command to `cd ../.. && npm ci --include=dev` so the root-owned TypeScript and Tailwind build dependencies are installed alongside the workspaces. The website's prebuild synchronizes approved brand assets. Only the website is deployed publicly; the other apps are separate source and local workflows.

## Validation and outputs

```sh
npm test
npm run typecheck
npm run build:web
npm run build:deck
npm run build:other-materials
npm run build:risks
npm run verify:risks
```

`npm run export:deck` and `npm run export:other-materials` generate complete releases outside tracked source. Configure an ignored `.workspace.local.json` with `artifactsDirectory` and optional `materialsDirectory`, or use the default ignored `.artifacts/` output. See each app's README and `docs/architecture.md`.
