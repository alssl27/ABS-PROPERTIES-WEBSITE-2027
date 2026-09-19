# ABS Properties

A Next.js App Router website for UK lettings and management, using React, TypeScript and Tailwind CSS. All property data is fictional. This is a deployable demonstration foundation, **not cleared for public business launch** until the checklist below is complete.

## Local setup

Use Node.js 22 LTS or newer and npm. The lockfile records exact dependencies.

```sh
npm ci
# Copy .env.example to .env.local and edit public business settings as needed.
npm run dev
```

Open http://localhost:3000. On PowerShell, copy the environment example with `Copy-Item .env.example .env.local`.

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
# Or run all automated quality gates:
npm run check
```

The development server binds to loopback by default. `npm start` serves the production build. Do not expose the development server publicly.

## Pages and functionality

- Home with room photography and a GET-based property search.
- Properties: location/postcode, minimum bedrooms, maximum monthly rent, property type, furnishing, example availability and sorting. URL state is shareable and works without client JavaScript.
- Property detail: stable slug URLs, sample features and material-information fields, enquiry link and genuine 404s.
- Landlords, Tenants, About and Contact.
- Privacy, cookies, website terms, fees/client protection, complaints/redress and accessibility placeholders.
- Responsive navigation, labelled controls, visible focus, skip link and reduced-motion support.
- Metadata, canonical URLs, social image, robots and sitemap routes. Mock deployments are deliberately noindex with an empty sitemap, regardless of `SITE_INDEXABLE=true`.
- Contact is an explicit client-side **preview**, not a delivery service. It stores nothing persistently and posts nothing. A verified public email enables a user-initiated mailto draft; the user must send it in their own mail application. Do not regard this as a live enquiry backend.

## Architecture and a future property feed

```
src/app/                  Pages, metadata and error/loading boundaries
src/components/           Reusable UI; only interactive components use client JS
src/lib/properties/types.ts   Vendor-neutral Property and PropertyRepository contract
src/lib/properties/query.ts   Untrusted URL query validation and normalisation
src/lib/properties/mock.ts    In-memory mock adapter and deterministic fixtures
src/lib/properties/index.ts   Server-only composition root
src/lib/legal.ts           Clearly marked legal placeholder copy
public/images/            Local, optimised demonstration assets
```

Pages depend on the `PropertyRepository` interface: `search`, `getBySlug`, `getAllSlugs`. Provider details never reach UI components. The current implementation accepts only `PROPERTY_DATA_SOURCE=mock`; unsupported providers fail clearly instead of silently serving invented data.

To add Zoopla **only after obtaining authorised feed access and documentation**:

1. Confirm contractual rights, the actual feed format, authentication, image licensing, attribution, pagination, rate limits and update/deletion behaviour. No endpoint is assumed or included here; there is no scraping.
2. Write a server-only ingestion/adapter module mapping the documented feed into `Property`. Validate vendor records at the boundary and define handling for incomplete material information. Extend the domain type deliberately if verified fields require it.
3. Implement the same repository interface. Preserve stable public IDs/slugs, GBP pcm semantics, combined filter behaviour and deterministic sort/pagination. Run the existing contract tests against representative licensed fixtures.
4. Use server-side credentials, request timeouts, bounded retries, caching appropriate to the feed, last-known-good data and monitoring. A scheduled import into a database is often preferable to coupling every page request to a provider, but choose only after reviewing the actual feed agreement.
5. Change the repository factory only after the adapter works. Reassess search caching, large sitemap chunking, image-domain allowlists, withdrawals, redirect rules and retention with real feed volume. Remove demo notices only when real listings and launch requirements are verified.

No Zoopla credentials or invented API URLs exist in this repository.

## Configuration and secrets

See `.env.example`. `NEXT_PUBLIC_*` values are public build-time values and must never contain secrets. `.env.local`, `.env.*` and `.vercel` are ignored. `PROPERTY_DATA_SOURCE` is server-side. Future feed credentials must remain server-only and be set in Vercel environment settings, never committed or pasted into public variables. A public contact email is not a secret.

`NEXT_PUBLIC_SITE_URL` must be a valid absolute origin. Set it to the verified HTTPS production domain before launch. `SITE_INDEXABLE` is an additional opt-in gate; the mock provider and Vercel preview environments remain excluded. SEO readiness does not mean the fictional listings should be indexed. No invented business-address or review structured data is emitted.

## GitHub and Vercel deployment

The workspace started with Git initialised but no remote. No GitHub repository or Vercel project is assumed.

1. Create/select the appropriate private GitHub repository and connect this checkout. Review staged changes for secrets, then push your reviewed branch. Never include `.env.local`.
2. `.github/workflows/ci.yml` runs clean installation, lint, type checks, repository tests and a production build on pushes and pull requests, using Node 22.
3. Import the repository in Vercel and select the Next.js preset, repository root and Node 22 (or a currently supported compatible LTS). Use `npm ci` and `npm run build`; keep Next.js output settings automatic.
4. Configure the variables from `.env.example` separately for preview and production. Keep `PROPERTY_DATA_SOURCE=mock` and `SITE_INDEXABLE=false` for this demo. Leave email unset unless verified.
5. Deploy a preview, run the smoke checklist below, and review the preview URL before promoting. Connect the verified production domain and HTTPS only when business launch requirements are complete.
6. For rollback, promote the last verified Vercel deployment. Revalidate environment changes and feeds independently of code rollback.

A deployable codebase and CI configuration do not imply an external repository was created or a live deployment occurred. See `docs/verification.md` for actual checks performed.

## Testing strategy

`npm test` uses the built-in Node test runner through the small TypeScript runner `tsx`. Tests cover combined filters, postcode matching, non-mutating sorting, unavailable listings, invalid/repeated query parameters, empty results, pagination and stable lookups. Type checking and production builds validate server/client boundaries and generated routes.

Manual browser smoke checks:

- At desktop and 390px mobile widths, navigate every page, open/close the mobile menu and check no horizontal scrolling or clipped controls.
- Submit a London search, combine 2+ bedrooms and a £2,500 budget, sort, refresh and confirm URL state and selected controls persist.
- Test no results, reset, a property detail and an unknown slug.
- Follow a property enquiry. Verify required fields and email validation; preview and confirm **not sent** is explicit.
- Use Tab/Shift+Tab, the skip link, select controls and FAQ disclosures. Check screen-reader announcements and 200%/400% zoom before launch.
- Verify all local images, social image, favicon, robots, sitemap and noindex metadata.
- No automated test suite proves full accessibility compliance; complete assisted and manual checks with real users where possible.

## Pre-launch checklist

- [ ] Confirm legal entity, registered/trading addresses, registration number, VAT treatment, contact details, hours and geographic service area.
- [ ] Replace the reconstructed screenshot logo with the official transparent master asset; owner should confirm reproduction quality and rights.
- [ ] Approve copy, service scope, branding and image licensing. Demo room photographs are AI-generated and must not represent real property listings.
- [ ] Verify jurisdiction-specific requirements for England, Wales, Scotland and/or Northern Ireland. Do not treat England-only rules as UK-wide.
- [ ] Publish professionally reviewed privacy, cookie and website policies, fee schedules, complaints procedure, verified redress details and applicable client money protection certificates.
- [ ] Review current advertising/material-information requirements and verify each live property's full address, rent, tenancy terms, deposits, council tax, EPC, utilities, parking, accessibility, restrictions and other material facts.
- [ ] Decide and implement a genuine enquiry delivery service if required. Include server-side validation, abuse protection, error handling, privacy/retention rules and delivery monitoring; never log personal messages by default.
- [ ] Complete keyboard, screen reader, zoom, mobile and supported browser testing. Review colour contrast and performance on a real device.
- [ ] Connect an authorised feed only after credentials/documentation are provided, validate contracts and withdrawal behaviour, and remove all mock listings before indexing.
- [ ] Set the canonical HTTPS domain, verify metadata/social previews, and opt into indexing only after legal and business approval.
- [ ] Protect the GitHub default branch; require CI and code review. Restrict production deployment access and enable monitoring and rollback procedures.
- [ ] Review dependencies/security headers after connecting real services. The current CSP blocks framing/objects but is not a full nonce-based script policy.

## Reference links for business review

These inform the checklist, not a claim of compliance or legal advice:

- [Next.js installation](https://nextjs.org/docs/app/getting-started/installation)
- [GOV.UK: redress schemes](https://www.gov.uk/government/publications/lettings-agents-and-property-managers-redress-schemes)
- [GOV.UK: client money protection enforcement guidance](https://www.gov.uk/government/publications/mandatory-client-money-protection-enforcement-guidance-for-local-authorities)
- [GOV.UK: Tenant Fees Act guidance](https://www.gov.uk/government/publications/tenant-fees-act-amended-by-the-renters-rights-act-2025/tenant-fees-act-2019-statutory-guidance-for-enforcement-authorities)

## Assets and design

See `docs/assets.md` for provenance and `docs/design-current.png` for the red/charcoal design direction. The user's subsequent request supersedes its text-only logo and exterior property cards: the built homepage uses the key logo and lounge/kitchen/bedroom imagery. System fonts avoid external font requests. Only Next.js/React, Tailwind and a server-only boundary are application dependencies; no UI library, CMS, analytics or database is required for the demo.
