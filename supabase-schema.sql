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

-- Optional: enable RLS if you will expose direct client writes in future.
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

-- Admin writes are done through server-side SERVICE_ROLE key, so no broad write policies are required.
