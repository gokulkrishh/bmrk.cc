import { NextRequest } from 'next/server';

import { User, createClient } from '@supabase/supabase-js';

import { checkAuth } from 'lib/auth';

import { Database } from 'types/supabase';

const errorMessage = 'Unable to delete your account, try again.';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } },
);

export async function POST(request: NextRequest) {
  return await checkAuth(async (user: User) => {
    const { email } = await request.json();
    if (!email) {
      return new Response('Email id is missing.', { status: 400 });
    }
    if (user.email !== email) {
      return new Response(JSON.stringify({ message: errorMessage }), {
        status: 500,
      });
    }
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
      if (error) {
        return new Response(JSON.stringify({ error, message: errorMessage }), {
          status: 500,
        });
      }
      return new Response(
        JSON.stringify({ message: 'Account has been deleted successfully.' }),
        { status: 200 },
      );
    } catch (error) {
      return new Response(JSON.stringify({ error, message: errorMessage }), {
        status: 500,
      });
    }
  });
}
