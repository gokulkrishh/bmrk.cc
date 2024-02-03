'use server';

import { revalidatePath } from 'next/cache';

import createClient from 'lib/supabase/actions';

import { Bookmark, Tag, TagInsert } from 'types/data';

import { getUser } from './user';

export const getTags = async () => {
  const user = await getUser();
  if (!user) {
    return [];
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .eq('user_id', user.id)
    .order('name', { ascending: true })
    .returns<Tag[]>();

  if (error) {
    return [];
  }
  return data;
};

export const createTag = async (id: Bookmark['id'], tag: TagInsert) => {
  const user = await getUser();
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

  revalidatePath('/', 'page');
};

export const addTagToBookmark = async (
  id: Bookmark['id'],
  tagId: Tag['id'],
  isChecked: boolean,
) => {
  const user = await getUser();
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

  revalidatePath('/', 'page');
};

export const deleteTag = async (tagId: Tag['id']) => {
  const user = await getUser();
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

  revalidatePath('/tags');
};

export const updateTag = async (id: Bookmark['id'], name: Tag['name']) => {
  const user = await getUser();
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
  revalidatePath('/tags', 'page');
};

export const getTagsWithBookmarkIds = async () => {
  const user = await getUser();
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
