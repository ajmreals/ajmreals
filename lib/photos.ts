/**
 * Stills shot by AJM Reals. Shown on the portfolio page beneath the films.
 *
 * Photography is included on every retainer and sold at $275 on a one-off,
 * so the site needs to show some — an unproven line item is worse than no
 * line item. What goes here is held to the standard of the Pre-Shoot
 * Checklist we hand out: counters cleared, blinds open and level, every
 * light on and matched, pets and their things out of frame, cars off the
 * drive. A portfolio shot that breaks the rules we publish argues against
 * us twice.
 *
 * Images live in /public/photography, resized to 1920px wide and stripped
 * of EXIF. Stripping is not only about file size: camera GPS tags would
 * publish a client's home address.
 */
export type Photo = {
  /** Path under /public. */
  src: string;
  /** Describes the image for screen readers and search. Not a caption. */
  alt: string;
  /** Intrinsic dimensions, so Next can reserve the space and avoid reflow. */
  width: number;
  height: number;
};

export const photos: Photo[] = [
  {
    src: "/photography/exterior-two-family.jpg",
    alt: "Front elevation of a two-family home with a gambrel roof, dormer window, and brick stoop, photographed straight on at dusk.",
    width: 1920,
    height: 1280,
  },
  {
    src: "/photography/interior-bedroom.jpg",
    alt: "Bedroom with a made bed, grey walls, a white panelled door and a hardwood floor, lit evenly with no hard shadow.",
    width: 1920,
    height: 1280,
  },
  {
    src: "/photography/exterior-colonial.jpg",
    alt: "Front elevation of a white colonial home with an enclosed porch and mature trees, photographed straight on under overcast light.",
    width: 1920,
    height: 1279,
  },
];
