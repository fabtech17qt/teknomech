'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, FileText, FolderOpen, MessageSquare, Menu, X, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/en/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/en/admin/products', icon: Package, label: 'Products' },
  { href: '/en/admin/blog', icon: FileText, label: 'Blog Posts' },
  { href: '/en/admin/projects', icon: FolderOpen, label: 'Projects' },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-brand-dark flex">
      {/* Sidebar */}
      <aside className={cn(
        'bg-brand-steel border-e border-white/5 flex flex-col transition-all duration-300',
        sidebarOpen ? 'w-56' : 'w-16'
      )}>
        <div className="flex items-center gap-2.5 p-4 border-b border-white/5 h-16">
          <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center shrink-0">
            <span className="text-white font-black text-sm">T</span>
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="text-brand-text font-bold text-sm">Teknomech</p>
              <p className="text-brand-subtext text-[10px]">Admin Panel</p>
            </div>
          )}
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                pathname === href
                  ? 'bg-brand-red/10 text-brand-red border border-brand-red/20'
                  : 'text-brand-subtext hover:text-brand-text hover:bg-brand-muted'
              )}
            >
              <Icon size={18} className="shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5 space-y-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-brand-subtext hover:text-brand-text hover:bg-brand-muted text-sm w-full transition-all"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            {sidebarOpen && <span>Collapse</span>}
          </button>
          <Link
            href="/en/admin/login"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-brand-subtext hover:text-red-400 hover:bg-brand-muted text-sm transition-all"
          >
            <LogOut size={18} className="shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-brand-steel border-b border-white/5 flex items-center px-6 justify-between">
          <h1 className="text-brand-text font-semibold">Admin Panel</h1>
          <Link href="/en" className="text-brand-subtext hover:text-brand-gold text-sm transition-colors">
            ← View Site
          </Link>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
