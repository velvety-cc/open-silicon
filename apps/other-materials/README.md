# Other materials

Canonical editable source for OpenSilicon single-page materials. This app is
independent of the website and the 14-page fund deck. It uses Node.js built-ins;
there are no new runtime dependencies or public website routes.

| ID | Audience | Status |
| --- | --- | --- |
| `fund-tear-sheet` | LPs / investors | Current AI Infra Access Fund version |
| `broker-tear-sheet` | Brokers / origination partners | Current |
| `offtaker-tear-sheet` | Offtakers / project counterparties | Current |
| `vc-tear-sheet` | Venture capital firms / portfolio support teams | Current compute partnership version |
| `fund-1-tear-sheet` | LPs / investors | Archived earlier Fund 1 version |

From the repository root:

```sh
npm run dev:other-materials          # http://127.0.0.1:3003
npm run build:other-materials        # standalone HTML for the four current sheets
npm run export:other-materials       # standalone HTML + PDF + release manifest
npm run export:other-materials -- --material offtaker-tear-sheet
npm run export:other-materials -- --material vc-tear-sheet
npm run export:other-materials -- --material fund-1-tear-sheet --html-only
npm run export:other-materials -- --output /absolute/path/to/a/new-release
```

The preview binds to loopback only. `PORT` changes its port. The index and default
export include the four current sheets; the archived sheet requires its ID.
Use the browser print command when previewing an individual sheet.

Edit copy and markup in `materials/<id>/source.html`, and print layouts in
`styles/`. Broker and offtaker sheets share `styles/financing-tear-sheet.css`.
The VC version layers `styles/vc-tear-sheet.css` over the shared financing
stylesheet; `styles` in the manifest accepts a path or an ordered path list.
The archived source is under `archive/fund-1-tear-sheet`.
`manifest.json` owns titles, audiences, status, output filenames and migration
provenance. The migration preserves the October 26 wording and layout; it does
not synchronize financial terms with subsequent deck changes.

`{{styles}}` and `{{asset:key}}` are resolved by `render.mjs` for both preview
and export. Fonts and the OpenSilicon symbol reference `packages/brand` through
`assets.json`; local industry-example artwork stays in this app's `assets/`.
No material imports another application's source or an old output file.

Exports are standalone and embed the required assets. PDF export uses local
Chrome/Chromium; set `CHROME_BIN` if needed. Output follows the root
`.workspace.local.json` `artifactsDirectory`, falling back to ignored `.artifacts/`.
Each run reserves a new release directory and records source/output hashes and
Git state. Generated HTML/PDF/PNG files stay outside tracked app source.

The old production workspace's `output/pdf` files remain historical references.
Future edits and exports start here; historical Python builders are not needed.
