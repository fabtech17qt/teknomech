'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { MultiImageUpload, DocumentUpload } from '@/components/admin/ImageUpload';
import { useLocale } from 'next-intl';
import { Save, Plus, Trash2 } from 'lucide-react';

const CATEGORIES = [
  { value: 'fire-protection', label: 'Fire Protection' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'lv-systems', label: 'LV & Security Systems' },
];

const inp = { width: '100%', background: '#F8FAFC', border: '1.5px solid #E2E8F0', borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#0F172A', outline: 'none', boxSizing: 'border-box' };
const lbl = { display: 'block', fontSize: 12, fontWeight: 600, color: '#5A6B82', marginBottom: 6 };
const focus = e => e.target.style.borderColor = '#B8893D';
const blur = e => e.target.style.borderColor = '#E2E8F0';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const id = params.id;

  const [saving, setSaving] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [specSheet, setSpecSheet] = useState('');
  const [specs, setSpecs] = useState([{ key: '', value: '' }]);
  const [variantsJson, setVariantsJson] = useState('');
  const [form, setForm] = useState({
    nameEn: '', nameAr: '', descriptionEn: '', descriptionAr: '',
    category: '', brand: '', certifications: '', isFeatured: false, isActive: true,
  });

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(p => {
        setForm({
          nameEn: p.nameEn || '', nameAr: p.nameAr || '',
          descriptionEn: p.descriptionEn || '', descriptionAr: p.descriptionAr || '',
          category: p.category || '', brand: p.brand || '',
          certifications: Array.isArray(p.certifications) ? p.certifications.join(', ') : '',
          isFeatured: p.isFeatured || false, isActive: p.isActive ?? true,
        });
        setImages(p.images || []);
        setSpecSheet(p.specSheet || '');

        const specsObj = p.specifications && typeof p.specifications === 'object' && !Array.isArray(p.specifications)
          ? p.specifications : {};
        const specRows = Object.entries(specsObj).map(([key, value]) => ({ key, value }));
        setSpecs(specRows.length > 0 ? specRows : [{ key: '', value: '' }]);

        if (Array.isArray(p.variants) && p.variants.length > 0) {
          setVariantsJson(JSON.stringify(p.variants, null, 2));
        }

        setLoadingData(false);
      })
      .catch(() => { setError('Failed to load product.'); setLoadingData(false); });
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  }

  function addSpecRow() { setSpecs(s => [...s, { key: '', value: '' }]); }
  function removeSpecRow(i) { setSpecs(s => s.filter((_, idx) => idx !== i)); }
  function updateSpec(i, field, val) {
    setSpecs(s => s.map((row, idx) => idx === i ? { ...row, [field]: val } : row));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    let variants = [];
    if (variantsJson.trim()) {
      try { variants = JSON.parse(variantsJson); }
      catch { setError('Variants JSON is invalid. Please check the format.'); setSaving(false); return; }
    }

    const specifications = Object.fromEntries(
      specs.filter(s => s.key.trim()).map(s => [s.key.trim(), s.value.trim()])
    );
    const certifications = form.certifications.split(',').map(c => c.trim()).filter(Boolean);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, images, specSheet: specSheet || null, specifications, certifications, variants }),
      });
      if (res.ok) {
        router.push(`/${locale}/admin/products`);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to update product.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loadingData) {
    return <AdminLayout><div className="py-20 text-center text-sm" style={{ color: '#5A6B82' }}>Loading product…</div></AdminLayout>;
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: 720 }} className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black" style={{ color: '#0F172A' }}>Edit Product</h2>
          <button onClick={() => router.back()} className="text-sm" style={{ color: '#5A6B82' }}>← Back</button>
        </div>

        {error && (
          <div className="rounded-xl px-4 py-3 text-sm" style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl p-6 space-y-5" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(10,35,66,0.06)' }}>
            <MultiImageUpload values={images} onChange={setImages} folder="products" label="Product Images" max={6} aspect={1} />

            <DocumentUpload value={specSheet} onChange={setSpecSheet} folder="msds" label="MSDS / Datasheet (PDF)" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label style={lbl}>Name (English) *</label>
                <input name="nameEn" value={form.nameEn} onChange={handleChange} required style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={lbl}>Name (Arabic)</label>
                <input name="nameAr" value={form.nameAr} onChange={handleChange} dir="rtl" style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={lbl}>Brand *</label>
                <input name="brand" value={form.brand} onChange={handleChange} required style={inp} onFocus={focus} onBlur={blur} />
              </div>
              <div>
                <label style={lbl}>Category *</label>
                <select name="category" value={form.category} onChange={handleChange} required style={{ ...inp, cursor: 'pointer' }} onFocus={focus} onBlur={blur}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label style={lbl}>Description (English) *</label>
              <textarea name="descriptionEn" value={form.descriptionEn} onChange={handleChange} rows={4} required style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
            </div>
            <div>
              <label style={lbl}>Description (Arabic)</label>
              <textarea name="descriptionAr" value={form.descriptionAr} onChange={handleChange} rows={4} dir="rtl" style={{ ...inp, resize: 'vertical' }} onFocus={focus} onBlur={blur} />
            </div>

            {/* Technical Specifications */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <label style={{ ...lbl, marginBottom: 0 }}>Technical Specifications</label>
                <button type="button" onClick={addSpecRow}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#B8893D', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <Plus size={13} /> Add Row
                </button>
              </div>
              <div style={{ border: '1.5px solid #E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                {specs.map((row, i) => (
                  <div key={i} style={{ display: 'flex', borderBottom: i < specs.length - 1 ? '1px solid #E2E8F0' : 'none' }}>
                    <input
                      placeholder="Label (e.g. Capacity)"
                      value={row.key}
                      onChange={e => updateSpec(i, 'key', e.target.value)}
                      style={{ flex: 1, padding: '9px 12px', fontSize: 13, border: 'none', outline: 'none', background: '#F8FAFC', color: '#0F172A' }}
                    />
                    <div style={{ width: 1, background: '#E2E8F0' }} />
                    <input
                      placeholder="Value (e.g. 9 kg)"
                      value={row.value}
                      onChange={e => updateSpec(i, 'value', e.target.value)}
                      style={{ flex: 1, padding: '9px 12px', fontSize: 13, border: 'none', outline: 'none', background: '#fff', color: '#0F172A' }}
                    />
                    <button type="button" onClick={() => removeSpecRow(i)}
                      style={{ padding: '0 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#CBD5E1' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 6 }}>E.g. "Weight" → "9 kg", "Operating Pressure" → "15 bar"</p>
            </div>

            {/* Certifications */}
            <div>
              <label style={lbl}>Certifications & Compliance</label>
              <input name="certifications" value={form.certifications} onChange={handleChange}
                placeholder="QCDD, FM, UL, CE, UPDA" style={inp} onFocus={focus} onBlur={blur} />
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Comma-separated. Shown as green badges on the product page.</p>
            </div>

            {/* Variants */}
            <div>
              <label style={lbl}>Variants / Configurations (optional)</label>
              <textarea value={variantsJson} onChange={e => setVariantsJson(e.target.value)} rows={3}
                placeholder={'[{"name":"Size","options":["2.5kg","5kg","9kg"]}]'}
                style={{ ...inp, resize: 'vertical', fontFamily: 'monospace', fontSize: 12 }} onFocus={focus} onBlur={blur} />
              <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>JSON array. Each item needs "name" and "options" array. Leave blank if no variants.</p>
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
                {saving ? 'Saving…' : 'Update Product'}
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
