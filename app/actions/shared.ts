'use server';

import { revalidateTag } from 'next/cache';
import { notFound } from 'next/navigation';

import { urls } from 'config/urls';

import { nanoid } from 'lib/share';
import createClient from 'lib/supabase/server';

import { BookmarkModified, Tag, TagInsert } from 'types/data';

import { getAuthUser } from './user';

export const getSharedBookmarks = async (hash: string) => {
  const data = await fetch(
    `${urls.nonAppApi}/shared/bookmarks?hash=${encodeURIComponent(hash)}`,
    {
      cache: 'no-cache',
    },
  );
  if (data.status === 429) {
    throw new Error('ratelimitexceeded');
  }
  if (data.status === 404) {
    notFound();
  }
  if (!data.ok) {
    return [] as BookmarkModified[];
  }
  return (await data.json()) as BookmarkModified[];
};

export async function updateSharedTag(tag: Tag, shared: boolean) {
  const user = await getAuthUser();
  if (!user) {
    return {
      error: new Error('User is not authenticated.'),
    };
  }

  const supabase = await createClient();
  const hash = nanoid();

  const { error, data } = await supabase
    .from('tags')
    .update({ shared_hash: shared ? `${tag.name}-${hash}` : null, shared })
    .eq('id', tag.id)
    .select('shared,shared_hash')
    .returns<TagInsert[]>()
    .single();

  revalidateTag('supabase');

  return { error, data };
}
