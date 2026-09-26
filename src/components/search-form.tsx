import type { PropertyQuery } from "@/lib/properties/types";
export function SearchForm({
  query = {},
  expanded = false,
}: {
  query?: PropertyQuery;
  expanded?: boolean;
}) {
  return (
    <form
      action="/properties"
      className={"search-form" + (expanded ? " expanded" : "")}
      role="search"
    >
      {expanded && <label>Listing type<select name="mode" defaultValue={query.mode || ""}><option value="">All properties</option><option value="rent">To rent</option><option value="buy">For sale</option><option value="commercial">Commercial</option></select></label>}
      {!expanded && (
        <fieldset className="search-mode">
          <legend>Search for</legend>
          <label>
            <input type="radio" name="mode" value="rent" defaultChecked />
            <span>Rent</span>
          </label>
          <label>
            <input type="radio" name="mode" value="buy" />
            <span>Buy</span>
          </label>
        </fieldset>
      )}
      <label>
        Location
        <input
          name="location"
          placeholder="Town, area or postcode"
          defaultValue={query.location}
          maxLength={100}
        />
      </label>
      <label>
        Bedrooms
        <select name="minBedrooms" defaultValue={query.minBedrooms ?? ""}>
          <option value="">Any bedrooms</option>
          {query.minBedrooms !== undefined &&
            ![1, 2, 3, 4].includes(query.minBedrooms) && (
              <option value={query.minBedrooms}>
                {query.minBedrooms}+ bedrooms
              </option>
            )}
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}+ bedrooms
            </option>
          ))}
        </select>
      </label>
      <label>
        Maximum price
        <select name="maxRent" defaultValue={query.maxRent ?? ""}>
          <option value="">Any price</option>
          {query.maxRent !== undefined &&
            ![1000, 1500, 2000, 3000, 100000, 200000, 300000, 500000].includes(
              query.maxRent,
            ) && (
              <option value={query.maxRent}>
                £{query.maxRent.toLocaleString("en-GB")}
              </option>
            )}
          {[1250, 1500, 1750, 2000, 2500, 3000, 3500].map((n) => (
            <option key={n} value={n}>
              £{n.toLocaleString("en-GB")}
            </option>
          ))}
        </select>
      </label>
      {expanded && (
        <>
          <label>
            Property type
            <select name="type" defaultValue={query.type ?? ""}>
              <option value="">All types</option>
              {["Flat", "House", "Studio"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            Furnishing
            <select name="furnished" defaultValue={query.furnished ?? ""}>
              <option value="">Any furnishing</option>
              {["Furnished", "Unfurnished", "Part furnished"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label>
            Sort by
            <select name="sort" defaultValue={query.sort ?? ""}>
              <option value="">Featured</option>
              <option value="rent-asc">Price: low to high</option>
              <option value="rent-desc">Price: high to low</option>
              <option value="bedrooms">Most bedrooms</option>
            </select>
          </label>
          <label className="checkbox">
            <input
              name="available"
              type="checkbox"
              value="true"
              defaultChecked={query.availableOnly}
            />{" "}
            Available only
          </label>
        </>
      )}
      <button className="button" type="submit">
        {expanded ? "Apply filters" : "Find a home"}
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="10" cy="10" r="6" />
          <path d="m15 15 6 6" />
        </svg>
      </button>
    </form>
  );
}
