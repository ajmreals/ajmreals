import Link from "next/link";

interface PackageCardProps {
  name: string;
  price: string;
  term: string;
  videos: string;
  shootDays: string;
  photos: string;
  drone: boolean;
  socialCuts: boolean;
  revisions: string;
  delivery: string;
  extras: string[];
  highlighted?: boolean;
}

export default function PackageCard({
  name,
  price,
  term,
  videos,
  shootDays,
  photos,
  drone,
  socialCuts,
  revisions,
  delivery,
  extras,
  highlighted = false,
}: PackageCardProps) {
  return (
    <div
      className={`relative rounded-xl p-8 flex flex-col gap-6 h-full transition-transform duration-300 hover:-translate-y-1 ${
        highlighted
          ? "bg-[#141414] border border-accent/40"
          : "bg-[#141414] border border-[#222]"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] bg-accent text-white px-3 py-1 rounded-full whitespace-nowrap">
            Most popular
          </span>
        </div>
      )}

      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-2">
          {name}
        </p>
        <p className="text-3xl font-heading font-bold text-[#F5F5F5]">{price}</p>
        <p className="text-[#888] text-sm mt-1">{term}</p>
      </div>

      <div className="border-t border-[#222] pt-6 flex flex-col gap-3 flex-1">
        <Feature label="Videos" value={videos} />
        <Feature label="Shoot days" value={shootDays} />
        <Feature label="Photos" value={photos} />
        <Feature label="Drone" value={drone ? "✓" : "—"} highlight={drone} />
        <Feature label="Social cuts" value={socialCuts ? "✓" : "—"} highlight={socialCuts} />
        <Feature label="Revisions" value={revisions} />
        <Feature label="Delivery" value={delivery} />
        {extras.map((extra) => (
          <Feature key={extra} label={extra} value="✓" highlight />
        ))}
      </div>

      <Link
        href="/contact"
        className={`block text-center py-3 rounded border text-sm transition-all ${
          highlighted
            ? "border-accent text-accent hover:bg-accent hover:text-white"
            : "border-[#444] text-[#888] hover:border-[#F5F5F5] hover:text-[#F5F5F5]"
        }`}
      >
        Get started
      </Link>
    </div>
  );
}

function Feature({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[#888] text-sm">{label}</span>
      <span className={`text-sm ${highlight ? "text-[#F5F5F5]" : "text-[#555]"}`}>{value}</span>
    </div>
  );
}
