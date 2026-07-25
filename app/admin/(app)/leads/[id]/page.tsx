import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import StatusBadge from "@/components/admin/StatusBadge";
import LeadControls from "@/components/admin/LeadControls";

export const dynamic = "force-dynamic";

export default async function LeadDetail({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", params.id)
    .maybeSingle();

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-[#141414] border border-[#E8756B]/30 rounded-xl p-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-[#E8756B] mb-2">
            Could not load lead
          </p>
          <p className="text-[#888] text-sm">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!lead) notFound();

  const { data: notes } = await supabase
    .from("lead_notes")
    .select("*")
    .eq("lead_id", params.id)
    .order("created_at", { ascending: false });

  const fields: [string, string | null][] = [
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Package", lead.package],
    ["Source", lead.source ?? "contact"],
    ["Received", new Date(lead.created_at).toLocaleString()],
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/admin"
        className="text-sm text-[#888] hover:text-[#F5F5F5] transition-colors inline-block mb-8"
      >
        ← All leads
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-2xl font-heading font-semibold text-[#F5F5F5]">
          {lead.name}
        </h1>
        <StatusBadge status={lead.status} />
      </div>

      {/* Details */}
      <div className="flex flex-col gap-px bg-[#222] border border-[#222] rounded-xl overflow-hidden mb-8">
        {fields.map(([label, value]) => (
          <div
            key={label}
            className="bg-[#141414] px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888] sm:w-28 shrink-0">
              {label}
            </p>
            <p className="text-[#F5F5F5] text-sm break-words">
              {value ? (
                label === "Email" ? (
                  <a
                    href={`mailto:${value}`}
                    className="underline underline-offset-4 hover:text-accent"
                  >
                    {value}
                  </a>
                ) : label === "Phone" ? (
                  <a
                    href={`tel:${value}`}
                    className="underline underline-offset-4 hover:text-accent"
                  >
                    {value}
                  </a>
                ) : (
                  value
                )
              ) : (
                <span className="text-[#666]">—</span>
              )}
            </p>
          </div>
        ))}
      </div>

      {lead.message && (
        <div className="bg-[#141414] border border-[#222] rounded-xl p-6 mb-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#888] mb-3">
            Message
          </p>
          <p className="text-[#F5F5F5] text-sm leading-relaxed whitespace-pre-wrap">
            {lead.message}
          </p>
        </div>
      )}

      <LeadControls
        leadId={lead.id}
        status={lead.status}
        notes={notes ?? []}
      />
    </div>
  );
}
