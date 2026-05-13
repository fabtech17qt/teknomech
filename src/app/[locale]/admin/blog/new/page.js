'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    titleEn: '', titleAr: '', excerptEn: '', excerptAr: '',
    tags: '', isPublished: false,
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
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          slug,
          tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
          contentEn: '{}',
          contentAr: '{}',
          coverImage: '',
        }),
      });
      if (res.ok) router.push('/en/admin/blog');
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl space-y-6">
        <h2 className="text-brand-text font-bold text-2xl">New Blog Post</h2>
        <form onSubmit={handleSubmit} className="card-dark p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="text-brand-subtext text-xs mb-1.5 block">Title (English)</label>
              <input name="titleEn" value={form.titleEn} onChange={handleChange} required className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm" />
            </div>
            <div>
              <label className="text-brand-subtext text-xs mb-1.5 block">Title (Arabic)</label>
              <input name="titleAr" value={form.titleAr} onChange={handleChange} dir="rtl" required className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm" />
            </div>
          </div>
          <div>
            <label className="text-brand-subtext text-xs mb-1.5 block">Excerpt (English)</label>
            <textarea name="excerptEn" value={form.excerptEn} onChange={handleChange} rows={2} required className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm resize-none" />
          </div>
          <div>
            <label className="text-brand-subtext text-xs mb-1.5 block">Excerpt (Arabic)</label>
            <textarea name="excerptAr" value={form.excerptAr} onChange={handleChange} rows={2} dir="rtl" required className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm resize-none" />
          </div>
          <div>
            <label className="text-brand-subtext text-xs mb-1.5 block">Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="HVAC, Fire Safety, Qatar" className="w-full bg-brand-muted text-brand-text px-4 py-2.5 rounded-lg border border-white/10 focus:border-brand-red/50 focus:outline-none text-sm" />
          </div>
          <div className="p-4 bg-brand-muted/50 rounded-lg border border-white/5">
            <p className="text-brand-subtext text-sm mb-2">Rich text content editor (Tiptap) will be integrated here for the full article body in English and Arabic.</p>
          </div>
          <label className="flex items-center gap-2 text-brand-subtext text-sm cursor-pointer">
            <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} className="accent-brand-red" />
            Publish immediately
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
              {saving ? 'Saving...' : 'Save Post'}
            </button>
            <button type="button" onClick={() => router.back()} className="btn-ghost">Cancel</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
