# agent.md — Homestay Teluk Batik Website Agent Guide

## Project Name
Homestay Teluk Batik Website

## Version
V1

## Agent Mission
Build a modern, attractive, mobile-first website for two homestays near the Teluk Batik / Lumut area, together with a protected admin panel that allows the owner to manage homestay photos and blocked booking dates.

The result must help the owner:
- present the homestays professionally
- attract search traffic from Teluk Batik / Lumut related searches
- show availability simply
- manage content without touching code
- prepare for future app integration

## Business Context
This is not just a technical demo.
This is a real hospitality-style website for local accommodation marketing.

The website must feel:
- warm
- trustworthy
- clean
- modern
- holiday oriented
- family friendly
- locally relevant

The product should convince visitors that these homestays are good options when visiting:
- Teluk Batik
- Lumut
- Pantai Teluk Batik
- Marina Island
- Pulau Pangkor transit area
- Bukit 300 area
- TLDM Lumut vicinity

## Properties Covered
1. Homestay Teluk Batik
2. Homestay Lekir Tanjung Kepah

## Primary Users
### Public user
A traveler or family looking for a homestay around Teluk Batik / Lumut.
They want to:
- see photos quickly
- know the vibe and suitability
- understand the location
- check date availability
- contact the owner fast via WhatsApp

### Admin user
The owner or operator.
They want to:
- login securely
- upload better/newer photos
- control which dates are blocked/booked
- manage each homestay separately
- avoid technical complexity

## Product Scope for V1
### In scope
- single public landing page
- two homestay sections
- image carousel per homestay
- availability calendar per homestay
- contact CTA
- WhatsApp CTA
- email in footer
- protected admin login
- photo management
- blocked-date management
- SEO foundations
- responsive design
- deployment guide
- domain setup guide

### Out of scope for V1
- payment gateway
- public self-service booking checkout
- multi-admin roles
- advanced analytics dashboard
- review system
- multilingual CMS
- calendar sync with Airbnb/Booking.com
- native mobile app

## Design Rules
### Visual direction
The brand should feel like:
- beach holiday
- clean sea breeze
- relaxed but professional
- local tourism charm
- modern boutique stay

### Must do
- use a modern layout and typography
- use abstract beach-inspired colors and shapes
- use the uploaded homestay photos as the visual focus
- prioritize mobile-first layout
- make CTA buttons obvious
- create strong section rhythm using spacing
- make each homestay visually distinct but part of one system

### Must not do
- no outdated generic template look
- no cluttered layouts
- no auto-playing media
- no giant stock beach background hero image
- no overuse of animation
- no poor contrast
- no keyword-stuffing copy
- no fake booking flow

## Content Strategy
The copy should be:
- simple English
- locally relevant
- warm and direct
- easy to scan
- conversion friendly

Use concise marketing language that helps visitors answer:
- Where is it?
- What does it look like?
- Is it suitable for my trip?
- Are dates available?
- How do I contact the owner?

## SEO Goals
The SEO goal is to create a strong local landing experience for search intent around Teluk Batik / Lumut homestay travel.

### SEO must include
- crawlable semantic content
- indexable text sections
- locally relevant keywords used naturally
- title and meta description optimization
- schema markup
- image alt text
- internal section anchors
- FAQ content
- nearby attractions context
- fast-loading pages
- good mobile usability

### Keyword clusters to support naturally
#### Core stay keywords
- homestay Teluk Batik
- best homestay Teluk Batik
- homestay murah Teluk Batik
- homestay Lumut
- homestay Pantai Teluk Batik

#### Nearby attraction keywords
- Marina Island
- Pulau Pangkor
- Bukit 300
- Bukit 300 Lumut
- Bukit 300 Teluk Batik
- TLDM Lumut

#### Experience keywords
- dekat pantai
- mandi pantai
- laut
- family stay
- holiday stay
- homestay with pool
- Teluk Batik with pool

Do not force all keywords unnaturally. Build them into headings, FAQ, descriptive sections, captions, and metadata where relevant.

## Recommended Stack
Use a practical JavaScript-friendly stack:
- Next.js
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Playwright

Reasoning:
- easy deployment
- good performance
- solid SEO capability
- modern DX
- free tier friendly
- easy future API/mobile reuse

## Functional Expectations
### Public landing page
Must include:
- top navigation
- hero
- quick summary of both homestays
- dedicated section for Homestay Teluk Batik
- dedicated section for Homestay Lekir Tanjung Kepah
- image carousel for each
- short descriptions
- location details
- amenities/highlights
- date availability calendar
- nearby attractions / why stay here section
- FAQ
- contact/footer

### Admin section
Must include:
- login page
- authenticated dashboard
- homestay selector or split panels
- image upload UI
- image list/grid with remove capability
- booking date manager
- add blocked dates
- remove blocked dates
- feedback states for success/failure

## Data Modeling Expectations
Keep the data model simple and future-ready.

Likely entities:
- homestays
- homestay_images
- bookings_or_blocked_dates
- admin_users

The date model in V1 can be a blocked-date list instead of a full reservation engine.

## Implementation Behavior
The agent should:
1. inspect the provided homestay images first
2. understand the real visual assets before designing layout
3. build the public page
4. build the admin section
5. connect calendars to stored blocked dates
6. validate locally
7. run Playwright tests
8. fix bugs before handoff

## Coding Principles
- keep code readable
- keep components reusable
- avoid magic values
- use server/client boundaries appropriately
- validate input
- handle missing content safely
- document setup clearly
- make env variables explicit

## Accessibility Expectations
- keyboard-accessible navigation where practical
- sufficient color contrast
- meaningful alt text
- labelled inputs in admin forms
- clear focus states
- buttons that are really buttons

## Deployment Expectations
Document the easiest V1 deployment path.
Recommended direction:
- deploy frontend on Vercel
- use Supabase hosted project for auth/db/storage
- configure environment variables
- connect custom domain
- set up www redirect and HTTPS

## Domain Guidance Expectations
Include a simple owner-friendly guide that explains:
- what domain to buy
- how to check domain availability
- how to buy `telukbatik.com.my` if available
- what to do if unavailable
- how to connect domain DNS to deployment platform

## Test Expectations
Use Playwright locally after implementation.
Test critical business flows, not only superficial rendering.

Minimum test scenarios:
- home page renders
- both homestays appear
- image carousels usable
- calendars show dates
- admin login page renders
- admin auth flow works with seeded credentials or test credentials
- admin can add blocked date
- public page reflects blocked date

## Final Handoff Expectations
Final handoff should include:
- what was built
- how to run locally
- how to seed or create admin
- how to configure Supabase
- how to upload images
- how to manage blocked dates
- how to deploy
- what is left for V2
