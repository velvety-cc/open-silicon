# OpenSilicon — GPU infrastructure financing

OpenSilicon focuses on financing GPU deployments backed by contracted compute demand. This Next.js website serves operators, compute buyers, and brokers or advisors bringing real projects for discussion.

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

The Contact form submits directly from the browser to Formcarry's **OpenSilicon Website Inquiry** form (`Z5g0C_SSqMR`). Its public endpoint is `https://formcarry.com/s/Z5g0C_SSqMR`, configured in `lib/financing.ts`. Visitors choose **Providing capital** (LPs and capital providers) or **Seeking capital** (operators, offtakers, AIDCs and NeoClouds), then enter their name and email. Company and a short message are optional. There are five visible fields; detailed project questions are left for a follow-up conversation.

No email credentials or environment variables are required for submission. Formcarry controls receiving notifications in its dashboard. Success requires a successful HTTP response and Formcarry's JSON acknowledgement (`code: 200`, `status: "success"`). The previous `/api/financing` backend proxy is removed, as [Formcarry recommends browser submission](https://formcarry.com/llms.txt) to preserve per-visitor IP rate limiting. See [enquiry setup](docs/financing-setup.md).

## Research publication

Markdown sources live in `content/research/`. Articles are private by default. Only `status: published` can publish an article; `example: true` always excludes it. The two existing examples are explicitly drafts.

Published articles require `title`, `description`, quoted `date` (`YYYY-MM-DD`), `category`, `author`, `cover`, `coverAlt`, a specific `takeaway`, a nonempty `sources` array with `title` and `url`, and a complete article body with sections. Invalid published content fails the build. Sources, author, date, the takeaway and a Contact CTA appear on the article page.

One filtered collection drives the index, article lookup, static parameters, related reading and sitemap. Drafts are never emitted to these surfaces and their direct URLs return 404. Publishing requires editorial approval followed by a rebuild. Do not publish examples by removing their label.

## Metadata and confirmed domain

No public domain has been confirmed. `SITE_URL` is unset by default. Titles, descriptions and Open Graph text follow the public brand copy; canonical, Open Graph URLs, image URLs and sitemap URLs are omitted until a confirmed HTTPS origin is supplied. Previews and unconfigured sites are excluded from indexing. After setting `SITE_URL`, rebuild to generate canonical, sharing image and sitemap URLs. Never derive these from request headers.

## Validation

```bash
npm test
npm run build -- --webpack
npm run lint
npm run start -- --hostname 127.0.0.1 --port 3001
node scripts/verify-site.mjs http://127.0.0.1:3001 production
node scripts/verify-site.mjs http://127.0.0.1:3000 development
```

The HTTP verifier checks the Formcarry connection without submitting. Unit tests stub provider responses and do not create real submissions. Live browser submissions require explicit authorization and clearly marked test data.

See the [delivery and launch checklist](docs/redesign/handover.md), [reusable business copy](docs/redesign/core-copy.md), and screenshots in `docs/redesign/screenshots/`.

This revision is delivered as code and local preview. No production deployment, article publication or external marketing publication is included.
