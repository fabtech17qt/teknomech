'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        router.push(`/${locale}/admin`);
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-brand-red flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black text-xl">T</span>
          </div>
          <h1 className="text-brand-text font-bold text-2xl mb-1">Admin Login</h1>
          <p className="text-brand-subtext text-sm">Teknomech MEP — Content Management</p>
        </div>

        <div className="card-dark p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-brand-subtext text-xs mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm"
              />
            </div>
            <div>
              <label className="text-brand-subtext text-xs mb-1.5 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
