import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import ChecklistForm from "@/components/ChecklistForm";

export const metadata: Metadata = {
  title: "The Pre-Shoot Checklist — Free Property Prep Guide | AJM Reals",
  description:
    "A free two-page checklist for real estate agents: exactly what to prep at 48 hours, 24 hours, and the morning of a photo or video shoot — plus how to time the light.",
  alternates: { canonical: "https://ajmreals.com/checklist" },
  openGraph: {
    title: "The Pre-Shoot Checklist — Free Property Prep Guide",
    description:
      "What to prep at 48 hours, 24 hours, and the morning of a real estate shoot. Free two-page PDF from AJM Reals.",
    type: "article",
  },
};

const inside = [
  {
    when: "48 hours before",
    what: "Exterior and access — the things that need a day's notice to fix.",
  },
  {
    when: "24 hours before",
    what: "Declutter and depersonalize, room by room, including the one bulb mistake that costs the most in editing.",
  },
  {
    when: "Morning of",
    what: "The final pass the crew wishes every seller made before they arrive.",
  },
  {
    when: "Timing the light",
    what: "Which shots belong in the morning, which belong at golden hour, and why twilight gives you one window.",
  },
];

export default function ChecklistPage() {
  return (
    <main id="main-content" className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — the pitch */}
          <div>
            <FadeIn>
              <SectionHeader
                label="Free guide"
                title="The Pre-Shoot Checklist."
                subtitle="The difference between a listing that photographs well and one that doesn't is almost never the house — it's the ninety minutes of prep before the camera comes out."
              />
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-10 flex flex-col gap-px bg-[#222] border border-[#222] rounded-xl overflow-hidden">
                {inside.map((row) => (
                  <div key={row.when} className="bg-[#141414] p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent mb-2">
                      {row.when}
                    </p>
                    <p className="text-[#888] text-sm leading-relaxed">
                      {row.what}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-8 text-[#888] text-sm leading-relaxed">
                Built from what we actually run into on shoots — the access that
                never got confirmed, the staging that wasn&apos;t finished, the
                four mismatched bulbs that turn a white kitchen green on camera.
                Hand it to your seller and the whole day goes faster.
              </p>
            </FadeIn>
          </div>

          {/* Right — the form */}
          <FadeIn delay={0.15} className="lg:sticky lg:top-28">
            <ChecklistForm />
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
