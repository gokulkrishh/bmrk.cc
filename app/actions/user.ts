'use server';

import { cache } from 'react';

import createSupabaseServerClient from 'lib/supabase/server';

export const getUser = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
});
