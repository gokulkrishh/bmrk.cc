'use server';

import createSupabaseServerClient from 'lib/supabase/server';

import { User } from 'types/data';

export const getUser = async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const { session } = data;
  return session?.user as User | undefined;
};
