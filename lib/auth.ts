import { NextResponse } from 'next/server';

import createSupabaseServerClient from './supabase/server';

export const checkAuth = async (callback: Function) => {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  if (session?.user) {
    return callback(session.user);
  } else {
    return NextResponse.json(
      { message: 'Unauthorized request' },
      { status: 401 }
    );
  }
};
