import { NextResponse } from 'next/server';

import createClient from './supabase/actions';

export const checkAuth = async (callback: Function) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  if (session?.user) {
    return callback(session.user);
  } else {
    return NextResponse.json(
      { message: 'Unauthorized request' },
      { status: 401 },
    );
  }
};
