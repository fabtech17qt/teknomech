'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { AnimateIn } from '@/components/ui/AnimateIn';
import SectionLabel from '@/components/shared/SectionLabel';
import { MapPin } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Lusail Commercial Tower',
    location: 'Lusail City, Qatar',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=1000&fit=crop&q=80',
    tag: 'MEP & Fire Protection',
    asym: 'shape-asym-1',
  },
  {
    title: 'Pearl Qatar Residential Complex',
    location: 'The Pearl, Doha',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=700&h=400&fit=crop&q=80',
    tag: 'HVAC & Plumbing',
    asym: 'shape-asym-2',
  },
  {
    title: 'Ras Laffan Industrial Facility',
    location: 'Ras Laffan',
    year: '2024',
    img: '/images/svc-fire-protection.jpg',
    tag: 'Fire Suppression',
    asym: 'shape-asym-soft',
  },
  {
    title: 'Education Campus — Al Wakrah',
    location: 'Al Wakrah',
    year: '2023',
    img: '/images/svc-electrical.jpg',
    tag: 'Electrical & LV',
    asym: 'shape-asym-1',
  },
];

function ProjectCard({ project, className = '' }) {
  return (
    <div className={`relative overflow-hidden group cursor-pointer ${project.asym} ${className}`}>
      <div className="relative w-full h-full min-h-[240px]">
        <Image
          src={project.img}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block bg-brand-orange text-white text-xs font-bold rounded-full px-3 py-1 mb-3">
            {project.year}
          </span>
          <h3 className="text-white font-bold text-lg mb-2 leading-snug">{project.title}</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-white/70 text-xs">
              <MapPin size={11} />
              {project.location}
            </div>
            <span className="text-white/60 text-xs">{project.tag}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section className="py-28 bg-brand-light">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">Featured Projects</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text">
              Delivered Across{' '}
              <span className="text-brand-orange">Qatar</span>
            </h2>
          </AnimateIn>
          <AnimateIn variant="fadeLeft">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-brand-blue font-semibold hover:gap-2.5 transition-all text-sm shrink-0"
            >
              View All Projects →
            </Link>
          </AnimateIn>
        </div>

        {/* Magazine grid — tall left, stacked right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimateIn variant="fadeRight">
            <ProjectCard project={PROJECTS[0]} className="h-[540px] md:h-full min-h-[540px]" />
          </AnimateIn>

          <div className="flex flex-col gap-6">
            {PROJECTS.slice(1).map((project, i) => (
              <AnimateIn key={project.title} variant="fadeLeft" delay={i * 0.1}>
                <ProjectCard project={project} className="flex-1 min-h-[160px] h-[168px]" />
              </AnimateIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
