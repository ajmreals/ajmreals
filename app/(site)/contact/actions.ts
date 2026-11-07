"use server";

import { getSupabase } from "@/lib/supabase";
import { sendLeadAlert } from "@/lib/email";
import { contactSchema, firstError } from "@/lib/validation";
import { isRateLimited } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

type Result = { success: boolean; error?: string };

export async function submitLead(input: {
  name: string;
  email: string;
  phone: string;
  package: string;
  message: string;
  website?: string;
  turnstileToken?: string;
}): Promise<Result> {
  // 1. Shape and length. Server Actions are callable directly, so this is the
  //    real gate — the browser's own checks are only a convenience.
  const parsed = contactSchema.safeParse(input);
  const invalid = firstError(parsed);
  if (!parsed.success || invalid) {
    return { success: false, error: invalid ?? "Please check the form" };
  }

  // 2. Honeypot. A filled hidden field means a bot; answer as if it worked
  //    so it has nothing to learn from.
  if (input.website) return { success: true };

  // 3. Volume per IP.
  if (isRateLimited("contact")) {
    return {
      success: false,
      error: "Too many messages. Please try again in a few minutes.",
    };
  }

  // 4. Turnstile, once Cloudflare keys are configured.
  if (!(await verifyTurnstile(input.turnstileToken))) {
    return { success: false, error: "Could not verify you're human. Please retry." };
  }

  const data = parsed.data;
  const lead = {
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    package: data.package || null,
    message: data.message || null,
    source: "contact",
  };

  const { data: inserted, error } = await getSupabase()
    .from("leads")
    .insert([lead])
    .select("id")
    .single();

  if (error) console.error("[contact lead insert]", error.message);

  // Notify ALWAYS — even when the write failed. If the database is paused or
  // down, this email is the only record of the enquiry, and it says so.
  await sendLeadAlert({ ...lead, id: inserted?.id ?? null, saved: !error });

  return { success: true };
}
