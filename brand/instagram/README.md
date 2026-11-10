# Instagram profile picture

Upload the **1080 PNG**. Instagram re-encodes anything larger and rejects SVG;
320 is its floor, kept here only as a fallback.

**Currently chosen: `ig-3a-justified-1080.png`.**

| Variant | File | Slant |
| --- | --- | --- |
| **3A · AJM over REALS, justified** | **`ig-3a-justified-1080.png`** | true italic, about 10° |
| 3B · same, inset to 94% | `ig-3b-inset-1080.png` | true italic |
| 3C · justified, extra rake | `ig-3c-justified-rake-1080.png` | about 16° |
| 3 · the first cut, REALS at 80% | `ig-3-ajm-over-reals-1080.png` | true italic |
| 1 · AJM alone | `ig-1-ajm-italic-1080.png` | true italic |
| 2 · AJM alone, more rake | `ig-2-ajm-more-slant-1080.png` | about 16° |
| 4 · A only | `ig-4-a-italic-1080.png` | true italic |

Regenerate with `python3.13 scripts/make-ig-avatar.py brand/instagram` for 1–4
and `python3.13 scripts/make-ig-lockup.py brand/instagram` for the 3-series,
then re-export the PNGs — the scripts write SVG only.

## Why 3A rather than the first cut of 3

The first version set `REALS` to 80% of the `AJM` width. Five letters in less
space than three means a much smaller cap height, and `REALS` was the first
thing to dissolve at feed size. Justifying it to the full `AJM` width grows the
cap from 11.8% of the canvas to 14.2% — about 20% larger — and the two lines
now align at both edges, so the lockup reads as one block instead of two
stacked words.

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
