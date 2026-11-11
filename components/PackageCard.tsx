import Link from "next/link";

interface PackageCardProps {
  name: string;
  price: string;
  term: string;
  /** Listings a month, used to state what the same work costs booked singly. */
  listings: number;
  /** What those listings cost one at a time. Computed in Pricing.tsx. */
  separately: number;
  /** separately − monthly. Computed, never typed. */
  saving: number;
  videos: string;
  shootDays: string;
  socialCuts: boolean;
  revisions: string;
  extras: string[];
  highlighted?: boolean;
}

export default function PackageCard({
  name,
  price,
  term,
  listings,
  separately,
  saving,
  videos,
  shootDays,
  socialCuts,
  revisions,
  extras,
  highlighted = false,
}: PackageCardProps) {
  return (
    <div
      className={`relative rounded-xl p-10 flex flex-col gap-6 h-full transition-all duration-300 hover:-translate-y-1 ${
        highlighted
          ? "bg-[#141414] border border-accent/40 shadow-card-accent hover:shadow-card-accent"
          : "bg-[#141414] border border-[#222] shadow-card hover:shadow-card-hover"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] bg-accent text-[#06231F] px-3 py-1 rounded-full whitespace-nowrap">
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

        {/* The discount, spelled out. Without it a visitor divides the monthly
            by the video count, compares that to the one-off price and leaves —
            the comparison that matters is a whole listing, film and photos,
            and only this line makes it. */}
        {saving > 0 && (
          <div className="mt-4 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3">
            <p className="text-accent text-sm font-medium">
              Save ${saving.toLocaleString()}/mo
              {/* The yearly figure is the same discount and reads as several
                  times the deal. It is what a client quotes to their broker. */}
              <span className="text-accent/70">
                {" · "}${(saving * 12).toLocaleString()}/yr
              </span>
            </p>
            <p className="text-[#888] text-xs mt-0.5 leading-relaxed">
              {listings} listings booked separately: $
              {separately.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-[#222] pt-6 flex flex-col gap-3 flex-1">
        <Feature label="Videos" value={videos} />
        <Feature label="Shoot days" value={shootDays} />
        <Feature label="Social cuts" value={socialCuts ? "✓" : "—"} highlight={socialCuts} />
        <Feature label="Revisions" value={revisions} />
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
      <span className={`text-sm ${highlight ? "text-[#F5F5F5]" : "text-[#808080]"}`}>{value}</span>
    </div>
  );
}
