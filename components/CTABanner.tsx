import Link from "next/link";
import FadeIn from "./FadeIn";

export default function CTABanner() {
  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A] border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-6">
            Get started
          </p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#F5F5F5] mb-4">
            Ready to get started?
          </h2>
          <p className="text-[#888] text-lg mb-10">
            Book a free 20-minute discovery call.
          </p>
          {/* TODO: Replace href with Calendly link when available */}
          <Link
            href="/contact"
            className="inline-block border border-[#F5F5F5] text-[#F5F5F5] px-8 py-3.5 rounded text-sm hover:bg-[#F5F5F5] hover:text-[#0A0A0A] transition-all"
          >
            Book a call
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
