-- Dont ever run this, system will take care of update usage and reset by cron job. Keeping it here just in case.

update users
set
  usage = jsonb_set(
    usage,
    '{bookmarks}',
    to_jsonb(
      (
        select
          count(*)
        from
          bookmarks
        where
          user_id = users.id and
          created_at >= date_trunc('month', current_date)

      )
    )
  );

update users
set
  usage = jsonb_set(
    usage,
    '{tags}',
    to_jsonb(
      (
        select
          count(*)
        from
          tags
        where
          user_id = users.id
          and
          created_at >= date_trunc('month', current_date)

      )
    )
  );

update users
set
  usage = jsonb_set(
    usage,
    '{favorites}',
    to_jsonb(
      (
        select
          count(*)
        from
          bookmarks
        where
          user_id = users.id
          and is_fav = true
          and created_at >= date_trunc('month', current_date)

      )
    )
  );
