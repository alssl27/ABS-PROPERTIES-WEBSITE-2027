import type { Property, PropertyQuery, PropertyRepository } from "./types";
const seeds = [
  [
    "garden-flat-chiswick",
    "The Garden Flat",
    "Chiswick, London",
    "W4",
    1850,
    2,
    1,
    "Flat",
    "Furnished",
    true,
    "interior",
    68,
  ],
  [
    "terrace-clapham",
    "Maple Terrace",
    "Clapham, London",
    "SW4",
    2650,
    3,
    2,
    "House",
    "Unfurnished",
    true,
    "kitchen",
    112,
  ],
  [
    "townhouse-islington",
    "The Willow House",
    "Islington, London",
    "N1",
    3200,
    4,
    2,
    "House",
    "Part furnished",
    true,
    "bedroom",
    136,
  ],
  [
    "studio-ealing",
    "The Courtyard Studio",
    "Ealing, London",
    "W5",
    1150,
    0,
    1,
    "Studio",
    "Furnished",
    true,
    "interior",
    32,
  ],
  [
    "apartment-richmond",
    "Parkside Apartment",
    "Richmond, London",
    "TW9",
    1650,
    1,
    1,
    "Flat",
    "Part furnished",
    false,
    "interior",
    51,
  ],
  [
    "cottage-wimbledon",
    "Rose Cottage",
    "Wimbledon, London",
    "SW19",
    2250,
    2,
    1,
    "House",
    "Unfurnished",
    true,
    "terraces",
    85,
  ],
] as const;
export const mockProperties: Property[] = seeds.map((s, i) => ({
  id: "demo-" + (i + 1),
  slug: s[0],
  title: s[1],
  location: s[2],
  postcode: s[3],
  rentPcm: s[4],
  bedrooms: s[5],
  bathrooms: s[6],
  type: s[7],
  furnished: s[8],
  available: s[9],
  image: "/images/" + s[10] + ".webp",
  imageAlt: {
    interior:
      "Illustrative light-filled lounge with a fireplace and bay windows",
    kitchen: "Illustrative sage kitchen with garden doors",
    bedroom: "Illustrative peaceful bedroom with linen bedding",
    terraces: "Illustrative leafy street of British brick terraced homes",
  }[s[10]],
  floorArea: s[11],
  description:
    "An inviting space with considered interiors, generous natural light and room for everyday living. This fictional listing demonstrates the information you can expect when exploring a home with ABS Properties. The photograph is illustrative and does not represent an actual property.",
  features: [
    "Generous natural light",
    "Well-proportioned living space",
    s[7] === "House" ? "Private outdoor space" : "Thoughtful interior layout",
    "Convenient neighbourhood setting",
  ],
  epc: "C",
  councilTaxBand: "D",
  deposit: Math.round(((s[4] * 12) / 52) * 5),
}));
export class MockPropertyRepository implements PropertyRepository {
  async search(query: PropertyQuery) {
    const location = (query.location ?? "").trim().toLowerCase();
    const filtered = mockProperties.filter(
      (p) =>
        (!location ||
          (p.location + " " + p.postcode + " " + p.title)
            .toLowerCase()
            .includes(location)) &&
        (query.minBedrooms === undefined || p.bedrooms >= query.minBedrooms) &&
        (query.maxRent === undefined || p.rentPcm <= query.maxRent) &&
        (!query.type || p.type === query.type) &&
        (!query.furnished || p.furnished === query.furnished) &&
        (!query.availableOnly || p.available),
    );
    if (query.sort === "rent-asc")
      filtered.sort((a, b) => a.rentPcm - b.rentPcm);
    if (query.sort === "rent-desc")
      filtered.sort((a, b) => b.rentPcm - a.rentPcm);
    if (query.sort === "bedrooms")
      filtered.sort((a, b) => b.bedrooms - a.bedrooms);
    const pages = Math.max(1, Math.ceil(filtered.length / 6));
    const page = Math.min(pages, Math.max(1, Math.floor(query.page || 1)));
    return {
      items: filtered.slice((page - 1) * 6, page * 6),
      total: filtered.length,
      page,
      pages,
    };
  }
  async getBySlug(slug: string) {
    return mockProperties.find((p) => p.slug === slug) ?? null;
  }
  async getAllSlugs() {
    return mockProperties.map((p) => p.slug);
  }
}
