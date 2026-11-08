import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import VimeoEmbed from "@/components/VimeoEmbed";
import { otherWork } from "@/lib/work";

// Deliberately low on the page and deliberately small. The site is pitched at
// real estate agents on purpose — that focus is what makes it persuasive. This
// is an escape hatch for the non-agent who found us anyway, not a second pitch.
// A few pieces of proof, at most three; it is not a second portfolio.
const sectors = [
  "Weddings",
  "Nightlife & events",
  "Law firms",
  "Gyms & studios",
  "Restaurants",
  "Medspas & clinics",
];

export default function OtherBusinesses() {
  const proof = otherWork.slice(0, 3);

  return (
    <section className="py-20 md:py-24 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
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

            {proof.length > 0 && (
              // Side by side even on phones: stacked, tall clips would run on
              // for several screens.
              <div
                className={`order-first lg:order-none grid gap-4 md:gap-6 w-full mx-auto lg:mx-0 shrink-0 ${
                  proof.length === 1
                    ? "grid-cols-1 max-w-[260px]"
                    : proof.length === 2
                      ? "grid-cols-2 max-w-[540px]"
                      : "grid-cols-3 max-w-[720px]"
                }`}
              >
                {proof.map((item) => (
                  <figure key={item.vimeoId}>
                    <VimeoEmbed
                      vimeoId={item.vimeoId}
                      title={item.title}
                      aspect={item.aspect}
                    />
                    <figcaption className="mt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent mb-1.5">
                        {item.label}
                      </p>
                      <p className="font-heading font-semibold text-[#F5F5F5] text-sm md:text-base leading-tight">
                        {item.title}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
