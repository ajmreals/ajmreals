/**
 * Stills shown on the portfolio page beneath the films.
 *
 * These are single frames pulled from AJM Reals' listing films, and the
 * section says so. That distinction is not pedantry: a frame grab is ~1600px
 * with no RAW latitude, and it is not what a client paying $275 for
 * photography receives. Labelling frames as photography samples would set an
 * expectation the deliverable can't meet, which is the kind of thing a client
 * notices exactly once.
 *
 * What they do prove is the eye — framing, staging, how a room is lit — and
 * the drone work, which had no still anywhere on the site before.
 *
 * The bar for anything added here: the Pre-Shoot Checklist we hand out tells
 * agents to clear counters, open every blind, match bulb temperatures, keep
 * pets and their things out of frame, and move cars off the drive. A
 * portfolio shot that breaks the rules we publish argues against us twice —
 * once on its own merits and once by undercutting the checklist. Interiors
 * also need their windows held rather than blown to white, which means
 * bracketing or a bounced flash: a room runs several stops darker than what
 * is outside it.
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

// First runs full width — it's the lead. The rest sit two-up beneath it.
export const photos: Photo[] = [
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
