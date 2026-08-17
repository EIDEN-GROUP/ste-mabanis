-- ---------------------------------------------------------------------------
-- 0004_staff_auth.sql
-- Staff authentication + full staff profile fields.
--
-- The back-office login verifies a bcrypt hash stored on the profile row
-- (see src/server/auth). The original profiles table only carried the public
-- team fields; this migration adds everything the login flow and the seed
-- script need: password_hash plus the extended staff profile columns used by
-- the site team rails and the admin.
-- ---------------------------------------------------------------------------

alter table profiles
  add column if not exists password_hash text,
  add column if not exists slug text unique,
  add column if not exists phone text,
  add column if not exists initials text,
  add column if not exists expertise text,
  add column if not exists bio text,
  add column if not exists languages text[],
  add column if not exists years integer;
