import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { supabasePublishableKey, supabaseUrl } from '@/lib/config';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({ request });
  const url = supabaseUrl;
  const key = supabasePublishableKey;

  if (!url || !key || (!request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/preview'))) return response;

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() { return request.cookies.getAll(); },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  await supabase.auth.getUser();
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export const config = { matcher: ['/admin/:path*', '/login', '/preview/:path*'] };
