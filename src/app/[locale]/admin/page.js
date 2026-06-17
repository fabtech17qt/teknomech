'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Package, FileText, FolderOpen, MessageSquare, Plus } from 'lucide-react';

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-xl p-5 flex items-center gap-4" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(10,35,66,0.06)' }}>
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#F1F5F9' }}>
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#5A6B82' }}>{label}</p>
        <p className="text-2xl font-black" style={{ color: '#0F172A' }}>{value}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: '—', blog: '—', projects: '—', contacts: '—' });

  useEffect(() => {
    Promise.all([
      fetch('/api/products?all=true').then(r => r.json()),
      fetch('/api/blog?all=true').then(r => r.json()),
      fetch('/api/projects?all=true').then(r => r.json()),
      fetch('/api/contact').then(r => r.json()),
    ]).then(([products, blog, projects, contacts]) => {
      setStats({
        products: Array.isArray(products) ? products.length : '—',
        blog: Array.isArray(blog) ? blog.length : '—',
        projects: Array.isArray(projects) ? projects.length : '—',
        contacts: Array.isArray(contacts) ? contacts.length : '—',
      });
    }).catch(() => {});
  }, []);

  const quick = [
    { href: '/en/admin/products/new', label: 'Add Product', desc: 'Add a new MEP product to the catalogue' },
    { href: '/en/admin/blog/new', label: 'Write Blog Post', desc: 'Create a new engineering article' },
    { href: '/en/admin/projects/new', label: 'Add Project', desc: 'Showcase a completed project' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black mb-1" style={{ color: '#0F172A' }}>Dashboard</h2>
          <p className="text-sm" style={{ color: '#5A6B82' }}>Welcome back. Here's an overview of your content.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Products" value={stats.products} icon={Package} color="#B8893D" />
          <StatCard label="Blog Posts" value={stats.blog} icon={FileText} color="#3B82F6" />
          <StatCard label="Projects" value={stats.projects} icon={FolderOpen} color="#10B981" />
          <StatCard label="Contact Submissions" value={stats.contacts} icon={MessageSquare} color="#0A2342" />
        </div>

        <div>
          <h3 className="font-bold text-sm mb-3" style={{ color: '#0F172A' }}>Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quick.map(({ href, label, desc }) => (
              <a
                key={href}
                href={href}
                className="bg-white rounded-xl p-5 flex items-start gap-3 transition-all group"
                style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(10,35,66,0.06)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#B8893D'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: '#FBF5E5' }}>
                  <Plus size={16} style={{ color: '#B8893D' }} />
                </div>
                <div>
                  <p className="font-bold text-sm mb-0.5" style={{ color: '#0F172A' }}>{label}</p>
                  <p className="text-xs" style={{ color: '#5A6B82' }}>{desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
