import Link from "next/link";
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
      <div className="steps">
        {[
          [
            "01",
            "Find your fit",
            "Search by location, budget, bedrooms and the details that matter to you. All current listings are examples.",
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
            These are fictional properties. The enquiry journey is available to
            explore, but this site does not accept viewing bookings.
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
            The maintenance reporting service is not connected in this
            demonstration. Existing tenants should use the contact details in
            their tenancy documents. Do not rely on this site for urgent
            assistance.
          </p>
        </details>
        <details>
          <summary>Are property photographs and details accurate?</summary>
          <p>
            All current photographs are AI-generated illustrations. Prices,
            addresses, features and availability are mock data, not an offer to
            let.
          </p>
        </details>
      </section>
      <CallToAction />
    </div>
  );
}
