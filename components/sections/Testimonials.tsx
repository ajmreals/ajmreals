import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

type Testimonial = {
  quote: string;
  name: string;
  /** Job title, where the client gave one. */
  role?: string;
  company: string;
  initials: string;
  /** Only set where the client actually gave a star rating. */
  rating?: number;
};

// Real, attributable client quotes only — every entry here is published as
// genuine feedback from a named person at a named company. Never seed this
// with examples or placeholders.
const testimonials: Testimonial[] = [
  {
    quote: "Anthony of AJM Reals did an AMAZING JOB — we are so happy.",
    name: "Daniel Belasario",
    company: "Compass Realty",
    initials: "DB",
  },
];

// One quote shouldn't stretch across a three-column grid.
const columns: Record<number, string> = {
  1: "max-w-xl mx-auto",
  2: "md:grid-cols-2 max-w-4xl mx-auto",
};

export default function Testimonials() {
  // Nothing to show yet — render nothing rather than an empty section.
  if (testimonials.length === 0) return null;

  const layout = columns[testimonials.length] ?? "md:grid-cols-3";

  return (
    <section className="py-28 md:py-40 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-16 text-center">
          <SectionHeader
            label="Client results"
            title="What our clients say."
            centered
          />
        </FadeIn>

        <div className={`grid grid-cols-1 gap-6 md:gap-8 ${layout}`}>
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="bg-[#141414] border border-[#222] rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col gap-6 h-full">
                {t.rating && (
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg
                        key={j}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="#2A9D8F"
                        aria-hidden
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                )}

                <blockquote className="text-[#F5F5F5] text-base leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3 pt-4 border-t border-[#222]">
                  <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0">
                    <span className="font-mono text-[11px] text-accent">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-heading font-semibold text-[#F5F5F5]">
                      {t.name}
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888]">
                      {[t.role, t.company].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
