'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { SingleImageUpload } from '@/components/admin/ImageUpload';
import { Save } from 'lucide-react';

const inp = { width: '100%', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#0F172A', outline: 'none', boxSizing: 'border-box' };
const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#5A6B82', marginBottom: 6 };
const focus = e => e.target.style.borderColor = '#B8893D';
const blur = e => e.target.style.borderColor = '#E2E8F0';

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [form, setForm] = useState({
    titleEn: '', titleAr: '', excerptEn: '', excerptAr: '',
    contentEn: '', contentAr: '', tags: '', isPublished: false,
  });

  useEffect(() => {
    fetch(`/api/blog/${id}`)
      .then(r => r.json())
      .then(p => {
        setForm({
          titleEn: p.titleEn || '', titleAr: p.titleAr || '',
          excerptEn: p.excerptEn || '', excerptAr: p.excerptAr || '',
          contentEn: typeof p.contentEn === 'string' ? p.contentEn : '',
          contentAr: typeof p.contentAr === 'string' ? p.contentAr : '',
          tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
          isPublished: p.isPublished || false,
        });
        setCoverImage(p.coverImage || '');
        setLoadingData(false);
      })
      .catch(() => { setError('Failed to load post.'); setLoadingData(false); });
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          coverImage,
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });
      if (res.ok) {
        router.push('/en/admin/blog');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update post.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loadingData) {
    return <AdminLayout><div className="py-20 text-center text-sm" style={{ color: '#5A6B82' }}>Loading post…</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: 720 }} className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black" style={{ color: '#0F172A' }}>Edit Blog Post</h2>
          <button onClick={() => router.back()} className="text-sm" style={{ color: '#5A6B82' }}>← Back</button>
        </div>

        {error && (
          <div className="rounded-xl px-4 py-3 text-sm" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl p-6 space-y-5" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(10,35,66,0.06)' }}>
            <SingleImageUpload
              value={coverImage}
              onChange={setCoverImage}
              folder="blog"
              label="Cover Image"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label style={lbl}>Title (English) *</label>
                <input name="titleEn" value={form.titleEn} onChange={handleChange} required style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={lbl}>Title (Arabic)</label>
                <input name="titleAr" value={form.titleAr} onChange={handleChange} dir="rtl" style={inp} onFocus={focus} onBlur={blur} />
              </div>
            </div>
            <div>
              <label style={lbl}>Excerpt (English) *</label>
              <textarea name="excerptEn" value={form.excerptEn} onChange={handleChange} rows={2} required style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={lbl}>Excerpt (Arabic)</label>
              <textarea name="excerptAr" value={form.excerptAr} onChange={handleChange} rows={2} dir="rtl" style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={lbl}>Content (English)</label>
              <textarea name="contentEn" value={form.contentEn} onChange={handleChange} rows={10} style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={lbl}>Content (Arabic)</label>
              <textarea name="contentAr" value={form.contentAr} onChange={handleChange} rows={10} dir="rtl" style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={lbl}>Tags (comma separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="HVAC, Fire Safety, Qatar" style={inp} onFocus={focus} onBlur={blur} />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="isPublished" checked={form.isPublished} onChange={handleChange} style={{ accentColor: '#B8893D', width: 16, height: 16 }} />
              <span className="text-sm font-medium" style={{ color: '#0F172A' }}>Published</span>
            </label>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity"
                style={{ background: '#B8893D', opacity: saving ? 0.7 : 1 }}>
                <Save size={15} />
                {saving ? 'Saving…' : 'Update Post'}
              </button>
              <button type="button" onClick={() => router.back()} className="rounded-xl px-6 py-3 text-sm font-semibold" style={{ background: '#F1F5F9', color: '#5A6B82' }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
