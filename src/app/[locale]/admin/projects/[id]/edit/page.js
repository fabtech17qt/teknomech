'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { MultiImageUpload } from '@/components/admin/ImageUpload';
import { useLocale } from 'next-intl';
import { Save } from 'lucide-react';

const CATEGORIES = [
  { value: 'commercial', label: 'Commercial' },
  { value: 'residential', label: 'Residential' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'government', label: 'Government' },
  { value: 'hospitality', label: 'Hospitality' },
];

const inp = { width: '100%', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#0F172A', outline: 'none', boxSizing: 'border-box' };
const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#5A6B82', marginBottom: 6 };
const focus = e => e.target.style.borderColor = '#B8893D';
const blur = e => e.target.style.borderColor = '#E2E8F0';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const id = params.id;

  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    titleEn: '', titleAr: '', descriptionEn: '', descriptionAr: '',
    category: '', location: '', completedYear: new Date().getFullYear(),
    isFeatured: false, isActive: true,
  });

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(r => r.json())
      .then(p => {
        setForm({
          titleEn: p.titleEn || '', titleAr: p.titleAr || '',
          descriptionEn: p.descriptionEn || '', descriptionAr: p.descriptionAr || '',
          category: p.category || '', location: p.location || '',
          completedYear: p.completedYear || new Date().getFullYear(),
          isFeatured: p.isFeatured || false, isActive: p.isActive ?? true,
        });
        setImages(p.images || []);
        setLoadingData(false);
      })
      .catch(() => { setError('Failed to load project.'); setLoadingData(false); });
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
      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, images, completedYear: parseInt(form.completedYear) }),
      });
      if (res.ok) {
        router.push(`/${locale}/admin/projects`);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update project.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loadingData) {
    return <AdminLayout><div className="py-20 text-center text-sm" style={{ color: '#5A6B82' }}>Loading project…</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: 720 }} className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black" style={{ color: '#0F172A' }}>Edit Project</h2>
          <button onClick={() => router.back()} className="text-sm" style={{ color: '#5A6B82' }}>← Back</button>
        </div>

        {error && (
          <div className="rounded-xl px-4 py-3 text-sm" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl p-6 space-y-5" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(10,35,66,0.06)' }}>
            <MultiImageUpload
              values={images}
              onChange={setImages}
              folder="projects"
              label="Project Images"
              max={8}
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
              <div>
                <label style={lbl}>Location *</label>
                <input name="location" value={form.location} onChange={handleChange} required style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={lbl}>Year Completed *</label>
                <input name="completedYear" type="number" value={form.completedYear} onChange={handleChange} required min="2000" max="2099" style={inp} onFocus={focus} onBlur={blur} />
              </div>
            </div>
            <div>
              <label style={lbl}>Category *</label>
              <select name="category" value={form.category} onChange={handleChange} required style={{ ...inp, cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label style={lbl}>Description (English) *</label>
              <textarea name="descriptionEn" value={form.descriptionEn} onChange={handleChange} rows={4} required style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={lbl}>Description (Arabic)</label>
              <textarea name="descriptionAr" value={form.descriptionAr} onChange={handleChange} rows={4} dir="rtl" style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
            </div>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={handleChange} style={{ accentColor: '#B8893D', width: 16, height: 16 }} />
                <span className="text-sm font-medium" style={{ color: '#0F172A' }}>Featured on homepage</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleChange} style={{ accentColor: '#B8893D', width: 16, height: 16 }} />
                <span className="text-sm font-medium" style={{ color: '#0F172A' }}>Active (visible on site)</span>
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-opacity"
                style={{ background: '#B8893D', opacity: saving ? 0.7 : 1 }}>
                <Save size={15} />
                {saving ? 'Saving…' : 'Update Project'}
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
