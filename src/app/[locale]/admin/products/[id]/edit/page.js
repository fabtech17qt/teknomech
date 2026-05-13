import AdminLayout from '@/components/admin/AdminLayout';

export const metadata = { title: 'Edit Product' };

export default async function EditProductPage({ params }) {
  const { id } = await params;

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <h2 className="text-brand-text font-bold text-2xl mb-6">Edit Product</h2>
        <div className="card-dark p-6">
          <p className="text-brand-subtext text-sm">
            Edit form for product ID: <code className="text-brand-gold">{id}</code>
          </p>
          <p className="text-brand-subtext text-sm mt-2">
            In production, this form will pre-populate with product data fetched from the database.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
