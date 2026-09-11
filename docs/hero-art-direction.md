# Open Silicon hero media

- Active video: `public/hero-datacenter-v2.mp4`, derived from the user-supplied `hf_20260911_023615_f891c903-c007-4d6e-b1d0-9d35aa3efae3.mp4`.
- Video: 3840 × 2160, 30 fps, 149 frames, 4.966667 seconds, H.264 / yuv420p, no audio, 6,250,556 bytes.
- Encoding: libx264, CRF 22, fast preset, 10 Mbps maximum bitrate and buffer, MP4 fast-start metadata.
- Initial poster: `public/hero-video-first-v2.webp`, extracted from frame 0 of the delivered video.
- Ending image: `public/hero-datacenter-final.webp`, derived from user-supplied `hf_20260911_023258_2fddc771-4851-41d4-a0a4-e7a35544948a.png`.
- Image delivery: the 7680 × 4320 source is resized to 3840 × 2160 and encoded as WebP quality 92 (737,176 bytes), preserving its framing and colors.
- Initial HTML eagerly loads the first poster. JavaScript starts muted inline playback once, with no loop. The same crop is applied to all media.
- On completion, the preloaded high-resolution photograph is decoded, then fades over the paused video in 400ms. No frame is exposed blank during the handoff.
- Reduced-motion/data-saving preferences, blocked autoplay, media errors or a ten-second startup timeout use the high-resolution photograph. The page remains usable during loading.
- The extracted video final frame remains at `public/hero-video-last.webp` but is no longer displayed.

## Earlier generated exploration (not active)

The built-in imagegen enhancement returned 1672 × 941 pixels. The user subsequently supplied the higher-resolution asset now displayed.

## Final prompt

Use case: precise-object-edit, high-resolution restoration. Edit this exact user-supplied photograph of a glass-front data center at dusk for a full-screen website hero. The user requests a higher-definition version of THIS image. Target output resolution 3840×2160 landscape, or the highest supported native output. Increase fine detail and sharpness of server racks on BOTH upper and lower floors, metal mullions, ceiling pipes, reflections and concrete surfaces, while preserving the exact composition, perspective, building geometry, sky, sunset, terrain, framing, and original subdued blue dusk with warm amber interior lights. Keep the source's natural color grading unchanged. Do not recolor the illumination mint/green or saturate the sky cobalt. Preserve every visible row of server racks especially on the upper floor. No redesign, no new objects, no text or logos, no sharpening halos, no artificial noise. Produce only the enhanced image.

## Compute showcase

- `public/compute-rack.webp`: generated studio product illustration, 1024 × 1536, WebP quality 90.
- Source: `/Users/velvety/.codex/generated_images/01a08d60-085f-73f3-bc28-8a091fd56084/exec-022cd6b2-6360-442f-a720-0c0e0e5a4482.png`.
- Art direction: single graphite GPU server rack in three-quarter view, brushed aluminum trays and detailed perforated panels, tiny white indicator lights, no logos or readable text. Seamless pure white studio floor/background and soft contact shadow. Entire rack visible, portrait composition, realistic soft studio lighting.
- Layout reference: user-supplied Plasma One screenshot. Centered headline and mint pill above the product; four credit parameters arranged on the sides, stacked below the product on mobile.

## Closing image

`public/closing-datacenter.webp` is a companion architectural image for the final contact section above the white footer, 1983 × 793 pixels. Generated source: `/Users/velvety/.codex/generated_images/01a08d60-085f-73f3-bc28-8a091fd56084/exec-950c113b-34ab-4511-bb3d-7200f987a286.png`.

Prompt direction: cinematic extra-wide architectural photograph of a modern AI data center at blue hour, viewed close from outside glass panels. Precisely ordered server racks, warm amber lights, dark steel, concrete, natural blue reflections. Detailed racks on the right two thirds and darker negative space on the left for white CTA text. No people, neon, logos, text, or interfaces.

Active closing image updated to `public/closing-datacenter-v2.webp`, from user-supplied `/Users/velvety/Downloads/ChatGPT Image Sep 10, 2026, 09_11_20 PM.png`. WebP quality 92, original framing and colors preserved. Replaces the generated closing image without changing layout.

Active closing image: `public/closing-datacenter-v3.webp`, from user-supplied `/Users/velvety/Downloads/hf_20260911_041351_a9c1c31d-c945-4d7e-93e2-87d204cefe61.png`. Delivered as WebP quality 92, maximum width 3840, without upscaling or changing framing/colors. Existing section layout retained.
