import { PageIntro } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";
import { properties } from "@/lib/properties";
import type { SearchParams } from "@/lib/properties/query";
export const metadata = {
  title: "Contact",
  description:
    "Start a conversation about lettings or property management with ABS Properties.",
  alternates: { canonical: "/contact" },
};
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const slug = typeof params.property === "string" ? params.property : "";
  const property = slug ? await properties.getBySlug(slug) : null;
  const topic = typeof params.topic === "string" ? params.topic : "";
  return (
    <div className="container">
      <PageIntro
        title="Let’s talk property."
        description="A new home, a property to let, or a question along the way."
      />
      <div className="contact-grid">
        <div>
          <h2>Start with a conversation.</h2>
          <p>
            Tell us a little about what you are looking for using the enquiry
            preview.
          </p>
          {site.email ? (
            <p>
              <a className="text-link" href={"mailto:" + site.email}>
                {site.email}
              </a>
            </p>
          ) : (
            <p className="notice">
              Verified email, phone number, office address and opening hours
              will be added before launch.
            </p>
          )}
          <p className="notice">
            This demonstration does not offer a live contact or emergency
            reporting service. Existing tenants should refer to their tenancy
            documents.
          </p>
        </div>
        <ContactForm
          property={property?.title}
          topic={topic}
          email={site.email}
        />
      </div>
    </div>
  );
}
