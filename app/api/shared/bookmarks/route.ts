import { NextRequest } from 'next/server';

import { createClient } from '@supabase/supabase-js';

import { ratelimit } from 'lib/api';

import { BookmarkModified, Tag } from 'types/data';
import { Database } from 'types/supabase';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } },
);

export async function GET(request: NextRequest) {
  const hash = request.nextUrl.searchParams.get('hash');

  if (!hash) {
    return new Response('Missing hash', { status: 400 });
  }

  const parsedHash = decodeURIComponent(hash ?? '');
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  try {
    if (parsedHash!.length) {
      const { data: tagData, error: tagError } = await supabaseAdmin
        .from('tags')
        .select()
        .eq('public', true)
        .eq('public_hash', parsedHash)
        .returns<Tag[]>();

      if (tagError) {
        throw new Error('Failed to fetch data');
      }

      const { data: bookmarksTags, error: bookmarksTagsError } =
        await supabaseAdmin
          .from('bookmarks_tags')
          .select(`*`)
          .in(
            'tag_id',
            tagData.map((tag) => tag.id),
          );

      if (bookmarksTagsError) {
        throw new Error('Failed to fetch data');
      }

      const bookmarkIds = bookmarksTags.map((bookmark) => bookmark.bookmark_id);

      const { data, error } = await supabaseAdmin
        .from('bookmarks')
        .select(`*, bookmarks_tags (tags!inner (id,name))`)
        .in('id', bookmarkIds)
        .in(
          'bookmarks_tags.tag_id',
          tagData.map((tag) => tag.id),
        )
        .order('created_at', { ascending: false })
        .returns<BookmarkModified[]>();

      if (error) {
        throw new Error('Failed to fetch data');
      }

      return Response.json(data, { status: 200 });
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: error?.toString() || 'Error occurried.',
      }),
      { status: 500 },
    );
  }
}
