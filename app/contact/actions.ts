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

  const { error } = await supabase.from("leads").insert([
    {
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      package: data.package || null,
      message: data.message || null,
    },
  ]);

  if (error) {
    console.error("[lead insert]", error.message);
    // Still return success to avoid dropping leads — log for manual follow-up
    return { success: true };
  }

  return { success: true };
}
