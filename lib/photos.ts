/**
 * Stills shown on the portfolio page beneath the films.
 *
 * Split into two lists on purpose. `photographs` are shot on a stills camera
 * and are what a client paying for photography actually receives.  `frames`
 * are single frames lifted from listing films: ~1600px with no RAW latitude,
 * nothing like the deliverable. Showing the second under the name of the
 * first would set an expectation that breaks on first delivery, so the page
 * labels each for what it is.
 *
 * The bar for anything added here: the Pre-Shoot Checklist we hand out tells
 * agents to clear counters, open every blind, match bulb temperatures, keep
 * pets and their things out of frame, and move cars off the drive. A
 * portfolio shot that breaks the rules we publish argues against us twice —
 * once on its own merits and once by undercutting the checklist.
 *
 * Interiors also need their windows held rather than blown to white, which
 * means bracketing or a bounced flash: a room runs several stops darker than
 * what is outside it. That is the difference between the shots that are here
 * and the ones that aren't.
 *
 * Resize to 1920px wide (never upscale) and strip EXIF before adding
 * anything. Stripping is not about file size: camera GPS tags would publish
 * a client's home address.
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

/** Shot on a stills camera — the photography deliverable itself. */
export const photographs: Photo[] = [
  {
    src: "/photography/photo-living-room.jpg",
    alt: "Staged living room with a grey sofa, black side tables and a pale rug on oak flooring, exposed so the street stays visible through the large black-framed window.",
    width: 1780,
    height: 884,
  },
];

/** Lifted from the listing films. First runs full width as the lead. */
export const frames: Photo[] = [
  {
    src: "/photography/frame-aerial-estate.jpg",
    alt: "Aerial view of a white estate set into a wooded hillside, with terraced lawns and a rear deck, shot from a drone under a clear blue sky.",
    width: 1584,
    height: 900,
  },
  {
    src: "/photography/frame-great-room.jpg",
    alt: "Double-height great room with yellow walls, two wrought-iron chandeliers, a marble-arched fireplace and a pair of striped wing chairs, opening through to the kitchen.",
    width: 1591,
    height: 894,
  },
  {
    src: "/photography/frame-primary-bedroom.jpg",
    alt: "Primary bedroom with an upholstered headboard against a slatted wood wall, a loveseat at the foot of the bed and a patterned rug, lit by recessed ceiling lights.",
    width: 1612,
    height: 885,
  },
];
