/**
 * Canonical facts about the business, used for metadata, structured data and
 * the sitemap. Everything here is published to search engines and AI answer
 * engines, so only put confirmed facts in it.
 */

// The live origin. Override with NEXT_PUBLIC_SITE_URL when a custom domain is
// pointed at the app — sitemap, canonicals and OG tags all follow it.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ajmreals.nyc"
).replace(/\/$/, "");

export const site = {
  name: "AJM Reals",
  legalName: "AJM Reals",
  tagline: "Real Estate Video, Drone & Photography",
  description:
    "Cinematic listing films, drone aerials, and photography for real estate agents, developers, and builders across New York, New Jersey, and Connecticut. Monthly retainers or one-off listings from $400.",
  email: "acruz928@gmail.com",
  phone: "+1-347-788-7898",
  instagram: "https://instagram.com/ajmreals",
  founded: "2022",
  // Owner-confirmed service area. Change it here and the hero, portfolio,
  // contact page, share card, structured data and follow-up emails all
  // follow — nothing restates it.
  areaServed: ["New York", "New Jersey", "Connecticut"],
  /** Same list, for places too narrow for full state names. */
  areaServedShort: ["NY", "NJ", "CT"],
  // Google reads this as a rough band, not exact pricing.
  priceRange: "$$",
} as const;
