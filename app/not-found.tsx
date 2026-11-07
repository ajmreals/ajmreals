import type { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

// The root layout holds no chrome — NavBar and Footer live in the (site)
// group — but an unmatched URL never reaches that group, so this page brings
// its own. Without it a bad link landed on Next's bare default error screen
// with no way back into the site.
// No robots field: Next already emits noindex on a not-found page, and
// setting it here produced a duplicate meta tag.
export const metadata: Metadata = {
  title: "Page not found",
};

const routes = [
  { href: "/portfolio", label: "Our work", hint: "Recent listing films" },
  { href: "/#packages", label: "Packages", hint: "Retainers and one-off shoots" },
  { href: "/checklist", label: "Free checklist", hint: "Prep guide for agents" },
  { href: "/contact", label: "Contact", hint: "Reply within 24 hours" },
];

export default function NotFound() {
  return (
    <>
      <NavBar />
      <main id="main-content" className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-4">
              404
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-[#F5F5F5] mb-4">
              This page doesn&apos;t exist.
            </h1>
            <p className="text-[#888] leading-relaxed mb-12">
              The link may be out of date, or the address slightly off.
              Here&apos;s where everything lives.
            </p>

            <div className="flex flex-col gap-px bg-[#222] border border-[#222] rounded-xl overflow-hidden">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="bg-[#141414] hover:bg-[#181818] transition-colors px-6 py-5 flex items-center justify-between gap-4 group"
                >
                  <div>
                    <p className="text-[#F5F5F5] font-medium">{route.label}</p>
                    <p className="text-[#888] text-sm mt-0.5">{route.hint}</p>
                  </div>
                  <span
                    aria-hidden
                    className="text-[#888] group-hover:text-accent transition-colors shrink-0"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>

            <p className="text-[#888] text-sm mt-10">
              Looking for something specific?{" "}
              <Link
                href="/contact"
                className="text-[#F5F5F5] underline underline-offset-4 hover:no-underline"
              >
                Ask us.
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
