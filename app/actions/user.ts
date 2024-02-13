'use server';

import { User } from '@supabase/supabase-js';

import createClient from 'lib/supabase/actions';

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

export const setWelcomed = async () => {
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
