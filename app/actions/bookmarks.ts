'use server';

import { revalidatePath } from 'next/cache';

import { Bookmark, BookmarkInsert } from 'types/data';

import createSupabaseServerClient from 'lib/supabase/server';

import { getUser } from './user';

export type BookmarkModifiedType = Bookmark & {
  metadata: {
    imageUrl: string;
    twitterImageUrl: string;
    ogImageUrl: string;
  };
};

export const getBookmarks = async () => {
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
    .insert({ ...bookmark, user_id: user.id } as BookmarkInsert);

  if (error) {
    return new Error('Unable to create new bookmark.');
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
