# Home and About media performance

Verified October 15, 2026. The priority is faster display and playback while retaining the existing film, its resolution, frame rate, timing and approved ending image.

## Delivery changes

- Home keeps the original 6,250,556-byte H.264 video unchanged: 3840 × 2160, 30 fps, 149 frames.
- About adds AV1 and HEVC delivery files. Both retain 2160 × 2160, 60 fps, all 1,500 frames and the complete 25 seconds. The original H.264 file remains the fallback.
- Codec selection checks native playback support and smooth decoding, then prefers the smaller suitable file. A media error tries the next supported codec. Unsupported playback and blocked autoplay retain the still image behavior.
- Full-resolution AVIF posters and ending stills accompany the original WebP fallbacks. The two images no longer compete with video startup: the ending still starts downloading during the last three seconds, or immediately when skipping or falling back. Its decode completes before the 400ms transition; video buffering stops after the transition.
- Narrow phone viewports receive a 1728 × 2160 still. It removes offscreen side pixels from the existing centered cover crop and keeps every vertical source pixel. A conservative phone/aspect-ratio media query preserves the existing visible framing; orientation changes select the appropriate picture automatically. The videos themselves are never cropped or resized.
- Reduced-motion visitors get the ending image directly, including without JavaScript. Data-saving visitors skip video requests. Normal playback starts one codec request rather than fetching every candidate.
- Versioned media URLs use a year of immutable caching. All MP4s retain fast-start metadata and HTTP byte-range delivery. Future asset changes must use new filenames rather than replacing an immutable URL.

## Size and fidelity

Sizes below use decimal MB. The new About files are high-fidelity lossy encodes, not mathematically lossless copies. Originals remain available. There is no denoising, spatial resizing, frame removal, retiming or scene change.

| Video | Bytes | Change | Dimensions / frame rate | Sampled VMAF | Sampled SSIM |
| --- | ---: | ---: | --- | ---: | ---: |
| Home original / active | 6,250,556 | unchanged | 3840 × 2160 / 30 fps | identical video bytes | identical video bytes |
| About H.264 / fallback | 94,037,581 | baseline | 2160 × 2160 / 60 fps | reference | reference |
| About AV1 | 62,267,473 | −33.8% | 2160 × 2160 / 60 fps | 97.25 | 0.9904 |
| About HEVC | 65,028,644 | −30.8% | 2160 × 2160 / 60 fps | 95.89 | 0.9892 |

VMAF uses `vmaf_v0.6.1`, comparing at native resolution every sixth frame across the complete clip; SSIM uses the same 250-frame sampling. Scores compare against the currently deployed H.264, not the much larger original camera/enhancement master. A more aggressive 36.6 MB HEVC encode scored 91.56 and was rejected to retain more detail. See [quality.json](quality.json), [native-pixel frame comparison](quality-crops.png) and [media manifest with hashes](media-manifest.json).

The phone Home poster falls from 439,126 to 170,912 bytes, and About's from 1,414,692 to 631,123 bytes. Combined with deferring the ending still, initial hero-image transfer drops approximately 85% and 67%, respectively. WebP remains available where AVIF is unsupported.

## Measured startup

Local production build, empty browser cache, 390 × 844 viewport, 5 Mbps download and 100ms latency. These are individual controlled Chrome runs, not production field measurements or a physical iPhone benchmark.

| Route / selected video | Poster before → after | First playing event before → after |
| --- | --- | --- |
| Home / unchanged H.264 | 2.40s → 1.03s | 3.15s → 1.89s |
| About / AV1 | 5.80s → 2.44s | 6.18s → 5.19s |
| About / HEVC | 5.80s → 2.44s | 6.18s → 4.13s |

The HEVC run excluded AV1 from the browser's supported codec list to exercise the alternative path. Actual codec selection and timings depend on the browser and network. See [before](network-before.json), [default after](network-after.json), and [HEVC after](network-hevc.json).

## Verification

- `npm test`: 42 passing, including unsupported codecs, decoding capability errors, smooth decoding preference and preserved media dimensions/rates.
- `npm run build -- --webpack`: passes, including TypeScript and all existing routes.
- Production HTTP verifier: 56 checks pass.
- 13 browser scenarios pass: Home and About at desktop and phone sizes; deferred ending images; final-image decode and video request cleanup; reduced motion; data saving; reduced motion without JavaScript; codec failure recovery; all codecs unavailable; blocked autoplay; startup stall; HTTP range and immutable cache headers; phone menu navigation from Home to About and back. No page exceptions. See [browser-checks.json](browser-checks.json) and [http-checks.json](http-checks.json).

The tests exercised Chrome's native AV1, HEVC and H.264 decoding locally. Physical Safari/iPhone performance was not measured.

## Encoding details

Both About outputs read `public/approach-intelligence-square-v2.mp4`, map only its video stream, preserve timestamps and frame rate, use YUV 4:2:0 and place MP4 metadata at the beginning:

```sh
ffmpeg -i public/approach-intelligence-square-v2.mp4 -map 0:v:0 -an -map_metadata -1 \
  -c:v libsvtav1 -preset 6 -crf 26 -svtav1-params lp=4 -g 240 \
  -pix_fmt yuv420p -movflags +faststart about-av1-v1.mp4

ffmpeg -i public/approach-intelligence-square-v2.mp4 -map 0:v:0 -an -map_metadata -1 \
  -c:v libx265 -preset medium -crf 20 \
  -x265-params pools=4:frame-threads=2:log-level=error:keyint=240 -tag:v hvc1 \
  -pix_fmt yuv420p -movflags +faststart about-hevc-v1.mp4
```

AVIF stills use Sharp, quality 75, effort 6 and 4:4:4 chroma. Full-width images keep their original dimensions; phone stills take the centered 1728-pixel strip at full 2160-pixel height. Existing WebP files remain unmodified.

References: [FFmpeg MP4 fast-start](https://ffmpeg.org/ffmpeg-formats.html#mov_002c-mp4_002c-ismv), [native codec support checks](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canPlayType).
