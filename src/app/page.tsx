import Link from "next/link";
import { properties } from "@/lib/properties";
import { PropertyCard, DemoNotice, Arrow } from "@/components/ui";
import { SearchForm } from "@/components/search-form";

export const metadata = {
  title: "Estate Agents, Letting Agents & Property Management in Oldham",
  description:
    "Explore homes for sale and rent, landlord services and local property expertise from ABS Properties in Oldham, Greater Manchester.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const { items } = await properties.search({ availableOnly: true });
  const areas = [...new Set(items.map((property) => property.location.split(",")[0]))];

  return (
    <>
      <section className="hero-shell" aria-label="ABS Properties hero section">
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-inner container">
          <div className="hero-content">
            <h1>Property made simple.</h1>
            <p className="hero-subheading">
              Sales, lettings and property management across Greater Manchester.
            </p>
            <div className="hero-actions">
              <Link href="/valuation" className="hero-button hero-button-primary">
                Book a Valuation
              </Link>
              <Link href="/properties" className="hero-button hero-button-secondary">
                Find a Property
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="search-wrap container">
        <div className="search-panel">
          <div className="search-heading-row">
            <div>
              <p className="section-kicker">Property search</p>
              <h2>Find your next move.</h2>
            </div>
            <Link className="simple-link" href="/properties">
              Browse all properties <Arrow />
            </Link>
          </div>
          <SearchForm />
        </div>
      </div>

      <section className="container section" aria-labelledby="featured-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Available now</p>
            <h2 id="featured-heading">Featured properties</h2>
          </div>
        </div>
        {!items.length && <p>Contact ABS to discuss current property availability.</p>}
        <div className="property-grid">
          {items.slice(0, 3).map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <div className="section-end">
          <DemoNotice />
          <Link className="simple-link" href="/properties">
            Explore all properties <Arrow />
          </Link>
        </div>
      </section>

      <section className="container section" aria-labelledby="services-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Property expertise</p>
            <h2 id="services-heading">Our services</h2>
          </div>
        </div>
        <div className="service-grid home-services">
          {[
            ["Residential Sales", "Helping you move with confidence and clear advice."],
            ["Residential Lettings", "Professional marketing, tenant matching and support."],
            ["Property Management", "Hands-on management for landlords and investors."],
            ["Landlord Services", "Letting, compliance and tenancy support."],
            ["Commercial Property", "Flexible advice for commercial premises and investments."],
            ["Property Investments", "Targeted opportunities across the region."],
          ].map(([title, description]) => (
            <article key={title} className="service-card">
              <span>{`0${(title.length % 7) + 1}`}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landlord-band">
        <div className="container landlord-layout">
          <div>
            <p className="section-kicker">Landlords</p>
            <h2>Let us take care of your property.</h2>
            <p>
              From rental valuations to ongoing property management, ABS Properties helps you keep your investment performing smoothly.
            </p>
          </div>
          <div className="landlord-actions">
            <Link href="/valuation" className="hero-button hero-button-primary small-button">
              Request a Rental Valuation
            </Link>
            <Link href="/landlords" className="hero-button hero-button-secondary small-button">
              Explore Property Management
            </Link>
          </div>
        </div>
      </section>

      <section className="container section" aria-labelledby="why-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Straightforward service</p>
            <h2 id="why-heading">Why ABS Properties</h2>
          </div>
        </div>
        <div className="feature-grid">
          {[
            "Local knowledge of Oldham and Greater Manchester",
            "Clear communication at each step of the process",
            "Property expertise across sales, lettings and management",
            "Focused on practical support and efficient outcomes",
          ].map((item) => (
            <div key={item} className="feature-box">
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="container section" aria-labelledby="local-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Greater Manchester</p>
            <h2 id="local-heading">Local expertise</h2>
          </div>
        </div>
        <div className="local-grid">
          <article>
            <h3>Oldham property market</h3>
            <p>From first-time buyers to established investors, local demand is shaped by connectivity, schools and investment opportunities across the borough.</p>
          </article>
          <article>
            <h3>Buying and selling locally</h3>
            <p>We help clients navigate pricing, presentation and onward planning with clear local guidance that suits the market.</p>
          </article>
          <article>
            <h3>Lettings and management</h3>
            <p>Our approach focuses on good tenant fit, manageable processes and dependable communication for landlords and tenants alike.</p>
          </article>
        </div>
      </section>

      <section className="container section" aria-labelledby="area-heading">
        <div className="section-heading inline-wrap">
          <div>
            <p className="section-kicker">Local search</p>
            <h2 id="area-heading">Popular areas</h2>
          </div>
        </div>
        <div className="area-list">
          {areas.map((area) => (
            <Link key={area} href={`/properties?location=${encodeURIComponent(area)}`}>
              {area} <Arrow />
            </Link>
          ))}
        </div>
      </section>

      <div className="container cta-panel-wrap">
        <section className="cta-panel" aria-labelledby="move-heading">
          <div>
            <p className="section-kicker">Start your journey</p>
            <h2 id="move-heading">Let’s make your next move.</h2>
          </div>
          <Link href="/contact" className="hero-button hero-button-primary small-button">
            Talk to ABS
          </Link>
        </section>
      </div>
    </>
  );
}
