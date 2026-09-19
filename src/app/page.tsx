import Image from "next/image";
import Link from "next/link";
import { properties } from "@/lib/properties";
import {
  ButtonLink,
  PropertyCard,
  CallToAction,
  DemoNotice,
  Arrow,
} from "@/components/ui";
import { SearchForm } from "@/components/search-form";
export const metadata = { alternates: { canonical: "/" } };
export default async function Home() {
  const { items } = await properties.search({ availableOnly: true });
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            Find your
            <br />
            new home.
          </h1>
          <p>Thoughtful lettings and property management, built around you.</p>
          <div className="button-row">
            <ButtonLink href="/properties">Find a home</ButtonLink>
            <ButtonLink href="/landlords" secondary>
              Let your property
            </ButtonLink>
          </div>
        </div>
        <div className="hero-photo">
          <Image
            src="/images/interior.webp"
            alt="Illustrative light-filled British living room"
            fill
            preload
            sizes="(max-width: 760px) 100vw, 60vw"
          />
        </div>
      </section>
      <div className="container hero-search">
        <SearchForm />
      </div>
      <section className="container section">
        <div className="section-heading">
          <h2>Find your next chapter.</h2>
          <span className="overline">Demonstration properties</span>
        </div>
        <div className="property-grid">
          {items.slice(0, 3).map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="section-end">
          <DemoNotice />
          <Link className="text-link" href="/properties">
            Explore all properties
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="service-band">
        <div className="container service-layout">
          <div>
            <span className="overline">For landlords</span>
            <h2>
              Your property.
              <br />
              Our attention.
            </h2>
            <p>
              From finding the right tenant to looking after the everyday
              details, choose the support that fits your property.
            </p>
            <ButtonLink href="/landlords" secondary>
              Explore our services
            </ButtonLink>
          </div>
          <div className="service-list">
            {[
              [
                "01",
                "Letting your property",
                "A considered approach to marketing, viewings and finding a tenant.",
              ],
              [
                "02",
                "Managing the day to day",
                "A clear point of contact for maintenance and tenancy coordination.",
              ],
              [
                "03",
                "Keeping you informed",
                "Straightforward communication throughout your letting journey.",
              ],
            ].map(([n, t, d]) => (
              <div key={n}>
                <span>{n}</span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="container section tenant-section">
        <span className="overline">For tenants</span>
        <h2>
          A little clarity.
          <br />A better move.
        </h2>
        <p>
          From your first viewing to settling in, know what to expect at every
          step.
        </p>
        <ButtonLink href="/tenants">Your renting journey</ButtonLink>
      </section>
      <div className="container">
        <CallToAction />
      </div>
    </>
  );
}
