-- Support the admin list queries and public content ordering.
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);
create index if not exists contact_messages_status_created_at_idx on public.contact_messages (status, created_at desc);
create index if not exists articles_kind_status_published_at_idx on public.articles (content_kind, status, published_at desc);
create index if not exists articles_kind_updated_at_idx on public.articles (content_kind, updated_at desc);
create index if not exists partners_active_sort_name_idx on public.partners (is_active, sort_order, name);
-- Keep database-side writes aligned with the admin API roles.
drop policy if exists "admins manage partners" on public.partners;
create policy "admins manage partners"
on public.partners
for all
to authenticated
using (public.can_edit_content())
with check (public.can_edit_content());

drop policy if exists "admins update messages" on public.contact_messages;
create policy "admins update messages"
on public.contact_messages
for update
to authenticated
using (public.can_edit_content())
with check (public.can_edit_content());