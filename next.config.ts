import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  async redirects() { return [{ source: "/:path*", has: [{ type: "host", value: "absproperties.uk" }], destination: "https://www.absproperties.uk/:path*", permanent: true }]; },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'",
          },
        ],
      },
    ];
  },
};
export default config;
