'use server';
'use server';

import createSupabaseServerClient from 'lib/supabase/server';

export async function getUser() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();
  return data.user;
}
