import { SITE_URL, site } from "@/lib/site";

/**
 * The automated sequence sent to people who download the Pre-Shoot Checklist.
 *
 * Scope is deliberately narrow — see the cron route for the conditions. Two
 * emails, both written to be useful on their own; someone who never hires us
 * should still be glad they opened them.
 */
/**
 * A paragraph, or a highlighted callout.
 *
 * Callouts carry the visual weight that images would, without the cost:
 * most mail clients block remote images until the reader allows them, and an
 * image-heavy email is far more likely to be filed under Promotions than
 * read. Emoji always render, so warmth comes from those and from the accent
 * block rather than from pictures.
 */
export type Block = string | { tip: string };

export type FollowUp = {
  step: number;
  /** Days after the lead was created. */
  afterDays: number;
  subject: string;
  /** `name` is the lead's first name. */
  body: (name: string) => Block[];
};

export const sequence: FollowUp[] = [
  {
    step: 1,
    afterDays: 3,
    subject: "💡 Two minutes, better photos",
    body: (name) => [
      `Hi ${name} — hope the checklist has been useful.`,
      "If you do one thing off it, do the bulbs 💡",
      { tip: "One warm bulb next to two cool ones turns a white kitchen green on camera. Four matching bulbs: about $12, ten minutes, and it saves hours in editing." },
      "Second best: shoot the outside in the 90 minutes before sunset 🌇 Same house, same camera, completely different listing.",
      "Got a property coming up? Just hit reply.",
    ],
  },
  {
    step: 2,
    afterDays: 14,
    subject: "🎥 One listing, no commitment",
    body: (name) => [
      `Hi ${name},`,
      "Quick one — we shoot single listings with no retainer and no minimum.",
      { tip: "🎥 Walkthrough film — $500\n📸 Add photos — $275\n📐 Add a 2D floor plan — $50\n✨ Both — $300\n\nUp to 1,000 sq ft. Larger homes +$75 per 500 sq ft." },
      `We cover ${site.areaServed.join(", ")}.`,
      "No pressure — if the checklist was the useful bit, that's great too 👍",
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
        .map((p) =>
          typeof p === "string"
            ? `<p style="margin:0 0 16px;color:#111827;font-size:15px;line-height:1.6;">${esc(p)}</p>`
            : `<table role="presentation" width="100%" style="margin:0 0 18px;background:#F2F9F8;
                      border-left:3px solid #2A9D8F;border-radius:0 6px 6px 0;">
                 <tr><td style="padding:14px 18px;color:#1F3B37;font-size:15px;line-height:1.65;">
                   ${esc(p.tip).replace(/\n/g, "<br>")}
                 </td></tr>
               </table>`
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
    ...paragraphs.map((p) => (typeof p === "string" ? p : p.tip)),
    "",
    `— Anthony, ${site.name}`,
    "",
    "---",
    "You're getting this because you downloaded our pre-shoot checklist.",
    `Unsubscribe: ${unsubscribe}`,
  ].join("\n\n");

  return { html, text };
}
