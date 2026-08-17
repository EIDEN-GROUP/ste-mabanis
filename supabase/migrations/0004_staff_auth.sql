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

-- The workspace roles used by the back office (see src/lib/admin/types.ts).
-- 0001 created the enum with only agent/manager/admin; the login gate maps
-- every staff account to one of these three workspaces. Idempotent, and kept
-- in this migration (not 0005) because a freshly added enum value cannot be
-- used in the same transaction that adds it.
alter type staff_role add value if not exists 'directrice';
alter type staff_role add value if not exists 'commercial';
alter type staff_role add value if not exists 'assistant';
