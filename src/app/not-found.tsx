import { ButtonLink, PageIntro } from "@/components/ui";
export default function NotFound() {
  return (
    <div className="container section">
      <PageIntro
        title="This address isn’t here."
        description="The page may have moved, or the property may no longer be listed."
      />
      <ButtonLink href="/properties">Explore properties</ButtonLink>
    </div>
  );
}
