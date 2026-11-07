import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import VimeoEmbed from "@/components/VimeoEmbed";
import { work } from "@/lib/work";

export default function FeaturedWork() {
  if (work.length === 0) return null;

  // Lead with one full-width piece, the rest two-up beneath it.
  const [lead, ...rest] = work.slice(0, 5);

  return (
    <section className="py-28 md:py-40 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <FadeIn>
            <SectionHeader
              label="Featured work"
              title="Selected projects."
              subtitle="Recent listing films — shot, edited, and delivered by AJM Reals."
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/portfolio"
              className="shrink-0 text-sm text-[#888] border border-[#222] px-5 py-2.5 rounded hover:border-[#F5F5F5] hover:text-[#F5F5F5] transition-all"
            >
              View all work →
            </Link>
          </FadeIn>
        </div>

        <FadeIn>
          <figure>
            <VimeoEmbed vimeoId={lead.vimeoId} title={lead.title} />
            <figcaption className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent mb-1.5">
                {lead.category}
              </p>
              <p className="font-heading font-semibold text-[#F5F5F5] text-lg leading-tight">
                {lead.title}
              </p>
              {lead.location && (
                <p className="text-[#888] text-sm mt-1">{lead.location}</p>
              )}
            </figcaption>
          </figure>
        </FadeIn>

        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mt-12">
            {rest.map((item, i) => (
              <FadeIn key={item.vimeoId} delay={i * 0.1}>
                <figure>
                  <VimeoEmbed vimeoId={item.vimeoId} title={item.title} />
                  <figcaption className="mt-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent mb-1.5">
                      {item.category}
                    </p>
                    <p className="font-heading font-semibold text-[#F5F5F5] leading-tight">
                      {item.title}
                    </p>
                    {item.location && (
                      <p className="text-[#888] text-sm mt-1">{item.location}</p>
                    )}
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
