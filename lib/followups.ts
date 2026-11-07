import { SITE_URL, site } from "@/lib/site";

/**
 * The automated sequence sent to people who download the Pre-Shoot Checklist.
 *
 * Scope is deliberately narrow — see the cron route for the conditions. Two
 * emails, both written to be useful on their own; someone who never hires us
 * should still be glad they opened them.
 */
export type FollowUp = {
  step: number;
  /** Days after the lead was created. */
  afterDays: number;
  subject: string;
  /** Plain-text body. `name` is the lead's first name. */
  body: (name: string) => string[];
};

export const sequence: FollowUp[] = [
  {
    step: 1,
    afterDays: 3,
    subject: "The bit of the checklist people skip",
    body: (name) => [
      `Hi ${name},`,
      "You grabbed our pre-shoot checklist a few days ago — hope it's been useful.",
      "If you only act on one line of it, make it the bulbs. Mismatched colour temperature is the single most common thing we fix in post: one warm bulb beside two cool ones turns a white kitchen faintly green, and correcting it costs editing time on every frame of the room. Four matching bulbs is about twelve dollars and ten minutes.",
      "The second one worth the effort: shoot exteriors in the ninety minutes before sunset. Same house, same camera, completely different listing.",
      "If you want a hand with any of it, just reply — happy to talk through a specific property.",
    ],
  },
  {
    step: 2,
    afterDays: 14,
    subject: "Worth putting a camera on?",
    body: (name) => [
      `Hi ${name},`,
      "Quick one. If you've got a listing coming up that deserves more than phone photos, we shoot single listings without any retainer or commitment.",
      "$400 covers a cinematic walkthrough film for a home up to 1,000 sq ft. Photos are $275, a 2D floor plan is $50, or both for $300. Larger homes are $75 per extra 500 sq ft.",
      `We cover ${site.areaServed.join(", ")}.`,
      "No pressure at all — if the checklist was the useful bit, that's fine too. Reply any time if a property comes up.",
    ],
  },
];

function firstName(full: string): string {
  return full.trim().split(/\s+/)[0] || "there";
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function renderFollowUp(
  followUp: FollowUp,
  lead: { id: string; name: string }
) {
  const paragraphs = followUp.body(firstName(lead.name));
  const unsubscribe = `${SITE_URL}/unsubscribe?id=${lead.id}`;

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#F3F4F6;
     font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" style="max-width:540px;margin:0 auto;background:#fff;
         border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
    <tr><td style="padding:30px 32px;">
      ${paragraphs
        .map(
          (p) =>
            `<p style="margin:0 0 16px;color:#111827;font-size:15px;line-height:1.6;">${esc(p)}</p>`
        )
        .join("")}
      <p style="margin:24px 0 0;color:#111827;font-size:15px;line-height:1.6;">
        — Anthony<br>
        <span style="color:#6B7280;font-size:14px;">${esc(site.name)}</span>
      </p>
    </td></tr>
    <tr><td style="padding:18px 32px 24px;border-top:1px solid #E5E7EB;">
      <p style="margin:0;color:#6B7280;font-size:12px;line-height:1.5;">
        You're getting this because you downloaded our pre-shoot checklist.
        <a href="${unsubscribe}" style="color:#6B7280;">Unsubscribe</a>.
      </p>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    ...paragraphs,
    "",
    `— Anthony, ${site.name}`,
    "",
    "---",
    "You're getting this because you downloaded our pre-shoot checklist.",
    `Unsubscribe: ${unsubscribe}`,
  ].join("\n\n");

  return { html, text };
}
