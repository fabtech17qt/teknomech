'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { MapPin, Calendar } from 'lucide-react';

const CATEGORY_LABELS = {
  all: 'All Projects',
  commercial: 'Commercial',
  residential: 'Residential',
  industrial: 'Industrial',
  government: 'Government',
  healthcare: 'Healthcare',
};

const PROJECTS = [
  {
    id: 1,
    title: 'Lusail Commercial Tower',
    client: 'Lusail Real Estate Development',
    location: 'Lusail City',
    year: 2024,
    category: 'commercial',
    services: ['HVAC', 'Fire Protection', 'Electrical'],
    img: 'https://images.unsplash.com/photo-1765045085124-b29f8db1cf8c?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 2,
    title: 'Industrial Warehouse Complex',
    client: 'Qatar Industrial Estates',
    location: 'Industrial Area, Doha',
    year: 2023,
    category: 'industrial',
    services: ['Fire Protection', 'Plumbing', 'LV Systems'],
    img: 'https://images.unsplash.com/photo-1758622799434-f2101c7d5744?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 3,
    title: 'Government Ministry Offices',
    client: 'Ministry of Interior',
    location: 'West Bay, Doha',
    year: 2023,
    category: 'government',
    services: ['MEP Full Package', 'BMS', 'Fire Protection'],
    img: 'https://images.unsplash.com/photo-1767102239264-3a190c4a281c?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 4,
    title: 'Al Wakra Residential Compound',
    client: 'Barwa Real Estate',
    location: 'Al Wakra',
    year: 2023,
    category: 'residential',
    services: ['Plumbing', 'Electrical', 'HVAC'],
    img: 'https://images.unsplash.com/photo-1563166423-482a8c14b2d6?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 5,
    title: 'Hamad Medical Centre Annex',
    client: 'HMC',
    location: 'Rumailah, Doha',
    year: 2022,
    category: 'healthcare',
    services: ['MEP', 'Fire Protection', 'Medical Gas'],
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 6,
    title: 'Pearl Qatar Mixed-Use Tower',
    client: 'United Development Company',
    location: 'The Pearl, Doha',
    year: 2022,
    category: 'commercial',
    services: ['Full MEP', 'Smart Building', 'Fire Protection'],
    img: 'https://images.unsplash.com/photo-1548838670-cb67b43a6adb?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 7,
    title: 'Qatar Rail Depot Facility',
    client: 'Qatar Rail',
    location: 'Al Jaidah, Doha',
    year: 2022,
    category: 'industrial',
    services: ['Electrical', 'Fire Protection', 'LV Systems'],
    img: 'https://images.unsplash.com/photo-1585585825759-979ec75438cc?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 8,
    title: 'Ashghal Road Authority HQ',
    client: 'Public Works Authority',
    location: 'Dafna, Doha',
    year: 2021,
    category: 'government',
    services: ['MEP', 'BMS', 'CCTV'],
    img: 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 9,
    title: 'Katara Cultural Village Workshops',
    client: 'Katara Hospitality',
    location: 'Katara, Doha',
    year: 2021,
    category: 'commercial',
    services: ['HVAC', 'Plumbing', 'Fire Detection'],
    img: 'https://images.unsplash.com/photo-1688841747582-41097036109d?w=800&h=600&fit=crop&q=80',
  },
];

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

      <div className="absolute inset-0 bg-gradient-to-t from-brand-steel/95 via-brand-steel/40 to-brand-steel/10 group-hover:from-brand-steel/98 transition-all duration-300" />

      <span className="absolute top-4 start-4 bg-brand-blue text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 shadow-md">
        {CATEGORY_LABELS[project.category]}
      </span>

      <span className="absolute top-4 end-4 bg-white/90 backdrop-blur-sm text-brand-text text-xs font-bold px-3 py-1.5 rounded-full z-10">
        {project.year}
      </span>

      <div className="absolute bottom-0 inset-x-0 p-5 z-10">
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
        <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-blue-200 transition-colors duration-200">
          {project.title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-white/70 text-xs">
            <MapPin size={11} />
            {project.location}
          </span>
          <span className="text-white/50 text-xs">{project.client}</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsContent() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <AnimateIn key={project.id} variant="fadeUp" delay={index * 0.08}>
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>

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
