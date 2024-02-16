import { NextRequest } from 'next/server';

import { plans } from 'config';
import { parse } from 'node-html-parser';

import { getUser } from 'app/actions/user';

import { checkAuth } from 'lib/auth';
import { bookmarkParser } from 'lib/bookmarks';
import { formatDate } from 'lib/date';
import createClient from 'lib/supabase/server';

import { BookmarkInsert, TagInsert, UserModified } from 'types/data';

const dateOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
} as Intl.DateTimeFormatOptions;

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

      const isProPlan = userData?.plan_status === plans.pro.type;
      const currentPlan = isProPlan ? plans.pro : plans.free;

      const isBookmarkLimitReached =
        userData?.usage?.bookmarks >= currentPlan.limit.bookmarks ||
        bookmarks.length > currentPlan.limit.bookmarks;

      if (isBookmarkLimitReached) {
        return new Response(
          JSON.stringify({
            message: `Bookmarks count exceeds the ${isProPlan ? plans.pro.name : plans.free.name} plan limit.`,
          }),
          { status: 500 },
        );
      }

      const isTagLimitReached = userData?.usage?.tags >= currentPlan.limit.tags;

      if (isTagLimitReached) {
        return new Response(
          JSON.stringify({
            message: `Tags count exceeds the ${isProPlan ? plans.pro.name : plans.free.name} plan limit.`,
          }),
          { status: 500 },
        );
      }

      const { data: newTag } = await supabase
        .from('tags')
        .insert({
          name: `imported-on-${formatDate(new Date(), dateOptions)?.replaceAll('/', '-')}`,
          user_id: user.id,
        } as TagInsert)
        .select()
        .single();

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
