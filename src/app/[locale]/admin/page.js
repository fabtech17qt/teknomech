import AdminLayout from '@/components/admin/AdminLayout';
import { Package, FileText, FolderOpen, MessageSquare, TrendingUp } from 'lucide-react';

export const metadata = { title: 'Admin Dashboard' };

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-brand-text font-bold text-2xl mb-1">Dashboard</h2>
          <p className="text-brand-subtext text-sm">Welcome back. Here's an overview of your content.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Products', value: '—', icon: Package, color: 'text-brand-gold' },
            { label: 'Blog Posts', value: '—', icon: FileText, color: 'text-blue-400' },
            { label: 'Projects', value: '—', icon: FolderOpen, color: 'text-green-400' },
            { label: 'Contact Submissions', value: '—', icon: MessageSquare, color: 'text-brand-red' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="card-dark p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-muted flex items-center justify-center">
                <Icon size={20} className={color} />
              </div>
              <div>
                <p className="text-brand-subtext text-xs mb-0.5">{label}</p>
                <p className="text-brand-text font-bold text-xl">{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: '/en/admin/products/new', label: 'Add Product', desc: 'Add a new MEP product to the catalog' },
            { href: '/en/admin/blog/new', label: 'Write Blog Post', desc: 'Create a new engineering article' },
            { href: '/en/admin/projects/new', label: 'Add Project', desc: 'Showcase a completed project' },
          ].map(({ href, label, desc }) => (
            <a
              key={href}
              href={href}
              className="card-dark p-5 hover:border-brand-red/40 group"
            >
              <h3 className="text-brand-text font-semibold mb-1 group-hover:text-brand-red transition-colors">{label}</h3>
              <p className="text-brand-subtext text-sm">{desc}</p>
            </a>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
