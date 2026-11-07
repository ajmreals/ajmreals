declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      target: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Records a lead in GA4.
 *
 * `generate_lead` is one of GA4's recommended events, so it feeds the
 * lead-generation reports directly rather than needing a custom definition.
 * Silent when analytics isn't configured or hasn't loaded — a blocked or
 * missing gtag must never break a form submission.
 */
export function trackLead(source: "checklist" | "contact") {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", "generate_lead", { lead_source: source });
  } catch {
    // Analytics is never worth an error in front of a visitor.
  }
}
