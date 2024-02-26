'use server';

import { revalidateTag } from 'next/cache';

import { User as AuthUser } from '@supabase/supabase-js';

import createClient from 'lib/supabase/actions';

import { UserModified } from 'types/data';

export const getAuthUser = async () => {
  const supabase = await createClient();
  try {
    const { data } = await supabase.auth.getUser();
    const { user } = data;
    return user as AuthUser | undefined;
  } catch {
    return undefined;
  }
};

export const getUser = async () => {
  const supabase = await createClient();
  const user = await getAuthUser();
  if (!user) {
    return null;
  }
  try {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user?.id)
      .single();
    return data as UserModified | null;
  } catch {
    return null;
  }
};

export const setWelcomePageAsVisited = async () => {
  const user = await getAuthUser();
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

export const setImagePreview = async (preview_image: boolean) => {
  const user = await getAuthUser();
  if (!user) {
    return new Error('User is not authenticated.');
  }
  const supabase = await createClient();
  try {
    const { error } = await supabase
      .from('users')
      .update({ preview_image })
      .eq('id', user.id);
    if (error) {
      throw new Error("Couldn't turn on image preview");
    }
    revalidateTag('supabase');
  } catch {
    throw new Error("Couldn't turn on image preview");
  }
};

export const incrementBookmarkUsage = async (count: number = 1) => {
  const user = await getAuthUser();
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
  const user = await getAuthUser();
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
  const user = await getAuthUser();
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

export const incrementUploadCount = async (count: number = 1) => {
  const user = await getAuthUser();
  if (!user) {
    return new Error('Unable to increment usage.');
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc('increment_upload_count', {
    user_id: user.id,
  });

  if (error) {
    return new Error('Unable to increment upload count.');
  }
};
