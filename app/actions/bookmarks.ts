'use server';

import { revalidatePath } from 'next/cache';

import createSupabaseServerClient from 'lib/supabase/server';

import {
  Bookmark,
  BookmarkInsert,
  BookmarkModifiedType,
  BookmarkUpdate,
  Tag,
} from 'types/data';

import { getUser } from './user';

export const getBookmarks = async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select(
      `*, bookmarks_tags (
        tags!inner (id)
      )`
    )
    .order('created_at', { ascending: false })
    .returns<BookmarkModifiedType[]>();

  if (error) {
    return [];
  }

  return data.map((datum) => ({
    ...datum,
    bookmarks_tags: datum.bookmarks_tags.map((bt: any) => bt.tags.id),
  }));
};

type getBookmarkType = {
  is_fav: Bookmark['is_fav'];
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
    return new Error('Unable to create a new bookmark.');
  }
  revalidatePath('/', 'page');
};

export const updateBookmark = async (
  id: Bookmark['id'],
  bookmark: BookmarkModifiedType
) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('bookmarks')
    .update({ ...bookmark, user_id: user.id } as any)
    .eq('id', id);

  if (error) {
    return new Error('Unable to update bookmark.');
  }
  revalidatePath('/', 'page');
};

export const deleteBookmark = async (id: Bookmark['id']) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createSupabaseServerClient();

  const { error: bookmarkError } = await supabase
    .from('bookmarks_tags')
    .delete()
    .eq('bookmark_id', id)
    .eq('user_id', user.id);

  if (bookmarkError) {
    return new Error('Unable to delete the bookmark.');
  }

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('user_id', user.id)
    .eq('id', id);

  if (error) {
    return new Error('Unable to delete the bookmark.');
  }

  revalidatePath('/', 'page');
};

export const addToFav = async (
  id: Bookmark['id'],
  isFav: Bookmark['is_fav']
) => {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('bookmarks')
    .update({ is_fav: isFav })
    .eq('id', id);

  if (error) {
    return new Error('Unable to add to fav.');
  }
  revalidatePath('/', 'page');
};

export const refreshBookmark = async (
  id: Bookmark['id'],
  payload: BookmarkUpdate
) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from('bookmarks')
    .update({ ...payload })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    return new Error('Unable to refresh bookmark.');
  }
  revalidatePath('/');
};

export const getAllFavBookmarks = async () => {
  const user = await getUser();
  if (!user) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select(
      `*, bookmarks_tags (
        tags!inner (id)
      )`
    )
    .order('created_at', { ascending: false })
    .eq('is_fav', true)
    .eq('user_id', user.id)
    .returns<BookmarkModifiedType[]>();

  if (error) {
    return [];
  }

  return data.map((datum) => ({
    ...datum,
    bookmarks_tags: datum.bookmarks_tags.map((bt: any) => bt.tags.id),
  }));
};

export const getBookmarksWithFilter = async (tagName: string) => {
  const user = await getUser();
  if (!user) {
    return [];
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select(
      `*, bookmarks_tags (
        tags!inner (id,name)
      )`
    )
    .order('created_at', { ascending: false })
    .eq('user_id', user.id)
    .returns<BookmarkModifiedType[]>();

  if (error) {
    return [];
  }

  return data
    .filter((datum) => {
      const hasTag = datum.bookmarks_tags.find((bt: any) =>
        bt.tags.name?.includes(tagName)
      );
      return hasTag;
    })
    .map((datum) => ({
      ...datum,
      bookmarks_tags: datum.bookmarks_tags.map((bt: any) => bt.tags.id),
    }));
};
