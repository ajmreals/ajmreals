import Link from "next/link";
import FadeIn from "@/components/FadeIn";

export default function ChecklistBanner() {
  return (
    <section className="py-28 md:py-40 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-xl bg-[#141414] border border-[#222] shadow-card p-10 md:p-14">
            {/* Ambient teal glow */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 85% 50%, rgba(42,157,143,0.10), transparent 70%)",
              }}
            />

            <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-14 md:items-center">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent mb-4">
                  Free download
                </p>
                <h2 className="text-3xl md:text-4xl font-heading font-semibold tracking-tight text-[#F5F5F5] mb-4">
                  The Pre-Shoot Checklist.
                </h2>
                <p className="text-[#888] leading-relaxed max-w-xl">
                  Two pages covering exactly what to prep at 48 hours, 24 hours,
                  and the morning of a shoot — plus how to time the light. Hand
                  it to your seller and the whole day runs faster.
                </p>
              </div>

              <Link
                href="/checklist"
                className="shrink-0 inline-block text-center bg-accent text-white px-7 py-3.5 rounded text-sm hover:bg-accent-light transition-all"
              >
                Get the checklist
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
