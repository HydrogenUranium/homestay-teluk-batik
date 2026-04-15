-- Apply this in Supabase SQL Editor if your live admin shows RLS errors
-- for blocked dates or image upload/delete/reorder.

alter table public.homestay_images enable row level security;
alter table public.homestay_blocked_dates enable row level security;

drop policy if exists "Authenticated manage homestay images" on public.homestay_images;
create policy "Authenticated manage homestay images"
on public.homestay_images for all
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated manage blocked dates" on public.homestay_blocked_dates;
create policy "Authenticated manage blocked dates"
on public.homestay_blocked_dates for all
to authenticated
using (true)
with check (true);

drop policy if exists "Public read homestay storage" on storage.objects;
create policy "Public read homestay storage"
on storage.objects for select
to anon, authenticated
using (bucket_id in ('homestay_images', 'homestay-images'));

drop policy if exists "Authenticated upload homestay storage" on storage.objects;
create policy "Authenticated upload homestay storage"
on storage.objects for insert
to authenticated
with check (bucket_id in ('homestay_images', 'homestay-images'));

drop policy if exists "Authenticated update homestay storage" on storage.objects;
create policy "Authenticated update homestay storage"
on storage.objects for update
to authenticated
using (bucket_id in ('homestay_images', 'homestay-images'))
with check (bucket_id in ('homestay_images', 'homestay-images'));

drop policy if exists "Authenticated delete homestay storage" on storage.objects;
create policy "Authenticated delete homestay storage"
on storage.objects for delete
to authenticated
using (bucket_id in ('homestay_images', 'homestay-images'));
