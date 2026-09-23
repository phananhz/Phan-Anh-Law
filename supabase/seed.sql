-- After creating the first user in Supabase Auth, replace the UUID below and run:
-- insert into public.admin_profiles (user_id, display_name, role)
-- values ('AUTH_USER_UUID', 'Phan Anh Admin', 'super_admin');

insert into public.partners (name, short_name, descriptor, sort_order)
select * from (values
  ('Sunshine Group', 'SG', 'Property & Investment', 10),
  ('JNC Group', 'JNC', 'Infrastructure & Development', 20),
  ('MIK Group', 'MIK', 'Real Estate & Hospitality', 30),
  ('TL Group', 'TL', 'Business Solutions', 40),
  ('Hung Hai Group', 'HH', 'Manufacturing & Trade', 50)
) as seed(name, short_name, descriptor, sort_order)
where not exists (select 1 from public.partners);
