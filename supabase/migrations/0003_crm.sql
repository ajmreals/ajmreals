-- CRM: pipeline status, per-lead notes, and authenticated-user access.

-- Constrain status to the pipeline stages the CRM uses.
alter table leads drop constraint if exists leads_status_check;
alter table leads add constraint leads_status_check
  check (status in ('new', 'contacted', 'qualified', 'won', 'lost'));

create table if not exists lead_notes (
  id         uuid        primary key default gen_random_uuid(),
  lead_id    uuid        not null references leads (id) on delete cascade,
  body       text        not null,
  author     text,
  created_at timestamptz not null default now()
);

create index if not exists lead_notes_lead_id_idx on lead_notes (lead_id, created_at desc);

alter table lead_notes enable row level security;

-- Signed-in staff get full access to the pipeline. Anonymous visitors get
-- nothing: the public forms write via the service role, which bypasses RLS.
drop policy if exists "authenticated full access to leads" on leads;
create policy "authenticated full access to leads"
  on leads for all
  to authenticated
  using (true)
  with check (true);

drop policy if exists "authenticated full access to lead_notes" on lead_notes;
create policy "authenticated full access to lead_notes"
  on lead_notes for all
  to authenticated
  using (true)
  with check (true);
