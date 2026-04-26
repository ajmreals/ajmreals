import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
  display: "swap",
});

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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${montserrat.variable}`}>
      <body className="bg-background text-text-primary font-sans antialiased">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
