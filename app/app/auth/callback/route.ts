import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { urls } from 'config/urls';

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (code) {
    try {
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
      if (error) {
        throw new Error('Error during code exchange');
      }
      const { user } = data;
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (userError) {
        throw new Error('Error fetching user data');
      }

      if (!userData?.has_welcomed) {
        return NextResponse.redirect(urls.intro);
      }
      return NextResponse.redirect(urls.app);
    } catch {
      return NextResponse.redirect(urls.account);
    }
  }
  return NextResponse.redirect(urls.account);
}
