import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
// Montserrat is bundled from npm rather than fetched with next/font/google.
// That fetch runs at BUILD time and silently killed a Railway deploy when
// Google was briefly unreachable — leaving the site on a stale build. Self-
// hosting removes the dependency, and serves the font from our own domain.
import "@fontsource-variable/montserrat";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Analytics from "@/components/Analytics";
import { SITE_URL, site } from "@/lib/site";

export const metadata: Metadata = {
  // Without this, Open Graph and canonical URLs resolve relative and break
  // when a page is shared.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.tagline}`,
    // Child pages set their own title; this frames it.
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      {/* GA has to be in <head>, not <body>: Search Console verifies ownership
          through the Analytics property and rejects the tag anywhere else. */}
      <head>
        <Analytics />
      </head>
      <body className="bg-background text-text-primary font-sans antialiased">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
