-- Follow-up scheduler — APPLIED, recorded here for handoff.
--
-- Not a numbered migration: it carries a secret, so it must never be run
-- verbatim from the repo. The live job was created with the real value of
-- CRON_SECRET (also set on the Railway service). Replace the placeholder
-- below before running this anywhere.
--
-- What it does: pg_cron calls the app's /api/cron/follow-ups route once a
-- day over HTTP via pg_net. Native to the stack — no extra Railway service,
-- and no third-party scheduler holding a key to the site.
--
-- To inspect:   select * from cron.job;
-- To pause:     select cron.unschedule('ajmreals-follow-ups');
-- Last runs:    select * from cron.job_run_details order by start_time desc limit 10;
-- HTTP replies: select id, status_code, content from net._http_response
--                 order by created desc limit 10;

create extension if not exists pg_cron;
create extension if not exists pg_net;

select cron.unschedule('ajmreals-follow-ups')
where exists (select 1 from cron.job where jobname = 'ajmreals-follow-ups');

-- 14:00 UTC — mid-morning Eastern, when a work email is most likely read.
-- The route decides who is actually due, so a daily run just means a step
-- goes out within a day of becoming due.
select cron.schedule(
  'ajmreals-follow-ups',
  '0 14 * * *',
  $$
  select net.http_get(
    url     := 'https://ajmreals-production.up.railway.app/api/cron/follow-ups',
    headers := jsonb_build_object('Authorization', 'Bearer <CRON_SECRET>'),
    timeout_milliseconds := 30000
  );
  $$
);
