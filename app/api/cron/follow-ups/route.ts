import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabase } from "@/lib/supabase";
import { sequence, renderFollowUp } from "@/lib/followups";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

/**
 * Don't start the sequence for a lead older than this.
 *
 * Without it, switching the cron on would email every historic lead at once
 * — telling someone who downloaded the checklist three months ago that they
 * "grabbed it a few days ago". A lead already part-way through the sequence
 * is unaffected; this only gates the first send.
 */
const MAX_AGE_TO_ENROL_DAYS = 30;

/**
 * Sends any follow-ups that have come due.
 *
 * Safe to call as often as you like: lead_followups has a unique constraint
 * on (lead_id, step), so a second run can't email the same person twice —
 * the insert conflicts instead. The row is written BEFORE the send for the
 * same reason; a crash mid-run then skips that person rather than repeating
 * them, which is the better failure for a marketing email.
 *
 * Deliberately narrow. A lead is only chased when ALL of these hold:
 *   - it came from the checklist (contact-form inquiries get a human reply)
 *   - it is still "new" (if the owner has moved it on, they're handling it)
 *   - it hasn't unsubscribed
 *   - the step is due and hasn't already been sent
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET is not configured" },
      { status: 503 }
    );
  }

  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "RESEND_API_KEY is not configured" },
      { status: 503 }
    );
  }

  const supabase = getSupabase();
  const resend = new Resend(apiKey);
  const from = process.env.LEAD_ALERT_FROM ?? `${site.name} <onboarding@resend.dev>`;

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, name, email, created_at, lead_followups(step)")
    .eq("source", "checklist")
    .eq("status", "new")
    .is("unsubscribed_at", null);

  if (error) {
    console.error("[follow-ups] could not load leads:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const now = Date.now();
  let sent = 0;
  const failures: string[] = [];

  for (const lead of leads ?? []) {
    const already = new Set(
      ((lead.lead_followups as { step: number }[] | null) ?? []).map((f) => f.step)
    );
    const ageDays = (now - new Date(lead.created_at).getTime()) / 86_400_000;

    // Never enrol a stale lead. Someone already mid-sequence carries on.
    if (already.size === 0 && ageDays > MAX_AGE_TO_ENROL_DAYS) continue;

    for (const followUp of sequence) {
      if (already.has(followUp.step)) continue;
      if (ageDays < followUp.afterDays) continue;

      // Claim the send first. A unique-constraint conflict means another run
      // already took it, so skip rather than send twice.
      const { error: claimError } = await supabase
        .from("lead_followups")
        .insert([{ lead_id: lead.id, step: followUp.step }]);

      if (claimError) continue;

      const { html, text } = renderFollowUp(followUp, lead);
      const { error: sendError } = await resend.emails.send({
        from,
        to: [lead.email],
        replyTo: site.email,
        subject: followUp.subject,
        html,
        text,
      });

      if (sendError) {
        // Release the claim so the next run retries this one.
        await supabase
          .from("lead_followups")
          .delete()
          .eq("lead_id", lead.id)
          .eq("step", followUp.step);
        failures.push(`${lead.email} step ${followUp.step}: ${sendError.message}`);
        continue;
      }

      sent += 1;
      // One step per lead per run, so nobody gets two emails at once.
      break;
    }
  }

  if (failures.length) console.error("[follow-ups] failures:", failures);

  return NextResponse.json({
    considered: leads?.length ?? 0,
    sent,
    failed: failures.length,
  });
}
