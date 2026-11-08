import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import PackageCard from "@/components/PackageCard";
import { site } from "@/lib/site";

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
            subtitle="Monthly retainers for agents, developers, and builders who need content every month — or a single listing when that's all you need."
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

        {/* One-off booking — the entry point for agents not ready for a
            retainer, and where the add-ons get sold. */}
        <FadeIn delay={0.3} className="mt-6 md:mt-8">
          <div className="bg-[#141414] border border-[#222] rounded-xl shadow-card p-8 md:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 lg:items-center">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-3">
                  Single listing
                </p>
                <div className="flex items-baseline gap-3 mb-3">
                  <p className="text-3xl font-heading font-bold text-[#F5F5F5]">
                    $400
                  </p>
                  <p className="text-[#888] text-sm">one-off</p>
                </div>
                <p className="text-[#888] text-sm leading-relaxed max-w-md">
                  One cinematic walkthrough video of your listing, for homes up
                  to 1,000 sq ft. Add $75 per additional 500 sq ft. No
                  retainer, no minimum term.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {[
                    { label: "Photos", price: "+$275" },
                    { label: "2D floor plan", price: "+$50" },
                    { label: "Both", price: "+$300", save: "save $25" },
                  ].map((addon) => (
                    <div
                      key={addon.label}
                      className={`flex items-baseline gap-2 rounded-lg border px-4 py-2.5 ${
                        addon.save
                          ? "border-accent/40 bg-accent/5"
                          : "border-[#222]"
                      }`}
                    >
                      <span className="text-[#F5F5F5] text-sm">
                        {addon.label}
                      </span>
                      <span className="font-mono text-sm text-accent">
                        {addon.price}
                      </span>
                      {addon.save && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888]">
                          {addon.save}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="shrink-0 inline-block text-center bg-accent text-[#06231F] font-medium px-7 py-3.5 rounded text-sm hover:bg-accent-light transition-all"
              >
                Book a listing
              </Link>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.4} className="mt-8 text-center">
          <p className="text-[#888] text-sm">
            {/* Out-of-state belongs here, not in the service area: it's a
                quoted exception with travel on top, not a routine offer. */}
            Larger home, outside {site.areaServedShort.join("/")}, or something
            custom?{" "}
            <a
              href="/contact"
              className="text-[#F5F5F5] underline underline-offset-4 hover:no-underline"
            >
              {"Let's talk."}
            </a>{" "}
            <Link
              href="/faq"
              className="text-[#888] underline underline-offset-4 hover:text-[#F5F5F5] hover:no-underline"
            >
              Or read the FAQ.
            </Link>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
