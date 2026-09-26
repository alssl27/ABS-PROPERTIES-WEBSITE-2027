export type ZooplaStatus =
  | "Not Configured"
  | "Configured"
  | "Connected"
  | "Error";

export type ZooplaSyncAction = "CREATE" | "UPDATE" | "WITHDRAW" | "DELETE";

export type ZooplaSyncStatus =
  | "Not Published"
  | "Queued"
  | "Sending"
  | "Processing"
  | "Live"
  | "Update Pending"
  | "Error"
  | "Withdrawn";

export type ZooplaPropertyPayload = {
  externalId: string;
  status: string;
  listingType: "sale" | "rent" | "commercial";
  propertyType: string;
  price: number | null;
  priceQualifier?: string;
  address: {
    line1?: string;
    line2?: string;
    town?: string;
    county?: string;
    postcode?: string;
    country?: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  features: string[];
  images: string[];
  published: boolean;
};

export function getZooplaEnvironment() {
  return {
    clientId: process.env.ZOOPLA_CLIENT_ID || "",
    clientSecret: process.env.ZOOPLA_CLIENT_SECRET || "",
    branchId: process.env.ZOOPLA_BRANCH_ID || "",
    feedUrl: process.env.ZOOPLA_FEED_URL || "",
    certificateReference: process.env.ZOOPLA_CERTIFICATE_REFERENCE || "",
    environment: process.env.ZOOPLA_ENVIRONMENT || "sandbox",
  };
}

export function isZooplaConfigured() {
  const config = getZooplaEnvironment();
  return Boolean(
    config.clientId ||
      config.branchId ||
      config.feedUrl ||
      config.certificateReference ||
      config.clientSecret,
  );
}

export function getZooplaStatus() {
  const configured = isZooplaConfigured();
  if (!configured) {
    return { status: "Not Configured" as const, configured: false };
  }

  return {
    status: "Configured" as const,
    configured: true,
    environment: getZooplaEnvironment().environment,
  };
}

export function mapPropertyToZooplaPayload(input: {
  id: string;
  title: string;
  status: string;
  transactionType: "sale" | "rent" | "commercial";
  propertyType: string;
  price: number | null;
  priceQualifier?: string;
  address: {
    line1?: string;
    line2?: string;
    town?: string;
    county?: string;
    postcode?: string;
    country?: string;
  };
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  features?: string[];
  images?: string[];
  published?: boolean;
}): ZooplaPropertyPayload {
  return {
    externalId: input.id,
    status: input.status.toLowerCase().replace(/\s+/g, "-"),
    listingType: input.transactionType,
    propertyType: input.propertyType,
    price: input.price ?? null,
    priceQualifier: input.priceQualifier,
    address: {
      line1: input.address.line1,
      line2: input.address.line2,
      town: input.address.town,
      county: input.address.county,
      postcode: input.address.postcode,
      country: input.address.country || "United Kingdom",
    },
    bedrooms: input.bedrooms,
    bathrooms: input.bathrooms,
    description: input.description,
    features: input.features ?? [],
    images: input.images ?? [],
    published: input.published ?? false,
  };
}

export function createZooplaSyncJob(propertyId: string, action: ZooplaSyncAction) {
  return {
    id: `zoopla-${propertyId}-${Date.now()}`,
    propertyId,
    provider: "Zoopla",
    action,
    status: "Queued",
    attempts: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastError: null,
  };
}

export function getZooplaSetupChecklist() {
  return [
    "Confirmed Zoopla branch ID and authorised feed approval.",
    "Verified client identifier and environment (sandbox or live).",
    "Received any required certificate reference or secure endpoint details.",
    "Confirmed the listing update, withdrawal and image handling rules.",
    "Validated the ABS Properties data mapping for price, status, tenancy and material information.",
    "Configured server-side credentials using environment variables only.",
  ];
}
