export type PropertyType = "Flat" | "House" | "Studio";
export type Property = {
  id: string;
  slug: string;
  title: string;
  location: string;
  postcode: string;
  rentPcm: number;
  bedrooms: number;
  bathrooms: number;
  type: PropertyType;
  furnished: "Furnished" | "Unfurnished" | "Part furnished";
  available: boolean;
  image: string;
  imageAlt: string;
  description: string;
  features: string[];
  epc: string;
  councilTaxBand: string;
  deposit: number;
  floorArea: number;
};
export type PropertyQuery = {
  location?: string;
  minBedrooms?: number;
  maxRent?: number;
  type?: PropertyType;
  furnished?: string;
  availableOnly?: boolean;
  sort?: "rent-asc" | "rent-desc" | "bedrooms";
  page?: number;
};
export type PropertyResult = {
  items: Property[];
  total: number;
  page: number;
  pages: number;
};
export interface PropertyRepository {
  search(query: PropertyQuery): Promise<PropertyResult>;
  getBySlug(slug: string): Promise<Property | null>;
  getAllSlugs(): Promise<string[]>;
}
