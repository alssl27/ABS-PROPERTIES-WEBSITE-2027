import "server-only";
import { staffDatabase } from "@/lib/supabase";
import type { Listing } from "@/lib/properties/schema";
export async function getListings() {
  const { data, error } = await (await staffDatabase()).from("properties").select("*").order("updated_at", { ascending: false });
  if (error) throw new Error("Unable to load properties. Check the database configuration.");
  return (data || []) as Listing[];
}
export async function getListing(id: string) {
  const { data, error } = await (await staffDatabase()).from("properties").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error("Unable to load this property.");
  return data as Listing | null;
}
