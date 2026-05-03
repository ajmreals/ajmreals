import Link from "next/link";
import FadeIn from "./FadeIn";

export default function CTABanner() {
  return (
    <section className="py-28 md:py-40 bg-[#1E3D2A] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <FadeIn>
          <p className="font-heading font-bold text-[11px] uppercase tracking-widest text-[#6DBF8A] mb-6">
            Get started
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight text-white mb-4">
            Ready to get started?
          </h2>
          <p className="font-body text-[#BDB5A0] text-lg mb-10">
            Book a free 20-minute discovery call.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#2D5A3D] border border-[#3A7A52] text-white px-8 py-3.5 rounded font-heading font-bold text-sm uppercase tracking-wide hover:bg-[#3A7A52] transition-all"
          >
            Book a call
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
