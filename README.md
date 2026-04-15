# Homestay Teluk Batik (V1)

Production-ready V1 website for:
- Homestay Teluk Batik
- Homestay Lekir Tanjung Kepah

Stack:
- Next.js (App Router)
- Tailwind CSS
- Supabase (Auth + Postgres + Storage) for production mode
- Playwright for E2E checks

## Features

Public landing page:
- Hero + 2 homestay sections
- Image carousel per homestay
- Availability calendar (blocked/unavailable dates)
- Price per night, facilities, Google Maps links + embeds
- FAQ + nearby attractions
- WhatsApp CTA
- Multi-language toggle (BM/EN)
- SEO setup: metadata, Open Graph, Twitter card, JSON-LD, sitemap, robots

Admin:
- `/admin/login`
- Upload/delete/reorder images
- Block/unblock dates
- Floating success/error toast

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Create local env:
```powershell
Copy-Item .env.example .env.local
```

3. Keep local mode:
- `AUTH_PROVIDER=local`
- `DATA_PROVIDER=local`

4. Run:
```bash
npm run dev
```

5. Open:
- `http://localhost:3000`
- `http://localhost:3000/admin/login`

Local admin credentials:
- Username: `admin`
- Password: `admin12345`

## Local Testing (Playwright)

Install browser once:
```bash
npx playwright install chromium
```

Run E2E:
```bash
npm run test:e2e
```

The test setup forces local auth/data mode so tests do not depend on Supabase credentials.

## Production Mode (Supabase)

Required env vars:
- `AUTH_PROVIDER=supabase`
- `DATA_PROVIDER=supabase`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (must be service role key, not anon key)
- `SUPABASE_STORAGE_BUCKET=homestay_images`

Run SQL:
- Initial schema: `supabase-schema.sql`
- If already deployed and getting RLS errors: `supabase-rls-fix.sql`

## Important Operations Rule

If production is configured correctly (Supabase mode + proper policies):
- blocking/unblocking dates does not need redeploy
- uploading/deleting/reordering images does not need redeploy

Redeploy is only needed for code changes or env/domain changes.

## Branding Assets

Current OG/social image:
- `public/branding/og-homestay-teluk-batik.svg`

Replace this file (same name/path) if you want your own logo artwork in shared links.

## Owner Deployment Guide

Full detailed guide:
- `DEPLOYMENT.md`
