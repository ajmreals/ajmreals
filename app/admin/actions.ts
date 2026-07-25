"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { STATUSES, type Status } from "@/lib/crm";

export async function updateStatus(leadId: string, status: string) {
  if (!STATUSES.includes(status as Status)) {
    return { error: "Unknown status" };
  }

  const supabase = createClient();
  const { error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", leadId);

  if (error) return { error: error.message };

  revalidatePath("/admin");
  revalidatePath(`/admin/leads/${leadId}`);
  return {};
}

export async function addNote(leadId: string, body: string) {
  const trimmed = body.trim();
  if (!trimmed) return { error: "Note is empty" };
  if (trimmed.length > 5000) return { error: "Note is too long" };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from("lead_notes")
    .insert([{ lead_id: leadId, body: trimmed, author: user?.email ?? null }]);

  if (error) return { error: error.message };

  revalidatePath(`/admin/leads/${leadId}`);
  return {};
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
