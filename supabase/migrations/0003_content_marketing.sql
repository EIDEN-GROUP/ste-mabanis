-- STE MABANIS — content, marketing, automations, analytics
-- Extends 0001_schema.sql + 0002_rls.sql.
-- Adds the tables the back office and the dynamic public site need on top of
-- the CRM schema, plus RLS for every one of them.

-- ------------------------------------------------------------- staff roles

-- Keep the original values and add the workspace roles the app uses. A future
-- auth phase maps auth.users -> profiles.staff_role 1:1 onto permissions.ts.
alter type staff_role add value if not exists 'directrice';
alter type staff_role add value if not exists 'commercial';
alter type staff_role add value if not exists 'assistant';

-- ---------------------------------------------------------- profiles extras

alter table profiles
  add column slug        text,
  add column phone       text,
  add column initials    text,
  add column expertise   text,
  add column bio         text,
  add column languages   text[],
  add column years       integer;

create unique index profiles_slug_idx on profiles (slug) where slug is not null;

-- -------------------------------------------------------- properties extras

-- Extra fields surfaced on the public site and in the admin forms.
alter table properties
  add column year         integer,
  add column land_surface integer,
  add column price_note   text,
  add column map_query    text;

-- ------------------------------------------------------------ site content

create table articles (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  category    text not null default 'insights',
  date        timestamptz not null default now(),
  read_time   integer not null default 3,
  excerpt     text not null default '',
  image       text,
  body        text not null default '',
  published   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create index articles_published_idx on articles (published, date desc);

create table testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null default '',
  quote       text not null,
  location    text,
  created_at  timestamptz not null default now()
);

create table locations (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  name          text not null,
  city          text not null,
  image         text,
  intro         text not null default '',
  editorial     text not null default '',
  lifestyle     text not null default '',
  investment    text not null default '',
  price_range   text,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

create index locations_sort_idx on locations (sort_order, name);

create table services (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  title       text not null,
  summary     text not null default '',
  points      text[] not null default '{}',
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index services_sort_idx on services (sort_order, title);

-- Key/value store for agency-level content: contact details, hero copy,
-- headline figures ("Chiffres clés"), selling-page KPIs, anything a
-- non-developer needs to edit without a deploy.
create table site_settings (
  id          uuid primary key default gen_random_uuid(),
  key         text not null unique,
  value       jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now()
);

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger articles_updated_at
  before update on articles
  for each row execute function set_updated_at();

create trigger site_settings_updated_at
  before update on site_settings
  for each row execute function set_updated_at();

-- -------------------------------------------------------------- marketing

create type campaign_channel as enum ('email', 'whatsapp', 'portail', 'reseaux_sociaux');
create type campaign_status  as enum ('draft', 'scheduled', 'sent');

create table marketing_campaigns (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  subject         text not null default '',
  channel         campaign_channel not null default 'email',
  status          campaign_status not null default 'draft',
  audience        text not null default '',
  audience_count  integer not null default 0,
  sent_at         timestamptz,
  opens           integer not null default 0,
  clicks          integer not null default 0,
  conversions     integer not null default 0,
  created_at      timestamptz not null default now()
);

create index campaigns_status_idx on marketing_campaigns (status, created_at desc);

-- Properties pushed on the public homepage ("À la une").
create table featured_properties (
  property_id uuid primary key references properties (id) on delete cascade,
  since       timestamptz not null default now(),
  until       timestamptz
);

-- ----------------------------------------------------------- automations

create table automation_rules (
  key      text primary key,
  enabled  boolean not null default true,
  runs     integer not null default 0,
  last_run timestamptz
);

create table automation_runs (
  id      uuid primary key default gen_random_uuid(),
  rule    text not null references automation_rules (key) on delete cascade,
  title   text not null,
  detail  text not null default '',
  at      timestamptz not null default now()
);

create index automation_runs_rule_idx on automation_runs (rule, at desc);

-- --------------------------------------------------------- match history

create table match_sends (
  id           uuid primary key default gen_random_uuid(),
  client_id    uuid not null references clients (id) on delete cascade,
  property_ids uuid[] not null default '{}',
  sent_by      uuid references profiles (id) on delete set null,
  sent_at      timestamptz not null default now()
);

create index match_sends_client_idx on match_sends (client_id, sent_at desc);

-- -------------------------------------------------------------- analytics

create table page_views (
  id         uuid primary key default gen_random_uuid(),
  path       text not null,
  viewed_at  timestamptz not null default now()
);

create index page_views_path_idx on page_views (path, viewed_at desc);
create index page_views_at_idx    on page_views (viewed_at);

-- ================================================================ RLS =====

alter table articles            enable row level security;
alter table testimonials        enable row level security;
alter table locations           enable row level security;
alter table services            enable row level security;
alter table site_settings       enable row level security;
alter table marketing_campaigns enable row level security;
alter table featured_properties enable row level security;
alter table automation_rules    enable row level security;
alter table automation_runs     enable row level security;
alter table match_sends         enable row level security;
alter table page_views          enable row level security;

-- -------------------------------------------------------------- articles

create policy articles_read_public on articles
  for select to anon using (published);

create policy articles_read_staff on articles
  for select to authenticated using (is_staff());

create policy articles_write_manager on articles
  for all to authenticated using (is_manager()) with check (is_manager());

-- ---------------------------------------------------------- testimonials

create policy testimonials_read_public on testimonials
  for select to anon using (true);

create policy testimonials_read_staff on testimonials
  for select to authenticated using (is_staff());

create policy testimonials_write_manager on testimonials
  for all to authenticated using (is_manager()) with check (is_manager());

-- ------------------------------------------------------------ locations

create policy locations_read_public on locations
  for select to anon using (true);

create policy locations_read_staff on locations
  for select to authenticated using (is_staff());

create policy locations_write_manager on locations
  for all to authenticated using (is_manager()) with check (is_manager());

-- ------------------------------------------------------------- services

create policy services_read_public on services
  for select to anon using (true);

create policy services_read_staff on services
  for select to authenticated using (is_staff());

create policy services_write_manager on services
  for all to authenticated using (is_manager()) with check (is_manager());

-- ------------------------------------------------------- site settings

create policy site_settings_read_public on site_settings
  for select to anon using (true);

create policy site_settings_read_staff on site_settings
  for select to authenticated using (is_staff());

create policy site_settings_write_manager on site_settings
  for all to authenticated using (is_manager()) with check (is_manager());

-- -------------------------------------------------------- campaigns

create policy campaigns_read_staff on marketing_campaigns
  for select to authenticated using (is_staff());

create policy campaigns_write_manager on marketing_campaigns
  for all to authenticated using (is_manager()) with check (is_manager());

-- --------------------------------------------------- featured properties

create policy featured_read_public on featured_properties
  for select to anon using (true);

create policy featured_read_staff on featured_properties
  for select to authenticated using (is_staff());

create policy featured_write_manager on featured_properties
  for all to authenticated using (is_manager()) with check (is_manager());

-- ---------------------------------------------------------- automations

create policy automation_rules_read_staff on automation_rules
  for select to authenticated using (is_staff());

create policy automation_rules_write_manager on automation_rules
  for all to authenticated using (is_manager()) with check (is_manager());

create policy automation_runs_read_staff on automation_runs
  for select to authenticated using (is_staff());

create policy automation_runs_write_manager on automation_runs
  for all to authenticated using (is_manager()) with check (is_manager());

-- ---------------------------------------------------------- match sends

create policy match_sends_read_staff on match_sends
  for select to authenticated using (is_staff());

create policy match_sends_insert_staff on match_sends
  for insert to authenticated
  with check (is_manager() or sent_by = auth.uid());

create policy match_sends_delete_manager on match_sends
  for delete to authenticated using (is_manager());

-- ------------------------------------------------------------ page views

create policy page_views_read_manager on page_views
  for select to authenticated using (is_manager());

-- =========================================================== storage =====

-- Public property imagery is read by anyone; staff manage it.
insert into storage.buckets (id, name, public) values ('properties', 'properties', true)
  on conflict (id) do nothing;

create policy properties_storage_read_public on storage.objects
  for select to anon using (bucket_id = 'properties');

create policy properties_storage_read_staff on storage.objects
  for select to authenticated using (bucket_id = 'properties');

create policy properties_storage_write_staff on storage.objects
  for all to authenticated using (bucket_id = 'properties')
  with check (bucket_id = 'properties');

-- Legal and financial documents are staff-only, never public.
insert into storage.buckets (id, name, public) values ('documents', 'documents', false)
  on conflict (id) do nothing;

create policy documents_storage_read_staff on storage.objects
  for select to authenticated using (bucket_id = 'documents');

create policy documents_storage_write_staff on storage.objects
  for all to authenticated using (bucket_id = 'documents')
  with check (bucket_id = 'documents');
