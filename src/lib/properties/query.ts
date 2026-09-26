import type { PropertyQuery, PropertyType } from "./types";
export type SearchParams = Record<string, string | string[] | undefined>;
export function parsePropertyQuery(params: SearchParams): PropertyQuery {
  const one = (key: string) =>
    typeof params[key] === "string" ? (params[key] as string) : "";
  const number = (key: string, max: number) => {
    const s = one(key);
    if (!/^\d+$/.test(s)) return undefined;
    const n = Number(s);
    return Number.isSafeInteger(n) && n <= max ? n : undefined;
  };
  const type = one("type");
  const furnished = one("furnished");
  const sort = one("sort");
  return {
    mode: ["buy", "rent", "commercial"].includes(one("mode")) ? one("mode") : undefined,
    location: one("location").trim().slice(0, 100),
    minBedrooms: number("minBedrooms", 10),
    maxRent: number("maxRent", 1000000000),
    type: ["Flat", "House", "Studio"].includes(type)
      ? (type as PropertyType)
      : undefined,
    furnished: ["Furnished", "Unfurnished", "Part furnished"].includes(
      furnished,
    )
      ? furnished
      : undefined,
    availableOnly: one("available") === "true",
    sort: ["rent-asc", "rent-desc", "bedrooms"].includes(sort)
      ? (sort as PropertyQuery["sort"])
      : undefined,
    page: number("page", 10000),
  };
}
