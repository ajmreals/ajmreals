"use server";

import { getSupabase } from "@/lib/supabase";

export async function submitLead(data: {
  name: string;
  email: string;
  phone: string;
  package: string;
  message: string;
}): Promise<{ success: boolean }> {
  const supabase = getSupabase();

  const base = {
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    package: data.package || null,
    message: data.message || null,
  };

  const { error } = await supabase
    .from("leads")
    .insert([{ ...base, source: "contact" }]);

  if (error) {
    // Migration 0002 adds `source`. Until it runs, retry without it so a real
    // lead is never dropped over a missing column.
    const { error: retryError } = await supabase.from("leads").insert([base]);
    if (retryError) {
      console.error("[lead insert]", retryError.message);
    }
  }

  // Never surface a storage failure to the visitor — log for manual recovery.
  return { success: true };
}
