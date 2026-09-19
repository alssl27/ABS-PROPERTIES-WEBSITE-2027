export const site = {
  name: "ABS Properties",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  officeAddress: process.env.NEXT_PUBLIC_OFFICE_ADDRESS || "",
  officeHours: process.env.NEXT_PUBLIC_OFFICE_HOURS || "",
  mapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
};
export const money = (value: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
export const isIndexable =
  process.env.SITE_INDEXABLE === "true" &&
  process.env.PROPERTY_DATA_SOURCE !== "mock" &&
  !!process.env.PROPERTY_DATA_SOURCE &&
  process.env.VERCEL_ENV !== "preview";
