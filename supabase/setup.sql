-- Drop existing tables, functions, and triggers if they exist
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists handle_new_user;
drop table if exists bookmarks_tags cascade;
drop table if exists tags cascade;
drop table if exists bookmarks cascade;
drop table if exists users cascade;

-- Create a table for public users
create table users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default current_timestamp,
  created_at timestamp with time zone default current_timestamp,
  has_welcomed boolean default false,
  upload_count int default 0 not null,
  usage jsonb default '{"bookmarks": 0, "tags": 0, "favorites": 0, "sessions": 0}',
  plan_status text default 'free',
  billing_cycle_start_date timestamp default current_timestamp not null,
  order_info jsonb default '{"status": "", "number": 0, "store_id": 0, "identifier":""}'
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table users
  enable row level security;

create policy "Allow operations for users table for authenticated users only" on users
  for all using (auth.uid () = id);

-- This trigger automatically creates a user profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'email', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a table for bookmarks
create table
  bookmarks (
    id bigint primary key generated always as identity,
    title text not null,
    url text not null,
    description text,
    metadata json,
    user_id uuid references users on delete cascade not null,
    is_fav boolean default false,
    created_at timestamp with time zone default current_timestamp not null,
    updated_at timestamp with time zone default current_timestamp not null
  );

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table bookmarks
  enable row level security;

create policy "Allow operations for bookmarks table for authenticated users only" on bookmarks
  for all using (auth.uid () = user_id);

-- Create a table for tags
create table
  tags (
    id bigint primary key generated always as identity,
    name text not null,
    user_id uuid references users on delete cascade not null,
    created_at timestamp with time zone default current_timestamp not null,
    updated_at timestamp with time zone default current_timestamp not null
  );

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table tags
  enable row level security;

create policy "Allow operations for tags table for authenticated users only" on tags
  for all using (auth.uid () = user_id);

-- Create a table for bookmarks tags for many to many relationship
create table
  bookmarks_tags (
    bookmark_id bigint not null references bookmarks (id),
    tag_id bigint not null references tags (id),
    user_id uuid not null references users (id) on delete cascade not null,
    primary key (bookmark_id, tag_id)
  );

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table bookmarks_tags
  enable row level security;

create policy "Allow operations for bookmarks_tags table for authenticated users only" on bookmarks_tags
  for all using (auth.uid () = user_id);

-- Create a stored procudure to update usage stats and upload count in users table by using supabse.rpc
create
or replace function increment_bookmarks_usage (user_id uuid, count int) returns void as $$
BEGIN
    UPDATE users
    SET usage = usage || jsonb_build_object('bookmarks', GREATEST(COALESCE((usage->>'bookmarks')::int, 0) + count, 0))
    WHERE id = user_id;
END;
$$ language plpgsql;

create
or replace function increment_tags_usage (user_id uuid, count int) returns void as $$
BEGIN
    UPDATE users
    SET usage = usage || jsonb_build_object('tags', GREATEST(COALESCE((usage->>'tags')::int, 0) + count, 0))
    WHERE id = user_id;
END;
$$ language plpgsql;

create
or replace function increment_favorites_usage (user_id uuid, count int) returns void as $$
BEGIN
    UPDATE users
    SET usage = usage || jsonb_build_object('favorites', GREATEST(COALESCE((usage->>'favorites')::int, 0) + count, 0))
    WHERE id = user_id;
END;
$$ language plpgsql;

create
or replace function increment_upload_count (user_id uuid) returns void as $$
BEGIN
  UPDATE users
  SET upload_count = upload_count + 1
  WHERE id = user_id;
END;
$$ language plpgsql;

-- Create a moddtime extension to automatically update the updated_at column
create extension if not exists moddatetime schema extensions;

-- assuming the table name is "bookmarks", "users" and "tags", and a timestamp column "updated_at"
-- this trigger will set the "updated_at" column to the current timestamp for every update
create trigger
  handle_updated_at_bookmarks before update
on bookmarks
for each row execute
  procedure moddatetime(updated_at);


create trigger
  handle_updated_at_users before update
on users
for each row execute
  procedure moddatetime(updated_at);

create trigger
  handle_updated_at_tags before update
on tags
for each row execute
  procedure moddatetime(updated_at);