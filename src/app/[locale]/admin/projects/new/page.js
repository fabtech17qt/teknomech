'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

const CATEGORIES = ['commercial', 'residential', 'industrial', 'government'];

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '',
    category: '', location: '', completedYear: new Date().getFullYear(), isFeatured: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const slug = form.titleEn.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug, images: [], completedYear: parseInt(form.completedYear) }),
      });
      if (res.ok) router.push('/en/admin/projects');
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        <h2 className="text-brand-text font-bold text-2xl">Add New Project</h2>
        <form onSubmit={handleSubmit} className="card-dark p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { name: 'titleEn', label: 'Title (English)' },
              { name: 'titleAr', label: 'Title (Arabic)', dir: 'rtl' },
              { name: 'location', label: 'Location' },
              { name: 'completedYear', label: 'Year Completed', type: 'number' },
            ].map(({ name, label, dir, type = 'text' }) => (
              <div key={name}>
                <label className="text-brand-subtext text-xs mb-1.5 block">{label}</label>
                <input name={name} type={type} value={form[name]} onChange={handleChange} dir={dir} required className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm" />
              </div>
            ))}
          </div>
          <div>
            <label className="text-brand-subtext text-xs mb-1.5 block">Category</label>
            <select name="category" value={form.category} onChange={handleChange} required className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm">
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-brand-subtext text-xs mb-1.5 block">Description (English)</label>
            <textarea name="descriptionEn" value={form.descriptionEn} onChange={handleChange} rows={3} required className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm resize-none" />
          </div>
          <div>
            <label className="text-brand-subtext text-xs mb-1.5 block">Description (Arabic)</label>
            <textarea name="descriptionAr" value={form.descriptionAr} onChange={handleChange} rows={3} dir="rtl" required className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm resize-none" />
          </div>
          <label className="flex items-center gap-2 text-brand-subtext text-sm cursor-pointer">
            <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} className="accent-brand-red" />
            Feature on homepage
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">{saving ? 'Saving...' : 'Save Project'}</button>
            <button type="button" onClick={() => router.back()} className="btn-ghost">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
