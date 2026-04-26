import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://ajmreals.com", lastModified: new Date() },
    { url: "https://ajmreals.com/portfolio", lastModified: new Date() },
    { url: "https://ajmreals.com/contact", lastModified: new Date() },
  ];
}
