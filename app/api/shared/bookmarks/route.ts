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
  const download = request.nextUrl.searchParams.get('download');

  if (!hash) {
    return new Response('Missing hash', { status: 400 });
  }

  const parsedHash = decodeURIComponent(hash ?? '');
  let ip = request.headers.get("x-real-ip") ?? '127.0.0.1' as string;
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }

  try {
    if (parsedHash!.length) {
      const { data: tagData, error: tagError } = await supabaseAdmin
        .from('tags')
        .select()
        .eq('shared', true)
        .eq('shared_hash', parsedHash)
        .returns<Tag[]>();

      if (!tagData || tagData?.length === 0) {
        return new Response('Not found', { status: 404 });
      }

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

      if (!bookmarksTags || bookmarksTags?.length === 0) {
        return new Response('Not found', { status: 404 });
      }

      const bookmarkIds = bookmarksTags.map((bookmark) => bookmark.bookmark_id);

      if (download === 'csv') {
        await supabaseAdmin
          .from('bookmarks')
          .select(`*, bookmarks_tags (tags!inner (id,name))`)
          .in('id', bookmarkIds)
          .in(
            'bookmarks_tags.tag_id',
            tagData.map((tag) => tag.id),
          )
          .order('created_at', { ascending: false })
          .returns<string>()
          .csv();
        return Response.json('Download will start in a few', { status: 200 });
      }

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

      if (!data || data?.length === 0) {
        return new Response('Not found', { status: 404 });
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
