create table if not exists leads (
  id         uuid        primary key default gen_random_uuid(),
  created_at timestamptz not null    default now(),
  name       text        not null,
  email      text        not null,
  phone      text,
  package    text,
  message    text,
  status     text        not null    default 'new'
);

alter table leads enable row level security;

-- service_role (server-side) bypasses RLS by default.
-- No public policies — anonymous/client keys cannot read or write leads.
