import { NextRequest } from 'next/server';

import { messages, plans } from 'config';
import { parse } from 'node-html-parser';

import { createTagForImport } from 'app/actions/tags';
import { getUser, incrementBookmarkUsage } from 'app/actions/user';

import { checkAuth } from 'lib/auth';
import { bookmarkParser } from 'lib/bookmarks';
import { checkBookmarkLimit, checkTagLimit } from 'lib/data';
import createClient from 'lib/supabase/server';

import { BookmarkInsert } from 'types/data';

export async function POST(request: NextRequest) {
  return await checkAuth(async (user) => {
    const { content } = await request.json();
    if (!content) {
      return new Response('Content missing.', { status: 400 });
    }
    try {
      const root = parse(content) as unknown as HTMLElement;
      const bookmarks = bookmarkParser(root);
      const supabase = await createClient();
      const userData = await getUser();

      if (!userData) {
        return new Response(
          JSON.stringify({
            message: `Unable to process your request, try again later.`,
          }),
          { status: 500 },
        );
      }

      if (checkBookmarkLimit(userData, bookmarks)) {
        return new Response(
          JSON.stringify({
            message: messages.bookmarkLimit(
              userData.plan_status ?? plans.free.name,
            ),
          }),
          { status: 500 },
        );
      }

      if (checkTagLimit(userData)) {
        return new Response(
          JSON.stringify({
            message: messages.tagLimit(userData.plan_status ?? plans.free.name),
          }),
          { status: 500 },
        );
      }

      const newTag = await createTagForImport();

      if (newTag?.id) {
        const { error, data } = await supabase
          .from('bookmarks')
          .insert(
            bookmarks.map((bookmark) => ({
              ...bookmark,
              user_id: user.id,
            })) as unknown as BookmarkInsert[],
          )
          .select();

        if (error) {
          throw new Error('Unable to add bookmarks, try again');
        }

        await incrementBookmarkUsage(data.length);

        if (data?.length) {
          const { error: bookmarkError } = await supabase
            .from('bookmarks_tags')
            .insert(
              data.map((datum) => ({
                bookmark_id: datum.id,
                tag_id: newTag.id,
                user_id: user.id,
              })),
            );

          if (bookmarkError) {
            throw new Error('Unable to add bookmarks, try again');
          }

          return new Response(
            JSON.stringify({ message: 'Bookmarks are added successfully' }),
            { status: 200 },
          );
        }
      }
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: error?.toString() || 'Error occurried.',
        }),
        { status: 500 },
      );
    }
  });
}

export async function DELETE(request: NextRequest) {
  return await checkAuth(async (user) => {
    try {
      const supabase = await createClient();
      const { error: bookmarksTagsError } = await supabase
        .from('bookmarks_tags')
        .delete()
        .eq('user_id', user.id);

      if (bookmarksTagsError) {
        throw new Error('Unable to delete bookmarks, try again');
      }

      const { error: bookmarkTagsError } = await supabase
        .from('tags')
        .delete()
        .eq('user_id', user.id);

      if (bookmarkTagsError) {
        throw new Error('Unable to delete bookmarks, try again');
      }

      const { error: bookmarkError } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id);

      if (bookmarkError) {
        throw new Error('Unable to delete bookmarks, try again');
      }

      const { error: bookmarkUsageError } = await supabase
        .from('users')
        .update({ usage: { bookmarks: 0, favorites: 0, sessions: 0, tags: 0 } })
        .eq('id', user.id);

      if (bookmarkUsageError) {
        throw new Error('Unable to reset your usage, try again');
      }

      return new Response(
        JSON.stringify({ message: 'Bookmarks are deleted successfully' }),
        { status: 200 },
      );
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: error?.toString() || 'Error occurried.',
        }),
        { status: 500 },
      );
    }
  });
}
