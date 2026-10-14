# Our Approach high-resolution video

Source: `/Users/velvety/Downloads/hf_20261014_054149_80cf7ea7-b45c-4644-a13c-3e9179da6e37.mp4`

The supplied source is 2160 × 2160, 120 fps, with 25 seconds of video. The original HEVC file is approximately 899 MB and remains in its original location.

- Video: `/approach-intelligence-square-v2.mp4`, H.264, 2160 × 2160, 60 fps, 25 seconds, 94,037,581 bytes (approximately 94 MB), silent, fast-start MP4.
- First-frame poster: `/approach-square-first-v2.webp`, extracted at the original 2160 × 2160 dimensions.
- Ending still: `/approach-square-final-v2.webp`, extracted from the source ending at 2160 × 2160.

The web encode preserves the source resolution, complete frame, shot sequence and 25-second playback duration. Frame rate is sampled to 60 fps for web playback; no spatial resizing, scene edits, retiming or generated reframing is applied. Encoding uses H.264 High profile, level 5.2, CRF 20 and YUV 4:2:0. Poster and ending still use WebP quality 95.

The existing HeroVideo component and proportional `object-fit: cover; object-position: center` continue to fit the full square source to each viewport. The ending still uses the same responsive crop as the video. The prior 1440 × 1440 version remains available as a historical asset.
