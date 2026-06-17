'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Package, FileText, FolderOpen, Menu, X, LogOut, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/en/admin', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { href: '/en/admin/products', icon: Package, label: 'Products' },
  { href: '/en/admin/blog', icon: FileText, label: 'Blog Posts' },
  { href: '/en/admin/projects', icon: FolderOpen, label: 'Projects' },
];

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    router.push('/en/admin/login');
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#F1F5F9' }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col shrink-0 transition-all duration-300"
        style={{
          width: collapsed ? 64 : 224,
          background: '#0A2342',
          minHeight: '100vh',
        }}
      >
        {/* Brand */}
        <div
          className="flex items-center h-16 px-4 shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', gap: 12, justifyContent: collapsed ? 'center' : 'flex-start' }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: '#B8893D' }}>
            <span className="text-white font-black text-sm">T</span>
          </div>
          {!collapsed && (
            <div>
              <p className="font-bold text-sm leading-none" style={{ color: '#fff' }}>Teknomech</p>
              <p className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5">
          {NAV_ITEMS.map(({ href, icon: Icon, label, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                className="flex items-center rounded-lg text-sm font-medium transition-all duration-150"
                style={{
                  gap: 10,
                  padding: '10px 12px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  background: active ? 'rgba(184,137,61,0.18)' : 'transparent',
                  color: active ? '#B8893D' : 'rgba(255,255,255,0.65)',
                  border: active ? '1px solid rgba(184,137,61,0.3)' : '1px solid transparent',
                }}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="p-3 space-y-0.5" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center rounded-lg text-sm w-full transition-all duration-150"
            style={{
              gap: 10,
              padding: '10px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              color: 'rgba(255,255,255,0.5)',
              background: 'transparent',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent'; }}
          >
            {collapsed ? <Menu size={18} /> : <><X size={18} /><span>Collapse</span></>}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center rounded-lg text-sm w-full transition-all duration-150"
            style={{
              gap: 10,
              padding: '10px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              color: 'rgba(255,255,255,0.5)',
              background: 'transparent',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fca5a5'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'transparent'; }}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white flex items-center px-6 justify-between shrink-0" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>Teknomech Admin</span>
          <Link
            href="/en"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: '#5A6B82' }}
            onMouseEnter={e => e.currentTarget.style.color = '#B8893D'}
            onMouseLeave={e => e.currentTarget.style.color = '#5A6B82'}
          >
            <ExternalLink size={14} />
            View Site
          </Link>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
