# Research design

This revision gives the Research index and all five published articles one editorial system, consistent with OpenSilicon's existing purple accents, Geist interface typography and Georgia essay headings.

- The index introduces a featured perspective, topic filters, consistent article cards, dates and reading times.
- Every article has a responsive masthead, a wide cover, the OpenSilicon view, a reading column and chapter navigation. The desktop rail highlights the current section; mobile uses a collapsible contents list. A thin progress line follows the article.
- Tables remain inside a keyboard-accessible scrolling region. SVG figures reserve their intrinsic dimensions, retain their captions and open at full size in a new tab. Local research SVGs should declare numeric width and height.
- Sources use an expandable reference list. Each article offers two further articles and a financing contact action.
- Article text, sources, publication status, metadata and the shared publication filter are preserved. The HTTP verifier now checks the published collection rather than expecting the formerly hidden Research page.

## Verification

Checked against the production build on October 15, 2026:

- `npm test`: 38 passing, including heading IDs, repeated names, fenced examples and Unicode.
- `npm run lint`: TypeScript passes.
- `npm run build -- --webpack`: succeeds; all five article routes prerender.
- `node scripts/verify-site.mjs http://127.0.0.1:3028 production`: 56 checks pass, including draft and archive exclusion.
- Browser: index and each article at 1440px, 768px and 375px (18 page/viewport combinations). No horizontal page overflow, broken loaded images, unmatched contents anchors or browser errors.
- Interactions: topic filtering and reset, desktop chapter navigation and highlighting, mobile contents navigation and closure, source expansion, mobile Research navigation. See [browser-checks.json](browser-checks.json).

## Screenshots

| Research index | Article |
| --- | --- |
| [Desktop](research-desktop.png) | [Desktop masthead](article-desktop-hero.png) |
| [Mobile](research-mobile.png) | [Mobile masthead](article-mobile-hero.png) |
| | [Desktop reading](article-desktop-reading.png) |
| | [Mobile reading](article-mobile-reading.png) |
| | [Desktop figure](article-desktop-figure.png) |
| | [Mobile figure](article-mobile-figure.png) |
