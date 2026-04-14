# implementation.md — Detailed Build Plan for Homestay Teluk Batik Website V1

## 1. Product Summary
Build a modern website for two homestays:
- Homestay Teluk Batik
- Homestay Lekir Tanjung Kepah

The website has two major surfaces:
1. Public landing page
2. Protected admin page

The public landing page is the marketing and SEO page.
The admin page is the owner tool for managing images and blocked dates.

## 2. Recommended Architecture
### Frontend
- Next.js App Router
- Tailwind CSS
- reusable React components

### Backend / BaaS
- Supabase Auth for admin login
- Supabase Postgres for homestay and blocked-date data
- Supabase Storage for homestay images

### Testing
- Playwright for end-to-end testing

### Deployment
- Vercel for app hosting
- Supabase cloud for backend services

## 3. Why this stack
### Next.js
Good SEO, simple deployment, modern routing, strong performance, easy metadata management.

### Tailwind CSS
Fast styling, easy responsive design, good for modern visual systems.

### Supabase
Practical free-tier setup for auth, DB, storage, and future app/API reuse.

### Playwright
Reliable local E2E validation for public and admin workflows.

## 4. Information Architecture
### Public page
Suggested page sections in order:
1. Header / Nav
2. Hero
3. Quick comparison / summary cards for both homestays
4. Homestay Teluk Batik section
5. Homestay Lekir Tanjung Kepah section
6. Nearby attractions / explore area section
7. Why choose our homestay section
8. FAQ section
9. CTA band for WhatsApp booking inquiry
10. Footer

### Admin area
Suggested routes:
- `/admin/login`
- `/admin`
- `/admin/homestays/[id]` or one dashboard page with tabs/cards

## 5. Public Page Requirements in Detail
### 5.1 Header
Include:
- logo / text brand
- nav anchors: Home, Homestays, Availability, Nearby Places, FAQ, Contact
- primary CTA: WhatsApp Us

Behavior:
- sticky or semi-sticky header on scroll if it improves UX
- simple mobile menu

### 5.2 Hero section
Goal:
Immediately communicate holiday stay, beach proximity, and trust.

Must contain:
- strong headline
- short subheadline
- CTA buttons
- maybe quick chips like “Near Teluk Batik”, “Family Friendly”, “Easy WhatsApp Booking”

Design direction:
- abstract gradients / wave accents
- no generic stock-beach wallpaper
- can feature a tasteful card collage preview using actual property images

### 5.3 Quick homestay summary
Create 2 compact summary cards near the top, one per homestay.

Each card can show:
- name
- short one-line description
- location snippet
- availability CTA
- mini image

### 5.4 Dedicated homestay sections
For each homestay, include:
- property name
- image carousel
- short marketing description
- location or locality info
- best-for summary
- key features / amenities
- availability calendar
- WhatsApp CTA

Possible component structure:
- `HomestaySection`
- `ImageCarousel`
- `AvailabilityCalendar`
- `AmenitiesList`
- `LocationCard`

### 5.5 Availability calendar
Purpose:
Show users which dates are blocked/booked and which are available.

V1 behavior:
- public users can view availability only
- admin blocks dates manually
- blocked dates are visually distinct
- calendar should be easy to read on mobile and desktop

Possible UX:
- monthly calendar view
- legend: Available / Unavailable
- optionally show “Contact us to confirm latest availability” note

Recommended approach:
- use a modern accessible calendar component
- pass blocked date arrays from DB
- allow month navigation

### 5.6 Nearby attractions section
This section supports both conversion and SEO.

Include useful nearby context such as:
- Pantai Teluk Batik
- Lumut
- Marina Island
- Pulau Pangkor access area
- Bukit 300
- TLDM Lumut area

Do not make false distance claims unless real data is available.
Use safe wording like “good base for visitors heading to …” unless exact details are known.

### 5.7 FAQ section
Create useful FAQs such as:
- Is this homestay near Teluk Batik?
- Is it suitable for family stays?
- How do I check booking availability?
- How do I book?
- Is it near Lumut / Marina Island / Pulau Pangkor route?
- Can I contact via WhatsApp?

This helps search intent and user trust.

### 5.8 Footer
Include:
- brand name
- WhatsApp contact
- email
- short location mention
- useful quick links
- copyright

Make WhatsApp prominent.

## 6. Admin Requirements in Detail
### 6.1 Login page
Requirements:
- username/email and password
- simple and secure
- clear error messages
- redirect to dashboard after login

V1 can support one admin or a small number of admins.

### 6.2 Dashboard
The dashboard should let admin manage both homestays clearly.

Recommended dashboard sections:
- overview cards
- manage Homestay Teluk Batik
- manage Homestay Lekir Tanjung Kepah

Each property manager block should support:
- image uploads
- image delete
- image order if practical
- blocked-date management

### 6.3 Image management
Admin should be able to:
- upload multiple images
- see upload preview
- remove existing images
- optionally reorder images

Implementation suggestion:
- store images in Supabase Storage bucket(s)
- keep image metadata in DB
- optimize display using Next image handling where practical

### 6.4 Blocked-date management
Admin should be able to:
- pick a date or date range
- save blocked date(s)
- view existing blocked dates
- remove blocked dates

Possible data strategy:
- store one row per blocked date for simplicity
- include `homestay_id`
- optionally include reason field later

For V1, simplicity is more important than elegance.

## 7. Suggested Data Model
### 7.1 homestays
Fields:
- `id`
- `slug`
- `name`
- `short_description`
- `location_text`
- `created_at`
- `updated_at`

### 7.2 homestay_images
Fields:
- `id`
- `homestay_id`
- `storage_path`
- `public_url` or generated URL
- `alt_text`
- `sort_order`
- `created_at`

### 7.3 homestay_blocked_dates
Fields:
- `id`
- `homestay_id`
- `date`
- `created_at`

### 7.4 admin users
Handled by Supabase Auth.
Potential profile table only if needed later.

## 8. API / Data Access Design
Even if using Supabase directly, structure the code so future app integration is easy.

Recommended pattern:
- `lib/supabase/`
- `lib/data/homestays.js`
- `lib/data/bookings.js`
- `lib/data/images.js`
- `app/api/...` for API endpoints where useful

Suggested API endpoints if implemented:
- `GET /api/homestays`
- `GET /api/homestays/:slug`
- `GET /api/homestays/:id/blocked-dates`
- `POST /api/admin/images`
- `DELETE /api/admin/images/:id`
- `POST /api/admin/blocked-dates`
- `DELETE /api/admin/blocked-dates/:id`

This helps future mobile app reuse.

## 9. UI Component Suggestions
Suggested reusable components:
- `Header`
- `HeroSection`
- `HomestaySummaryCards`
- `HomestaySection`
- `ImageCarousel`
- `AvailabilityCalendar`
- `AmenityBadgeList`
- `NearbyAttractionsSection`
- `FaqSection`
- `ContactCta`
- `Footer`
- `AdminLoginForm`
- `AdminDashboard`
- `ImageUploader`
- `BlockedDateManager`

## 10. Style System Suggestions
Use a small design system.

### Colors
Suggested palette direction:
- deep ocean blue
- sea turquoise
- warm sand neutral
- clean white
- coral accent

### Feel
- rounded cards
- soft shadows
- clean borders
- large whitespace
- modern section separation
- tasteful gradient accents

### Typography
- modern readable sans-serif
- strong heading contrast
- comfortable line length

## 11. SEO Implementation Details
### 11.1 Metadata
Implement:
- strong home page title
- meta description
- social metadata
- canonical URL

Example title direction:
`Homestay Teluk Batik & Homestay Lekir Tanjung Kepah | Stay Near Teluk Batik, Lumut`

Example meta direction:
Describe nearby beach, Lumut area, family-friendly stay, easy WhatsApp contact, and availability checking.

### 11.2 Structured Data
Implement JSON-LD. Use the most appropriate schema type available for lodging/accommodation.

Potential schema direction:
- `LodgingBusiness`
- `VacationRental`
- `LocalBusiness`

Use honest structured data only.

### 11.3 On-page content strategy
Naturally include keyword intent within:
- H1/H2 headings
- short paragraphs
- FAQ
- image alt text
- nearby attractions section
- CTA copy

### 11.4 Technical SEO
Implement:
- sitemap
- robots.txt
- semantic landmarks
- optimized images
- lazy loading where appropriate
- good page performance

## 12. Accessibility and Mobile
The website must be mobile-first.

Checklist:
- responsive layout on small screens
- tap-friendly buttons
- readable calendar on mobile
- visible focus states
- alt text on important images
- accessible form labels in admin

## 13. Security Notes
V1 security must be practical.

Implement:
- protected admin routes
- environment variable handling
- no secret leakage to client
- secure upload rules
- authenticated admin-only mutation operations
- validation for all admin actions

## 14. Content Population Strategy
Use sensible seed/mock content if final content is not fully provided.
But clearly mark areas that the owner should update later.

If photos are uploaded, use them directly.
If exact contact info is missing, add placeholders and document them clearly.

## 15. Local Development Setup Expectations
Document:
- install steps
- env variables
- Supabase setup
- bucket creation
- database schema or migrations
- seed data setup
- admin user creation
- how to run dev server

## 16. Playwright Test Plan
Minimum tests:

### Public tests
- home page loads
- hero CTA visible
- both homestay names visible
- carousel section exists for both homestays
- availability calendars render
- contact CTA visible
- footer contains WhatsApp and email placeholders/info
- basic metadata present

### Admin tests
- login page loads
- login works with seeded test admin
- dashboard renders
- blocked date can be added
- blocked date appears in public calendar after refresh/navigation
- image upload flow is at least structurally validated where possible

If true upload automation is hard in the test environment, test the form behavior and document any limitations honestly.

## 17. Deployment Guide Requirements
Include a simple step-by-step deployment section:
1. create Supabase project
2. create database tables
3. create storage bucket
4. create admin user
5. set environment variables
6. deploy app to Vercel
7. add custom domain
8. verify HTTPS
9. verify admin login and public page

## 18. Domain Purchase Guide Requirements
The documentation should explain, in owner-friendly language:
- what a domain is
- what `.com.my` means
- how to search for domain availability
- how to buy `telukbatik.com.my` if available
- how to choose a Malaysian registrar
- how to connect domain DNS to Vercel
- how to point `www` correctly
- what to do if the preferred domain is taken

Be practical and simple.

## 19. Suggested Folder Structure
Example direction:

```text
app/
  admin/
    login/
    page.js
  api/
  globals.css
  layout.js
  page.js
components/
  admin/
  home/
  shared/
lib/
  data/
  supabase/
public/
playwright/
```

Adjust if needed, but keep structure clean.

## 20. Definition of Done
V1 is complete when:
- public landing page looks modern and polished
- both homestay sections work
- carousels show property images well
- availability data is visible on the public page
- admin login works
- admin can manage images
- admin can manage blocked dates
- SEO essentials are implemented
- local Playwright tests are added and run
- deployment and domain instructions are documented

## 21. V2 Ideas
You may list these as future improvements, but do not overbuild now:
- inquiry form with email/WhatsApp automation
- map integration
- richer property details
- rate / pricing management
- actual reservation workflow
- Airbnb / external calendar sync
- Malay + English language switch
- analytics dashboard
- mobile admin app
