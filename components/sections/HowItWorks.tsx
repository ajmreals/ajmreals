import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

const steps = [
  {
    number: "01",
    title: "Discovery call",
    description: "Align on listings, brand, and goals. We map out what you need and when.",
  },
  {
    number: "02",
    title: "Content planning",
    description: "Monthly shoot schedule and a content calendar built around your pipeline.",
  },
  {
    number: "03",
    title: "Shoot & deliver",
    description: "Captured, edited, and in your hands on time — every month, no chasing.",
  },
  {
    number: "04",
    title: "Review & renew",
    description: "We review results, refine the approach, and lock in the next term together.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 md:py-40 bg-[#2A2A2A] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-16 text-center">
          <SectionHeader label="Process" title="How it works." centered />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 0.1}>
              <div>
                <p className="font-heading font-bold text-5xl text-[#2D5A3D] tracking-tight leading-none mb-4">
