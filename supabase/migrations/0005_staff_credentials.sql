-- ---------------------------------------------------------------------------
-- 0005_staff_credentials.sql
-- Back-office login credentials for the four staff accounts.
--
-- Paste this file into the Supabase SQL editor (Dashboard → SQL) and run it.
-- It expects the staff auth users + profiles to already exist (they are
-- created by `bun run db:seed`). It only wires the password the custom admin
-- login verifies (profiles.password_hash) and the workspace role.
--
--   ⚠️  Change the password before using it in production:
--       a) Run this file after replacing the hashes below, or
--       b) re-seed:  bun run db:seed --skip-storage  (uses SEED_STAFF_PASSWORD)
--
-- Default password for all four accounts:  Mabanis@2026
-- To generate a new hash for your own password, run:
--   node -e "require('@node-rs/bcrypt').hash('YOUR_PASSWORD',12).then(console.log)"
-- then update the password_hash values below.
--
-- If your SITE_DOMAIN is not stemabanis.vercel.app, replace it below.
-- ---------------------------------------------------------------------------

-- Ensure the columns exist (idempotent; 0004 already adds most of them).
alter table profiles
  add column if not exists password_hash text,
  add column if not exists staff_role text;

-- Yassine El Amrani — Directrice
update profiles
set password_hash = '$2b$12$N2Dg1NGve2/tX2AUIE6zBOVH8rk5D1xaYW85JRa1./wEGiOvr/dpa',
    staff_role    = 'directrice'
where email = 'yassine.el.amrani@stemabanis.vercel.app';

-- Salma Bouhaddou — Commercial
update profiles
set password_hash = '$2b$12$N2Dg1NGve2/tX2AUIE6zBOVH8rk5D1xaYW85JRa1./wEGiOvr/dpa',
    staff_role    = 'commercial'
where email = 'salma.bouhaddou@stemabanis.vercel.app';

-- Nadia Lahlou — Commercial
update profiles
set password_hash = '$2b$12$N2Dg1NGve2/tX2AUIE6zBOVH8rk5D1xaYW85JRa1./wEGiOvr/dpa',
    staff_role    = 'commercial'
where email = 'nadia.lahlou@stemabanis.vercel.app';

-- Karim Ouhssaine — Assistant
update profiles
set password_hash = '$2b$12$N2Dg1NGve2/tX2AUIE6zBOVH8rk5D1xaYW85JRa1./wEGiOvr/dpa',
    staff_role    = 'assistant'
where email = 'karim.ouhssaine@stemabanis.vercel.app';
