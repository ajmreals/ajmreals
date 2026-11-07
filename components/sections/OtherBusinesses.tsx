import Link from "next/link";
import FadeIn from "@/components/FadeIn";

// Deliberately low on the page and deliberately small. The site is pitched at
// real estate agents on purpose — that focus is what makes it persuasive. This
// is an escape hatch for the non-agent who found us anyway, not a second pitch.
const sectors = [
  "Law firms",
  "Gyms & studios",
  "Restaurants",
  "Medspas & clinics",
];

export default function OtherBusinesses() {
  return (
    <section className="py-20 md:py-24 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-3">
                Not in real estate?
              </p>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold tracking-tight text-[#F5F5F5] mb-4">
                We shoot for other businesses too.
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {sectors.map((sector) => (
                  <span key={sector} className="text-[#888] text-sm">
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="shrink-0 inline-block text-center text-sm text-[#888] border border-[#222] px-6 py-3 rounded hover:border-[#F5F5F5] hover:text-[#F5F5F5] transition-all"
            >
              Tell us about your project
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
