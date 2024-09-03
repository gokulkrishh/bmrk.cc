import { type NextRequest, NextResponse } from 'next/server';

import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { urls } from 'config/urls';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const url = request.nextUrl;
  const currentHost = hostname?.replace(`.${urls.homeWithoutProtocol}`, '');

  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (currentHost === 'app') {
    if (url.pathname === '/intro' || url.pathname === '/import') {
      return response;
    }
    if (url.pathname === '/account') {
      if (user) {
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
      return response;
    }
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return response;
}

export const config = {
  matcher: [
    '/',
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|robots.txt|icons|images|demo|api/).*)',
  ],
};
