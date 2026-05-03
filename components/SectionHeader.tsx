interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  centered = false,
}: SectionHeaderProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      {label && (
        <p className="font-heading font-bold text-[11px] uppercase tracking-widest text-[#6DBF8A] mb-4">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`font-body mt-3 text-[#BDB5A0] leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
