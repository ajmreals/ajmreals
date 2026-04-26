import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

const reasons = [
  {
    number: "01",
    title: "All-in-one",
    description:
      "Video, drone, and photography from a single team. One creative direction, one invoice, zero coordination overhead.",
  },
  {
    number: "02",
    title: "Built for real estate",
    description:
      "We understand listings, timelines, and what buyers respond to. Every shot is framed to move property.",
  },
  {
    number: "03",
    title: "Proven results",
    description:
      "An extensive portfolio with measurable client outcomes — more views, more inquiries, faster closes.",
  },
  {
    number: "04",
    title: "Content that sells",
    description:
      "Every deliverable is optimized for MLS, social media, and your site. Not just beautiful — functional.",
  },
];

export default function WhyAJM() {
  return (
    <section className="py-24 md:py-32 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <SectionHeader
              label="Why AJM Reals"
              title="Content built for the way real estate works."
              subtitle="Not every production company understands listings, timelines, and MLS requirements. We do."
            />
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {reasons.map((reason, i) => (
              <FadeIn key={reason.number} delay={i * 0.1}>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-3">
                    {reason.number}
                  </p>
                  <h3 className="text-base font-medium text-[#F5F5F5] mb-2">{reason.title}</h3>
                  <p className="text-[#888] text-sm leading-relaxed">{reason.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
