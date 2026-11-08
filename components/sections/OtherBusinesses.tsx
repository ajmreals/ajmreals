import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import VimeoEmbed from "@/components/VimeoEmbed";
import { otherWork } from "@/lib/work";

// Deliberately low on the page and deliberately small. The site is pitched at
// real estate agents on purpose — that focus is what makes it persuasive. This
// is an escape hatch for the non-agent who found us anyway, not a second pitch.
// One piece of proof is enough here; it is not a second portfolio.
const sectors = [
  "Nightlife & events",
  "Law firms",
  "Gyms & studios",
  "Restaurants",
  "Medspas & clinics",
];

export default function OtherBusinesses() {
  const proof = otherWork[0];

  return (
    <section className="py-20 md:py-24 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="max-w-xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-3">
                Not in real estate?
              </p>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold tracking-tight text-[#F5F5F5] mb-4">
                We shoot for other businesses too.
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                {sectors.map((sector) => (
                  <span key={sector} className="text-[#888] text-sm">
                    {sector}
                  </span>
                ))}
              </div>
              <Link
                href="/contact"
                className="inline-block text-center text-sm text-[#888] border border-[#222] px-6 py-3 rounded hover:border-[#F5F5F5] hover:text-[#F5F5F5] transition-all"
              >
                Tell us about your project
              </Link>
            </div>

            {proof && (
              <figure className="w-full max-w-[260px] mx-auto md:mx-0 shrink-0">
                <VimeoEmbed
                  vimeoId={proof.vimeoId}
                  title={proof.title}
                  aspect={proof.aspect}
                />
                <figcaption className="mt-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent mb-1.5">
                    {proof.label}
                  </p>
                  <p className="font-heading font-semibold text-[#F5F5F5] leading-tight">
                    {proof.title}
                  </p>
                </figcaption>
              </figure>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
