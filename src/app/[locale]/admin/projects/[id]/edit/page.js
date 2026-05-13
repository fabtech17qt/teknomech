import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = { title: 'Edit Project' };

export default async function EditProjectPage({ params }) {
  const { id } = await params;
  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h2 className="text-brand-text font-bold text-2xl mb-6">Edit Project</h2>
        <div className="card-dark p-6">
          <p className="text-brand-subtext text-sm">Edit form for project ID: <code className="text-brand-gold">{id}</code></p>
        </div>
      </div>
    </AdminLayout>
  );
}
