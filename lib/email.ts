import { Resend } from "resend";

type LeadEmail = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  package?: string | null;
  message?: string | null;
  source: string;
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://ajmreals-production.up.railway.app";

/**
 * Emails the owner that a lead came in.
 *
 * Never throws. The lead is already saved by the time this runs, so a missing
 * API key, a Resend outage, or a network blip must not surface to the visitor
 * or lose the lead — it just logs for manual follow-up.
 */
export async function sendLeadAlert(lead: LeadEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_TO;

  if (!apiKey || !to) {
    console.warn(
      "[lead alert] skipped — RESEND_API_KEY or LEAD_ALERT_TO not set. Lead %s is saved in the CRM.",
      lead.id
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.LEAD_ALERT_FROM ?? "AJM Reals <onboarding@resend.dev>",
      to: [to],
      replyTo: lead.email,
      subject: `New lead: ${lead.name} (${lead.source})`,
      html: renderLeadEmail(lead),
      text: renderLeadText(lead),
    });

    if (error) {
      console.error("[lead alert] resend rejected:", error.message, lead.id);
    }
  } catch (err) {
    console.error("[lead alert] failed:", (err as Error).message, lead.id);
  }
}

function rows(lead: LeadEmail) {
  return [
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Package", lead.package],
    ["Source", lead.source],
    ["Details", lead.message],
  ].filter(([, v]) => v) as [string, string][];
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderLeadEmail(lead: LeadEmail) {
  const cells = rows(lead)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 0;color:#6B7280;font-size:12px;text-transform:uppercase;
                   letter-spacing:.08em;width:110px;vertical-align:top;">${esc(label)}</td>
        <td style="padding:10px 0;color:#111827;font-size:14px;">${esc(value)}</td>
      </tr>`
    )
    .join("");

  return `<!doctype html>
<html><body style="margin:0;padding:24px;background:#F3F4F6;
                   font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="max-width:520px;margin:0 auto;background:#fff;
         border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
    <tr><td style="background:#0A0A0A;padding:22px 26px;">
      <div style="color:#fff;font-size:16px;font-weight:700;">AJM Reals</div>
      <div style="color:#2A9D8F;font-size:11px;text-transform:uppercase;
                  letter-spacing:.14em;margin-top:3px;">New lead</div>
    </td></tr>
    <tr><td style="padding:26px;">
      <div style="font-size:21px;font-weight:700;color:#111827;margin-bottom:18px;">
        ${esc(lead.name)}
      </div>
      <table role="presentation" width="100%" style="border-collapse:collapse;">${cells}</table>
      <a href="${SITE_URL}/admin/leads/${lead.id}"
         style="display:inline-block;margin-top:24px;background:#2A9D8F;color:#fff;
                text-decoration:none;padding:11px 20px;border-radius:6px;
                font-size:14px;font-weight:600;">Open in CRM</a>
      <p style="margin:18px 0 0;color:#6B7280;font-size:12px;line-height:1.5;">
        Reply to this email to respond to ${esc(lead.name)} directly.
      </p>
    </td></tr>
  </table>
</body></html>`;
}

function renderLeadText(lead: LeadEmail) {
  const lines = rows(lead).map(([l, v]) => `${l}: ${v}`);
  return [
    `New lead: ${lead.name}`,
    "",
    ...lines,
    "",
    `Open in CRM: ${SITE_URL}/admin/leads/${lead.id}`,
  ].join("\n");
}
