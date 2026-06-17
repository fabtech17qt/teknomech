import { NextResponse } from 'next/server';

const ADMIN_USERNAME = 'admintekno';
const ADMIN_PASSWORD = 'Technomech@2030';
const COOKIE_NAME = 'admin_session';
const COOKIE_SECRET = 'tm-admin-2030-xk9p4r';

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const res = NextResponse.json({ ok: true });
      res.cookies.set(COOKIE_NAME, COOKIE_SECRET, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      return res;
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
  return res;
}
