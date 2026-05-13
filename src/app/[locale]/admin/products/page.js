import AdminLayout from '@/components/admin/AdminLayout';
import { Link } from '@/i18n/navigation';
import { Plus, Edit, Trash2 } from 'lucide-react';

export const metadata = { title: 'Admin — Products' };

export default function AdminProductsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-brand-text font-bold text-2xl mb-1">Products</h2>
            <p className="text-brand-subtext text-sm">Manage your MEP product catalog.</p>
          </div>
          <a href="/en/admin/products/new" className="btn-primary text-sm py-2">
            <Plus size={16} /> Add Product
          </a>
        </div>

        <div className="card-dark overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-4 py-3 text-brand-subtext font-medium text-left">Product</th>
                <th className="px-4 py-3 text-brand-subtext font-medium text-left hidden md:table-cell">Category</th>
                <th className="px-4 py-3 text-brand-subtext font-medium text-left hidden lg:table-cell">Brand</th>
                <th className="px-4 py-3 text-brand-subtext font-medium text-left hidden md:table-cell">Status</th>
                <th className="px-4 py-3 text-brand-subtext font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-brand-subtext">
                  No products yet. <a href="/en/admin/products/new" className="text-brand-red hover:underline">Add your first product.</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
