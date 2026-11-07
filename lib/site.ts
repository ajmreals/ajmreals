/**
 * Canonical facts about the business, used for metadata, structured data and
 * the sitemap. Everything here is published to search engines and AI answer
 * engines, so only put confirmed facts in it.
 */

// The live origin. Override with NEXT_PUBLIC_SITE_URL when a custom domain is
// pointed at the app — sitemap, canonicals and OG tags all follow it.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ajmreals-production.up.railway.app"
).replace(/\/$/, "");

export const site = {
  name: "AJM Reals",
  legalName: "AJM Reals",
  tagline: "Real Estate Video, Drone & Photography",
  description:
    "Cinematic listing films, drone aerials, and photography for real estate agents, developers, and builders across New York, New Jersey, Connecticut, and Massachusetts. Monthly retainers or one-off listings from $400.",
  email: "acruz928@gmail.com",
  phone: "+1-347-788-7898",
  instagram: "https://instagram.com/ajmreals",
  founded: "2022",
  // Owner-confirmed service area.
  areaServed: ["New York", "New Jersey", "Connecticut", "Massachusetts"],
  // Google reads this as a rough band, not exact pricing.
  priceRange: "$$",
} as const;
