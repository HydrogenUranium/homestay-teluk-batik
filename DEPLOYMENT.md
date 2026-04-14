# Deployment + Owner Operations Guide

This guide is written for the actual owner or operator of the website.

The main question to understand is this:

- `Deploy` means publishing the website code.
- `Admin updates` mean changing content inside the already-published website.

These are not the same thing.

If the site is set up properly in production with `Supabase`, then:

- updating blocked dates does **not** require redeploy
- uploading photos does **not** require redeploy
- deleting photos does **not** require redeploy
- reordering photos does **not** require redeploy

You only redeploy when the **code** changes, for example:

- design changes
- text hardcoded in source files changes
- new features are added
- bug fixes are made
- environment variables change
- domain/canonical configuration changes

## 1. Simple Mental Model

Think of the project as 3 parts:

1. `Next.js app`
   This is the website code and admin panel UI.

2. `Supabase database`
   This stores things like blocked dates and image records.

3. `Supabase storage`
   This stores the uploaded image files.

After deployment:

- Vercel runs the website
- Supabase stores the editable data
- the admin panel updates Supabase directly through API routes

That is why normal admin work should appear on the live website without redeploy.

## 2. When You Do And Do Not Need Redeploy

### No redeploy needed

These actions happen through the admin panel and should update the live site immediately:

- add blocked date
- remove blocked date
- upload new photo
- delete photo
- reorder photo

### Redeploy needed

You redeploy only when a developer changes project files such as:

- [src/app/page.js](C:/Users/haikadar/Desktop/Development/homestay-teluk-batik/src/app/page.js)
- [src/components/home/Hero.js](C:/Users/haikadar/Desktop/Development/homestay-teluk-batik/src/components/home/Hero.js)
- [src/lib/data/homestays.js](C:/Users/haikadar/Desktop/Development/homestay-teluk-batik/src/lib/data/homestays.js)
- [src/app/layout.js](C:/Users/haikadar/Desktop/Development/homestay-teluk-batik/src/app/layout.js)

Examples:

- change headline wording in code
- change FAQ text in code
- add new section to homepage
- change SEO metadata
- add booking form feature
- change WhatsApp number in env variables

## 3. Important Production Rule

For real production use, you should deploy with:

- `AUTH_PROVIDER=supabase`
- `DATA_PROVIDER=supabase`

Do **not** rely on `local` mode in production.

Reason:

- local mode stores data in local JSON/files inside the app environment
- that is fine for local development
- that is not reliable for Vercel production content management

If you use local mode on a hosted platform, uploaded files and blocked dates may not behave as expected long-term.

## 4. Full First-Time Deployment

### Step 1: Prepare accounts

You need:

- GitHub account
- Vercel account
- Supabase account

### Step 2: Create Supabase project

1. Log in to Supabase.
2. Create a new project.
3. Choose a region near Malaysia/Singapore if available.
4. Wait until the project is fully ready.

### Step 3: Create database tables

1. Open Supabase dashboard.
2. Go to `SQL Editor`.
3. Open [supabase-schema.sql](C:/Users/haikadar/Desktop/Development/homestay-teluk-batik/supabase-schema.sql).
4. Copy the SQL content.
5. Paste into Supabase SQL Editor.
6. Run it.

This creates:

- `homestay_images`
- `homestay_blocked_dates`

### Step 4: Create storage bucket

1. In Supabase, go to `Storage`.
2. Create bucket.
3. Use bucket name:
   `homestay-images`
4. Set it as public.

If you use a different bucket name, update:

- `SUPABASE_STORAGE_BUCKET`

### Step 5: Create admin login user

1. Go to `Authentication`.
2. Go to `Users`.
3. Click `Add user`.
4. Enter admin email and password.

Example:

- email: `admin@telukbatik.com.my`
- password: strong private password

This is the account the owner uses to log into `/admin/login`.

### Step 6: Push the project to GitHub

You or the developer push this codebase to a GitHub repository.

### Step 7: Deploy to Vercel

1. Log in to Vercel.
2. Click `Add New Project`.
3. Import the GitHub repository.
4. During setup, add environment variables.

Required production environment variables:

- `NEXT_PUBLIC_SITE_URL=https://www.telukbatik.com.my`
- `NEXT_PUBLIC_WHATSAPP_URL=https://wa.me/60123456789`
- `NEXT_PUBLIC_CONTACT_EMAIL=hello@telukbatik.com.my`
- `AUTH_PROVIDER=supabase`
- `AUTH_SECRET=use-a-long-random-secret`
- `DATA_PROVIDER=supabase`
- `NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key`
- `SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key`
- `SUPABASE_STORAGE_BUCKET=homestay-images`

### Step 8: Deploy

Click deploy and wait for build to finish.

### Step 9: Verify after first deployment

Check all of these:

1. homepage opens
2. `/admin/login` opens
3. login works
4. upload one image
5. block one date
6. refresh public homepage
7. confirm the blocked date is visible

If these work, the site is operational.

## 5. Day-To-Day Owner Workflow

This is the most important part.

### Example A: Update calendar because a customer booked a date

You do **not** redeploy.

You do this:

1. Open live website admin login:
   `https://yourdomain.com/admin/login`
2. Login with admin email/password.
3. Go to the correct homestay section.
4. Choose the date.
5. Click `Block Date` / `Sekat Tarikh`.
6. Open the public homepage.
7. Check the calendar.

Result:

- the date should appear as unavailable
- no GitHub changes needed
- no Vercel redeploy needed

### Example B: A booking was cancelled, so you want to reopen the date

You do **not** redeploy.

You do this:

1. Login to admin.
2. Find the blocked date list.
3. Click `Remove` / `Buang`.
4. Refresh the public page.

Result:

- date becomes available again
- no redeploy needed

### Example C: Upload new homestay photos

You do **not** redeploy.

You do this:

1. Login to admin.
2. Go to the correct homestay block.
3. Click file upload.
4. Select photo.
5. Add alt text if needed.
6. Click upload.
7. Refresh the public page.

Result:

- image is stored in Supabase Storage
- image record is stored in Supabase database
- image appears on live website
- no redeploy needed

### Example D: Delete old or bad photo

You do **not** redeploy.

You do this in admin:

1. find the image
2. click delete
3. refresh public page

### Example E: Change order of photos

You do **not** redeploy.

You do this in admin:

1. use reorder buttons
2. refresh the public page

Result:

- image order changes immediately

## 6. What Actually Happens When Calendar Is Updated

When the owner clicks `Block Date`:

1. the admin page sends a request to:
   `/api/admin/blocked-dates`
2. the app writes that date into Supabase table:
   `homestay_blocked_dates`
3. the public page reads updated availability from the data layer
4. the blocked date shows on the live site

This is data update, not code update.

That is why redeploy is not required.

## 7. What Actually Happens When Image Is Uploaded

When the owner uploads a new image:

1. admin page sends image to:
   `/api/admin/images`
2. app uploads image file into Supabase Storage bucket
3. app writes image metadata into `homestay_images`
4. homepage reads those records and shows the new image

Again, this is content update, not code update.

So no redeploy is required.

## 8. Cases Where It Looks Like You Need Redeploy, But You Actually Do Not

These usually just need refresh or a few seconds:

- uploaded image does not show immediately
- blocked date not visible until page refresh
- admin still sees old image order for a moment

Try:

1. refresh the page
2. open in incognito/private tab
3. wait a few seconds

If still wrong, check:

- Supabase table has the record
- Supabase storage has the file
- environment variables are correct

## 9. Cases Where You Really Do Need Redeploy

### Case 1: You changed code files

Examples:

- changed homepage text in source files
- changed section layout
- changed FAQ content in code
- changed button labels in code

Then:

1. update code
2. push to GitHub
3. Vercel redeploys

### Case 2: You changed environment variables

Examples:

- WhatsApp number
- site URL
- Supabase keys
- auth mode

Then:

1. update env vars in Vercel
2. redeploy

### Case 3: You changed domain

Then:

1. connect domain in Vercel
2. update `NEXT_PUBLIC_SITE_URL`
3. redeploy

## 10. Recommended Owner Operating Process

For the owner, daily use should be:

1. Login to `/admin/login`
2. Update dates
3. Upload/delete/reorder photos
4. Check public site

For the developer, occasional work should be:

1. improve design
2. add features
3. fix code bugs
4. redeploy only when code changes

## 11. Troubleshooting Calendar Updates

If you block a date and do not see it on public page:

1. refresh homepage
2. open same page in incognito mode
3. verify you blocked the correct homestay
4. verify the date appears in admin blocked date list
5. check Supabase table `homestay_blocked_dates`
6. check Vercel function logs if needed

If the blocked date exists in admin and Supabase but not public page, that is a technical issue to debug. It still does not mean redeploy is automatically required.

## 12. Troubleshooting Image Uploads

If image upload fails:

1. confirm Supabase bucket exists
2. confirm bucket name matches `SUPABASE_STORAGE_BUCKET`
3. confirm service role key is correct in Vercel
4. confirm uploaded file is a valid image
5. check Vercel logs

If image uploads successfully but does not display:

1. confirm image row exists in `homestay_images`
2. confirm `public_url` is valid
3. confirm the storage bucket is public
4. refresh page

## 13. Domain Purchase Guide for `telukbatik.com.my`

### If the domain is available

Recommended practical steps:

1. buy for at least 2 years
2. enable auto-renew
3. enable 2FA on registrar account
4. keep billing email safe

### If the domain is unavailable

Use a clean fallback:

- `homestaytelukbatik.com.my`
- `telukbatikhomestay.com.my`
- `staytelukbatik.com.my`

Avoid:

- very long domains
- confusing spelling
- too many hyphens

## 14. Connect Domain To Vercel

1. Open Vercel project.
2. Go to `Settings > Domains`.
3. Add:
   - root domain, for example `telukbatik.com.my`
   - `www.telukbatik.com.my`
4. Vercel will show DNS records.
5. Open your domain registrar DNS panel.
6. Add the records exactly as Vercel shows.
7. Wait for propagation.
8. Set the preferred production domain.

Recommended:

- use `www.telukbatik.com.my` as primary
- redirect root domain to `www`

## 15. Final Owner Summary

After the site is live with Supabase:

- calendar changes: no redeploy
- photo uploads: no redeploy
- photo delete/reorder: no redeploy
- normal admin use: no redeploy

Only redeploy when:

- code changes
- env vars change
- domain/canonical config changes

## 16. Short Version For Owner

If you are only changing bookings or photos:

- just log in to admin
- make the change
- refresh the website
- done

If you are changing the website design or developer files:

- that is when redeploy is needed
