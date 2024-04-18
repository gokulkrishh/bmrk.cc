'use server';

import { revalidateTag } from 'next/cache';

import { formatDate } from 'lib/date';
import createClient from 'lib/supabase/server';

import { Bookmark, Tag, TagInsert, User } from 'types/data';

import { getAuthUser } from './user';

const dateOptions = {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
} as Intl.DateTimeFormatOptions;

export const getTags = async () => {
  const user = await getAuthUser();
  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tags')
    .select('id,name,shared,shared_hash,created_at,updated_at')
    .eq('user_id', user.id)
    .order('name', { ascending: true })
    .returns<Tag[]>();

  if (error) {
    return [];
  }
  return data;
};

export const createTag = async (id: Bookmark['id'], tag: TagInsert) => {
  const user = await getAuthUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createClient();
  const { error: tagError, data: newTag } = await supabase
    .from('tags')
    .insert({ ...tag, user_id: user.id })
    .select()
    .single();

  if (tagError) {
    return new Error('Unable to create a tag.');
  }

  const { error: bookmarkError } = await supabase
    .from('bookmarks_tags')
    .insert({ bookmark_id: id, tag_id: newTag.id, user_id: user.id });

  if (bookmarkError) {
    return new Error('Unable to add tag to the bookmark.');
  }

  revalidateTag('supabase');
};

export const addTagToBookmark = async (
  id: Bookmark['id'],
  tagId: Tag['id'],
  isChecked: boolean,
) => {
  const user = await getAuthUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createClient();

  if (!isChecked) {
    const { error } = await supabase.from('bookmarks_tags').insert({
      bookmark_id: id,
      tag_id: tagId,
      user_id: user.id,
    });

    await supabase
      .from('tags')
      .update({
        updated_at: new Date().toISOString(),
      })
      .eq('id', tagId);

    if (error) {
      return new Error('Unable to remove tag from bookmark.');
    }
  } else {
    const { error } = await supabase
      .from('bookmarks_tags')
      .delete()
      .eq('bookmark_id', id)
      .eq('tag_id', tagId);

    if (error) {
      return new Error('Unable to add tag to bookmark.');
    }
  }

  revalidateTag('supabase');
};

export const deleteTag = async (tagId: Tag['id']) => {
  const user = await getAuthUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createClient();

  const { error: bookmarkError } = await supabase
    .from('bookmarks_tags')
    .delete()
    .eq('tag_id', tagId)
    .eq('user_id', user.id);

  if (bookmarkError) {
    return new Error('Unable to delete tag from bookmarks.');
  }

  const { error } = await supabase
    .from('tags')
    .delete()
    .eq('id', tagId)
    .eq('user_id', user.id);

  if (error) {
    return new Error('Unable to delete the tag.');
  }

  revalidateTag('supabase');
};

export const updateTag = async (id: Bookmark['id'], name: Tag['name']) => {
  const user = await getAuthUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from('tags')
    .update({ name } as TagInsert)
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    return new Error('Unable to update bookmark.');
  }
  revalidateTag('supabase');
};

export const getTagsWithBookmarkIds = async () => {
  const user = await getAuthUser();
  if (!user) {
    return {};
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('bookmarks_tags')
    .select()
    .eq('user_id', user.id);

  if (error) {
    return {};
  }

  return data.reduce((acc: { [key: string]: number[] }, datum) => {
    if (!acc[datum.tag_id]) {
      acc[datum.tag_id] = [datum.bookmark_id];
    } else {
      acc[datum.tag_id].push(datum.bookmark_id);
    }
    return acc;
  }, {});
};

export const createTagForImport = async (uploadCount: number) => {
  const user = await getAuthUser();
  if (!user) {
    return null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tags')
    .insert({
      name: `imported-on-${formatDate(new Date(), dateOptions)?.replaceAll('/', '-')}-${uploadCount}`,
      user_id: user.id,
    } as TagInsert)
    .select()
    .single();

  if (error) {
    return null;
  }

  return data;
};
