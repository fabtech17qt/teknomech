'use client';

import { useState, useRef } from 'react';
import { Upload, X, ImageIcon, Loader2 } from 'lucide-react';

export function SingleImageUpload({ value, onChange, folder = 'uploads', label = 'Cover Image' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  async function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Image must be under 5 MB.'); return; }
    setError('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.url) onChange(data.url);
      else setError(data.error || 'Upload failed.');
    } catch {
      setError('Network error during upload.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#5A6B82', marginBottom: 6 }}>{label}</label>
      {value ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img src={value} alt="Preview" style={{ width: 160, height: 100, objectFit: 'cover', borderRadius: 10, border: '1.5px solid #E2E8F0', display: 'block' }} />
          <button type="button" onClick={() => onChange('')}
            style={{ position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: '50%', background: '#DC2626', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={12} />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{ width: '100%', border: '2px dashed #E2E8F0', borderRadius: 10, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: uploading ? 'not-allowed' : 'pointer', background: '#F8FAFC', color: '#5A6B82' }}
          onMouseEnter={e => { if (!uploading) e.currentTarget.style.borderColor = '#B8893D'; }}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}
        >
          {uploading ? <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={20} />}
          <span style={{ fontSize: 13 }}>{uploading ? 'Uploading…' : 'Click to upload image'}</span>
          <span style={{ fontSize: 11 }}>PNG, JPG, WEBP — max 5 MB</span>
        </button>
      )}
      {error && <p style={{ color: '#DC2626', fontSize: 12, marginTop: 4 }}>{error}</p>}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])} />
    </div>
  );
}

export function MultiImageUpload({ values, onChange, folder = 'uploads', label = 'Images', max = 5 }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  async function handleFiles(files) {
    const remaining = max - values.length;
    const selected = Array.from(files).slice(0, remaining);
    if (!selected.length) return;
    setError('');
    setUploading(true);
    try {
      const urls = [];
      for (const file of selected) {
        if (!file.type.startsWith('image/')) continue;
        if (file.size > 5 * 1024 * 1024) { setError('Each image must be under 5 MB.'); continue; }
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', folder);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (data.url) urls.push(data.url);
        else setError(data.error || 'One or more uploads failed.');
      }
      if (urls.length) onChange([...values, ...urls]);
    } catch {
      setError('Network error during upload.');
    } finally {
      setUploading(false);
    }
  }

  function remove(idx) {
    onChange(values.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#5A6B82', marginBottom: 6 }}>{label}</label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: values.length ? 10 : 0 }}>
        {values.map((url, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <img src={url} alt="" style={{ width: 100, height: 70, objectFit: 'cover', borderRadius: 8, border: '1.5px solid #E2E8F0', display: 'block' }} />
            <button type="button" onClick={() => remove(i)}
              style={{ position: 'absolute', top: -7, right: -7, width: 20, height: 20, borderRadius: '50%', background: '#DC2626', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={11} />
            </button>
          </div>
        ))}
        {values.length < max && (
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading}
            style={{ width: 100, height: 70, border: '2px dashed #E2E8F0', borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: uploading ? 'not-allowed' : 'pointer', background: '#F8FAFC', color: '#5A6B82' }}
            onMouseEnter={e => { if (!uploading) e.currentTarget.style.borderColor = '#B8893D'; }}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#E2E8F0'}>
            {uploading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <ImageIcon size={16} />}
            <span style={{ fontSize: 10 }}>{uploading ? 'Uploading' : 'Add image'}</span>
          </button>
        )}
      </div>
      {error && <p style={{ color: '#DC2626', fontSize: 12 }}>{error}</p>}
      <p style={{ fontSize: 11, color: '#8B9CB4', marginTop: 4 }}>Up to {max} images — PNG, JPG, WEBP — max 5 MB each</p>
      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
    </div>
  );
}
