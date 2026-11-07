"use server";

import { redirect } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function unsubscribe(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (!UUID.test(id)) redirect("/unsubscribe?state=invalid");

  const { error } = await getSupabase()
    .from("leads")
    .update({ unsubscribed_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("[unsubscribe]", error.message);
    redirect("/unsubscribe?state=error");
  }

  redirect("/unsubscribe?state=done");
}
