# SEO Implementation Report — `www.telukbatik.my`

## 1) Pre-Implementation Audit (Before Code Changes)

### Playwright baseline (required first step)
- Ran local E2E before implementation.
- Result: existing core flows were healthy:
  - landing page render
  - both homestay sections/carousels/calendars
  - admin login
  - block date flow
  - image upload flow

### Technical SEO findings
- Site was mostly single-page focused for indexable public content.
- `sitemap.xml` only listed home + admin login route (thin crawl scope).
- Internal links were mostly in-page anchors, reducing discovery of deeper keyword targets.
- Public metadata existed but did not yet cover dedicated local intent pages.

### On-page/content findings
- Strong base copy existed for Teluk Batik/Lumut intent, but insufficient page-level targeting by keyword cluster.
- Nearby attractions info existed as a section only, not as a crawlable local content hub.
- FAQ existed on homepage but no dedicated FAQ page for direct indexing and intent matching.

### Structured data findings
- JSON-LD existed on homepage but needed broader architecture support:
  - page-specific breadcrumbs
  - FAQ schema on dedicated FAQ route
  - schema across newly indexable pages

## 2) Keyword Map Implemented

### Cluster A — Commercial intent
- `homestay teluk batik`
- `homestay teluk batik lumut`
- `homestay murah teluk batik`
- `family homestay lumut`
- Mapped to:
  - `/`
  - `/homestay-teluk-batik`
  - `/homestay-lekir-tanjung-kepah`

### Cluster B — Landmark intent
- `homestay near marina island`
- `homestay near pulau pangkor route`
- `homestay tldm lumut`
- `homestay near bukit 300 lumut`
- Mapped to:
  - `/nearby-attractions`
  - `/nearby-attractions/[slug]` pages

### Cluster C — Discovery intent
- `where to stay near teluk batik`
- `things to do around lumut`
- `weekend trip teluk batik`
- Mapped to:
  - `/nearby-attractions`
  - `/faq`

### Cluster D — BM local intent
- `homestay teluk batik murah`
- `homestay lumut dekat pantai`
- `homestay dekat marina island`
- `homestay dekat TLDM Lumut`
- `homestay dekat Bukit 300`
- Mapped naturally across homepage + property + nearby pages.

## 3) Implemented Code Changes

## Information architecture expansion
- Added dedicated public pages:
  - `/homestay-teluk-batik`
  - `/homestay-lekir-tanjung-kepah`
  - `/nearby-attractions`
  - `/nearby-attractions/teluk-batik`
  - `/nearby-attractions/marina-island`
  - `/nearby-attractions/pulau-pangkor-route`
  - `/nearby-attractions/bukit-300-lumut`
  - `/nearby-attractions/tldm-lumut`
  - `/faq`

## Metadata and canonical improvements
- Added reusable metadata builder with unique page-level:
  - title
  - description
  - canonical
  - OG/Twitter
- Default canonical base aligned to `https://www.telukbatik.my`.

## Structured data improvements
- Added reusable schema helpers for:
  - `WebSite`
  - `Organization`
  - `BreadcrumbList`
  - `FAQPage`
- Homepage now outputs expanded schema graph including:
  - website + organization + breadcrumb + faq + lodging entities.
- Added page-level JSON-LD on property/nearby/faq pages.

## Nearby attractions hub
- Implemented content hub + detailed guide pages with practical local use cases:
  - Pantai Teluk Batik
  - Marina Island
  - Pulau Pangkor route
  - Bukit 300 Lumut
  - TLDM Lumut

## Internal linking upgrades
- Header navigation now includes crawlable route links for nearby guide + FAQ.
- Footer now links to:
  - both homestay pages
  - nearby attractions hub
  - FAQ route
- Homepage homestay cards/sections now link to dedicated property routes.
- Nearby cards now link to guide detail pages.

## Technical SEO updates
- `sitemap.xml` now includes all public SEO routes and nearby detail pages.
- `robots.txt` keeps admin/api paths disallowed.
- Added mobile sticky CTA on public pages for conversion path continuity.

## Conversion support
- Preserved WhatsApp-first booking flow.
- Kept availability calendar and admin-managed blocked date model unchanged.
- Added stronger path from informational pages back to booking pages.

## 4) Files Added/Updated (SEO scope)

### Added
- `src/lib/seo/content.js`
- `src/lib/seo/schema.js`
- `src/lib/seo/metadata.js`
- `src/components/shared/Breadcrumbs.js`
- `src/components/shared/MobileStickyCta.js`
- `src/components/shared/PublicPageLayout.js`
- `src/app/homestay-teluk-batik/page.js`
- `src/app/homestay-lekir-tanjung-kepah/page.js`
- `src/app/nearby-attractions/page.js`
- `src/app/nearby-attractions/[slug]/page.js`
- `src/app/faq/page.js`

### Updated
- `src/app/page.js`
- `src/app/layout.js`
- `src/app/sitemap.js`
- `src/app/robots.js`
- `src/components/shared/Header.js`
- `src/components/shared/Footer.js`
- `src/components/home/Hero.js`
- `src/components/home/HomestaySection.js`
- `src/components/home/NearbyAttractions.js`
- `src/components/home/ContactBand.js`
- `src/lib/data/homestays.js`
- `src/lib/utils/format.js`
- `.env.example`
- `vercel-import.env`
- `e2e/public-and-admin.spec.js`

## 5) Post-Implementation Validation

- Re-ran Playwright after implementation.
- Verified:
  - homepage + admin flows still work
  - added SEO routes render
  - key route links are crawlable
  - page JSON-LD script presence on SEO routes

## 6) Remaining Owner/Manual Actions (Critical)

1. Google Search Console:
- add/verify property for `https://www.telukbatik.my`
- submit sitemap: `https://www.telukbatik.my/sitemap.xml`
- request indexing for:
  - `/`
  - `/homestay-teluk-batik`
  - `/homestay-lekir-tanjung-kepah`
  - `/nearby-attractions`
  - `/faq`

2. Google Business Profile:
- complete profile, categories, opening/contact details, service area
- upload real property photos regularly

3. Consistent NAP/contact:
- keep phone/email/business naming consistent across social/listings.

4. Analytics:
- connect GA4 + Search Console for query/click monitoring.

5. Reviews and trust:
- collect authentic reviews only (no fabricated ratings/review schema).

6. Content maintenance cadence:
- update blocked dates/photos frequently
- publish small local updates (seasonal travel tips/holiday notes)

## 7) Known Limitations

- No ranking position can be guaranteed for broad head term `teluk batik`.
- Strongest realistic path is long-tail local commercial intent:
  - homestay + Teluk Batik/Lumut + landmark modifiers.
- Off-page/local authority (reviews, citations, profile quality, links) is still required for significant ranking gains.

## 8) Realistic SEO Expectation

This implementation materially improves:
- indexability
- topical coverage
- local relevance
- internal link architecture
- conversion pathways

It does **not** guarantee #1 for `teluk batik`, but it creates a strong technical and content foundation to compete for booking-intent local searches.
