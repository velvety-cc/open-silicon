# Research design

The October 16 revision treats Research as a small publication. The index has a single title and an asymmetric composition: one lead article and four smaller entries. The introductory copy, article count, topic filters, category labels, summaries and repeated “Read article” actions are removed from the index. ResearchLibrary is now a server component.

Each published article has an original SVG cover in `public/research/covers/`. The five covers share black and gray linework, OpenSilicon purple and a neutral background. They represent the article's subject; schematic curves are conceptual illustrations, not additional market data. All five SVGs total 8,299 bytes and contain no external assets.

Article pages use a shared title and reading grid, marginal author/date information on desktop, serif prose, neutral tables and an unfilled takeaway separated by fine rules. The index ends after the articles with no separate contact prompt or divider; article contact actions are quiet text links. The contents rail, mobile contents disclosure, header progress line, references and full-size figures remain available. Published article text, dates, authors, sources and publication status are unchanged.

## Verification

Verified against the production build on October 16, 2026:

- `npm test`: 42 passing.
- `npm run lint`: TypeScript passes.
- `npm run build -- --webpack`: succeeds; all five articles prerender.
- `node scripts/verify-site.mjs http://127.0.0.1:3030 production`: 56 checks pass, including private draft URLs and archive restrictions.
- Chrome: index and all five articles at 1440, 1024, 768, 390 and 320px, 30 page/viewport combinations. No horizontal document overflow, broken loaded images, missing contents anchors or page errors.
- Browser interactions: desktop and mobile chapter jumps, active chapter indication, mobile contents closure, references expansion, article links and return to the index. See [browser checks](publication/browser-checks.json).
- At 390 × 844px the lead article title starts at 457px, inside the initial viewport. At the same width the progress line spans y=71–73px, inside the 73px header. The takeaway has a transparent background and no horizontal padding.

Responsive checks use desktop Chrome at different viewport sizes; they are not a native Safari device test.

## Current previews

| View | Index | Article |
| --- | --- | --- |
| Desktop | [Full page](publication/index-1440.png), [first viewport](publication/index-1440-top.png) | [Masthead](publication/article-1440-top.png), [reading](publication/article-1440-reading.png) |
| Mobile | [Full page](publication/index-390.png), [first viewport](publication/index-390-top.png) | [Masthead](publication/article-390-top.png), [reading](publication/article-390-reading.png) |

Older screenshots alongside this README document the previous card design. The `publication/` screenshots show the current revision.
