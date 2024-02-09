import { cookies } from 'next/headers';

import { createServerClient } from '@supabase/ssr';

import { createFetch } from './cache';

export default function createClient(cacheTags: string[] = ['supabase']) {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
      global: {
        fetch: createFetch({
          next: { revalidate: 60, tags: [...cacheTags] },
        }),
      },
    },
  );
}
