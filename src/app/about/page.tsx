import Image from "next/image";
import { PageIntro, CallToAction } from "@/components/ui";
export const metadata = {
  title: "About",
  description:
    "Meet the approach behind ABS Properties: thoughtful lettings and property management.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <div className="container">
      <PageIntro
        title="Property is personal."
        description="A home for someone. An investment for someone else. Care matters to both."
      />
      <div className="content-grid">
        <div className="content-image">
          <Image
            src="/images/interior.webp"
            alt="Illustrative comfortable living room with natural light"
            fill
            sizes="(max-width:760px) 100vw, 50vw"
          />
        </div>
        <div>
          <h2>Homes, thoughtfully managed.</h2>
          <p>
            ABS Properties is the brand behind this lettings and management
            website. It brings the property search, landlord services and tenant
            information together in one clear place.
          </p>
          <p>
            Our approach starts with listening, explaining the next steps and
            keeping the practical details visible.
          </p>
          <p className="notice">
            Company history, team biographies, service areas and professional
            credentials will be added once confirmed by ABS. This demonstration
            makes no claims about memberships, awards or trading history.
          </p>
        </div>
      </div>
      <div className="steps">
        {[
          [
            "01",
            "Clarity",
            "Straightforward information, with the details you need to take the next step.",
          ],
          [
            "02",
            "Consideration",
            "A thoughtful experience for the people on both sides of a tenancy.",
          ],
          [
            "03",
            "Communication",
            "A focus on keeping conversations and responsibilities clear.",
          ],
        ].map(([n, t, d]) => (
          <div className="step" key={n}>
            <span>{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </div>
      <CallToAction />
    </div>
  );
}
