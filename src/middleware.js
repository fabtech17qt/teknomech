import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const COOKIE_NAME = 'admin_session';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdminPath = /^\/(en|ar)\/admin(\/|$)/.test(pathname);
  const isLoginPath = /^\/(en|ar)\/admin\/login(\/|$)/.test(pathname);

  if (isAdminPath && !isLoginPath) {
    const cookie = request.cookies.get(COOKIE_NAME);
    const locale = pathname.startsWith('/ar') ? 'ar' : 'en';

    if (!cookie?.value) {
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { data: { user }, error } = await supabase.auth.getUser(cookie.value);

    if (error || !user) {
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/'],
};
