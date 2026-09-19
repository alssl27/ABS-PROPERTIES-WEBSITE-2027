import type { MetadataRoute } from "next";
import { site, isIndexable } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isIndexable
        ? { allow: "/", disallow: ["/legal/", "/contact"] }
        : { disallow: "/" }),
    },
    sitemap: site.url + "/sitemap.xml",
  };
}
