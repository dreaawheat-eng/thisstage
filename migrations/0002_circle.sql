create table if not exists circle_posts (
  id text primary key,
  user_id text not null,
  author_name text not null,
  stage_id text not null,
  chips text not null default '[]',
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists circle_posts_stage_idx on circle_posts (stage_id, created_at);
