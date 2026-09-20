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
  const areas = [...new Set(items.map((property) => property.location.split(",")[0]))];
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
              Book a valuation
            </ButtonLink>
          </div>
        </div>
      </section>
      <div className="container hero-search">
        <div className="search-heading">
          <div>
            <span className="overline">Start your search</span>
            <h2>Find a place that fits.</h2>
          </div>
          <Link className="text-link" href="/properties">Browse all homes <Arrow /></Link>
        </div>
        <SearchForm />
      </div>
      <section className="container area-strip" aria-labelledby="area-heading">
        <div>
          <span className="overline">Example areas</span>
          <h2 id="area-heading">Local search, made clearer.</h2>
        </div>
        <div className="area-list">
          {areas.map((area) => <Link key={area} href={`/properties?location=${encodeURIComponent(area)}`}>{area}<Arrow /></Link>)}
        </div>
      </section>
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
        <section className="container service-grid" aria-labelledby="services-heading">
          <h2 id="services-heading" className="sr-only">Our services</h2>
          <article className="service-card"><span>01</span><h3>Let your property</h3><p>Talk through presentation, marketing, enquiries and the right level of support.</p><Link className="text-link" href="/landlords">For landlords <Arrow /></Link></article>
          <article className="service-card"><span>02</span><h3>Find your next home</h3><p>Search illustrative homes by location, budget, bedrooms and furnishing.</p><Link className="text-link" href="/properties">Explore properties <Arrow /></Link></article>
          <article className="service-card"><span>03</span><h3>Understand the process</h3><p>Get a clearer starting point for your renting journey and the questions to ask.</p><Link className="text-link" href="/tenants">For tenants <Arrow /></Link></article>
        </section>
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
