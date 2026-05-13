import AdminLayout from '@/components/admin/AdminLayout';
import { Plus } from 'lucide-react';

export const metadata = { title: 'Admin — Projects' };

export default function AdminProjectsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-brand-text font-bold text-2xl mb-1">Projects</h2>
            <p className="text-brand-subtext text-sm">Manage your portfolio of completed projects.</p>
          </div>
          <a href="/en/admin/projects/new" className="btn-primary text-sm py-2">
            <Plus size={16} /> Add Project
          </a>
        </div>
        <div className="card-dark overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 text-brand-subtext font-medium text-left">Project</th>
                <th className="px-4 py-3 text-brand-subtext font-medium text-left hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-brand-subtext font-medium text-left hidden md:table-cell">Year</th>
                <th className="px-4 py-3 text-brand-subtext font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-brand-subtext">
                  No projects yet. <a href="/en/admin/projects/new" className="text-brand-red hover:underline">Add your first project.</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
