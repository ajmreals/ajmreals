"use server";

import { getSupabase } from "@/lib/supabase";

export async function requestChecklist(data: {
  name: string;
  email: string;
  brokerage: string;
}): Promise<{ success: boolean }> {
  const supabase = getSupabase();

  const base = {
    name: data.name,
    email: data.email,
    message: data.brokerage ? `Brokerage: ${data.brokerage}` : null,
  };

  const { error } = await supabase
    .from("leads")
    .insert([{ ...base, source: "checklist" }]);

  if (error) {
    // Migration 0002 adds `source`. Until it runs, retry without it so a real
    // lead is never dropped over a missing column.
    const { error: retryError } = await supabase.from("leads").insert([base]);
    if (retryError) {
      console.error("[checklist lead insert]", retryError.message);
    }
  }

  // Never block the download on a storage failure.
  return { success: true };
}
