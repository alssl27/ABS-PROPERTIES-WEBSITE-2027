import Link from "next/link";
import { properties } from "@/lib/properties";
import { parsePropertyQuery, type SearchParams } from "@/lib/properties/query";
import { PageIntro, PropertyCard, DemoNotice } from "@/components/ui";
import { SearchForm } from "@/components/search-form";
export const metadata = {
  title: "Properties for sale and rent in Oldham",
  description:
    "Explore properties for sale and to rent in Oldham and Greater Manchester.",
  alternates: { canonical: "/properties" },
};
export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const query = parsePropertyQuery(params);
  const result = await properties.search(query);
  const hasFilters = Boolean(
    query.mode || query.location ||
      query.minBedrooms !== undefined ||
      query.maxRent !== undefined ||
      query.type ||
      query.furnished ||
      query.availableOnly ||
      query.sort,
  );
  function pageHref(page: number) {
    const next = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string" && key !== "page") next.set(key, value);
    }
    next.set("page", String(page));
    return `/properties?${next.toString()}`;
  }
  return (
    <div className="container">
      <PageIntro
        title="Somewhere to call home."
        description="Find a space that fits the way you live."
      />
      <SearchForm key={JSON.stringify(query)} query={query} expanded />
      <div className="results-heading">
        <h2>
          {result.total} {result.total === 1 ? "home" : "homes"} found
        </h2>
        {hasFilters && (
          <Link className="text-link" href="/properties">
            Clear filters
          </Link>
        )}
      </div>
      {hasFilters && (
        <div className="active-filters" aria-label="Active search filters">
          {query.location && <span>Location: {query.location}</span>}
          {query.minBedrooms !== undefined && (
            <span>{query.minBedrooms}+ bedrooms</span>
          )}
          {query.maxRent !== undefined && (
            <span>Up to £{query.maxRent.toLocaleString("en-GB")} pcm</span>
          )}
          {query.type && <span>{query.type}</span>}
          {query.furnished && <span>{query.furnished}</span>}
          {query.availableOnly && <span>Available properties</span>}
          {query.sort && (
            <span>
              Sorted:{" "}
              {query.sort === "rent-asc"
                ? "lowest rent"
                : query.sort === "rent-desc"
                  ? "highest rent"
                  : "most bedrooms"}
            </span>
          )}
        </div>
      )}
      <DemoNotice />
      {result.items.length ? (
        <div className="property-grid results-grid">
          {result.items.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matching homes just yet.</h2>
          <p>Try a wider location, a higher budget or fewer filters.</p>
          <Link className="button" href="/properties">
            Reset your search
          </Link>
        </div>
      )}
      {result.pages > 1 && (
        <nav className="pagination" aria-label="Property result pages">
          {result.page > 1 && (
            <Link className="button secondary" href={pageHref(result.page - 1)}>
              Previous
            </Link>
          )}
          <span>
            Page {result.page} of {result.pages}
          </span>
          {result.page < result.pages && (
            <Link className="button" href={pageHref(result.page + 1)}>
              Next
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
