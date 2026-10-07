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

Use `asChild` with an anchor for navigation. Keep actions as native buttons. Marketing primary actions use purple and say “Discuss a financing opportunity”; the public header action uses an outline on the current header surface, says “Get in touch”, and links to `/contact`. The mobile menu uses the same “Get in touch” label. Secondary actions use outline or text variants. Primary CTAs have no arrows; diagonal arrows denote external contact/navigation links and always use Radix `ArrowTopRightIcon` through `components/Arrow.tsx`. Long labels reflow their containing layout rather than shrinking typography.

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

Use Geist Sans throughout. Reserve Geist Mono for identifiers. Display roles interpolate between their declared limits; individual labels never get their own viewport-based size. Use regular weight for headings and prose, medium for actions and selected emphasis. Tabular numerals support data comparisons. Logo proportions are optical brand assets and remain separate from text roles. The public wordmark reads “OpenSilicon”, without a space, with capital O and S.

Equivalent numeric values share size, line height, weight, and unit treatment. The two-line asset statement uses the content-heading role; its block aligns with the adjacent metric so their supporting labels share a baseline. Keep headings and compact labels free of trailing periods, except deliberate editorial phrasing already present in the brand copy.

## Composition

Shared spacing steps: 4, 8, 12, 16, 24, 32, 48, 64px. Default section padding is 112px on desktop and 72px on mobile. Use 16px between a title and description and 24px before its CTA. The parent owns grouping; avoid stacking competing margins.

Header, Hero copy, sections, and footer use the same 1440px outer shell and responsive gutters. Imagery can bleed to the viewport edges. Tables scroll inside their own labeled region on small screens. Keep page overflow visible during verification; fix the source rather than masking it.

Footer reuses the original `site-footer` layout and its global styles: brand identity on the left, three navigation groups on the right, and the original disclaimer/bottom row below. Keep the current GPU financing copy and valid public destinations. Use the existing Arrow component for contact links. Do not add a separate marketing footer layout.

The Home hero reuses the original `hero hero-immersive` structure, HeroVideo component, and global desktop/mobile styles. It contains the headline and description, with no CTA buttons or bottom audience caption. Its approved spacing refinement uses the shared heading tracking (-.045em), heading line height (1.1), and a 24px headline-to-description gap. Keep the original font size, video crop and overlay. Contact remains accessible through the header’s “Get in touch” button.

Use black primary text, deep gray supporting text, light neutral borders, and `#533AFE` for primary actions and selection. Standard cards use a 12px radius, nested surfaces 8px. Preserve white backgrounds and existing photographs. No scroll-pinned or repeated-rack animations.

## Interaction and verification

Use the existing NavigationMenu, NavigationMenuList, NavigationMenuItem and NavigationMenuLink components on desktop, with Next Link through `asChild`, and Sheet for mobile navigation. Keep the original navigation spacing and visual treatment. A shared background slides between hovered links using the `--motion-fast` (160ms) token and `--ease-out`; hover does not add an underline. Clicking hides the background. If no route was selected, position the underline immediately beneath the clicked label and grow it from left to right with a left-origin scale; do not animate its vertical position. Between selected routes, slide the shared 1px underline as before. Separate the indicator's cached position from its visibility, so hiding never resets its position to the nav origin. Header lives in the root layout to preserve the indicators across page changes. Hover is limited to fine pointers, original keyboard focus remains visible, and reduced motion uses immediate changes. NavigationMenuLink supplies active-page semantics. Home is reached through the logo and has no navigation underline. Motion decisions follow [emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md) and [animate](https://github.com/emilkowalski/skills/blob/main/skills/animate/SKILL.md). Use Input, Label and Textarea for fields and native selects for optional roles and offtake status. Dialog, Progress, Badge, offering cards and marketplace tables remain only in the internal legacy preview. Custom brand, image, video, and page-section components compose these primitives and semantic HTML.

Keep focus visible. Sheets and dialogs trap focus, close with Escape, and return focus to their trigger. Preserve reduced-motion behavior and video-to-still loading. Check 320px, 393px, tablet/laptop, and wide desktop layouts, plus keyboard navigation, selection, input errors, and anchors before changing shared tokens.

## Public site

`app/marketing.css` scopes the five-page public composition so archived layouts remain intact. `/our-approach` uses Accordion for FAQs. `/contact` uses React Hook Form for validation and state. Desktop navigation appears at 1200px; narrower widths use a Sheet with the same three links: Our Approach, About and Research. The logo links to Home, and “Get in touch” links directly to Contact. Home and Contact have no navigation underline. Both routes remain in the sitemap. `/gpu-financing` redirects to `/our-approach`. The legacy preview preserves its original UI primitives and interaction styling.
