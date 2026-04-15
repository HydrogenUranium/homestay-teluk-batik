-- Run in Supabase SQL Editor for production mode (DATA_PROVIDER=supabase)

create extension if not exists "pgcrypto";

create table if not exists public.homestay_images (
  id uuid primary key default gen_random_uuid(),
  homestay_slug text not null check (homestay_slug in ('teluk-batik', 'lekir-tanjung-kepah')),
  storage_path text not null,
  public_url text not null,
  alt_text text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists homestay_images_slug_order_idx
  on public.homestay_images (homestay_slug, sort_order);

create table if not exists public.homestay_blocked_dates (
  id uuid primary key default gen_random_uuid(),
  homestay_slug text not null check (homestay_slug in ('teluk-batik', 'lekir-tanjung-kepah')),
  date date not null,
  created_at timestamptz not null default now(),
  unique (homestay_slug, date)
);

create index if not exists homestay_blocked_dates_slug_date_idx
  on public.homestay_blocked_dates (homestay_slug, date);

-- Enable RLS.
alter table public.homestay_images enable row level security;
alter table public.homestay_blocked_dates enable row level security;

-- Public read policy (landing page)
drop policy if exists "Public read homestay images" on public.homestay_images;
create policy "Public read homestay images"
on public.homestay_images for select
to anon, authenticated
using (true);

drop policy if exists "Public read blocked dates" on public.homestay_blocked_dates;
create policy "Public read blocked dates"
on public.homestay_blocked_dates for select
to anon, authenticated
using (true);

-- Authenticated write policies (used when admin logs in via Supabase auth).
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

-- Storage policies for admin uploads/deletes.
-- Run after creating bucket: homestay_images (or homestay-images if you prefer dash format).
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
