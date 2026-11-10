# AJM Reals — logo files

Green `#2A9D8F` on black `#0A0A0A`, the site's own accent and background.

Regenerate everything with:

```
python3.13 scripts/make-logo.py public/brand
```

## Which file to use

| Need | File |
| --- | --- |
| Anywhere on the web, any size | `*.svg` |
| Over a photo, a video, or a coloured background | `*-transparent-*.png` |
| Instagram / Google Business avatar | `d-monogram-512.png` |
| Browser tab, app icon | `e-mark-a.svg` |
| Print, large format, a sign | `a-caps-on-black-2400.png`, or the SVG |

## The variants

- **A — `a-caps`** · `AJM REALS`. The plain wordmark. Widest use.
- **B — `b-mixed`** · `AJM Reals.` Keeps the period the checklist PDF already uses.
- **C — `c-stacked`** · the wordmark over `VIDEO · DRONE · PHOTOGRAPHY`. For a
  first impression where nothing else says what the business does — an email
  footer, a slide, the back of a card. Needs roughly 260px of width before the
  descriptor stops being readable; below that use A.
- **D — `d-monogram`** · `AJM` in a rounded tile, for square avatars.
- **E — `e-mark-a`** · a single `A`. Three letters turn to mush at 16px, so the
  favicon gets one.

## Why the letterforms are paths, not text

The SVGs carry outlines, not a `<text>` element with a font name. An SVG that
names a font renders with whatever the viewer happens to have installed, so the
mark silently changes shape on a machine that lacks it — and a logo that is not
the same shape everywhere is not doing its job. Outlines also mean no webfont
licence travels with the file.

A consequence worth knowing: **the words cannot be edited in these files.** To
change the wording, edit `scripts/make-logo.py` and regenerate.

## About the typeface

Drawn in **Inter**, not Helvetica Neue.

Helvetica Neue is licensed, and the usual desktop licence does not grant the
right to build a logo from it and distribute that logo — which is exactly what
a business mark does, on every invoice, sign and listing. Inter is a neo-grotesque
cut in the same tradition, open-licensed (SIL OFL), and close enough through the
letters this wordmark actually uses that the difference is invisible at any size
it will be seen. It removes a licensing question that would otherwise sit under
the brand permanently.

If the real Helvetica Neue is ever wanted, buying a licence that covers logo use
and regenerating from the same script is a ten-minute job — the layout, tracking
and colours are all in there.
