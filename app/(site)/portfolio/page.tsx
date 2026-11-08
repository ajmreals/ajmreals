import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";
import VimeoEmbed from "@/components/VimeoEmbed";
import { work } from "@/lib/work";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

// A server component on purpose. It was client-side for useState filters,
// which meant it could not export metadata — so it shared the home page's
// title in search results. Filters now live in the URL, which also makes
// each view linkable and crawlable.
export const metadata: Metadata = {
  title: "Portfolio",
  description: `Listing films by ${site.name} across ${site.areaServed.join(", ")} — cinematic walkthroughs, drone aerials, and photography for real estate agents, developers, and builders.`,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: `Portfolio — ${site.name}`,
    description: "Recent listing films, drone aerials, and photography.",
    url: "/portfolio",
  },
};

export default function PortfolioPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const active = searchParams.filter ?? "All";

  const filters = [
    "All",
    ...Array.from(new Set(work.flatMap((w) => [w.category, w.type]))),
  ];

  const filtered = work.filter(
    (item) =>
      active === "All" || item.category === active || item.type === active
  );

  const href = (f: string) =>
    f === "All" ? "/portfolio" : `/portfolio?filter=${encodeURIComponent(f)}`;

  // Lead frame runs full width beneath the films; the rest sit two-up.
  const [lead, ...restPhotos] = photos;

  return (
    <main id="main-content" className="pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <FadeIn className="mb-12">
          <SectionHeader
            label="Portfolio"
            title="Our work."
            subtitle={`Listing films for real estate agents, developers, and builders across ${site.areaServed.join(", ")}.`}
          />
        </FadeIn>

        {work.length === 0 ? (
          <div className="bg-[#141414] border border-[#222] rounded-xl p-10 text-center">
            <p className="text-[#F5F5F5] mb-1">Work coming soon.</p>
            <p className="text-[#888] text-sm">
              New projects are added here as they&apos;re delivered.
            </p>
          </div>
        ) : (
          <>
            {filters.length > 2 && (
              <FadeIn delay={0.1} className="mb-12">
                <div className="flex flex-wrap gap-2">
                  {filters.map((filter) => (
                    <Link
                      key={filter}
                      href={href(filter)}
                      scroll={false}
                      className={`font-mono text-[11px] uppercase tracking-[0.1em] px-4 py-2 rounded border transition-all ${
                        active === filter
                          ? "border-accent text-accent bg-accent/5"
                          : "border-[#222] text-[#888] hover:border-[#444] hover:text-[#F5F5F5]"
                      }`}
                    >
                      {filter}
                    </Link>
                  ))}
                </div>
              </FadeIn>
            )}

            {filtered.length === 0 ? (
              <div className="bg-[#141414] border border-[#222] rounded-xl p-10 text-center">
                <p className="text-[#F5F5F5] mb-1">Nothing here yet.</p>
                <Link
                  href="/portfolio"
                  className="text-[#888] text-sm underline underline-offset-4 hover:text-[#F5F5F5]"
                >
                  See all work
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
                {filtered.map((item) => (
                  <figure
                    key={item.vimeoId}
                    // Vertical clips would tower over the row at full column width.
                    className={item.aspect ? "max-w-[320px] w-full mx-auto" : undefined}
                  >
                    <VimeoEmbed
                      vimeoId={item.vimeoId}
                      title={item.title}
                      aspect={item.aspect}
                    />
                    <figcaption className="mt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent mb-1.5">
                        {item.category} / {item.type}
                      </p>
                      <h2 className="font-heading font-semibold text-[#F5F5F5] leading-tight">
                        {item.title}
                      </h2>
                      {item.location && (
                        <p className="text-[#888] text-sm mt-1">
                          {item.location}
                        </p>
                      )}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </>
        )}

        {/* Frames from the films, below the films themselves. Called what
            they are rather than "photography": these are ~1600px grabs, not
            the deliverable someone paying $275 for stills receives, and
            promising the one while showing the other is a complaint waiting
            to happen. Hidden when the visitor has filtered to a kind of
            film. */}
        {photos.length > 0 && active === "All" && (
          <section className="mt-24 pt-16 border-t border-[#222]">
            <FadeIn className="mb-10">
              <SectionHeader
                label="Stills"
                title="Frames from the films."
                subtitle="Single frames pulled from recent listing films, drone included. Dedicated photography is a separate deliverable — included on every retainer, and an add-on on a single listing."
              />
            </FadeIn>

            {/* Lead frame full width, the rest two-up — same shape as the
                home page's featured work. */}
            <FadeIn>
              <Image
                src={lead.src}
                alt={lead.alt}
                width={lead.width}
                height={lead.height}
                priority
                sizes="(min-width: 1152px) 1088px, 100vw"
                className="w-full h-auto rounded-lg border border-[#222]"
              />
            </FadeIn>

            {restPhotos.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8">
                {restPhotos.map((photo, i) => (
                  <FadeIn key={photo.src} delay={i * 0.1}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      // Two up from the lg breakpoint, full width below it.
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="w-full h-auto rounded-lg border border-[#222]"
                    />
                  </FadeIn>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
