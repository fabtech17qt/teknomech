'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const r = await fetch('/api/projects?all=true');
    const data = await r.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id, title) {
    if (!confirm(`Delete "${title}"?`)) return;
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    load();
  }

  const th = { padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: '#5A6B82', borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' };
  const td = { padding: '12px 16px', fontSize: 13, color: '#0F172A', borderBottom: '1px solid #F1F5F9', verticalAlign: 'middle' };

  return (
    <AdminLayout>
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black" style={{ color: '#0F172A' }}>Projects</h2>
            <p className="text-sm mt-0.5" style={{ color: '#5A6B82' }}>Manage your portfolio of completed projects.</p>
          </div>
          <a href="/en/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#B8893D' }}>
            <Plus size={16} /> Add Project
          </a>
        </div>

        <div className="bg-white rounded-xl overflow-hidden" style={{ border: '1px solid #E2E8F0', boxShadow: '0 1px 4px rgba(10,35,66,0.06)' }}>
          {loading ? (
            <div className="py-16 text-center text-sm" style={{ color: '#5A6B82' }}>Loading…</div>
          ) : projects.length === 0 ? (
            <div className="py-16 text-center text-sm" style={{ color: '#5A6B82' }}>
              No projects yet.{' '}
              <a href="/en/admin/projects/new" style={{ color: '#B8893D', textDecoration: 'underline' }}>Add your first project.</a>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Project</th>
                  <th style={th}>Category</th>
                  <th style={th}>Year</th>
                  <th style={th}>Status</th>
                  <th style={{ ...th, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td style={td}><span className="font-semibold">{p.titleEn}</span></td>
                    <td style={{ ...td, color: '#5A6B82' }} className="capitalize">{p.category}</td>
                    <td style={{ ...td, color: '#5A6B82' }}>{p.completedYear || '—'}</td>
                    <td style={td}>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={p.isFeatured
                          ? { background: '#FBF5E5', color: '#8A6422' }
                          : { background: '#F1F5F9', color: '#5A6B82' }
                        }>
                        {p.isFeatured ? 'Featured' : 'Standard'}
                      </span>
                    </td>
                    <td style={{ ...td, textAlign: 'right' }}>
                      <div className="flex items-center justify-end gap-2">
                        <a href={`/en/admin/projects/${p.id}/edit`}
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
