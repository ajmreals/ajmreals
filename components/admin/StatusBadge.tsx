const styles: Record<string, string> = {
  new: "bg-accent/15 text-accent border-accent/25",
  contacted: "bg-[#5B8DEF]/15 text-[#8FB4F5] border-[#5B8DEF]/25",
  qualified: "bg-[#C9A227]/15 text-[#DFBE4A] border-[#C9A227]/25",
  won: "bg-[#3FA96B]/15 text-[#6FCB94] border-[#3FA96B]/25",
  lost: "bg-[#888]/10 text-[#999] border-[#888]/20",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] px-2 py-1 rounded border ${
        styles[status] ?? styles.lost
      }`}
    >
      {status}
    </span>
  );
}
