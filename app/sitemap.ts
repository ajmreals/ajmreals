import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Previously hard-coded to https://ajmreals.com, which does not resolve —
// every URL listed here was dead. Follows the live origin now.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/portfolio`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/checklist`, lastModified, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}
