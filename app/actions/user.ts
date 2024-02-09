'use server';

import createClient from 'lib/supabase/actions';

import { User } from 'types/data';

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
