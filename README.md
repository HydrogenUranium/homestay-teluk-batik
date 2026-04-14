# Homestay Teluk Batik Website (V1)

Production-ready V1 website for:
- Homestay Teluk Batik
- Homestay Lekir Tanjung Kepah

Built with:
- Next.js App Router
- Tailwind CSS
- API-driven structure for admin management
- Supabase-ready backend integration (auth/db/storage)
- Playwright E2E tests

## 1) Features Included

### Public landing page
- Modern holiday/beach-themed design using real homestay photos
- Hero, summary cards, 2 dedicated homestay sections
- Photo carousel per homestay
- Availability calendar per homestay (available vs unavailable dates)
- Nearby attractions + FAQ for local search intent
- Contact CTA + WhatsApp + email footer
- SEO essentials (metadata, Open Graph, Twitter, JSON-LD, sitemap, robots)

### Protected admin
- `/admin/login` username/password login
- `/admin` dashboard (protected)
- Upload image for each homestay
- Delete image
- Reorder image sequence
- Add blocked date
- Remove blocked date

### Data modes
- `DATA_PROVIDER=local`: runs fully locally with JSON + local file uploads
- `DATA_PROVIDER=supabase`: uses Supabase tables + storage bucket

## 2) Local Setup

1. Install dependencies:
```bash
npm install
```

2. Create env file:
```bash
cp .env.example .env.local
```
On Windows PowerShell:
```powershell
Copy-Item .env.example .env.local
```

3. Keep default local mode first:
- `AUTH_PROVIDER=local`
- `DATA_PROVIDER=local`

4. Start dev server:
```bash
npm run dev
```

5. Open:
- Public page: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`

Default local admin credentials:
- Username: `admin`
- Password: `admin12345`

## 3) Run Tests (Playwright)

Install browser once:
```bash
npx playwright install chromium
```

Run tests:
```bash
npm run test:e2e
```

Covered flows:
- Landing page loads
- Both homestay sections render
- Carousel interaction works
- Availability calendar renders
- Admin login works
- Admin can block date
- Admin upload form works
- SEO metadata exists

## 4) Supabase Production Setup

1. Create Supabase project.
2. Run SQL from [supabase-schema.sql](./supabase-schema.sql).
3. Create storage bucket:
- Name: `homestay-images` (or match `SUPABASE_STORAGE_BUCKET`)
- Public bucket: enabled
4. Create admin auth user:
- Supabase Auth > Users > Add user (email + password)
5. Update env:
- `AUTH_PROVIDER=supabase`
- `DATA_PROVIDER=supabase`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`

## 5) Deployment (Vercel Recommended)

1. Push project to GitHub.
2. Import repo in Vercel.
3. Add all env variables from `.env.example` (with real values).
4. Deploy.
5. Verify:
- Public homepage
- `/admin/login`
- Image upload
- Blocked date update and public reflection

Important production note:
- If you deploy with `DATA_PROVIDER=supabase`, then admin updates like blocked dates and image uploads do not require redeploy.
- Redeploy is only needed for code changes, environment variable changes, or domain/canonical changes.

For full owner-focused deployment + domain guide, see [DEPLOYMENT.md](./DEPLOYMENT.md).
