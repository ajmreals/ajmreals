import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The CRM is private. Those pages also send noindex headers; this stops
      // crawlers requesting them at all.
      disallow: "/admin",
    },
    // Was hard-coded to https://ajmreals.com, which does not resolve — search
    // engines were being pointed at a sitemap on a dead domain.
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
