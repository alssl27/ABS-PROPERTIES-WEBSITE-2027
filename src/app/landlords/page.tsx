import Image from "next/image";
import { PageIntro, ButtonLink, CallToAction } from "@/components/ui";
export const metadata = {
  title: "Landlords",
  description:
    "Explore letting and property management support with ABS Properties.",
  alternates: { canonical: "/landlords" },
};
export default function Landlords() {
  return (
    <div className="container">
      <PageIntro
        title="Your property. Our attention."
        description="Letting and management support, shaped around what you need."
      />
      <div className="content-grid">
        <div>
          <h2>A considered approach to letting.</h2>
          <p>
            Whether you are letting your first property or looking for help with
            an existing portfolio, a clear plan makes the difference.
          </p>
          <p>
            Discuss marketing, tenant enquiries and day-to-day management with
            ABS. Service scope and fees will be agreed before any instruction.
          </p>
          <div className="button-row mt-8">
            <ButtonLink href="/contact?topic=valuation">
              Discuss your property
            </ButtonLink>
          </div>
        </div>
        <div className="content-image">
          <Image
            src="/images/terraces.webp"
            alt="Illustrative British terraced homes with leafy front gardens"
            fill
            sizes="(max-width:760px) 100vw, 45vw"
          />
        </div>
      </div>
      <div className="steps">
        {[
          [
            "01",
            "Tenant find",
            "Discuss property presentation, marketing, enquiries and viewings.",
          ],
          [
            "02",
            "Letting coordination",
            "Get clarity on the proposed tenancy process, documents and responsibilities.",
          ],
          [
            "03",
            "Property management",
            "Explore maintenance coordination and an ongoing point of contact.",
          ],
        ].map(([n, t, d]) => (
          <div className="step" key={n}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
      <section className="trust-panel" aria-labelledby="trust-heading">
        <div className="trust-panel-image">
          <Image
            src="/images/terraces.webp"
            alt="Illustrative residential terraces"
            fill
            sizes="(max-width:760px) 100vw, 45vw"
          />
        </div>
        <div className="trust-panel-copy">
          <span className="overline">Information to verify</span>
          <h2 id="trust-heading">
            Good management starts with clear responsibilities.
          </h2>
          <p>
            Fees, protection arrangements, memberships and service scope should
            be confirmed in writing before any instruction is accepted.
          </p>
          <div className="trust-badge">
            <Image
              src="/images/dps-logo.jpeg"
              alt="Deposit Protection Service logo"
              width={96}
              height={96}
            />
            <p className="small">
              Deposit protection information is shown for context only and
              requires verification before launch.
            </p>
          </div>
        </div>
      </section>
      <section className="faq">
        <h2>Good questions. Clear beginnings.</h2>
        <details>
          <summary>What will it cost?</summary>
          <p>
            Fees and service packages have not yet been supplied for this
            website. A verified, VAT-inclusive fee schedule must be
            published before launch. No price or service commitment is implied.
          </p>
        </details>
        <details>
          <summary>How do I arrange a valuation?</summary>
          <p>
            Use the contact page to request a valuation. Our team will contact
            you to confirm the details and arrange an appointment.
          </p>
        </details>
        <details>
          <summary>Can you manage an occupied property?</summary>
          <p>
            The team would need to review the existing tenancy, records and
            current arrangements before agreeing the scope of a management
            handover.
          </p>
        </details>
      </section>
      <CallToAction />
    </div>
  );
}
