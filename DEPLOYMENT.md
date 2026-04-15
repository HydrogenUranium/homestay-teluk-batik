# Deployment + Daily Operations (Detailed)

This guide is for owner/admin use.

## 1) Quick Concept (Important)

Two different things:
- `Deploy`: publish new code to Vercel.
- `Admin update`: block dates, upload/delete/reorder photos.

After proper Supabase setup, admin updates are live immediately and do **not** need redeploy.

## 2) First-Time Production Setup

### Step 1: Prepare accounts
- GitHub
- Vercel
- Supabase

### Step 2: Create Supabase project
1. Create a new Supabase project.
2. Wait until status is healthy.

### Step 3: Create database tables + policies
1. Supabase dashboard -> `SQL Editor`.
2. Open local file `supabase-schema.sql`.
3. Paste and run.

### Step 4: Create storage bucket
1. Supabase -> `Storage`.
2. Create bucket named `homestay_images`.
3. Set bucket public.

### Step 5: Create admin user
1. Supabase -> `Authentication` -> `Users`.
2. Add user (email + password).
3. This email/password is used for `/admin/login`.

### Step 6: Push code to GitHub
Push this project to your repo.

### Step 7: Import to Vercel
1. Vercel -> `Add New Project`.
2. Import the GitHub repo.
3. Framework: Next.js.

### Step 8: Add environment variables in Vercel
Use key names exactly (uppercase + underscore only):

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_TIKTOK_URL`
- `NEXT_PUBLIC_FACEBOOK_URL`
- `NEXT_PUBLIC_X_URL`
- `AUTH_PROVIDER`
- `AUTH_SECRET`
- `DATA_PROVIDER`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_STORAGE_BUCKET`

Recommended values:
- `AUTH_PROVIDER=supabase`
- `DATA_PROVIDER=supabase`
- `SUPABASE_STORAGE_BUCKET=homestay_images`

You can import from `vercel-import.env` then replace placeholder values.

### Step 9: Deploy
Click deploy.

### Step 10: Verify production
Test these on live domain:
1. `/admin/login` works with Supabase admin user.
2. Block one date for one homestay.
3. Refresh landing page and confirm unavailable date appears.
4. Upload one image.
5. Confirm image appears on landing page.
6. Reorder one image and confirm order updates.

## 3) If You Already Reached Step 6, What Next?

If you already pushed to GitHub (step 6), do this now:
1. Go to Vercel project import page.
2. Set project name to only letters, digits, `_` (underscore), or `-`.
3. Add all env vars from step 8.
4. Deploy.
5. Run verification in step 10.

## 4) Where to Get Supabase Values

From Supabase dashboard:

- `NEXT_PUBLIC_SUPABASE_URL`
  - Settings -> API -> `Project URL`

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Settings -> API -> `anon public` key

- `SUPABASE_SERVICE_ROLE_KEY`
  - Settings -> API -> `service_role` key
  - Must have role `service_role`
  - Do **not** reuse anon key here

How to quickly validate:
- anon key payload role is usually `anon`
- service key payload role is `service_role`

## 5) Fix for Current RLS Errors (Already Deployed Site)

If admin shows:
- `new row violates row-level security policy` (dates/images)

Do this:
1. Supabase -> SQL Editor.
2. Open local file `supabase-rls-fix.sql`.
3. Paste and run.
4. In Vercel, confirm `SUPABASE_SERVICE_ROLE_KEY` is real service role key.
5. Log out from admin, then log in again.
6. Retry block date and upload image.

## 6) Daily Admin Workflow (No Redeploy)

### Block date
1. Open live `/admin/login`.
2. Login.
3. Pick homestay + date.
4. Click block.
5. Refresh landing page.

### Remove blocked date
1. Login admin.
2. Click remove on blocked date row.
3. Refresh landing page.

### Upload image
1. Login admin.
2. Choose homestay.
3. Select image + optional alt text.
4. Upload.
5. Refresh landing page.

### Reorder image
1. Login admin.
2. Use up/down controls.
3. Order updates immediately.

## 7) When Redeploy Is Actually Needed

Redeploy only for:
- code changes (UI/content/feature updates)
- environment variable changes
- domain/canonical URL changes

Not needed for normal admin content actions.

## 8) Domain Setup (`www.telukbatik.com.my`)

### Buy domain
1. Check availability at MY registrar.
2. Buy + enable auto-renew.
3. Keep account 2FA enabled.

If unavailable, use fallback:
- `homestaytelukbatik.com.my`
- `telukbatikhomestay.com.my`
- `staytelukbatik.com.my`

### Connect in Vercel
1. Vercel -> Project -> `Settings` -> `Domains`.
2. Add root domain and `www` domain.
3. Copy DNS records shown by Vercel.
4. Add same DNS records at registrar DNS panel.
5. Wait propagation.
6. Set `www` as primary domain.
7. Update env `NEXT_PUBLIC_SITE_URL` to primary domain URL.
8. Redeploy once after env/domain change.

## 9) Google Indexing Expectation

If you search Google and your new Vercel domain does not appear yet, this is normal at first.

Do this:
1. Add site to Google Search Console.
2. Submit sitemap: `https://your-domain/sitemap.xml`
3. Request indexing for homepage.
4. Wait for crawling/reindexing.

Indexing can take days to weeks depending on crawl frequency.

## 10) OG Image Replacement

Current file:
- `public/branding/og-homestay-teluk-batik.svg`

Replace this file (same path/name) with your own branded artwork if needed, then redeploy.
