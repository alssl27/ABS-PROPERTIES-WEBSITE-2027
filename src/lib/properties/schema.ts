import { z } from "zod";
export const statuses = ["Draft", "Available", "For Sale", "Let Agreed", "Let", "Sold STC", "Sold", "Archived"] as const;
const optionalNumber = z.preprocess(v => v === "" || v == null ? null : v, z.coerce.number().nonnegative().max(1000000000).nullable());
const short = z.string().trim().max(250).default("");
export const propertySchema = z.object({
  reference: z.string().trim().min(1).max(50).regex(/^[a-zA-Z0-9-]+$/, "Use letters, numbers and hyphens for the reference."),
  title: z.string().trim().min(3).max(160),
  listing_type: z.enum(["rent", "sale"]), category: z.enum(["Residential", "Commercial"]),
  property_type: z.enum(["House", "Flat", "Studio", "Bungalow", "Land", "Office", "Retail", "Industrial", "Other"]),
  status: z.enum(statuses), address_line1: z.string().trim().min(3).max(200), address_line2: short,
  area: short, town: z.string().trim().min(2).max(100),
  postcode: z.string().trim().toUpperCase().regex(/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/, "Enter a valid UK postcode."),
  latitude: z.preprocess(v => v === "" || v == null ? null : v, z.coerce.number().min(-90).max(90).nullable()),
  longitude: z.preprocess(v => v === "" || v == null ? null : v, z.coerce.number().min(-180).max(180).nullable()),
  price: z.coerce.number().positive().max(1000000000), price_unit: z.enum(["pcm", "pw", "sale"]), price_qualifier: short,
  deposit: optionalNumber, holding_deposit: optionalNumber,
  bedrooms: z.coerce.number().int().min(0).max(100), bathrooms: z.coerce.number().int().min(0).max(100), reception_rooms: z.coerce.number().int().min(0).max(100),
  furnishing: z.enum(["", "Furnished", "Unfurnished", "Part furnished"]),
  available_date: z.string().refine(v => !v || (/^\d{4}-\d{2}-\d{2}$/.test(v) && !isNaN(Date.parse(v)) && new Date(v).toISOString().startsWith(v)), "Enter a valid date."),
  minimum_tenancy: short, council_tax: short, epc: short,
  summary: z.string().trim().max(500), description: z.string().trim().max(20000),
  features: z.array(z.string().trim().min(1).max(200)).max(30),
  images: z.array(z.string().regex(/^[0-9a-f-]{36}\/[0-9a-f-]{36}\.webp$/)).max(30),
  floorplan: z.union([z.literal(""), z.url().startsWith("https://")]), brochure: z.union([z.literal(""), z.url().startsWith("https://")]),
  featured: z.boolean(),
}).superRefine((v, ctx) => {
  const issue = (path: string, message: string) => ctx.addIssue({ code: "custom", path: [path], message });
  if ((v.listing_type === "sale") !== (v.price_unit === "sale")) issue("price_unit", "Choose a price unit matching the listing type.");
  if (v.listing_type === "sale" && ["Let", "Let Agreed", "Available"].includes(v.status)) issue("status", "Choose a sales status.");
  if (v.listing_type === "rent" && ["For Sale", "Sold", "Sold STC"].includes(v.status)) issue("status", "Choose a letting status.");
  if (!["Draft", "Archived"].includes(v.status)) {
    if (v.description.length < 30) issue("description", "Published listings need a description of at least 30 characters.");
    if (!v.images.length) issue("images", "Upload at least one image before publishing.");
  }
});
export type PropertyInput = z.infer<typeof propertySchema>;
export type Listing = PropertyInput & { id: string; created_at: string; updated_at: string; created_by: string; updated_by: string };
