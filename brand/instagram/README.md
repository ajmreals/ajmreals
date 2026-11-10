# Instagram profile picture

Upload the **1080 PNG**. Instagram re-encodes anything larger and rejects SVG;
320 is its floor, kept here only as a fallback.

| Variant | File | Slant |
| --- | --- | --- |
| 1 · AJM | `ig-1-ajm-italic-1080.png` | true italic, about 10° |
| 2 · AJM, more rake | `ig-2-ajm-more-slant-1080.png` | about 16° |
| 3 · AJM over REALS | `ig-3-ajm-over-reals-1080.png` | true italic |
| 4 · A only | `ig-4-a-italic-1080.png` | true italic |

Regenerate with `python3.13 scripts/make-ig-avatar.py brand/instagram`, then
re-export the PNGs — the script writes SVG only.

## What the design is working around

**It is cropped to a circle.** Not a rounded square — a circle. The lettering
sits inside a centred safe circle at 72% of the canvas, so nothing clips. This
is why the avatar is a monogram and not the full wordmark: a square-safe
layout loses its corners.

**It is shown at about 40px in a feed and 110px on a profile.** `AJM REALS`
spelled out is an illegible smear at either. Variant 3 keeps `REALS` but it
stops being readable below roughly 56px — fine if the profile page is what
matters, not if the feed is.

**It is uploaded square.** 1080 × 1080 is where Instagram stops downscaling.

## On the slant

Variants use Inter's real italic cut rather than a skew transform. Skewing a
roman leaves the verticals at full weight while the curves thin, which reads
as a wobble along the stroke once it is large. Variant 2 takes the true italic
and adds 6° on top, for rake without that artefact.
