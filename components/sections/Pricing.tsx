import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import PackageCard from "@/components/PackageCard";
import { site } from "@/lib/site";

/**
 * Things every retainer gets, stated once above the cards instead of as a
 * repeated row inside each.
 *
 * Photos were counted per tier (5/15/30+) until a count on a retainer read
 * as a cap and undersold the shoot. Drone was withheld from Starter as an
 * upsell, which only works once a buyer already wants you — before that it
 * makes the entry tier look incomplete beside competitors who include it.
 *
 * Delivery was a 10/7/5 ladder. Per shoot day the workload is much the same
 * on every tier, so that ladder was throttling Starter to flatter Partner,
 * and it left the cheapest, no-commitment option (a one-off, four days) as
 * the fastest thing on the site. One number everywhere is easier to honour
 * and a better promise than a tier you have to buy your way out of.
 *
 * Three identical rows would have made the ladder look weaker than it is,
 * hence lifting them out: the cards now carry only what actually differs.
 *
 * ── Why Starter is $1,250 and not $1,500 ───────────────────────────────────
 * A retainer has to cost less than buying the same work one listing at a
 * time, or there is no reason on earth to sign a 3-month minimum.
 *
 * One listing à la carte is $500 for the film plus $275 for photos = $775.
 * Against that, a month of each tier:
 *
 *   Starter   2 listings   $1,550 à la carte   →  $1,250  −19%
 *   Growth    5 listings   $3,875 à la carte   →  $3,000  −23%
 *   Partner  10 listings   $7,750 à la carte   →  $5,500  −29%
 *
 * At $1,500 Starter came to $150 MORE than à la carte while also asking for
 * a three-month commitment — an offer that argues against itself. Dropping it
 * to $1,250 fixed the inversion; raising the one-off from $400 to $500 then
 * widened every tier's discount without touching a retainer.
 *
 * Note what this still does not fix: per VIDEO, Starter is $625 against a
 * $500 one-off, and no realistic price makes that comparison favourable,
 * because the retainers bundle photos and the cards lead with video counts.
 * The fully-loaded per-listing figures above are the honest comparison.
 *
 * Any future move to these numbers has to keep that ladder monotonic. Raising
 * a retainer or cutting the one-off without checking the table above is how
 * this breaks again — and the cards now derive the saving they advertise from
 * these constants, so getting it wrong publishes a wrong number rather than
 * just being wrong privately.
 */

/** One-off prices the retainer saving is measured against. */
const ONE_OFF_FILM = 500;
const PHOTO_ADD_ON = 275;
/** What one listing costs booked on its own, film and photos. */
const PER_LISTING = ONE_OFF_FILM + PHOTO_ADD_ON;

const universal = [
  "Edited photography",
  "Drone aerials",
  "Delivery within 4 days",
];

/**
 * `monthly` and `listings` are numbers, not strings, because the cards compute
 * the advertised saving from them. Hand-typing "save $300" is how a price
 * change quietly turns the pricing page into a false claim.
 */
const packages = [
  {
    name: "Starter",
    monthly: 1250,
    // No minimum. The lock was worth less than the clients it cost: nobody
    // signs three months with a supplier they have not worked with, and the
    // tier exists to be a first yes.
    term: "Month to month",
    listings: 2,
    videos: "2/mo",
    shootDays: "1/mo",
    socialCuts: false,
    revisions: "1 round",
    extras: [],
    highlighted: false,
  },
  {
    name: "Growth",
    monthly: 3000,
    term: "6-month minimum",
    listings: 5,
    videos: "5/mo",
    shootDays: "2/mo",
    socialCuts: true,
    revisions: "2 rounds",
    extras: ["Content calendar"],
    highlighted: true,
  },
  {
    name: "Partner",
    monthly: 5500,
    term: "12-month",
    listings: 10,
    videos: "10/mo",
    shootDays: "4/mo",
    socialCuts: true,
    revisions: "Unlimited",
    extras: ["Quarterly strategy session", "Usage rights"],
    highlighted: false,
  },
].map((p) => ({
  ...p,
  price: `$${p.monthly.toLocaleString()}/mo`,
  separately: p.listings * PER_LISTING,
  saving: p.listings * PER_LISTING - p.monthly,
}));

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

        <FadeIn className="-mt-6 mb-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-xl border border-[#222] bg-[#141414] px-6 py-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
              On every retainer
            </p>
            {universal.map((item) => (
              <p
                key={item}
                className="flex items-center gap-2 text-[#F5F5F5] text-sm"
              >
                <span aria-hidden="true" className="text-accent">
                  ✓
                </span>
                {item}
              </p>
            ))}
          </div>
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
                    $500
                  </p>
                  <p className="text-[#888] text-sm">one-off</p>
                </div>
                <p className="text-[#888] text-sm leading-relaxed max-w-md">
                  One cinematic walkthrough video of your listing, for homes up
                  to 1,000 sq ft. Add $75 per additional 500 sq ft. No
                  retainer, no minimum term — and back with you within four
                  days of the shoot.
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
