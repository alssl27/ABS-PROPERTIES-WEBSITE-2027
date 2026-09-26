import "server-only";
import { configured, database } from "@/lib/supabase";
import type { Listing } from "./schema";
import type { Property, PropertyRepository } from "./types";
export const imageUrl = (path: string) => "/api/images?path=" + encodeURIComponent(path);
function adapt(p: Listing): Property {
  return { id: p.id, slug: p.id, title: p.title, location: [p.address_line1, p.area, p.town].filter(Boolean).join(", "), postcode: p.postcode, rentPcm: p.price, bedrooms: p.bedrooms, bathrooms: p.bathrooms, type: p.property_type, furnished: p.furnishing || "Unfurnished", available: ["Available", "For Sale"].includes(p.status), image: p.images[0] ? imageUrl(p.images[0]) : "/images/no-property-image.svg", imageAlt: p.title, description: p.description, features: p.features, epc: p.epc, councilTaxBand: p.council_tax, deposit: p.deposit || 0, floorArea: 0, listing: p };
}
export const properties: PropertyRepository = {
 async search(q) {
  if (!configured()) return { items: [], total: 0, page: 1, pages: 1 };
  let query = database().from("properties").select("*", { count: "exact" }).not("status", "in", "(Draft,Archived,Let,Sold)");
  if (q.mode === "buy") query = query.eq("listing_type", "sale");
  if (q.mode === "rent") query = query.eq("listing_type", "rent");
  if (q.mode === "commercial") query = query.eq("category", "Commercial");
  if (q.location) { const term = q.location.replace(/[%_,().]/g, " ").trim(); query = query.or(`address_line1.ilike.%${term}%,town.ilike.%${term}%,postcode.ilike.%${term}%,area.ilike.%${term}%`); }
  if (q.minBedrooms !== undefined) query = query.gte("bedrooms", q.minBedrooms);
  if (q.maxRent !== undefined) query = query.lte("price", q.maxRent);
  if (q.type) query = query.eq("property_type", q.type);
  if (q.furnished) query = query.eq("furnishing", q.furnished);
  if (q.availableOnly) query = query.in("status", ["Available", "For Sale"]);
  query = query.order(q.sort === "bedrooms" ? "bedrooms" : q.sort ? "price" : "featured", { ascending: q.sort === "rent-asc" }).order("id");
  const page = Math.max(1, q.page || 1);
  const { data, count, error } = await query.range((page - 1) * 12, page * 12 - 1);
  if (error) throw new Error("Property listings are temporarily unavailable. Please try again later.");
  return { items: ((data || []) as Listing[]).map(adapt), total: count || 0, page, pages: Math.max(1, Math.ceil((count || 0) / 12)) };
 },
 async getBySlug(slug) {
  if (!configured() || !/^[0-9a-f-]{36}$/.test(slug)) return null;
  const { data, error } = await database().from("properties").select("*").eq("id", slug).not("status", "in", "(Draft,Archived)").maybeSingle();
  if (error) throw new Error("Unable to load the property.");
  return data ? adapt(data as Listing) : null;
 },
 async getAllSlugs() {
  if (!configured()) return [];
  const { data, error } = await database().from("properties").select("id").not("status", "in", "(Draft,Archived,Let,Sold)");
  if (error) throw new Error("Unable to load property URLs.");
  return (data || []).map(p => String(p.id));
 }
};
