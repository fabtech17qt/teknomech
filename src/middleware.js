import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const COOKIE_NAME = 'admin_session';
const COOKIE_SECRET = 'tm-admin-2030-xk9p4r';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isAdminPath = /^\/(en|ar)\/admin(\/|$)/.test(pathname);
  const isLoginPath = /^\/(en|ar)\/admin\/login(\/|$)/.test(pathname);

  if (isAdminPath && !isLoginPath) {
    const cookie = request.cookies.get(COOKIE_NAME);
    if (!cookie || cookie.value !== COOKIE_SECRET) {
      const locale = pathname.startsWith('/ar') ? 'ar' : 'en';
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/'],
};
