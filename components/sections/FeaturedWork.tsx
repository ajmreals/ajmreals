import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import SectionHeader from "@/components/SectionHeader";

// TODO: Replace with real featured project images, titles, and categories
const featured = [
  {
    id: 1,
    title: "Oceanfront Penthouse",
    category: "Video + Drone",
    location: "Miami Beach, FL",
    src: "https://picsum.photos/1200/800?random=30",
    width: 1200,
    height: 800,
    large: true,
  },
  {
    id: 2,
    title: "Brooklyn Townhouse",
    category: "Photography",
    location: "Brooklyn, NY",
    src: "https://picsum.photos/800/600?random=31",
    width: 800,
    height: 600,
    large: false,
  },
  {
    id: 3,
    title: "Hudson Yards Highrise",
    category: "Drone Aerials",
    location: "New York, NY",
    src: "https://picsum.photos/800/600?random=32",
    width: 800,
    height: 600,
    large: false,
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-28 md:py-40 border-t border-[#222]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <FadeIn>
            <SectionHeader
              label="Featured work"
              title="Selected projects."
              subtitle="A look at recent shoots across video, drone, and photography."
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

        {/* Bento grid: large item left, two stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-5">
          {/* Large item spans 2 rows */}
          <FadeIn className="md:col-span-2 md:row-span-2" delay={0}>
            <ProjectCard item={featured[0]} tall />
          </FadeIn>
          {/* Two smaller items */}
          <FadeIn delay={0.1}>
            <ProjectCard item={featured[1]} />
          </FadeIn>
          <FadeIn delay={0.2}>
            <ProjectCard item={featured[2]} />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  item,
  tall = false,
}: {
  item: (typeof featured)[0];
  tall?: boolean;
}) {
  return (
    <Link
      href="/portfolio"
      className={`group relative overflow-hidden rounded-xl bg-[#141414] border border-[#222] shadow-card block ${
        tall ? "h-[420px] md:h-full min-h-[460px]" : "h-[200px] md:h-full min-h-[180px]"
      }`}
    >
      {/* TODO: Replace with real project image */}
      <Image
        src={item.src}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 50vw"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />

      {/* Labels */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent mb-1.5">
          {item.category}
        </p>
        <p className="font-heading font-semibold text-[#F5F5F5] text-lg leading-tight">
          {item.title}
        </p>
        <p className="text-[#888] text-xs mt-1">{item.location}</p>
      </div>
    </Link>
  );
}
