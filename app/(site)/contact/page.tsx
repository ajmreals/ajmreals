import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import ContactForm from "@/components/ContactForm";
import { site, OG_IMAGE } from "@/lib/site";

// Server component so this page can carry its own title and description —
// the form's client-side state lives in <ContactForm /> instead.
export const metadata: Metadata = {
  title: "Contact",
  description: `Book a listing film or a monthly retainer with ${site.name}. Serving ${site.areaServed.join(", ")}. We reply within 24 hours.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact — ${site.name}`,
    description: "Tell us about your project. We reply within 24 hours.",
    url: "/contact",
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <main id="main-content" className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl">
          <FadeIn className="mb-12">
            <SectionHeader
              label="Contact"
              title="Let's talk."
              subtitle="Tell us about your project and we'll get back to you within 24 hours."
            />
          </FadeIn>

          <ContactForm />

          <FadeIn delay={0.2} className="mt-10 pt-10 border-t border-[#222]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="text-[#F5F5F5] text-sm hover:text-[#888] transition-colors"
                >
                  {site.email}
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
                  Phone
                </p>
                <a
                  href="tel:+13477887898"
                  className="text-[#F5F5F5] text-sm hover:text-[#888] transition-colors"
                >
                  347-788-7898
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
                  Instagram
                </p>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5F5F5] text-sm hover:text-[#888] transition-colors"
                >
                  @ajmreals
                </a>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888]">
                  Service area
                </p>
                <p className="text-[#F5F5F5] text-sm">
                  {site.areaServed.join(" · ")}
                </p>
              </div>
              <p className="text-[#888] text-xs">We respond within 24 hours.</p>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
