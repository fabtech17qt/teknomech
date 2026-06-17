'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { MapPin } from 'lucide-react';

const CATEGORY_LABELS = {
  all: 'All Projects',
  commercial: 'Commercial',
  residential: 'Residential',
  industrial: 'Industrial',
  government: 'Government',
  hospitality: 'Hospitality',
};

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1765045085124-b29f8db1cf8c?w=800&h=600&fit=crop&q=80';

function ProjectCard({ project }) {
  return (
    <div className="relative overflow-hidden rounded-2xl group bg-brand-blue-light min-h-[320px] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
      <Image
        src={project.img}
        alt={project.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 group-hover:from-black/90 transition-all duration-300" />

      <span className="absolute top-4 start-4 bg-brand-blue text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 shadow-md">
        {CATEGORY_LABELS[project.category] || project.category}
      </span>

      <span className="absolute top-4 end-4 bg-white/90 backdrop-blur-sm text-brand-text text-xs font-bold px-3 py-1.5 rounded-full z-10">
        {project.year}
      </span>

      <div className="absolute bottom-0 inset-x-0 p-5 z-10">
        {project.services?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.services.map((svc) => (
              <span
                key={svc}
                className="text-white/70 text-[10px] border border-white/20 rounded-md px-2 py-0.5"
              >
                {svc}
              </span>
            ))}
          </div>
        )}
        <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-blue-200 transition-colors duration-200">
          {project.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-white/70 text-xs">
            <MapPin size={11} />
            {project.location}
          </span>
          {project.client && (
            <span className="text-white/50 text-xs">{project.client}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl min-h-[320px] bg-slate-100 animate-pulse shadow-md" />
  );
}

export default function ProjectsContent() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(r => r.json())
      .then(data => {
        const mapped = (Array.isArray(data) ? data : []).map(p => ({
          id: p.id,
          title: p.titleEn || p.titleAr || 'Untitled',
          location: p.location || '',
          year: p.completedYear,
          category: p.category || 'commercial',
          img: p.images?.[0] || FALLBACK_IMG,
          services: [],
          client: '',
        }));
        setProjects(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-10">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                activeCategory === key
                  ? 'bg-brand-blue text-white border-brand-blue shadow-md shadow-brand-blue/20'
                  : 'bg-white text-brand-sub border-brand-border hover:border-brand-blue hover:text-brand-blue'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-brand-sub text-sm">
            {activeCategory === 'all' ? 'No projects available yet.' : 'No projects in this category.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <AnimateIn key={project.id} variant="fadeUp" delay={index * 0.08}>
                <ProjectCard project={project} />
              </AnimateIn>
            ))}
          </div>
        )}

        {/* Stats bar */}
        <AnimateIn variant="fadeUp">
          <div className="mt-14 bg-brand-blue rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '500+', label: 'Projects Completed' },
              { num: '15+', label: 'Years in Qatar' },
              { num: '50+', label: 'Government Projects' },
              { num: '98%', label: 'Client Satisfaction' },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="text-3xl font-extrabold text-white mb-1">{num}</div>
                <div className="text-white/70 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
