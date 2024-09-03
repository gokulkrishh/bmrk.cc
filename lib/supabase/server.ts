import { cookies } from 'next/headers';

import { type CookieOptions, createServerClient } from '@supabase/ssr';

import { Database } from 'types/supabase';

import { createFetch } from './cache';

export default function createClient(cacheTags: string[] = []) {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      global: {
        fetch: createFetch({
          next: { tags: ['supabase', ...cacheTags] },
        }),
      },
    },
  );
}
