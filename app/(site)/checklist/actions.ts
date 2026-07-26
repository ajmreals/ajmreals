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

  if (error) {
    console.error("[checklist lead insert]", error.message);
    return { success: true };
  }

  // Notify second. sendLeadAlert never throws.
  await sendLeadAlert({ ...lead, id: inserted.id });

  return { success: true };
}
