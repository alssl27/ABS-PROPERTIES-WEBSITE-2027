import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { site, isIndexable } from "@/lib/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ABS Properties | UK Lettings & Property Management",
    template: "%s | ABS Properties",
  },
  description:
    "Thoughtful lettings and property management, built around you. Explore homes, landlord services and a clearer renting journey with ABS Properties.",
  keywords: [
    "lettings",
    "property management",
    "rental properties",
    "landlords",
    "tenants",
  ],
  robots: { index: isIndexable, follow: isIndexable },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: site.name,
    description: "Homes, thoughtfully managed.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: site.name,
  url: site.url,
  email: site.email || undefined,
  telephone: site.phone || undefined,
  address: site.officeAddress || undefined,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
      </body>
    </html>
  );
}
