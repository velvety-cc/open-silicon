# Our Approach final still v2

Generated with the built-in imagegen tool from the selected video's last frame. The source reference is `approach-last-frame-reference-v1.png`, extracted at 25 seconds from the user-selected 4K video. The original output is saved in `public/approach-intelligence-final-v2.png`; the website uses the corresponding high-quality WebP, with no resize or crop during format conversion.

Native generated resolution: 1672 × 941. The 3840 × 2160 size in the prompt was a requested target, not the returned resolution.

Verified on the local preview: the video reaches its natural ending, pauses, and displays the decoded v2 WebP at full opacity with the existing 400ms transition. Desktop and 393px mobile crops remain within the viewport. TypeScript and diff-format checks pass. Screenshots are saved as `our-approach-earth-still-v2-desktop.jpg` and `our-approach-earth-still-v2-mobile.jpg` in the redesign screenshots folder.

## Prompt

Use case: precise-object-edit.
Asset type: ultra-clear photographic final still for a full-screen website video hero.
Input image 1 is the exact final frame of the existing video and is the edit target.
Primary request: faithfully reconstruct this same frame with much clearer, naturally resolved photographic detail. Output a high-resolution landscape image, ideally native 3840 x 2160, 16:9.
Composition invariants: preserve the reference's exact camera angle, Earth's center, apparent diameter, tilt, outer silhouette, crop at the bottom edge, continent positions, day/night boundary, main cloud formations, and empty-space placement. The finished still will replace this video frame, so the composition must align without a noticeable spatial jump. Earth remains the same large partially cropped globe, with North America, Mexico, the Caribbean and the Atlantic in the same positions. The right side remains in deep shadow with the same sparse warm city lights.
Enhance only fidelity: resolve delicate cloud filaments and cloud shadows, clear coastline edges, natural land texture, deep blue ocean tonal detail, a thin soft blue atmospheric rim, and smooth tonal gradients. Remove smeared AI texture, pixelation and compression artifacts. Fine detail must be physically appropriate for this distant orbital viewpoint; no close-up buildings or invented intricate surface grids.
Lighting and palette: preserve the reference's understated sunlight, blue-gray atmosphere, muted natural land colors, dark oceans and near-black space. Retain the day/night contrast. Keep the atmospheric glow subtle and realistic, with no thick neon halo.
Style: exceptionally clear, believable orbital photography, refined natural detail rather than aggressive sharpening. No illustration, painterly texture, synthetic noise, oversaturated colors or oversharpening halos.
Constraints: preserve the exact scene and framing; do not rotate or resize the planet, introduce new weather systems, brighten the dark hemisphere, enlarge city lights, add spacecraft windows, foreground objects, extra planets, decorative stars, lens flares, text, logos, UI or watermarks.
