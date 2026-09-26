import Link from "next/link";
import Image from "next/image";
import { PageIntro, ButtonLink, CallToAction } from "@/components/ui";
export const metadata = {
  title: "Tenants",
  description:
    "A clear starting point for your renting journey with ABS Properties.",
  alternates: { canonical: "/tenants" },
};
export default function Tenants() {
  return (
    <div className="container">
      <PageIntro
        title="Make yourself at home."
        description="A clearer path from your first search to your next chapter."
      />
      <ButtonLink href="/properties">Explore homes</ButtonLink>
      <section className="tenant-feature" aria-labelledby="tenant-feature-heading">
        <div className="tenant-feature-image">
          <Image
            src="/images/moving-home.jpeg"
            alt="People holding keys while moving into a home"
            fill
            sizes="(max-width:760px) 100vw, 45vw"
          />
        </div>
        <div>
          <span className="overline">A considered move</span>
          <h2 id="tenant-feature-heading">
            Know what to ask before you commit.
          </h2>
          <p>
            Use each stage of the journey to check the practical details:
            costs, documents, accessibility, repairs and move-in arrangements.
          </p>
        </div>
      </section>
      <div className="steps">
        {[
          [
            "01",
            "Find your fit",
            "Search by location, budget, bedrooms and the details that matter to you.",
          ],
          [
            "02",
            "Ask the right questions",
            "Confirm availability, costs, tenancy terms, accessibility and property details before making a decision.",
          ],
          [
            "03",
            "Plan your move",
            "For a real tenancy, review the agreement and confirmed move-in arrangements before committing.",
          ],
        ].map(([n, t, d]) => (
          <div className="step" key={n}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
      <section className="faq">
        <h2>A little help along the way.</h2>
        <details>
          <summary>Can I book a viewing here?</summary>
          <p>
            Use the viewing enquiry link on a property page. Our team will contact
            you to confirm availability and arrange an appointment.
          </p>
        </details>
        <details>
          <summary>Where can I find fees and deposit information?</summary>
          <p>
            See our{" "}
            <Link className="text-link" href="/legal/fees">
              fees and protection page
            </Link>
            . The final fee schedule and applicable terms need verification
            before the site launches.
          </p>
        </details>
        <details>
          <summary>How do I report a repair?</summary>
          <p>
            For urgent repairs, existing tenants should use the contact details in
            their tenancy documents. Do not rely on this site for urgent
            assistance.
          </p>
        </details>
        <details>
          <summary>Are property photographs and details accurate?</summary>
          <p>
            Property photographs and details are supplied by staff. Please confirm
            the current availability and any details important to you with ABS.
          </p>
        </details>
      </section>
      <CallToAction />
    </div>
  );
}
