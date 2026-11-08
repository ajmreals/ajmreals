import { Resend } from "resend";
// One source for the origin — this file had its own copy, which meant the
// "Open in CRM" link in lead alerts could outlive a domain change.
import { SITE_URL } from "@/lib/site";

type LeadEmail = {
  /** Null when the database write failed — there is no CRM row to link to. */
  id: string | null;
  name: string;
  email: string;
  phone?: string | null;
  package?: string | null;
  message?: string | null;
  source: string;
  /** False when the lead could not be stored, so this email is the only record. */
  saved: boolean;
};

/**
 * Emails the owner that a lead came in.
 *
 * Sent whether or not the database write succeeded. When the database is
 * unreachable — a paused project, an outage — this email is the ONLY record of
 * the inquiry, so it must still go out and must say so plainly.
 *
 * Never throws: a missing API key or a Resend outage logs and moves on.
 */
export async function sendLeadAlert(lead: LeadEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_ALERT_TO;

  if (!apiKey || !to) {
    console.error(
      "[lead alert] NOT SENT — RESEND_API_KEY or LEAD_ALERT_TO missing. Lead from %s <%s>%s",
      lead.name,
      lead.email,
      lead.saved ? " is saved in the CRM." : " WAS NOT SAVED AND IS NOW LOST."
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.LEAD_ALERT_FROM ?? "AJM Reals <onboarding@resend.dev>",
      to: [to],
      replyTo: lead.email,
      subject: lead.saved
        ? `New lead: ${lead.name} (${lead.source})`
        : `⚠ New lead NOT SAVED: ${lead.name} (${lead.source})`,
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
    ${
      lead.saved
        ? ""
        : `<tr><td style="background:#FEF2F2;border-bottom:1px solid #FECACA;padding:16px 26px;">
      <div style="color:#991B1B;font-size:13px;font-weight:700;margin-bottom:4px;">
        Not saved to the CRM
      </div>
      <div style="color:#7F1D1D;font-size:13px;line-height:1.5;">
        The database could not be reached, so this email is the only record of
        this inquiry. Save the details below before deleting it.
      </div>
    </td></tr>`
    }
    <tr><td style="padding:26px;">
      <div style="font-size:21px;font-weight:700;color:#111827;margin-bottom:18px;">
        ${esc(lead.name)}
      </div>
      <table role="presentation" width="100%" style="border-collapse:collapse;">${cells}</table>
      ${
        lead.id
          ? `<a href="${SITE_URL}/admin/leads/${lead.id}"
         style="display:inline-block;margin-top:24px;background:#2A9D8F;color:#fff;
                text-decoration:none;padding:11px 20px;border-radius:6px;
                font-size:14px;font-weight:600;">Open in CRM</a>`
          : ""
      }
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
    lead.saved ? `New lead: ${lead.name}` : `NEW LEAD — NOT SAVED: ${lead.name}`,
    ...(lead.saved
      ? []
      : [
          "",
          "The database could not be reached, so this email is the only record",
          "of this inquiry. Save the details below before deleting it.",
        ]),
    "",
    ...lines,
    ...(lead.id ? ["", `Open in CRM: ${SITE_URL}/admin/leads/${lead.id}`] : []),
  ].join("\n");
}
