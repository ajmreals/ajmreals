"""
Build the AJM Reals logo as outlined SVG.

Letterforms are converted to vector paths rather than left as <text>. A logo
has to render identically on a machine that has never heard of the font, and
an SVG that references a font by name does not — it silently falls back and
the mark changes shape. Outlines also sidestep webfont licensing entirely.

The viewBox comes from the real outline bounds, not from cap height: the 'l'
in "Reals" rides above the caps and the period sits on the baseline, so an
assumed box clips one and leaves a gap under the other.

Tracking is applied by hand in font units because a logo is kerned optically,
not metrically.
"""
import sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

FONT_DIR = "/usr/share/fonts/opentype/inter"

INK = "#2A9D8F"    # site accent
PAPER = "#0A0A0A"  # site background
MUTED = "#8A8A8A"

_cache = {}


def _font(weight, display):
    key = (weight, display)
    if key not in _cache:
        name = f"Inter{'Display' if display else ''}-{weight}.otf"
        _cache[key] = TTFont(f"{FONT_DIR}/{name}")
    return _cache[key]


def run(text, size, weight="SemiBold", tracking=0.0, display=False):
    """
    Lay out a line of outlined text.

    size     — cap height in px, so weights and lines align optically
    tracking — extra space between glyphs in em (negative tightens)

    Returns (body, width, height). The body is positioned so its ink occupies
    x from 0 and y from 0 downward, ready to drop straight into a viewBox.
    """
    font = _font(weight, display)
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    upem = font["head"].unitsPerEm
    cap = getattr(font["OS/2"], "sCapHeight", None) or upem * 0.72
    scale = size / cap

    parts, x = [], 0.0
    xmin, xmax, ymin, ymax = 1e9, -1e9, 1e9, -1e9

    for ch in text:
        if ch == " ":
            x += upem * 0.26 + tracking * upem
            continue
        gname = cmap[ord(ch)]

        bp = BoundsPen(gs)
        gs[gname].draw(bp)
        if bp.bounds:
            x0, y0, x1, y1 = bp.bounds
            xmin, xmax = min(xmin, x + x0), max(xmax, x + x1)
            ymin, ymax = min(ymin, y0), max(ymax, y1)

        pen = SVGPathPen(gs)
        gs[gname].draw(pen)
        parts.append(f'<path d="{pen.getCommands()}" '
                     f'transform="translate({x:.2f} 0)"/>')
        x += font["hmtx"][gname][0] + tracking * upem

    w = (xmax - xmin) * scale
    h = (ymax - ymin) * scale
    # Font space is y-up and starts at the left side bearing; shift the ink to
    # the origin, then flip into SVG's y-down space.
    body = (
        f'<g transform="translate({-xmin * scale:.3f} {ymax * scale:.3f}) '
        f'scale({scale:.6f} {-scale:.6f})">' + "".join(parts) + "</g>"
    )
    return body, w, h


def svg(body, w, h, pad, bg=None, fill=INK):
    rect = (f'<rect x="{-pad}" y="{-pad}" width="{w + pad * 2:.2f}" '
            f'height="{h + pad * 2:.2f}" fill="{bg}"/>') if bg else ""
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{-pad} {-pad} {w + pad * 2:.2f} {h + pad * 2:.2f}" '
        f'width="{w + pad * 2:.0f}" height="{h + pad * 2:.0f}" '
        f'role="img" aria-label="AJM Reals">'
        f'{rect}<g fill="{fill}">{body}</g></svg>'
    )


def write(path, content):
    with open(path, "w") as f:
        f.write(content)
    print(f"wrote {path}")


OUT = sys.argv[1] if len(sys.argv) > 1 else "."

# ── A. Caps wordmark ────────────────────────────────────────────────────────
body, w, h = run("AJM REALS", 100, "SemiBold", tracking=-0.010, display=True)
write(f"{OUT}/a-caps-on-black.svg", svg(body, w, h, 40, bg=PAPER))
write(f"{OUT}/a-caps.svg", svg(body, w, h, 40))

# ── B. Mixed case with the period, as the site already writes it ────────────
body, w, h = run("AJM Reals.", 100, "Bold", tracking=-0.022, display=True)
write(f"{OUT}/b-mixed-on-black.svg", svg(body, w, h, 40, bg=PAPER))
write(f"{OUT}/b-mixed.svg", svg(body, w, h, 40))

# ── C. Stacked lockup ───────────────────────────────────────────────────────
top, tw, th = run("AJM REALS", 100, "SemiBold", tracking=-0.010, display=True)
sub, sw, sh = run("VIDEO · DRONE · PHOTOGRAPHY", 19, "Medium", tracking=0.30)
gap = 32
dx = (tw - sw) / 2
inner = (f"{top}"
         f'<g transform="translate({dx:.2f} {th + gap:.2f})" '
         f'fill="{MUTED}">{sub}</g>')
write(f"{OUT}/c-stacked-on-black.svg",
      svg(inner, max(tw, sw), th + gap + sh, 46, bg=PAPER))
write(f"{OUT}/c-stacked.svg", svg(inner, max(tw, sw), th + gap + sh, 46))

# ── D. Tiles for avatars and the favicon ────────────────────────────────────
BOX, R = 260, 58


def tile(text, weight, tracking, fill_ratio, label):
    """
    Square tile with the text fitted to a share of the box width.

    Measure at a nominal size, then rescale: guessing a cap height and hoping
    it fits is what pushed "AJM" out of the box the first time.
    """
    _, w0, _ = run(text, 100, weight, tracking, display=True)
    size = 100 * (BOX * fill_ratio) / w0
    body, bw, bh = run(text, size, weight, tracking, display=True)
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BOX} {BOX}" '
        f'width="{BOX}" height="{BOX}" role="img" aria-label="{label}">'
        f'<rect width="{BOX}" height="{BOX}" rx="{R}" fill="{PAPER}"/>'
        f'<g fill="{INK}" transform="translate({(BOX - bw) / 2:.2f} '
        f'{(BOX - bh) / 2:.2f})">{body}</g></svg>'
    ), bw, bh


# "AJM" for avatars — Instagram, Google Business, anywhere over ~96px.
t, mw, mh = tile("AJM", "Bold", -0.012, 0.70, "AJM Reals")
write(f"{OUT}/d-monogram.svg", t)

# A single "A" for the 32px favicon: three letters turn to mush at tab size.
t2, aw, ah = tile("A", "Bold", 0, 0.46, "AJM Reals")
write(f"{OUT}/e-mark-a.svg", t2)

print(f"wordmark {w:.0f}x{h:.0f} | AJM {mw:.0f}x{mh:.0f} | A {aw:.0f}x{ah:.0f} "
      f"| box {BOX}")
