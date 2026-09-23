-- Run this once in the Supabase SQL editor before enabling the admin area.
create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Admin',
  role text not null default 'viewer' check (role in ('viewer', 'editor', 'super_admin')),
  status text not null default 'active' check (status in ('active', 'disabled')),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company text not null,
  email text not null,
  normalized_email text not null,
  phone text not null,
  normalized_phone text not null,
  practice text not null,
  message text not null,
  privacy_consent_at timestamptz not null,
  status text not null default 'new' check (status in ('new', 'in_progress', 'resolved', 'spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  content_kind text not null default 'news' check (content_kind in ('news', 'insight')),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body_json jsonb not null default '[]'::jsonb,
  category text,
  author_name text,
  read_time text default '3 phút đọc',
  cover_class text default 'news-cover-paper',
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  short_name text not null,
  descriptor text not null default '',
  website text,
  logo_path text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_status_created_at_idx on public.contact_messages (status, created_at desc);
create index if not exists articles_kind_status_published_at_idx on public.articles (content_kind, status, published_at desc);
create index if not exists articles_kind_updated_at_idx on public.articles (content_kind, updated_at desc);
create index if not exists partners_active_sort_name_idx on public.partners (is_active, sort_order, name);
alter table public.admin_profiles enable row level security;
alter table public.contact_messages enable row level security;
alter table public.articles enable row level security;
alter table public.partners enable row level security;

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_profiles where user_id = auth.uid() and status = 'active');
$$;

create or replace function public.can_edit_content() returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_profiles where user_id = auth.uid() and status = 'active' and role in ('editor', 'super_admin'));
$$;

drop policy if exists "admin can read own profile" on public.admin_profiles;
create policy "admin can read own profile" on public.admin_profiles for select to authenticated using (user_id = auth.uid());

drop policy if exists "public reads published news" on public.articles;
create policy "public reads published news" on public.articles for select to anon, authenticated using (status = 'published' and published_at <= now());
drop policy if exists "editors manage articles" on public.articles;
create policy "editors manage articles" on public.articles for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "public reads active partners" on public.partners;
create policy "public reads active partners" on public.partners for select to anon, authenticated using (is_active = true);
drop policy if exists "admins manage partners" on public.partners;
create policy "admins manage partners" on public.partners for all to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "admins read messages" on public.contact_messages;
create policy "admins read messages" on public.contact_messages for select to authenticated using (public.is_admin());
drop policy if exists "admins update messages" on public.contact_messages;
create policy "admins update messages" on public.contact_messages for update to authenticated using (public.can_edit_content()) with check (public.can_edit_content());

drop policy if exists "public submits messages" on public.contact_messages;
create policy "public submits messages" on public.contact_messages for insert to anon, authenticated with check (length(full_name) between 2 and 120 and length(company) between 2 and 160 and length(message) between 20 and 5000);
-- Rich-text media and editorial metadata.
alter table public.articles add column if not exists cover_image_path text;
alter table public.articles add column if not exists cover_image_alt text;
alter table public.articles add column if not exists seo_title text;
alter table public.articles add column if not exists seo_description text;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('news-media', 'news-media', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "public reads news media" on storage.objects;
create policy "public reads news media"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'news-media');

drop policy if exists "editors upload news media" on storage.objects;
create policy "editors upload news media"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'news-media'
  and public.can_edit_content()
  and (storage.foldername(name))[1] = 'news'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "editors update news media" on storage.objects;
create policy "editors update news media"
on storage.objects for update
to authenticated
using (
  bucket_id = 'news-media'
  and public.can_edit_content()
  and (storage.foldername(name))[2] = auth.uid()::text
)
with check (
  bucket_id = 'news-media'
  and public.can_edit_content()
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "editors delete news media" on storage.objects;
create policy "editors delete news media"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'news-media'
  and public.can_edit_content()
  and (storage.foldername(name))[2] = auth.uid()::text
);
