"use server";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/admin/auth";
import { staffDatabase } from "@/lib/supabase";
import { propertySchema } from "@/lib/properties/schema";
import { z } from "zod";
export async function saveProperty(input: unknown, id?: string, version?: string) {
  if (!await requireRole("EDITOR")) return { error: "Your session has expired or you do not have permission. Sign in again." };
  const parsed = propertySchema.safeParse(input);
  if (!parsed.success) return { error: parsed.error.issues.map(i => `${i.path.join(" ")}: ${i.message}`).join(" · ") };
  if (id && !z.uuid().safeParse(id).success) return { error: "Invalid property." };
  const db = await staffDatabase();
  if (parsed.data.images.length) {
    const { data: files, error } = await db.storage.from("property-images").createSignedUrls(parsed.data.images, 60);
    if (error || files?.some(f => f.error) || files?.length !== parsed.data.images.length) return { error: "One or more images could not be verified. Upload them again." };
  }
  const value = { ...parsed.data, available_date: parsed.data.available_date || null };
  const query = id ? db.from("properties").update(value).eq("id", id).eq("updated_at", version || "") : db.from("properties").insert(value);
  const { data, error } = await query.select("id,updated_at").maybeSingle();
  if (error) return { error: error.code === "23505" ? "That property reference is already in use." : "Could not save the property. Please try again." };
  if (!data) return { error: "Another staff member changed this property. Reload before saving." };
  revalidatePath("/", "layout");
  return { id: String(data.id), version: String(data.updated_at) };
}
