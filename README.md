# Circuit — Compute Credit

A responsive Next.js landing page for an onchain compute lending protocol connecting crypto capital with AI data center operators.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Research blog

The blog lives at `/research`. Article source files are kept separately in `content/research/`, one `.md` file per article. The filename becomes the article URL, for example `content/research/from-gpus-to-usable-compute.md` appears at `/research/from-gpus-to-usable-compute`.

Each file starts with YAML front matter containing `title`, `description`, a quoted `date` in `YYYY-MM-DD` format, `category`, `author`, `cover`, and `coverAlt`. Set `example: true` to label a sample article; remove it for finished posts. The remaining Markdown is the article body. Articles are listed by date, newest first, and reading time is calculated from the body.

Add or edit Markdown files, then rebuild for production. The two initial posts are example content.

## Notes

- Built with the Next.js App Router and TypeScript.
- The interactive capital model is illustrative only.
- Partner names and deal data are placeholder presentation content and should be legally reviewed before launch.
