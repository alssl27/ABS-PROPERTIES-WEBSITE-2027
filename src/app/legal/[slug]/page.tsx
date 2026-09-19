import Link from "next/link";
import { notFound } from "next/navigation";
import { legalPages } from "@/lib/legal";
import { PageIntro } from "@/components/ui";
export function generateStaticParams() {
  return Object.keys(legalPages).map((slug) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = Object.hasOwn(legalPages, slug) ? legalPages[slug] : undefined;
  return {
    title: p?.title ?? "Not found",
    description: p?.description,
    alternates: { canonical: "/legal/" + slug },
    robots: { index: false, follow: false },
  };
}
export default async function Legal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = Object.hasOwn(legalPages, slug) ? legalPages[slug] : undefined;
  if (!page) notFound();
  return (
    <div className="container legal">
      <PageIntro title={page.title} description={page.description} />
      <p className="placeholder">
        <strong>Pre-launch placeholder.</strong> This page requires
        business-specific review and approval before the site is used for live
        lettings. It is not a final legal policy.
      </p>
      {page.sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          <p>{s.text}</p>
        </section>
      ))}
      <nav className="legal-nav" aria-label="Legal information">
        {Object.entries(legalPages).map(([key, p]) => (
          <Link key={key} href={"/legal/" + key}>
            {p.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}
