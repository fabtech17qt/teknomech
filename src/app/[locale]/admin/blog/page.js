'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const r = await fetch('/api/blog?published=all');
    const data = await r.json();
    setPosts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    load();
  }

  const th = { padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#5A6B82', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' };
  const td = { padding: '12px 16px', fontSize: 13, color: '#0F172A', borderBottom: '1px solid #F1F5F9', verticalAlign: 'middle' };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black" style={{ color: '#0F172A' }}>Blog Posts</h2>
            <p className="text-sm mt-0.5" style={{ color: '#5A6B82' }}>Manage your engineering blog articles.</p>
          </div>
          <a href="/en/admin/blog/new"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#B8893D' }}>
            <Plus size={16} /> New Post
          </a>
        </div>

        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(10,35,66,0.06)' }}>
          {loading ? (
            <div className="py-16 text-center text-sm" style={{ color: '#5A6B82' }}>Loading…</div>
          ) : posts.length === 0 ? (
            <div className="py-16 text-center text-sm" style={{ color: '#5A6B82' }}>
              No posts yet.{' '}
              <a href="/en/admin/blog/new" style={{ color: '#B8893D', textDecoration: 'underline' }}>Write your first article.</a>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Title</th>
                  <th style={{ ...th }}>Status</th>
                  <th style={{ ...th }}>Date</th>
                  <th style={{ ...th, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id}>
                    <td style={td}><span className="font-semibold">{p.titleEn}</span></td>
                    <td style={td}>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={p.isPublished
                          ? { background: '#DCFCE7', color: '#16A34A' }
                          : { background: '#FEF9C3', color: '#854D0E' }
                        }>
                        {p.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ ...td, color: '#5A6B82' }}>
                      {p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td style={{ ...td, textAlign: 'right' }}>
                      <div className="flex items-center justify-end gap-2">
                        <a href={`/en/admin/blog/${p.id}/edit`}
                          className="p-2 rounded-lg transition-colors" style={{ color: '#5A6B82' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#B8893D'; e.currentTarget.style.background = '#FBF5E5'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#5A6B82'; e.currentTarget.style.background = 'transparent'; }}>
                          <Pencil size={15} />
                        </a>
                        <button onClick={() => handleDelete(p.id, p.titleEn)}
                          className="p-2 rounded-lg transition-colors" style={{ color: '#5A6B82' }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#DC2626'; e.currentTarget.style.background = '#FEF2F2'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#5A6B82'; e.currentTarget.style.background = 'transparent'; }}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
