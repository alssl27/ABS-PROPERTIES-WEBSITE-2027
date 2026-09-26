import type { MetadataRoute } from "next";
import { properties } from "@/lib/properties";
import { site, isIndexable } from "@/lib/site";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexable) return [];
  return [
    "",
    "/properties",
    "/properties/to-rent",
    "/properties/for-sale",
    "/contact",
    "/landlords",
    "/tenants",
    "/about",
    ...(await properties.getAllSlugs()).map((s) => "/properties/" + s),
  ].map((path) => ({ url: site.url + path }));
}
