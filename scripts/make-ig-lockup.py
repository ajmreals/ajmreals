"""
Refine the AJM-over-REALS avatar for small sizes.

The first cut set REALS to 80% of AJM's width. Five letters squeezed into less
space than three means REALS ends up with a much smaller cap height, and it is
the first thing to dissolve when Instagram renders the avatar at 40px.

Justifying REALS to AJM's exact width is the fix: the letters grow, the lockup
reads as one block instead of two, and the edges line up. Weight is raised to
match, since a lighter cut at small size thins out before it blurs.
"""
import sys
sys.path.insert(0, ".")
from make_ig import run, BOX, SAFE, INK, PAPER  # noqa: E402


def avatar(body, w, h, label="AJM Reals"):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {BOX} {BOX}" '
        f'width="{BOX}" height="{BOX}" role="img" aria-label="{label}">'
        f'<rect width="{BOX}" height="{BOX}" fill="{PAPER}"/>'
        f'<g fill="{INK}" transform="translate({(BOX - w) / 2:.2f} '
        f'{(BOX - h) / 2:.2f})">{body}</g></svg>'
    )


def fit(text, style, tracking, skew, target_w):
    _, w0, _ = run(text, 100, style, tracking, skew)
    return run(text, 100 * target_w / w0, style, tracking, skew)


def lockup(sub_style, sub_tracking, gap_ratio, sub_width=1.0, skew=0):
    """AJM over REALS, REALS justified to sub_width of the AJM width."""
    inner = BOX * SAFE
    top, tw, th = fit("AJM", "InterDisplay-BoldItalic", -0.01, skew, inner)
    sub, sw, sh = fit("REALS", sub_style, sub_tracking, skew, tw * sub_width)
    gap = th * gap_ratio
    body = (f"{top}"
            f'<g transform="translate({(tw - sw) / 2:.2f} {th + gap:.2f})">'
            f"{sub}</g>")
    return body, max(tw, sw), th + gap + sh, sh


OUT = sys.argv[1] if len(sys.argv) > 1 else "."
variants = {
    # Justified full width, bold. The letters get as large as the lockup allows.
    "ig-3a-justified": ("InterDisplay-BoldItalic", 0.16, 0.18, 1.00, 0),
    # Same, a touch narrower — a classic lockup inset, slightly smaller letters.
    "ig-3b-inset": ("InterDisplay-BoldItalic", 0.18, 0.18, 0.94, 0),
    # Justified, and raked the extra 6° from variant 2.
    "ig-3c-justified-rake": ("InterDisplay-BoldItalic", 0.16, 0.18, 1.00, 6),
}

for name, (style, tr, gap, width, skew) in variants.items():
    body, w, h, sh = lockup(style, tr, gap, width, skew)
    open(f"{OUT}/{name}.svg", "w").write(avatar(body, w, h))
    print(f"{name}: REALS cap {sh:.0f}px of {BOX} canvas "
          f"({sh / BOX * 100:.1f}%)")
