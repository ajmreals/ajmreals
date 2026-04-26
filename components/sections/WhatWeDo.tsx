import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

const services = [
  {
    label: "01",
    title: "Video Production",
    description:
      "Cinematic property walkthroughs and brand films that hold attention and drive action.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m15 10 4.553-2.276A1 1 0 0 1 21 8.723v6.554a1 1 0 0 1-1.447.894L15 14" />
        <rect x="2" y="6" width="13" height="12" rx="2" />
      </svg>
    ),
  },
  {
    label: "02",
    title: "Drone Aerials",
    description:
      "FAA-compliant aerial coverage that gives every listing a compelling sense of scale and location.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <path d="m4.22 4.22 2.12 2.12M17.66 17.66l2.12 2.12M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
      </svg>
    ),
  },
  {
    label: "03",
    title: "Photography",
    description:
      "Edited stills ready for MLS, social media, and all your marketing collateral — delivered fast.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-24 md:py-32 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-16">
          <SectionHeader
            label="What we do"
            title="One team for every frame."
            subtitle="Video, drone, and photography under one roof — consistent quality, one invoice, zero coordination overhead."
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.label} delay={i * 0.1}>
              <div className="bg-[#141414] border border-[#222] rounded-xl p-8 hover:-translate-y-1 transition-transform duration-300">
                <div className="text-[#888] mb-6">{service.icon}</div>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-3">
                  {service.label}
                </p>
                <h3 className="text-base font-heading font-semibold text-[#F5F5F5] mb-3">{service.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
