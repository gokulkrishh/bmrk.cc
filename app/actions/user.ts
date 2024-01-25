'use server';

import createSupabaseServerClient from 'lib/supabase/server';

export const getUser = async () => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
};
