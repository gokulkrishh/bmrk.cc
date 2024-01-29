'use server';

import { cache } from 'react';

import createSupabaseServerClient from 'lib/supabase/server';

export const getUser = async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const { session } = data;
  return session?.user;
};
