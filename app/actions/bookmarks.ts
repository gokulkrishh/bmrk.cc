'use server';

import { revalidatePath } from 'next/cache';

import createClient from 'lib/supabase/actions';

import {
  Bookmark,
  BookmarkInsert,
  BookmarkModified,
  BookmarkUpdate,
} from 'types/data';

import { getUser } from './user';

export const getBookmarks = async () => {
  const user = await getUser();
  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`*, bookmarks_tags (tags!inner (id,name))`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .returns<BookmarkModified[]>();

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

  const supabase = await createClient();
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
  bookmark: BookmarkModified,
) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }
  const supabase = await createClient();
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

  const supabase = await createClient();

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
  isFav: Bookmark['is_fav'],
) => {
  const supabase = await createClient();
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
  payload: BookmarkUpdate,
) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }
  const supabase = await createClient();
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

export const getFavBookmarks = async () => {
  const user = await getUser();
  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`*, bookmarks_tags (tags!inner (id,name))`)
    .eq('user_id', user.id)
    .eq('is_fav', true)
    .order('created_at', { ascending: false })
    .returns<BookmarkModified[]>();

  if (error) {
    return [];
  }
  return data;
};

export const getBookmarksForTag = async (slug: string) => {
  const user = await getUser();
  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`*, bookmarks_tags (tags!inner (id,name))`)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .returns<BookmarkModified[]>();

  if (error) {
    return [];
  }

  return data.filter((datum) => {
    return datum.bookmarks_tags.some((bookmarkTag) => {
      return bookmarkTag.tags.name === slug;
    });
  });
};

export const getBookmarksAsCSV = async () => {
  const user = await getUser();
  if (!user) {
    return '';
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select(
      `title, url, description, is_fav, bookmarks_tags (tags!inner (name)), created_at, updated_at`,
    )
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .returns<string>()
    .csv();

  if (error) {
    return '';
  }

  return data;
};
