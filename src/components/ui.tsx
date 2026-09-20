import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/properties/types";
import { money } from "@/lib/site";
export function Arrow() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={"button" + (secondary ? " secondary" : "")} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
export function PropertyCard({ property: p }: { property: Property }) {
  return (
    <article className="property-card">
      <Link href={"/properties/" + p.slug} className="property-photo">
        <Image
          src={p.image}
          alt={p.imageAlt}
          fill
          sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw"
        />
        <span className="photo-label">
          {p.available ? "Available example" : "Let agreed example"}
        </span>
      </Link>
      <div className="property-price">
        {money(p.rentPcm)} <span>pcm</span>
      </div>
      <h3>
        <Link href={"/properties/" + p.slug}>
          {p.title}
          <Arrow />
        </Link>
      </h3>
      <p className="muted">
        {p.location} · {p.postcode}
      </p>
      <p className="property-spec">
        {p.bedrooms === 0 ? "Studio" : p.bedrooms + " bedrooms"} <span>·</span>{" "}
        {p.bathrooms} bathroom{p.bathrooms > 1 ? "s" : ""} <span>·</span>{" "}
        {p.type}
      </p>
      <p className="property-card-description">{p.description}</p>
      <Link className="card-action" href={`/properties/${p.slug}`}>
        View property <Arrow />
      </Link>
    </article>
  );
}
export function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
export function DemoNotice() {
  return (
    <p className="notice">
      Demonstration site: all properties, rents, details and images are
      illustrative. No live availability or bookings.
    </p>
  );
}
export function CallToAction() {
  return (
    <section className="cta">
      <div>
        <h2>Let’s make your next move.</h2>
        <p>A new home. A property to let. A conversation to get started.</p>
      </div>
      <ButtonLink href="/contact" secondary>
        Talk to ABS
      </ButtonLink>
    </section>
  );
}
