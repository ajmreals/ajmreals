"use server";

import { getSupabase } from "@/lib/supabase";
import { sendLeadAlert } from "@/lib/email";

export async function submitLead(data: {
  name: string;
  email: string;
  phone: string;
  package: string;
  message: string;
}): Promise<{ success: boolean }> {
  const supabase = getSupabase();

  const lead = {
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    package: data.package || null,
    message: data.message || null,
    source: "contact",
  };

  // Store first — a notification failure must never lose a real enquiry.
  const { data: inserted, error } = await supabase
    .from("leads")
    .insert([lead])
    .select("id")
    .single();

  if (error) {
    console.error("[contact lead insert]", error.message);
    return { success: true };
  }

  // Notify second. sendLeadAlert never throws.
  await sendLeadAlert({ ...lead, id: inserted.id });

  return { success: true };
}
