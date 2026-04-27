import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

// TODO: Replace with real client testimonials and photos
const testimonials = [
  {
    quote:
      "AJM Reals transformed how we present listings. Our properties are selling faster and at higher asking prices since we started the monthly retainer.",
    name: "Sarah M.",
    role: "Realtor",
    company: "Compass NYC",
    initials: "SM",
    rating: 5,
  },
  {
    quote:
      "The drone footage alone is worth every penny. Buyers comment on the aerials constantly — it sets our listings apart on Zillow and StreetEasy.",
    name: "James T.",
    role: "Principal Broker",
    company: "Corcoran Group",
    initials: "JT",
    rating: 5,
  },
  {
    quote:
      "No one understands construction timelines and developer needs like AJM. Consistent, on time, and cinematic every single shoot.",
    name: "Marco R.",
    role: "Development Director",
    company: "Urban Edge Builders",
    initials: "MR",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-28 md:py-40 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-16 text-center">
          <SectionHeader
            label="Client results"
            title="What our clients say."
            subtitle="Real feedback from agents, brokers, and developers on monthly retainers."
            centered
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="bg-[#141414] border border-[#222] rounded-xl p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col gap-6 h-full">
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <svg
                      key={j}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#2A9D8F"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[#888] text-sm leading-relaxed flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#222]">
                  {/* TODO: Replace initials avatar with real client photo */}
                  <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0">
                    <span className="font-mono text-[11px] text-accent">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-sm font-heading font-semibold text-[#F5F5F5]">{t.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888]">
                      {t.role} · {t.company}
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
