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
  usage integer default 0
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table users
  enable row level security;

create policy "Allow operations for authenticated users only" on users
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

create policy "Allow operations for authenticated users only" on bookmarks
  for all using (auth.uid () = user_id);

-- Create a table for tags
create table
  tags (
    id bigint primary key generated always as identity,
    name text not null unique,
    user_id uuid references users on delete cascade not null,
    created_at timestamp with time zone default current_timestamp not null,
    updated_at timestamp with time zone default current_timestamp not null
  );

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table tags
  enable row level security;

create policy "Allow operations for authenticated users only" on tags
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

create policy "Allow operations for authenticated users only" on bookmarks_tags
  for all using (auth.uid () = user_id);