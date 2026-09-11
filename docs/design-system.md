# Open Silicon UI guidelines

Open Silicon uses locally owned shadcn/ui components with Radix behavior and Tailwind v4. Its visual identity remains purple, white, graphite hardware, and warm architectural photography. Vercel's [design guidance](https://vercel.com/design.md) informs hierarchy and alignment; we do not import its branded report stylesheet.

## Shared sources

- `app/tokens.css`: color, typography, spacing, radius, and responsive tokens; also maps shadcn's semantic theme variables.
- `app/ui.css`: shared component variants and interaction states.
- `components/ui/`: actual shadcn registry components, customized locally. Add future primitives with `npx shadcn@latest add <name>`; review generated changes before overwriting our variants.
- `app/globals.css`: page composition and component placement. Avoid adding one-off button sizes or font sizes here; select an existing role.

## Buttons

| Role | API | Height | Type | Shape |
| --- | --- | --- | --- | --- |
| Marketing CTA | `Button size="lg"` | 52px | 15px / 500 | Pill, 24px horizontal padding |
| Header action | `Button size="nav"` | 44px | 14px / 500 | Pill |
| Product action | `Button` | 44px | 14px / 500 | 8px radius |
| Icon action | `Button size="icon"` | 44px | 20px SVG | Circle |
| Text action | `Button variant="link"` | ≥44px | 14px / 500 | Text with hover underline |

Use `asChild` with an anchor for navigation. Keep actions as native buttons. Marketing primary actions use purple; header Login switches between white and black with the header surface. Login intentionally has no destination yet. Secondary actions use outline or text variants. Primary CTAs have no arrows; diagonal arrows denote external contact/navigation links and always use Radix `ArrowTopRightIcon` through `components/Arrow.tsx`. Long labels reflow their containing layout rather than shrinking typography.

Offering selection uses the `card` button variant: it is an entire selectable card, not a compact action button. Preserve the selected border, `aria-pressed`, and visible keyboard focus.

## Typography

| Token role | Desktop maximum | Mobile |
| --- | --- | --- |
| Hero | 88px | 48px |
| Brand display | 64px | 40px |
| Section heading | 48px | 36px |
| Numeric metric | 64px | 40px |
| Content heading | 28px | 24px |
| Emphasis / metric label | 18px | 16px |
| Body | 16px | 16px |
| Supporting label | 14px | 14px |
| Caption / compact metadata | 12px | 12px |

Use Geist Sans throughout. Reserve Geist Mono for identifiers. Display roles interpolate between their declared limits; individual labels never get their own viewport-based size. Use regular weight for headings and prose, medium for actions and selected emphasis. Tabular numerals support data comparisons. Logo proportions are optical brand assets and remain separate from text roles.

Equivalent numeric values share size, line height, weight, and unit treatment. The two-line asset statement uses the content-heading role; its block aligns with the adjacent metric so their supporting labels share a baseline. Keep headings and compact labels free of trailing periods, except deliberate editorial phrasing already present in the brand copy.

## Composition

Shared spacing steps: 4, 8, 12, 16, 24, 32, 48, 64px. Default section padding is 112px on desktop and 72px on mobile. Use 16px between a title and description and 24px before its CTA. The parent owns grouping; avoid stacking competing margins.

Header, Hero copy, sections, and footer use the same 1440px outer shell and responsive gutters. Imagery can bleed to the viewport edges. Tables scroll inside their own labeled region on small screens. Keep page overflow visible during verification; fix the source rather than masking it.

Use black primary text, deep gray supporting text, light neutral borders, and `#533AFE` for primary actions and selection. Standard cards use a 12px radius, nested surfaces 8px. Preserve white backgrounds and existing photographs. No scroll-pinned or repeated-rack animations.

## Interaction and verification

Use shadcn NavigationMenu on desktop, Sheet for mobile navigation, Dialog for investment previews, Input and Label for fields, Progress for allocation, Badge for status, Card for product surfaces, and Table for offerings. Custom brand, image, video, and page-section components compose these primitives and semantic HTML.

Keep focus visible. Sheets and dialogs trap focus, close with Escape, and return focus to their trigger. Preserve reduced-motion behavior and video-to-still loading. Check 320px, 393px, tablet/laptop, and wide desktop layouts, plus keyboard navigation, selection, input errors, and anchors before changing shared tokens.
