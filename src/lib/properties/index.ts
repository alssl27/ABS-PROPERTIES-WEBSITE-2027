import "server-only";
import { MockPropertyRepository } from "./mock";
import type { PropertyRepository } from "./types";
function createRepository(): PropertyRepository {
  const source = process.env.PROPERTY_DATA_SOURCE || "mock";
  if (source !== "mock")
    throw new Error(
      "Unsupported PROPERTY_DATA_SOURCE. Only mock is implemented; configure an authorised feed adapter before changing this value.",
    );
  return new MockPropertyRepository();
}
export const properties = createRepository();
