import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import PackageCard from "@/components/PackageCard";

const packages = [
  {
    name: "Starter",
    price: "$1,500/mo",
    term: "3-month minimum",
    videos: "2/mo",
    shootDays: "1/mo",
    photos: "5 edited",
    drone: false,
    socialCuts: false,
    revisions: "1 round",
    delivery: "10 days",
    extras: [],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$3,000/mo",
    term: "6-month minimum",
    videos: "5/mo",
    shootDays: "2/mo",
    photos: "15 edited",
    drone: true,
    socialCuts: true,
    revisions: "2 rounds",
    delivery: "7 days",
    extras: ["Content calendar"],
    highlighted: true,
  },
  {
    name: "Partner",
    price: "$5,500/mo",
    term: "12-month",
    videos: "10/mo",
    shootDays: "4/mo",
    photos: "30+ edited",
    drone: true,
    socialCuts: true,
    revisions: "Unlimited",
    delivery: "5 days",
    extras: ["Quarterly strategy session", "Usage rights"],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="packages" className="py-28 md:py-40 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-16">
          <SectionHeader
            label="Packages"
            title="Simple, predictable pricing."
            subtitle="Monthly retainers for agents, developers, and builders who need consistent content — without the headache of one-off bookings."
            centered
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
          {packages.map((pkg, i) => (
            <FadeIn key={pkg.name} delay={i * 0.1}>
              <PackageCard {...pkg} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3} className="mt-8 text-center">
          <p className="text-[#888] text-sm">
            Need something custom?{" "}
            <a
              href="/contact"
              className="text-[#F5F5F5] underline underline-offset-4 hover:no-underline"
            >
              {"Let's talk."}
            </a>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
