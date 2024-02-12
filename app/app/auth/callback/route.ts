import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { urls } from 'config';

import { User } from 'types/data';

export async function GET(request: Request) {
  const cookieStore = cookies();
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options });
          },
        },
      },
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    const { user } = data;
    const { data: userData } = await supabase
      .from('users')
      .select('*')
      .eq('id', user?.id)
      .single();
    if (!error) {
      if (!userData?.has_welcomed) {
        return NextResponse.redirect(urls.intro);
      }
      return NextResponse.redirect(urls.app);
    }
  }
  return NextResponse.redirect(urls.home);
}
