import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = { title: 'Edit Blog Post' };

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;
  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h2 className="text-brand-text font-bold text-2xl mb-6">Edit Blog Post</h2>
        <div className="card-dark p-6">
          <p className="text-brand-subtext text-sm">Edit form for post ID: <code className="text-brand-gold">{id}</code></p>
        </div>
      </div>
    </AdminLayout>
  );
}
