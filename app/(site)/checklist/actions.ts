"use server";

import { getSupabase } from "@/lib/supabase";
import { sendLeadAlert } from "@/lib/email";

export async function requestChecklist(data: {
  name: string;
  email: string;
  brokerage: string;
}): Promise<{ success: boolean }> {
  const supabase = getSupabase();

  const lead = {
    name: data.name,
    email: data.email,
    message: data.brokerage ? `Brokerage: ${data.brokerage}` : null,
    source: "checklist",
  };

  // Store first — the download must not depend on anything downstream.
  const { data: inserted, error } = await supabase
    .from("leads")
    .insert([lead])
    .select("id")
    .single();

  if (error) console.error("[checklist lead insert]", error.message);

  // Notify ALWAYS — even when the write failed. If the database is paused or
  // down, this email is the only record of the enquiry, and it says so.
  await sendLeadAlert({
    ...lead,
    id: inserted?.id ?? null,
    saved: !error,
  });

  return { success: true };
}
