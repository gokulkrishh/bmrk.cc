'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import createSupabaseServerClient from 'lib/supabase/server';

import { Bookmark, BookmarkInsert, BookmarkUpdate, Tag } from 'types/data';

import { getUser } from './user';

export type BookmarkModifiedType = Bookmark & {
  metadata: {
    imageUrl: string;
    twitterImageUrl: string;
    ogImageUrl: string;
  };
};

export const getBookmarks = async () => {
  noStore();
  const user = await getUser();
  if (!user) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('user_id', user.id)
    .returns<BookmarkModifiedType[]>();

  if (error) {
    return [];
  }

  return data;
};

type getBookmarkType = {
  is_fav: Bookmark['is_fav'];
};

export const getBookmarksWithFilter = async ({ is_fav }: getBookmarkType) => {
  noStore();
  const user = await getUser();
  if (!user) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select('*')
    .order('created_at', { ascending: false })
    .eq('is_fav', Boolean(is_fav))
    .eq('user_id', user.id)
    .returns<BookmarkModifiedType[]>();

  if (error) {
    return [];
  }

  return data;
};

export const createBookmark = async (bookmark: BookmarkInsert) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('bookmarks')
    .insert({ ...bookmark, user_id: user.id, tag_ids: [] } as BookmarkInsert);

  if (error) {
    return new Error('Unable to create a new bookmark.');
  }
  revalidatePath('/');
};

export const deleteBookmark = async (id: Bookmark['id']) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', user.id)
    .eq('id', id);

  if (error) {
    return new Error('Unable to delete the bookmark.');
  }

  revalidatePath('/');
};

export const addToFav = async (
  id: Bookmark['id'],
  isFav: Bookmark['is_fav']
) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('bookmarks')
    .update({ is_fav: isFav })
    .eq('user_id', user.id)
    .eq('id', id);

  if (error) {
    return new Error('Unable to add to fav.');
  }
  revalidatePath('/');
};

export const addTagToBookmark = async (
  id: Bookmark['id'],
  tag_ids: Tag['id'][]
) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('bookmarks')
    .update({ tag_ids })
    .eq('id', id)
    .eq('user_id', user.id);
  if (error) {
    return new Error('Unable to add tag.');
  }
  revalidatePath('/');
};
