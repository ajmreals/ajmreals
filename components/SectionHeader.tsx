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
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#888] mb-4">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-[#F5F5F5]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-[#888] leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
