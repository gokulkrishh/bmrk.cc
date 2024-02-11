import { type NextRequest, NextResponse } from 'next/server';

import { type CookieOptions, createServerClient } from '@supabase/ssr';
import { urls } from 'config/index';

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
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    },
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  if (currentHost === 'app') {
    if (url.pathname === '/extensions') {
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
    '/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|icons|images|videos|api/).*)',
  ],
};
