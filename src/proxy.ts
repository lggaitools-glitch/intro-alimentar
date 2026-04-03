import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const PROTECTED_PATHS = ['/plan', '/diary', '/allergens', '/learn', '/setup', '/approach', '/readiness'];

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // No Supabase configured — guest mode, allow everything
  if (!url || !key) return NextResponse.next();

  const { pathname } = request.nextUrl;

  // Only protect specific routes
  const isProtected = PROTECTED_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'));
  if (!isProtected) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Don't redirect unauthenticated users — guest mode uses localStorage.
  // The proxy still refreshes auth cookies for logged-in users.
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons|manifest.json|sw.js|sitemap\\.xml|robots\\.txt|.*\\.svg$).*)',
  ],
};
