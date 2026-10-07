# Open Silicon — GPU infrastructure financing

Open Silicon focuses on financing GPU deployments backed by contracted compute demand. This Next.js website serves operators, compute buyers, and brokers or advisors bringing real projects for discussion.

## Local preview

```bash
npm install
npm run dev -- --hostname 127.0.0.1
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000). The site uses the existing Geist fonts, purple and white palette, architectural imagery and data center video.

| Page | Route |
| --- | --- |
| Home | `/` |
| Our Approach | `/our-approach` |
| About | `/about` |
| Research | `/research` |
| Contact | `/contact` |

`/gpu-financing` redirects to `/our-approach`. All primary marketing actions use “Discuss a financing opportunity” and link to `/contact`.

## Internal archives

The former homepage is preserved at `/legacy`, with its original layout, copy, marketplace, calculator and investment interactions. Its header, footer and brand are isolated in `components/legacy/`. Obsolete email actions now lead to `/contact`. The former financing page is retained as reference source in `internal/gpu-financing-page.tsx.txt`.

`/legacy`, `/deck`, `/deck.html` and `/open-silicon-deck.html` are available only through a **loopback development server**. Production always returns 404, even on localhost. They are absent from public navigation and sitemap and carry `noindex` headers. `/deck.html` is internally rewritten to `/deck`. The HTML deck source is preserved in `internal/open-silicon-deck.html`, outside `public/`.

Keep the Next server and `proxy.ts` in any eventual deployment. Static export or serving internal source files through an external web server is unsupported.

## Enquiries

The Contact form posts to `/api/financing`; the server uses the existing Resend mechanism. Only name, company and work email are required. Role, GPU model and quantity, location, free-text financing need, timeline, offtake status and description are optional. Offtake is blank initially.

Set `RESEND_API_KEY`, `FINANCING_EMAIL_FROM` and `FINANCING_EMAIL_TO` using confirmed receiving details and a verified sender. No receiving address has been supplied for this revision. Without valid configuration the form displays its unavailable state and the endpoint returns 503. No simulated success or old email fallback is used. See [enquiry setup](docs/financing-setup.md).

## Research publication

Markdown sources live in `content/research/`. Articles are private by default. Only `status: published` can publish an article; `example: true` always excludes it. The two existing examples are explicitly drafts.

Published articles require `title`, `description`, quoted `date` (`YYYY-MM-DD`), `category`, `author`, `cover`, `coverAlt`, a specific `takeaway`, a nonempty `sources` array with `title` and `url`, and a complete article body with sections. Invalid published content fails the build. Sources, author, date, the takeaway and a Contact CTA appear on the article page.

One filtered collection drives the index, article lookup, static parameters, related reading and sitemap. Drafts are never emitted to these surfaces and their direct URLs return 404. Publishing requires editorial approval followed by a rebuild. Do not publish examples by removing their label.

## Metadata and confirmed domain

No public domain has been confirmed. `SITE_URL` is unset by default. Titles, descriptions and Open Graph text describe GPU financing; canonical, Open Graph URLs, image URLs and sitemap URLs are omitted until a confirmed HTTPS origin is supplied. Previews and unconfigured sites are excluded from indexing. After setting `SITE_URL`, rebuild to generate canonical, sharing image and sitemap URLs. Never derive these from request headers.

## Validation

```bash
npm test
npm run build -- --webpack
npm run lint
npm run start -- --hostname 127.0.0.1 --port 3001
node scripts/verify-site.mjs http://127.0.0.1:3001 production
node scripts/verify-site.mjs http://127.0.0.1:3000 development
```

The HTTP verifier only posts a synthetic enquiry when the page explicitly says its receiving service is unconfigured. It never submits to a configured service. Unit tests stub provider responses and do not send email.

See the [delivery and launch checklist](docs/redesign/handover.md), [reusable business copy](docs/redesign/core-copy.md), and screenshots in `docs/redesign/screenshots/`.

This revision is delivered as code and local preview. No production deployment, article publication or external marketing publication is included.
