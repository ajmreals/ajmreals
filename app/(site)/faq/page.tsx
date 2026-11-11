import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import { faq } from "@/lib/faq";
import { SITE_URL, site, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description: `Pricing, turnaround, service area, and how a shoot runs — the questions agents ask ${site.name} before booking a listing film.`,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `FAQ — ${site.name}`,
    description:
      "What the $500 single listing includes, how fast you get the files, and how to prep the property.",
    url: "/faq",
    images: [OG_IMAGE],
  },
};

/**
 * A server component, and the answers use native <details>/<summary> rather
 * than React state. Two reasons: the page needs no JavaScript to work, and
 * every answer is in the HTML on first load, so search engines and AI answer
 * engines can read all of it. A client-side accordion would hide the text
 * behind a click and cost us the thing the page exists for.
 */
export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#faq`,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main id="main-content" className="pt-24 pb-24">
      <script
        type="application/ld+json"
        // Built from lib/faq.ts, not from user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <FadeIn className="mb-12">
            <SectionHeader
              label="FAQ"
              title="Questions, answered."
              subtitle="Pricing, turnaround, and how a shoot actually runs. If yours isn't here, ask — inquiries are answered within 24 hours."
            />
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="border-t border-[#222]">
              {faq.map((item) => (
                <details
                  key={item.question}
                  className="group border-b border-[#222]"
                >
                  <summary className="flex items-start justify-between gap-6 cursor-pointer list-none py-6 text-[#F5F5F5] hover:text-accent transition-colors">
                    <h2 className="font-heading font-semibold text-base md:text-lg leading-snug">
                      {item.question}
                    </h2>
                    {/* Rotates to an ×. Decorative — the summary element
                        already carries the expanded state for screen readers. */}
                    <span
                      aria-hidden="true"
                      className="shrink-0 mt-0.5 text-[#888] transition-transform duration-200 group-open:rotate-45"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>
                  <div className="pb-7 md:pr-10 -mt-1">
                    <p className="text-[#888] text-sm leading-relaxed">
                      {item.answer}
                    </p>
                    {item.link && (
                      <Link
                        href={item.link.href}
                        className="inline-block mt-4 text-sm text-[#F5F5F5] underline underline-offset-4 decoration-[#444] hover:decoration-[#F5F5F5] transition-colors"
                      >
                        {item.link.label} →
                      </Link>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-14 bg-[#141414] border border-[#222] rounded-xl p-8 md:p-10">
              <h2 className="font-heading font-semibold text-xl text-[#F5F5F5] mb-2">
                Still deciding?
              </h2>
              <p className="text-[#888] text-sm leading-relaxed max-w-md mb-6">
                Tell us the address and when the listing goes live. No retainer
                required to start — one listing is enough.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-block bg-accent text-[#06231F] font-medium px-7 py-3.5 rounded text-sm hover:bg-accent-light transition-all"
                >
                  Book a listing
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-block text-sm text-[#888] border border-[#222] px-6 py-3.5 rounded hover:border-[#F5F5F5] hover:text-[#F5F5F5] transition-all"
                >
                  See the work
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
