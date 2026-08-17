-- ---------------------------------------------------------------------------
-- 0005_staff_credentials.sql
-- Back-office login accounts for the four staff members.
--
-- Paste this file into the Supabase SQL editor (Dashboard → SQL) and run it.
-- It is self-contained: it creates the auth users and profiles if they are
-- missing, and re-applies the login password + workspace role on every run
-- (idempotent).
--
--   ⚠️  Requires migration 0004 first — it adds the staff_role enum values
--       (directrice/commercial/assistant) and the password_hash column.
--
-- Default password for all four accounts:  Mabanis@2026
-- To use another password, replace it in BOTH crypt('…', ...) and the
-- password_hash strings, or generate a new hash with:
--   node -e "require('@node-rs/bcrypt').hash('YOUR_PASSWORD',12).then(console.log)"
--
-- The admin login (src/lib/admin/auth/session.ts) verifies profiles.password_hash
-- (bcrypt) — NOT the Supabase Auth password. The auth user is created anyway so
-- the account is complete and could sign in through Supabase Auth too.
-- ---------------------------------------------------------------------------

-- Columns in case 0004 was not applied (idempotent).
alter table profiles
  add column if not exists password_hash text,
  add column if not exists staff_role staff_role;

-- Create the auth users if they do not exist yet. No-op for existing emails.
-- Note: no ON CONFLICT (email) target — modern Supabase enforces uniqueness
-- through an index on lower(email), so a bare ON CONFLICT DO NOTHING is used
-- (it skips conflicting rows whatever the underlying unique index is).
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, email_change, email_change_token_new, recovery_token
)
values
  (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(),
    'authenticated', 'authenticated',
    'yassine.el.amrani@mabanis.com',
    crypt('Mabanis@2026', gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{}', now(), now(),
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(),
    'authenticated', 'authenticated',
    'salma.bouhaddou@mabanis.com',
    crypt('Mabanis@2026', gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{}', now(), now(),
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(),
    'authenticated', 'authenticated',
    'nadia.lahlou@mabanis.com',
    crypt('Mabanis@2026', gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{}', now(), now(),
    '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000', gen_random_uuid(),
    'authenticated', 'authenticated',
    'karim.ouhssaine@mabanis.com',
    crypt('Mabanis@2026', gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"]}', '{}', now(), now(),
    '', '', '', ''
  )
on conflict do nothing;

-- Upsert each profile (creates it if missing, refreshes password + role if not).
insert into profiles (id, name, role, staff_role, email, password_hash, created_at)
select u.id, v.name, v.role, v.staff_role, u.email, v.password_hash, now()
from auth.users u
join (
  values
    (
      'yassine.el.amrani@mabanis.com',
      'Yassine El Amrani',
      'Directeur associé · Prestige & Investissement',
      'directrice'::staff_role,
      '$2b$12$N2Dg1NGve2/tX2AUIE6zBOVH8rk5D1xaYW85JRa1./wEGiOvr/dpa'
    ),
    (
      'salma.bouhaddou@mabanis.com',
      'Salma Bouhaddou',
      'Conseillère senior · Résidentiel & Familles',
      'commercial'::staff_role,
      '$2b$12$N2Dg1NGve2/tX2AUIE6zBOVH8rk5D1xaYW85JRa1./wEGiOvr/dpa'
    ),
    (
      'nadia.lahlou@mabanis.com',
      'Nadia Lahlou',
      'Expertise & évaluation immobilière',
      'commercial'::staff_role,
      '$2b$12$N2Dg1NGve2/tX2AUIE6zBOVH8rk5D1xaYW85JRa1./wEGiOvr/dpa'
    ),
    (
      'karim.ouhssaine@mabanis.com',
      'Karim Ouhssaine',
      'Responsable gestion locative & commerce',
      'assistant'::staff_role,
      '$2b$12$N2Dg1NGve2/tX2AUIE6zBOVH8rk5D1xaYW85JRa1./wEGiOvr/dpa'
    )
) as v(email, name, role, staff_role, password_hash) on v.email = u.email
on conflict (id) do update
  set staff_role    = excluded.staff_role,
      password_hash = excluded.password_hash;
