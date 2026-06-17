import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

const ADMIN_USERNAME = 'teknomech';
const ADMIN_EMAIL = 'sayeedsafvanpm@gmail.com';
const COOKIE_NAME = 'admin_session';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (username !== ADMIN_USERNAME) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });

    if (error || !data.session) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  await supabase.auth.signOut();
  const res = NextResponse.json({ ok: true });
  res.cookies.set('admin_session', '', { maxAge: 0, path: '/' });
  return res;
}
