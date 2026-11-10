"""
Instagram profile picture for AJM Reals — slanted lettering, green on black.

Three constraints drive every decision here, and none of them apply to a
wordmark on a page:

  1. Instagram masks the square to a CIRCLE. Anything near a corner is cut,
     so the ink has to sit inside a centred safe circle, not a safe rectangle.
  2. It renders at about 40px in a feed and 110px on a profile. The full
     wordmark is illegible at both, so the avatar is a monogram.
  3. It is uploaded square. 1080 is the size Instagram stops downscaling at.

Slant is a real italic cut rather than a skew transform where possible: a
skew leaves the verticals at full weight while the curves thin out, which
shows up as a wobble along the stroke at large sizes. SKEW is kept as a knob
for pushing the true italic a little further.
"""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

FONT_DIR = "/usr/share/fonts/opentype/inter"
INK = "#2A9D8F"
PAPER = "#0A0A0A"

BOX = 1080                 # upload size
SAFE = 0.72                # share of the box the circle crop reliably keeps

_cache = {}


def _font(style):
    if style not in _cache:
        _cache[style] = TTFont(f"{FONT_DIR}/{style}.otf")
    return _cache[style]


def run(text, size, style="InterDisplay-BoldItalic", tracking=0.0, skew=0.0):
    """Outline a line of text. skew is extra slant in degrees, on top of the cut."""
    import math
    font = _font(style)
    gs, cmap = font.getGlyphSet(), font.getBestCmap()
    upem = font["head"].unitsPerEm
    cap = getattr(font["OS/2"], "sCapHeight", None) or upem * 0.72
    scale = size / cap
    tan = math.tan(math.radians(skew))

    parts, x = [], 0.0
    xmin, xmax, ymin, ymax = 1e9, -1e9, 1e9, -1e9
    for ch in text:
        if ch == " ":
            x += upem * 0.26 + tracking * upem
            continue
        g = cmap[ord(ch)]
        bp = BoundsPen(gs)
        gs[g].draw(bp)
        if bp.bounds:
            x0, y0, x1, y1 = bp.bounds
            # Skew shifts the top of a glyph right, so widen the box for it.
            xmin = min(xmin, x + x0 + min(0, tan * y0), x + x0 + min(0, tan * y1))
            xmax = max(xmax, x + x1 + max(0, tan * y0), x + x1 + max(0, tan * y1))
            ymin, ymax = min(ymin, y0), max(ymax, y1)
        pen = SVGPathPen(gs)
        gs[g].draw(pen)
        parts.append(f'<path d="{pen.getCommands()}" '
                     f'transform="translate({x:.2f} 0)"/>')
        x += font["hmtx"][g][0] + tracking * upem

    w, h = (xmax - xmin) * scale, (ymax - ymin) * scale
    shear = f" matrix(1 0 {-tan:.5f} 1 0 0)" if skew else ""
    body = (f'<g transform="translate({-xmin * scale:.3f} {ymax * scale:.3f}) '
            f'scale({scale:.6f} {-scale:.6f}){shear}">' + "".join(parts) + "</g>")
    return body, w, h


def avatar(layout, out, label):
    """Compose one square avatar, fitting `layout` inside the circle-safe area."""
    inner = BOX * SAFE
    body, w, h = layout(inner)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BOX} {BOX}" '
        f'width="{BOX}" height="{BOX}" role="img" aria-label="{label}">'
        f'<rect width="{BOX}" height="{BOX}" fill="{PAPER}"/>'
        f'<g fill="{INK}" transform="translate({(BOX - w) / 2:.2f} '
        f'{(BOX - h) / 2:.2f})">{body}</g></svg>'
    )


def fit(text, style, tracking, skew, target_w):
    """Size text so it spans target_w, measuring rather than guessing."""
    _, w0, _ = run(text, 100, style, tracking, skew)
    return run(text, 100 * target_w / w0, style, tracking, skew)


OUT = sys.argv[1] if len(sys.argv) > 1 else "."


def write(path, s):
    open(path, "w").write(s)
    print("wrote", path)


# 1 — AJM, true italic. The default: biggest letterforms that still clear the
#     circle, so it survives being shown at 40px in a feed.
write(f"{OUT}/ig-1-ajm-italic.svg", avatar(
    lambda inner: fit("AJM", "InterDisplay-BoldItalic", -0.01, 0, inner),
    None, "AJM Reals"))

# 2 — AJM pushed a further 6° past the italic, for a faster, more motion-ish
#     slant. Same letterforms, more rake.
write(f"{OUT}/ig-2-ajm-more-slant.svg", avatar(
    lambda inner: fit("AJM", "InterDisplay-BoldItalic", -0.01, 6, inner),
    None, "AJM Reals"))

# 3 — AJM over REALS. Two lines, so each is smaller; readable on a profile
#     page, not in a feed.
def stacked(inner):
    top, tw, th = fit("AJM", "InterDisplay-BoldItalic", -0.01, 0, inner)
    sub, sw, sh = fit("REALS", "InterDisplay-SemiBoldItalic", 0.14,
                      0, inner * 0.80)
    gap = th * 0.20
    body = (f"{top}"
            f'<g transform="translate({(tw - sw) / 2:.2f} {th + gap:.2f})">'
            f"{sub}</g>")
    return body, max(tw, sw), th + gap + sh


write(f"{OUT}/ig-3-ajm-over-reals.svg", avatar(stacked, None, "AJM Reals"))

# 4 — A single letter. Holds at any size an app will ever render it.
write(f"{OUT}/ig-4-a-italic.svg", avatar(
    lambda inner: fit("A", "InterDisplay-BoldItalic", 0, 0, inner * 0.62),
    None, "AJM Reals"))
