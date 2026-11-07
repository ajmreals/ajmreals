-- Automated follow-up sequence for checklist leads.

-- Opt-out. Required by CAN-SPAM for commercial email; also set when a
-- recipient clicks the unsubscribe link in a follow-up.
alter table leads add column if not exists unsubscribed_at timestamptz;

-- One row per follow-up actually sent. The unique constraint is what makes
-- the cron job safe to run as often as you like: a duplicate send conflicts
-- instead of mailing someone twice.
create table if not exists lead_followups (
  id         uuid        primary key default gen_random_uuid(),
  lead_id    uuid        not null references leads (id) on delete cascade,
  step       int         not null,
  sent_at    timestamptz not null default now(),
  unique (lead_id, step)
);

create index if not exists lead_followups_lead_idx on lead_followups (lead_id);

alter table lead_followups enable row level security;

-- Signed-in staff can read the send history from the CRM. The cron route
-- writes with the service role, which bypasses RLS.
drop policy if exists "authenticated read lead_followups" on lead_followups;
create policy "authenticated read lead_followups"
  on lead_followups for select
  to authenticated
  using (true);
