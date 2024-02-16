'use server';

import { User } from '@supabase/supabase-js';

import createClient from 'lib/supabase/actions';

import { BookmarkInsert, BookmarkInsertModified } from 'types/data';

export const getUser = async () => {
  const supabase = await createClient(['user']);
  try {
    const { data } = await supabase.auth.getSession();
    const { session } = data;
    return session?.user as User | undefined;
  } catch {
    return undefined;
  }
};

export const setWelcomePageAsVisited = async () => {
  const user = await getUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from('users')
      .update({ has_welcomed: true })
      .eq('id', user.id);
    if (error) {
      throw new Error("User hasn't been welcomed");
    }
  } catch {
    throw new Error("User hasn't been welcomed");
  }
};

export const incrementBookmarkUsage = async (count: number = 1) => {
  const user = await getUser();
  if (!user) {
    return new Error('Unable to increment usage.');
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc('increment_bookmarks_usage', {
    user_id: user.id,
    count,
  });

  if (error) {
    return new Error('Unable to increment usage.');
  }
};

export const incrementTagUsage = async (count: number = 1) => {
  const user = await getUser();
  if (!user) {
    return new Error('Unable to increment usage.');
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc('increment_tags_usage', {
    user_id: user.id,
    count,
  });

  if (error) {
    return new Error('Unable to increment usage.');
  }
};

export const incrementFavUsage = async (count: number = 1) => {
  const user = await getUser();
  if (!user) {
    return new Error('Unable to increment usage.');
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc('increment_favorites_usage', {
    user_id: user.id,
    count,
  });

  if (error) {
    return new Error('Unable to increment usage.');
  }
};
