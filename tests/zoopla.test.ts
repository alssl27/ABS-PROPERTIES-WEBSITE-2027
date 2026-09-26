import { test } from "node:test";
import assert from "node:assert/strict";
import {
  isZooplaConfigured,
  mapPropertyToZooplaPayload,
  getZooplaStatus,
} from "../src/lib/integrations/zoopla";

test("zoopla config is not active without feed credentials", () => {
  assert.equal(isZooplaConfigured(), false);
  assert.equal(getZooplaStatus().status, "Not Configured");
});

test("internal property mapping creates a safe, provider-neutral payload", () => {
  const payload = mapPropertyToZooplaPayload({
    id: "prop-001",
    title: "3 Bedroom House",
    status: "Available",
    transactionType: "sale",
    propertyType: "House",
    price: 250000,
    priceQualifier: "Guide Price",
    address: {
      line1: "12 Oak Street",
      town: "Oldham",
      postcode: "OL1 1AA",
      country: "United Kingdom",
    },
    bedrooms: 3,
    bathrooms: 2,
    description: "Spacious family home.",
    features: ["Driveway", "Garden"],
    images: ["/images/house.webp"],
    published: true,
  });

  assert.equal(payload.externalId, "prop-001");
  assert.equal(payload.status, "available");
  assert.equal(payload.price, 250000);
  assert.equal(payload.address.postcode, "OL1 1AA");
  assert.equal(payload.images.length, 1);
});
