# Our Approach square video preview

Source: `/Users/velvety/Downloads/hf_20261008_015452_9e04371b-49c8-4924-9cee-a633fe24976c (2).mp4`

The supplied source is 1440 × 1440, 24 fps, approximately 25 seconds. This local preview uses the complete, uninterrupted source, without reframing generation, retiming, or scene edits.

- Video: `/approach-intelligence-square-v1.mp4`, H.264, native 1440 × 1440, 24 fps, silent, fast-start MP4.
- First-frame poster: `/approach-square-first-v1.webp`.
- Ending still: `/approach-square-final-v1.webp`, extracted from the source ending to preserve its composition when playback finishes.

The existing hero component and `object-fit: cover; object-position: center` fit all three assets to the responsive hero at their original aspect ratio. Wider containers crop the top and bottom; taller containers crop the sides. The delivered file retains the complete square frame so each viewport can choose the appropriate crop. This does not generate additional detail or stretch the image.

Only the Our Approach page selects these assets. Earlier versions remain available for comparison.
