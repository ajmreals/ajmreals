-- Track where a lead came from (contact form, checklist download, etc.)
alter table leads add column if not exists source text not null default 'contact';

create index if not exists leads_source_idx on leads (source);
create index if not exists leads_created_at_idx on leads (created_at desc);
