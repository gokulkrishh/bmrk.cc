'use server';

import { revalidateTag } from 'next/cache';

import createClient from 'lib/supabase/server';

import {
  Bookmark,
  BookmarkInsertModified,
  BookmarkModified,
  BookmarkUpdate,
} from 'types/data';

import { getAuthUser, incrementFavUsage } from './user';

export const getBookmarks = async () => {
  const user = await getAuthUser();
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

export const createBookmark = async (bookmark: BookmarkInsertModified) => {
  const user = await getAuthUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('bookmarks')
    .insert({ ...bookmark, user_id: user.id });

  if (error) {
    return new Error('Unable to create a new bookmark.');
  }

  revalidateTag('supabase');
};

export const updateBookmark = async (
  id: Bookmark['id'],
  bookmark: BookmarkUpdate,
) => {
  const user = await getAuthUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from('bookmarks')
    .update({
      ...bookmark,
      user_id: user.id,
    })
    .eq('id', id);

  if (error) {
    return new Error('Unable to update bookmark.');
  }
  revalidateTag('supabase');
};

export const deleteBookmark = async (id: Bookmark['id']) => {
  const user = await getAuthUser();
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

  revalidateTag('supabase');
};

export const addToFav = async (
  id: Bookmark['id'],
  isFav: Bookmark['is_fav'],
) => {
  const user = await getAuthUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  if (isFav) {
    await incrementFavUsage();
  } else {
    await incrementFavUsage(-1);
  }
  const supabase = await createClient();
  const { error } = await supabase
    .from('bookmarks')
    .update({ is_fav: isFav })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    return new Error('Unable to add to fav.');
  }
  revalidateTag('supabase');
};

export const refreshBookmark = async (
  id: Bookmark['id'],
  payload: BookmarkUpdate,
) => {
  const user = await getAuthUser();
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
  revalidateTag('supabase');
};

export const getFavBookmarks = async () => {
  const user = await getAuthUser();
  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .select(`*, bookmarks_tags (tags!inner (id,name))`)
    .eq('user_id', user.id)
    .eq('is_fav', true)
    .order('updated_at', { ascending: false })
    .returns<BookmarkModified[]>();

  if (error) {
    return [];
  }
  return data;
};

export const getBookmarksForTag = async (slug: string) => {
  const user = await getAuthUser();
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
  const user = await getAuthUser();
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
