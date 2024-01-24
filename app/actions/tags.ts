'use server';

import { unstable_noStore as noStore, revalidatePath } from 'next/cache';

import createSupabaseServerClient from 'lib/supabase/server';

import { Bookmark, Tag, TagInsert, TagUpdate } from 'types/data';

import { getUser } from './user';

export const getTags = async () => {
  noStore();
  const user = await getUser();
  if (!user) {
    return [];
  }
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .eq('user_id', user.id)
    .order('name', { ascending: false })
    .returns<Tag[]>();

  if (error) {
    return [];
  }
  return data;
};

export const createTag = async (tag: TagInsert) => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }
  const supabase = await createSupabaseServerClient();
  const { error, data } = await supabase
    .from('tags')
    .upsert({ ...tag, user_id: user.id })
    .eq('user_id', user.id)
    .select();

  if (error) {
    return new Error('Unable to create a tag.');
  }
  return data;
};
