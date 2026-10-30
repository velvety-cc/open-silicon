# Architecture

Applications depend on shared packages. They do not depend on one another.
Shared packages do not depend on applications, archived source, or the external
materials/output workspace. `npm run check:architecture` checks those boundaries.

```text
apps/web ─────────────┐
                     ├── packages/brand, ui, core, content
apps/deck ────────────┘
apps/other-materials ──── packages/brand
apps/risks ────────────── packages/brand (generated local assets)

external materials → explicitly selected source inputs
apps/deck source → complete HTML + PDF + release manifest → external output
apps/other-materials source → standalone HTML + PDF + release manifest → external output
apps/risks source → static app / review reports / audits → external output
```

The web and deck apps have separate root layouts, global stylesheets, Next.js
configuration, ports and build directories. Other materials use a separate
Node.js loopback preview on port 3003 and their own renderer/exporter. There is no website header visibility switch for
deck URLs. Website private-route denial is retained for former deck/archive URLs.
The deck has its own development-only access policy.

## Shared layers

`brand` holds approved logos, font files, the accent and palette. Web type scales
and spacing live in the web app. Presentation type scales and page geometry live
with the deck. A brand change can affect both apps; a layout change stays local.

`ui` holds generic React primitives. Navigation, marketing blocks, slide frames
and content-specific figures belong to the app that uses them. Promote a figure
only when it has an actual second consumer and an app-independent API.

`core` contains pure calculations with explicit inputs and units. The historical
straight-line/bullet illustration remains distinct from the current deck's
annuity-model snapshot. Never substitute one amortization convention for another.

`content` is public-only. The current company description has a single export.
Research articles, publication status and editorial rendering remain in the web
app. Private deck narrative and transaction assumptions remain in the deck app.
Standalone material copy and terms remain in `apps/other-materials`.

## Website release boundary

The deployed website is migrated from main at `eca47c08` without rewriting Home, About, Research, Contact, their article content, hero media or live enquiry behavior. Only the new `/startups-and-enterprises` page, a matching entry in the original navigation and the shared footer are introduced in this release. The local investor page and other website revisions are excluded.

Website page components stay app-local. Generic shadcn primitives use `packages/ui`; deployed font bytes are shared through `packages/brand`. Existing website UI styling and tokens are preserved. The Vercel application root is `apps/web`, with shared files available during builds. Other applications are independent and are not published as website routes.

## Risks

`apps/risks` owns the single-deal GPU financing and original-principal recovery
tool, including its worker, financial model, source evidence, assumptions,
formula documentation and tests. Its native ES modules stay app-local: the
model has one consumer and must not replace the fund deck's distinct calculation
convention. Private assumptions and source evidence never enter shared public
content or website routes.

The loopback server uses port 4318. Root asset synchronization copies only the
approved fonts, license and symbol from `packages/brand`; these app copies are
ignored. Static builds include an explicit runtime file list and a hash manifest.
Generated examples and source-audit reports go to the configured output workspace
or `.artifacts/`. Audit source paths are supplied through ignored local settings
or `--source`; runtime calculations use preserved templates and do not require
the original workbook. Historical source snapshots are never silently replaced.
The two original reference ledgers and summaries are checked exactly after
migration. Original reports remain in the external migration archive.

## Other materials

`apps/other-materials` owns the current fund, broker, offtaker and VC compute
partnership tear sheets.
The earlier Fund 1 sheet is archived inside this app and excluded from default
preview listings and exports. Editable HTML and print CSS are tracked source;
the catalog records provenance and output filenames. Broker and offtaker sheets
share their print stylesheet. The VC sheet layers its own layout adjustments
over the same stylesheet and focuses on portfolio compute partnerships. Their October 26 terms are preserved independently
of later deck revisions.

Preview and export use the same standalone renderer. Fonts and the brand symbol
come from `packages/brand`; industry-example artwork stays in the owning app.
There are no imports from the deck/web apps and no runtime reads from historical
outputs, temporary builders or the external materials workspace. The preview is
local only and creates no public website routes. New releases follow the root
artifact output setting and include source/output hashes.

## Assets and artifacts

Small reusable brand assets have one tracked source. Application copies are
generated from an explicit allowlist. Content images stay with their owning app
until there is a second consumer. Deck embedded assets were extracted and
deduplicated; fonts are shared through `brand`, while deck artwork remains in
the deck. Content assets are verified against their SHA-256 registry.

Raw materials and restricted original references remain outside the code repo.
No build copies the entire materials directory into `public`.

Export output is external or ignored. A release records deck ID, source revision,
source/model hashes, output hashes, page count and Git state. Source hashes use
relative paths so they remain stable when the checkout moves.

## Migration choices

- Preserve the original repository's Git metadata and local changes.
- Preserve the deployed public website baseline and its live enquiry behavior; overlay only the authorized enterprise page and footer.
- Select the terminal 14-page PDF revision using its source lineage and hash.
  Recover each page's actual source rather than copying the obsolete complete
  HTML that earlier page-replacement scripts happened to carry.
- Retain source IDs where existing CSS uses them; the ordered manifest owns the
  displayed page numbers. For example, page 11's source ID can remain `deck-page-12`.
- Keep current slide bodies as HTML/SVG. A conversion to JSX would introduce
  unnecessary layout changes into this structural migration.
- Keep the historical 20-page Fund 1 and older deck source outside active app trees.
- Preserve historical production outputs as reference; new work uses this repo.

## Verification

Required checks are the architecture guard, existing web/calculation tests,
current-deck and material preservation checks, type checking and independent app
builds. Risks checks include the original arithmetic tests, exact reference
replays, static runtime assets and external audit paths. Materials checks cover current/archive selection, standalone assets and
preview route isolation; PDF QA checks single-page geometry and layout.
Browser QA covers website routes and deck navigation at desktop and mobile
widths, including private-route denial. PDF QA compares all 14 pages' text,
page size and rendered layout with the locked reference.

The migration is local source organization. Hosting configuration will need the
web app as its application directory before any later deployment.
