# Marketplace visual assets

- Anthropic mark: inline navigation SVG from https://www.anthropic.com/, viewBox `0 0 35 24`. Original path geometry preserved; default black currentColor.
- Mistral icon: inline navigation SVG from https://mistral.ai/brand/, viewBox `0 0 21 15`. Original paths and brand colors preserved. Official brand download endpoint returned 403, so the site's own SVG is used instead.
- Assets live in `public/logos/` and are displayed alongside accessible company names. The marketplace still labels all compute-user relationships as hypothetical.
- Geographic visualization: static, zoomed orthographic regional maps in `public/maps/`. No WebGL, animation, pointer controls, or runtime coordinate formatting.
- Boundary data: Natural Earth (public domain), https://www.naturalearthdata.com/about/terms-of-use/.
- Country source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson
- State source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_1_states_provinces.geojson
- Rebuild using `python3 scripts/generate-region-maps.py countries.geojson states.geojson` after downloading these sources.
- Virginia and Oregon show state boundaries; Sweden shows the country and its Scandinavian context. Point textures, a highlighted region, one purple location marker, and edge masking preserve the globe-inspired visual direction in a compact card corner.
- Demo location markers: Ashburn/Virginia (39.04, -77.49), Luleå (65.58, 22.15), Portland/Oregon (45.52, -122.68). These indicate example regions, not verified facility addresses.
- Selection stores only an offering ID and resolves current offering data on render, avoiding stale selected objects after development hot reloads.

## GPU system references

- H100/H200 family chassis reference: NVIDIA official DGX H100 press asset https://iprsoftwaremedia.com/219/files/20222/nvidia-dgx-h100-system.png, linked from https://nvidianews.nvidia.com/news/nvidia-announces-dgx-h100-systems-worlds-most-advanced-enterprise-ai-infrastructure.
- The H200 example uses the shared DGX H100/H200 family chassis illustration, not a claimed photograph of the financed equipment. NVIDIA's combined family guide: https://docs.nvidia.com/dgx/dgxh100-user-guide/introduction-to-dgxh100.html.
- B200: https://www.nvidia.com/content/dam/en-zz/Solutions/data-center/dgx-b200/dgx-b200-hero-bm-v2-l580-d.jpg from https://www.nvidia.com/en-us/data-center/dgx-b200/.
- Sources are resized and delivered as local WebP, with CSS framing. Model labels and imagery switch with the selected offering. All are marked as system references.
- Regional maps show a wider context after the user's zoom-out request; selected boundaries occupy at most 44% of the map width or 48% of its height before CSS framing.

## White studio hardware illustrations

Current assets `dgx-h100-h200-studio.webp` and `dgx-b200-studio.webp` replace the dark official product photographs. These are AI-rendered product illustrations derived from the corresponding source references, not interactive 3D models or photographs of the financed equipment.

Art direction: preserve recognizable chassis proportions and metal materials; complete assembled server in three-quarter studio view; soft lighting; pure white seamless background; very faint contact shadow; no grid floor, black backdrop, floating components or extra objects. The first transparent-background attempt produced a baked checkerboard and was rejected. A second edit replaced the entire background with pure white while preserving the product.

Generation paths:
- H100/H200: `/Users/velvety/.codex/generated_images/01a08d60-085f-73f3-bc28-8a091fd56084/exec-e100d562-2a76-4972-8f5b-4ca8233e5bfe.png`
- B200: `/Users/velvety/.codex/generated_images/01a08d60-085f-73f3-bc28-8a091fd56084/exec-62079598-3f0c-4f61-b78d-4eadde65eec2.png`

## Hero partners

User-requested NVIDIA and Kimi marks in white. Vector path geometry is preserved from official assets; fill is monochrome white for the dark hero.
- NVIDIA: `n24-nvidia-logo` symbol from https://www.nvidia.com/en-us/data-center/dgx-b200/.
- Kimi: navigation wordmark SVG from https://www.kimi.com/en/resources/kimi-brand.

## Open Silicon symbol

Vector reconstruction of the user-supplied `ChatGPT Image Sep 10, 2026, 09_50_06 PM.png`: circular silhouette, rounded square counter, and an open diagonal cut. `public/logos/open-silicon-symbol.svg` is the standalone transparent SVG. `components/Brand.tsx` shares the mark across page lockups using `currentColor`. `app/icon.svg` adapts to light/dark browser themes; `app/favicon.ico` contains 16/32/48px fallbacks, and `app/apple-icon.png` is a padded 180px white-background home-screen icon. Raster icons are rendered from the vector, not traced from the supplied bitmap.
