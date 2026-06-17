'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
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
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push(`/${locale}/admin`);
      } else {
        setError('Invalid username or password.');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const inp = {
    width: '100%',
    background: '#F8FAFC',
    border: '1.5px solid #E2E8F0',
    borderRadius: 10,
    padding: '11px 14px',
    fontSize: 14,
    color: '#0F172A',
    outline: 'none',
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#F1F5F9' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: '#0A2342' }}
          >
            <span className="font-black text-2xl" style={{ color: '#B8893D' }}>T</span>
          </div>
          <h1 className="font-bold text-2xl mb-1" style={{ color: '#0F172A' }}>Admin Login</h1>
          <p className="text-sm" style={{ color: '#5A6B82' }}>Teknomech MEP — Content Management</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{ background: '#fff', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(10,35,66,0.08)' }}
        >
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: '#5A6B82' }}>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                style={inp}
                onFocus={e => e.target.style.borderColor = '#B8893D'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: '#5A6B82' }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={inp}
                onFocus={e => e.target.style.borderColor = '#B8893D'}
                onBlur={e => e.target.style.borderColor = '#E2E8F0'}
              />
            </div>
            {error && (
              <p className="text-sm rounded-lg px-4 py-3" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-opacity"
              style={{ background: '#0A2342', color: '#fff', opacity: loading ? 0.7 : 1 }}
            >
              <Lock size={15} />
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
