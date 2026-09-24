-- Partner row assignment and the global marquee setting.
alter table public.partners
  add column if not exists display_row smallint not null default 1;

alter table public.partners
  drop constraint if exists partners_display_row_check;

alter table public.partners
  add constraint partners_display_row_check check (display_row between 1 and 3);

create index if not exists partners_active_row_sort_idx
  on public.partners (is_active, display_row, sort_order, name);

create table if not exists public.site_settings (
  key text primary key check (length(key) between 1 and 120),
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.site_settings enable row level security;

insert into public.site_settings (key, value)
values ('partners_motion_enabled', 'true'::jsonb)
on conflict (key) do nothing;

drop policy if exists "public reads partner settings" on public.site_settings;
create policy "public reads partner settings"
on public.site_settings
for select
to anon, authenticated
using (key = 'partners_motion_enabled');

drop policy if exists "editors manage partner settings" on public.site_settings;
create policy "editors manage partner settings"
on public.site_settings
for all
to authenticated
using (public.can_edit_content() and key = 'partners_motion_enabled')
with check (public.can_edit_content() and key = 'partners_motion_enabled');

-- Keep the public contact form, API validation and RLS policy aligned.
drop policy if exists "public submits messages" on public.contact_messages;
create policy "public submits messages"
on public.contact_messages
for insert
to anon, authenticated
with check (
  length(full_name) between 2 and 120
  and length(company) between 2 and 160
  and length(message) between 20 and 20000
);
