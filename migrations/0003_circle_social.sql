alter table circle_posts add column if not exists topic text not null default 'momtip';

create table if not exists circle_likes (
  post_id text not null,
  user_id text not null,
  primary key (post_id, user_id)
);

create table if not exists circle_comments (
  id text primary key,
  post_id text not null,
  user_id text not null,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists circle_comments_post_idx on circle_comments (post_id, created_at);
