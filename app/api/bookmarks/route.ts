import { NextRequest } from 'next/server';

import { messages, plans } from 'config';
import { parse } from 'node-html-parser';

import { createTagForImport } from 'app/actions/tags';
import {
  incrementBookmarkUsage,
  incrementTagUsage,
  incrementUploadCount,
} from 'app/actions/user';

import { checkAuth } from 'lib/auth';
import { bookmarkParser } from 'lib/bookmarks';
import { checkBookmarkLimit, checkTagLimit, isProPlan } from 'lib/data';
import { nanoid } from 'lib/share';
import createClient from 'lib/supabase/server';

import { BookmarkInsert } from 'types/data';

export async function POST(request: NextRequest) {
  return await checkAuth(async (authUser, user) => {
    const { content } = await request.json();
    if (!content) {
      return new Response('Content missing.', { status: 400 });
    }
    try {
      const root = parse(content) as unknown as HTMLElement;
      const bookmarks = bookmarkParser(root);
      const supabase = await createClient();
      const hasProPlan = isProPlan(user);
      const allowedUploadCount = hasProPlan
        ? plans.pro.limit.imports
        : plans.free.limit.imports;
      const isWithInImportLimit = user.upload_count < allowedUploadCount;

      if (!user) {
        return new Response(
          JSON.stringify({
            message: `Unable to process your request, try again later.`,
          }),
          { status: 500 },
        );
      }

      if (!isWithInImportLimit && checkBookmarkLimit(user, bookmarks)) {
        return new Response(
          JSON.stringify({
            message: messages.bookmarkLimit(
              user.plan_status ?? plans.free.name,
            ),
          }),
          { status: 500 },
        );
      }

      if (!isWithInImportLimit && checkTagLimit(user)) {
        return new Response(
          JSON.stringify({
            message: messages.tagLimit(user.plan_status ?? plans.free.name),
          }),
          { status: 500 },
        );
      }

      const newTag = await createTagForImport(user.upload_count + 1);

      if (newTag?.id) {
        if (!isWithInImportLimit) {
          await incrementTagUsage();
        }

        const { error, data } = await supabase
          .from('bookmarks')
          .insert(
            bookmarks.map((bookmark) => ({
              ...bookmark,
              user_id: authUser.id,
            })) as unknown as BookmarkInsert[],
          )
          .select();

        if (error) {
          throw new Error('Unable to add bookmarks, try again');
        }

        if (!isWithInImportLimit) {
          await incrementBookmarkUsage(data.length);
        }

        if (data?.length) {
          const { error: bookmarkError } = await supabase
            .from('bookmarks_tags')
            .insert(
              data.map((datum) => ({
                bookmark_id: datum.id,
                tag_id: newTag.id,
                user_id: authUser.id,
              })),
            );

          if (bookmarkError) {
            throw new Error('Unable to add bookmarks, try again');
          }

          await incrementUploadCount();

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
  return await checkAuth(async (authUser) => {
    try {
      const supabase = await createClient();
      const { error: bookmarksTagsError } = await supabase
        .from('bookmarks_tags')
        .delete()
        .eq('user_id', authUser.id);

      if (bookmarksTagsError) {
        throw new Error('Unable to delete bookmarks, try again');
      }

      const { error: bookmarkTagsError } = await supabase
        .from('tags')
        .delete()
        .eq('user_id', authUser.id);

      if (bookmarkTagsError) {
        throw new Error('Unable to delete bookmarks, try again');
      }

      const { error: bookmarkError } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', authUser.id);

      if (bookmarkError) {
        throw new Error('Unable to delete bookmarks, try again');
      }

      const { error: bookmarkUsageError } = await supabase
        .from('users')
        .update({
          upload_count: 0,
          usage: { bookmarks: 0, favorites: 0, sessions: 0, tags: 0 },
        })
        .eq('id', authUser.id);

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

export async function PATCH(request: NextRequest) {
  return await checkAuth(async () => {
    try {
      const { shared, id, name } = await request.json();
      if (!id) {
        return new Response('id is missing.', { status: 400 });
      }
      if (!name) {
        return new Response('name is missing.', { status: 400 });
      }
      const supabase = await createClient();
      const hash = nanoid();
      const { error, data } = await supabase
        .from('tags')
        .update({ shared_hash: shared ? `${name}-${hash}` : null, shared })
        .eq('id', id)
        .select('shared,shared_hash')
        .single();

      if (error) {
        throw new Error('Unable to update tag publicly, try again');
      }

      return new Response(JSON.stringify({ ...data }), {
        status: 200,
      });
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
