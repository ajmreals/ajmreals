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
  category: "Video" | "Drone" | "Photography" | "Agent Brand Film";
  /** Property type, for the portfolio filters. */
  type: "Real Estate" | "Construction";
  /** Leave out for landscape. "9 / 16" for vertical clips. */
  aspect?: "9 / 16";
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
  {
    // Not a listing: a launch film for two agents starting a team at Compass.
    vimeoId: "1244819050",
    title: "Daniel & Brianna, Compass",
    location: "Rockaway, Queens",
    category: "Agent Brand Film",
    type: "Real Estate",
    aspect: "9 / 16",
  },
  {
    vimeoId: "1244818763",
    title: "Reception at Woodbury Manor",
    label: "Wedding / Long Island",
    aspect: "9 / 16",
  },
];

/**
 * Work outside real estate. Kept apart from `work` on purpose: the Featured
 * Work section and the portfolio are pitched at agents, so these only show
 * in the home page's "Not in real estate?" section. At most three are shown.
 */
export type OtherWorkItem = {
  vimeoId: string;
  title: string;
  /** Short label shown above the title, e.g. "Nightlife / Event". */
  label: string;
  /** "9 / 16" for vertical clips, "16 / 9" for landscape. */
  aspect: "9 / 16" | "16 / 9";
};

export const otherWork: OtherWorkItem[] = [
  {
    vimeoId: "1244818638",
    title: "Social Raid at Aura",
    label: "Nightlife / Event",
    aspect: "9 / 16",
  },
  {
    vimeoId: "1244818763",
    title: "Reception at Woodbury Manor",
    label: "Wedding / Long Island",
    aspect: "9 / 16",
  },
];
