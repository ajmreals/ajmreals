/**
 * Stills shot by AJM Reals, shown on the portfolio page beneath the films.
 *
 * Empty on purpose. The gallery is wired up and renders nothing while this
 * array is empty, so adding work later means dropping files into
 * /public/photography and adding entries here — no markup to rebuild.
 *
 * The bar for what goes in: the Pre-Shoot Checklist we hand out tells agents
 * to clear counters, open every blind, match bulb temperatures, keep pets and
 * their things out of frame, and move cars off the drive. A portfolio shot
 * that breaks the rules we publish argues against us twice — once on its own
 * merits and once by undercutting the checklist. Interiors also need their
 * windows held, not blown to white; that means bracketing or a bounced flash,
 * since a room runs several stops darker than what's outside it.
 *
 * Resize to 1920px wide and strip EXIF before adding anything. Stripping is
 * not about file size: camera GPS tags would publish a client's home address.
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

export const photos: Photo[] = [];
