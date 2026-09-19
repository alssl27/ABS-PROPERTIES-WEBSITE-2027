import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { properties } from "@/lib/properties";
import { money } from "@/lib/site";
import { ButtonLink, DemoNotice } from "@/components/ui";
export async function generateStaticParams() {
  return (await properties.getAllSlugs()).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await properties.getBySlug(slug);
  return p
    ? {
        title: p.title + " · " + p.location,
        description: p.description,
        alternates: { canonical: "/properties/" + p.slug },
        openGraph: { images: [p.image] },
      }
    : { title: "Property not found" };
}
export default async function PropertyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await properties.getBySlug(slug);
  if (!p) notFound();
  return (
    <div className="container detail">
      <Link className="text-link" href="/properties">
        Back to properties
      </Link>
      <DemoNotice />
      <div className="detail-heading">
        <div>
          <p className="overline">
            {p.location} · {p.postcode}
          </p>
          <h1>{p.title}</h1>
        </div>
        <p className="detail-price">
          {money(p.rentPcm)} <span>pcm</span>
        </p>
      </div>
      <div className="detail-photo">
        <Image
          src={p.image}
          alt={p.imageAlt}
          fill
          preload
          sizes="(max-width: 1400px) 100vw, 1280px"
        />
        <span className="photo-label">
          Illustrative image · not a real listing
        </span>
      </div>
      <div className="detail-layout">
        <div>
          <div className="detail-spec">
            <span>
              {p.bedrooms || "Studio"} {p.bedrooms ? "bedrooms" : ""}
            </span>
            <span>
              {p.bathrooms} bathroom{p.bathrooms > 1 ? "s" : ""}
            </span>
            <span>{p.floorArea} m²</span>
            <span>{p.furnished}</span>
          </div>
          <h2>Space to make your own.</h2>
          <p>{p.description}</p>
          <h3>At a glance</h3>
          <ul className="feature-list">
            {p.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <h3>Property information</h3>
          <dl className="facts">
            {[
              ["Property type", p.type],
              [
                "Status",
                p.available ? "Example available" : "Example let agreed",
              ],
              ["Illustrative deposit", money(p.deposit)],
              ["Example EPC rating", p.epc],
              ["Example council tax band", p.councilTaxBand],
              [
                "Tenure / tenancy terms",
                "To be verified before a real listing is published",
              ],
              [
                "Utilities, broadband & parking",
                "Not verified — demonstration only",
              ],
              [
                "Accessibility, restrictions & flood risk",
                "Not verified — demonstration only",
              ],
            ].map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="small muted">
            All figures and features are mock data. Floorplans, certificates and
            material information must be verified for real listings.
          </p>
        </div>
        <aside className="enquiry-panel">
          <span className="overline">Your next move</span>
          <h2>Like the look of this home?</h2>
          <p>
            This is an example listing. You can explore the enquiry process, but
            viewings cannot be booked.
          </p>
          <ButtonLink href={"/contact?property=" + encodeURIComponent(p.slug)}>
            Explore an enquiry
          </ButtonLink>
          <Link className="text-link" href="/legal/fees">
            Fees & protection information
          </Link>
        </aside>
      </div>
    </div>
  );
}
