import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
// Montserrat is bundled from npm rather than fetched with next/font/google.
// That fetch runs at BUILD time and silently killed a Railway deploy when
// Google was briefly unreachable — leaving the site on a stale build. Self-
// hosting removes the dependency, and serves the font from our own domain.
import "@fontsource-variable/montserrat";
import "./globals.css";

export const metadata: Metadata = {
  title: "AJM Reals — Real Estate Video, Drone & Photography",
  description:
    "Monthly content retainers for real estate agents, developers, and builders. Cinematic video, drone aerials, and photography — all in one package.",
  openGraph: {
    title: "AJM Reals — Real Estate Video, Drone & Photography",
    description:
      "Monthly content retainers for real estate agents, developers, and builders. Cinematic video, drone aerials, and photography — all in one package.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
