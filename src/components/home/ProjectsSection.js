import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

const PROJECTS = [
  {
    title: 'Lusail Commercial Tower',
    location: 'Lusail City',
    year: 2024,
    category: 'Commercial',
    img: 'https://images.unsplash.com/photo-1765045085124-b29f8db1cf8c?w=800&h=600&fit=crop&q=80',
  },
  {
    title: 'Industrial Warehouse Complex',
    location: 'Industrial Area',
    year: 2023,
    category: 'Industrial',
    img: 'https://images.unsplash.com/photo-1758622799434-f2101c7d5744?w=800&h=600&fit=crop&q=80',
  },
  {
    title: 'Government Ministry Offices',
    location: 'West Bay, Doha',
    year: 2023,
    category: 'Government',
    img: 'https://images.unsplash.com/photo-1767102239264-3a190c4a281c?w=800&h=600&fit=crop&q=80',
  },
];

function ProjectCard({ project }) {
  return (
    <div className="relative overflow-hidden rounded-2xl group bg-brand-blue-light min-h-[280px] shadow-md hover:shadow-xl transition-all duration-300">
      {/* Photo */}
      <Image
        src={project.img}
        alt={project.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      {/* Dark overlay — increases on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-steel/90 via-brand-steel/30 to-transparent group-hover:from-brand-steel/95 transition-all duration-300" />

      {/* Category badge */}
      <span className="absolute top-4 start-4 bg-brand-blue text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10 shadow-md">
        {project.category}
      </span>

      {/* Year badge */}
      <span className="absolute top-4 end-4 bg-white/90 backdrop-blur-sm text-brand-text text-xs font-bold px-3 py-1.5 rounded-full z-10">
        {project.year}
      </span>

      {/* Info at bottom */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10">
        <h3 className="text-white font-bold text-base leading-snug mb-2 group-hover:text-brand-blue-light transition-colors duration-200">
          {project.title}
        </h3>
        <div className="flex items-center gap-3 text-white/70 text-xs">
          <span className="flex items-center gap-1.5">
            <MapPin size={12} />{project.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />{project.year}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const t = useTranslations('home.projects');

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg">{t('heading')}</h2>
          </AnimateIn>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-brand-blue font-semibold hover:gap-3 transition-all shrink-0 text-sm"
          >
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <AnimateIn key={project.title} variant="fadeUp" delay={index * 0.1}>
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
