'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import createSupabaseServerClient from 'lib/supabase/server';

import { Bookmark, Tag, TagInsert } from 'types/data';

import { getUser } from './user';

export const getTags = async () => {
  const user = await getUser();
  if (!user) {
    return [];
  }
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('tags')
    .select('id, name')
    .eq('user_id', user.id)
    .order('name', { ascending: false })
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

  const supabase = await createSupabaseServerClient();
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

  revalidatePath('/');
};

export const getTagsByName = async () => {};

export const addTagToBookmark = async (
  id: Bookmark['id'],
  tagId: Tag['id'],
  isChecked: boolean
) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }

  const supabase = await createSupabaseServerClient();

  if (!isChecked) {
    const { error } = await supabase
      .from('bookmarks_tags')
      .insert({ bookmark_id: id, tag_id: tagId, user_id: user.id });

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

  revalidatePath('/');
};
