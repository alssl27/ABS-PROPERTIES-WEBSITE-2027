import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MockPropertyRepository,
  mockProperties,
} from "../src/lib/properties/mock";
import { parsePropertyQuery } from "../src/lib/properties/query";
const repository = new MockPropertyRepository();
test("combined location, rent, bedrooms and availability filtering", async () => {
  const result = await repository.search({
    location: " LONDON ",
    minBedrooms: 2,
    maxRent: 2500,
    availableOnly: true,
  });
  assert.deepEqual(
    result.items.map((p) => p.slug),
    ["garden-flat-chiswick", "cottage-wimbledon"],
  );
  assert.equal(result.total, 2);
});
test("postcode search is case insensitive", async () => {
  assert.equal(
    (await repository.search({ location: "sw4" })).items[0].slug,
    "terrace-clapham",
  );
});
test("sorting does not mutate source order", async () => {
  const before = mockProperties.map((p) => p.id);
  const result = await repository.search({ sort: "rent-asc" });
  assert.equal(result.items[0].rentPcm, 1150);
  assert.deepEqual(
    mockProperties.map((p) => p.id),
    before,
  );
});
test("type and furnishing filters compose", async () => {
  const r = await repository.search({ type: "Flat", furnished: "Furnished" });
  assert.equal(r.total, 1);
  assert.equal(r.items[0].slug, "garden-flat-chiswick");
});
test("empty matches and missing slug are explicit", async () => {
  assert.equal((await repository.search({ location: "nonexistent" })).total, 0);
  assert.equal(await repository.getBySlug("missing"), null);
});
test("page clamps to the available range", async () => {
  assert.equal((await repository.search({ page: 999 })).page, 1);
});
test("query parser rejects invalid and repeated values", () => {
  const q = parsePropertyQuery({
    maxRent: "-1",
    minBedrooms: ["1", "2"],
    type: "Castle",
    sort: "bad",
    page: "Infinity",
  });
  assert.equal(q.maxRent, undefined);
  assert.equal(q.minBedrooms, undefined);
  assert.equal(q.type, undefined);
  assert.equal(q.sort, undefined);
  assert.equal(q.page, undefined);
});
test("valid URL query normalises safely", () => {
  const q = parsePropertyQuery({
    location: "  W4  ",
    maxRent: "2000",
    minBedrooms: "2",
    type: "Flat",
    available: "true",
  });
  assert.equal(q.location, "W4");
  assert.equal(q.maxRent, 2000);
  assert.equal(q.minBedrooms, 2);
  assert.equal(q.availableOnly, true);
});
test("every listing has a unique stable identity and resolvable slug", async () => {
  assert.equal(
    new Set(mockProperties.map((p) => p.id)).size,
    mockProperties.length,
  );
  for (const slug of await repository.getAllSlugs())
    assert.ok(await repository.getBySlug(slug));
});
