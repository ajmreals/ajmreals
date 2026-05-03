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
      className={`relative rounded-xl p-10 flex flex-col gap-6 h-full transition-all duration-300 hover:-translate-y-1 ${
        highlighted
          ? "bg-[#1E3D2A] border border-[#3A7A52] shadow-card hover:shadow-card-hover"
          : "bg-[#2A2A2A] border border-white/20 shadow-card hover:shadow-card-hover"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-6">
          <span className="font-heading font-bold text-[10px] uppercase tracking-widest bg-[#2D5A3D] text-white px-3 py-1 rounded-full whitespace-nowrap">
            Most popular
          </span>
        </div>
      )}

      <div className="pt-2">
        <p className="font-heading font-bold text-[11px] uppercase tracking-widest text-[#6DBF8A] mb-2">
          {name}
        </p>
        <p className="font-heading font-bold text-3xl text-white">{price}</p>
        <p className="font-body text-[#BDB5A0] text-sm mt-1">{term}</p>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col gap-3 flex-1">
        <Feature label="Videos" value={videos} />
        <Feature label="Shoot days" value={shootDays} />
        <Feature label="Photos"
