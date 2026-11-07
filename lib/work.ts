/**
 * AJM Reals' real work. Single source of truth — the home page's Featured
 * Work section and the portfolio page both read from here.
 *
 * Videos are hosted on Vimeo. Each needs its Vimeo privacy set to Public or
 * "Hide from Vimeo"; "Private" / "Only me" will render an error in place of
 * the player.
 */
export type WorkItem = {
  /** Numeric Vimeo id, e.g. 1188836371 from vimeo.com/1188836371 */
  vimeoId: string;
  title: string;
  /** Shown under the title. Omit rather than guess. */
  location?: string;
  category: "Video" | "Drone" | "Photography";
  /** Property type, for the portfolio filters. */
  type: "Real Estate" | "Construction";
};

// Order matters: the first item is the full-width hero on the home page.
export const work: WorkItem[] = [
  {
    vimeoId: "1191399545",
    title: "Mallard Dr",
    location: "Lloyd Harbor, NY",
    category: "Video",
    type: "Real Estate",
  },
  {
    vimeoId: "1188837187",
    title: "Ridgeview",
    location: "White Plains, NY",
    category: "Video",
    type: "Real Estate",
  },
  {
    vimeoId: "1188836371",
    title: "Schaefer St",
    location: "Brooklyn, NY",
    category: "Video",
    type: "Real Estate",
  },
];
