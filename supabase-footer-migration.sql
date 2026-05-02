-- Run this in your Supabase SQL Editor
-- Creates the footer_settings table

create table if not exists footer_settings (
  id uuid default gen_random_uuid() primary key,
  phone text default '+370 658 90300',
  email text default 'info@linksmauodegele.lt',
  address_post text default 'Didlaukio g. 80A, Vilnius',
  address_personal text default 'Ateities g. 25B, Vilnius',
  facebook_url text default 'https://www.facebook.com/linksmauodegele',
  company_code text default '306212187',
  description text default 'Nevyriausybinė organizacija, kuri nuo 2018 m. keičia nuskriaustų gyvūnų likimus Vilniuje.',
  nav_links jsonb default '[
    {"href": "/gyvunai", "label": "Globotiniai"},
    {"href": "/apie", "label": "Apie mus"},
    {"href": "/parama", "label": "Paremti"},
    {"href": "/parama#daiktai", "label": "Parama daiktais"},
    {"href": "/parama#isigyk", "label": "Įsigyk sau"},
    {"href": "/naujienos", "label": "Naujienos"},
    {"href": "/kontaktai", "label": "Kontaktai"}
  ]'::jsonb,
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table footer_settings enable row level security;

-- Allow public read
create policy "Public can read footer" on footer_settings
  for select using (true);

-- Allow authenticated users to update
create policy "Admins can update footer" on footer_settings
  for all using (auth.role() = 'authenticated');

-- Insert default row if empty
insert into footer_settings (phone) 
select '+370 658 90300'
where not exists (select 1 from footer_settings);
