import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { STATUSES } from "@/lib/crm";
import StatusBadge from "@/components/admin/StatusBadge";
import LocalTime from "@/components/admin/LocalTime";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  package: string | null;
  message: string | null;
  status: string;
  source?: string | null;
};

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: { status?: string; source?: string };
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-[#141414] border border-[#E8756B]/30 rounded-xl p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#E8756B] mb-2">
            Could not load leads
          </p>
          <p className="text-[#888] text-sm">{error.message}</p>
          <p className="text-[#555] text-xs mt-4">
            If this mentions a missing table, column, or policy, migrations
            0002 and 0003 have not been applied yet.
          </p>
        </div>
      </div>
    );
  }

  const leads = (data ?? []) as Lead[];

  // Stats
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const thisWeek = leads.filter(
    (l) => new Date(l.created_at).getTime() >= weekAgo
  );
  const openCount = leads.filter(
    (l) => l.status === "new" || l.status === "contacted"
  ).length;
  const wonCount = leads.filter((l) => l.status === "won").length;

  // Filters
  const activeStatus = searchParams.status ?? "all";
  const activeSource = searchParams.source ?? "all";
  const filtered = leads.filter(
    (l) =>
      (activeStatus === "all" || l.status === activeStatus) &&
      (activeSource === "all" || (l.source ?? "contact") === activeSource)
  );

  const sources = Array.from(
    new Set(leads.map((l) => l.source ?? "contact"))
  ).sort();

  const stats = [
    { label: "New this week", value: thisWeek.length },
    { label: "Open", value: openCount },
    { label: "Won", value: wonCount },
    { label: "Total", value: leads.length },
  ];

  const qs = (patch: Record<string, string>) => {
    const p = new URLSearchParams();
    const merged = { status: activeStatus, source: activeSource, ...patch };
    for (const [k, v] of Object.entries(merged)) if (v !== "all") p.set(k, v);
    const s = p.toString();
    return s ? `/admin?${s}` : "/admin";
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-heading font-semibold text-[#F5F5F5] mb-8">
        Leads
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#222] border border-[#222] rounded-xl overflow-hidden mb-10">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#141414] p-6">
            <p className="text-3xl font-heading font-bold text-[#F5F5F5]">
              {s.value}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888] mt-2">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="flex flex-wrap gap-2">
          <FilterChip href={qs({ status: "all" })} active={activeStatus === "all"}>
            All
          </FilterChip>
          {STATUSES.map((s) => (
            <FilterChip
              key={s}
              href={qs({ status: s })}
              active={activeStatus === s}
            >
              {s}
            </FilterChip>
          ))}
        </div>
        {sources.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <FilterChip
              href={qs({ source: "all" })}
              active={activeSource === "all"}
            >
              Any source
            </FilterChip>
            {sources.map((s) => (
              <FilterChip
                key={s}
                href={qs({ source: s })}
                active={activeSource === s}
              >
                {s}
              </FilterChip>
            ))}
          </div>
        )}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="bg-[#141414] border border-[#222] rounded-xl p-10 text-center">
          <p className="text-[#F5F5F5] mb-1">
            {leads.length === 0 ? "No leads yet." : "Nothing matches that filter."}
          </p>
          <p className="text-[#888] text-sm">
            {leads.length === 0
              ? "Submissions from the contact form and the checklist will appear here."
              : "Try a different status or source."}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-px bg-[#222] border border-[#222] rounded-xl overflow-hidden">
          {filtered.map((lead) => (
            <Link
              key={lead.id}
              href={`/admin/leads/${lead.id}`}
              className="bg-[#141414] hover:bg-[#181818] transition-colors p-5 flex items-center gap-5"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-[#F5F5F5] font-medium truncate">
                    {lead.name}
                  </p>
                  <StatusBadge status={lead.status} />
                </div>
                <p className="text-[#888] text-sm truncate">{lead.email}</p>
              </div>
              <div className="hidden sm:block text-right shrink-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                  {lead.source ?? "contact"}
                </p>
                <p className="text-[#888] text-xs mt-1">
                  <LocalTime iso={lead.created_at} relative />
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`font-mono text-[11px] uppercase tracking-[0.1em] px-4 py-2 rounded border transition-all ${
        active
          ? "border-accent text-accent bg-accent/5"
          : "border-[#222] text-[#888] hover:border-[#444] hover:text-[#F5F5F5]"
      }`}
    >
      {children}
    </Link>
  );
}
