import { NextResponse } from 'next/server';

import { User } from '@supabase/supabase-js';

import createClient from './supabase/actions';

export const checkAuth = async (
  callback: (user: User) => Promise<Response | undefined>,
) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();
  const { session } = data;

  if (!session || !session?.user) {
    return NextResponse.json(
      { message: 'Unauthorized request' },
      { status: 401 },
    );
  }

  if (session?.user) {
    return callback(session.user);
  }
};
