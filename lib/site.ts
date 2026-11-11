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
    "Cinematic listing films, drone aerials, and photography for real estate agents, developers, and builders across New York, New Jersey, and Connecticut. Monthly retainers or one-off listings from $500.",
  email: "acruz928@gmail.com",
  /**
   * Envelope sender for outbound mail. Uses the send. subdomain verified in
   * Resend — the root domain carries Microsoft 365's SPF, and a domain may
   * only have one SPF record. Override with LEAD_ALERT_FROM.
   */
  from: "AJM Reals <anthony@send.ajmreals.nyc>",
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

/**
 * The share card, for any page that sets its own `openGraph` block.
 *
 * Next merges the file-based app/opengraph-image.tsx into a page's metadata
 * only for as long as that page leaves `openGraph` alone. The moment a page
 * sets its own title or description there, the inherited image is dropped —
 * silently, with nothing broken on the page itself. The only symptom is that
 * sharing the link anywhere renders a bare URL with no picture, which is
 * exactly the moment it matters most.
 *
 * So every page that sets `openGraph` must also name `images: [OG_IMAGE]`.
 * Four pages — portfolio, checklist, FAQ and contact — had lost it this way.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.tagline}`,
} as const;
