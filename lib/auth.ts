import { NextResponse } from 'next/server';

import { User as AuthUser } from '@supabase/supabase-js';

import { getUser } from 'app/actions/user';

import { UserModified } from 'types/data';

import createClient from './supabase/actions';

export const checkAuth = async (
  callback: (
    authUser: AuthUser,
    user: UserModified,
  ) => Promise<Response | undefined>,
) => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = await getUser();
  const { user: authUser } = data;

  if (!authUser || !user) {
    return NextResponse.json(
      { message: 'Unauthorized request' },
      { status: 401 },
    );
  }

  if (authUser) {
    return callback(authUser, user);
  }
};
