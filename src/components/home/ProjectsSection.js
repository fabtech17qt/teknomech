import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

// Placeholder project cards
const PLACEHOLDER_PROJECTS = [
  { title: 'Lusail Commercial Tower', location: 'Lusail City', year: 2024, category: 'Commercial', cols: 'lg:col-span-2 row-span-2' },
  { title: 'Industrial Warehouse Complex', location: 'Industrial Area', year: 2023, category: 'Industrial', cols: '' },
  { title: 'Government Ministry Offices', location: 'West Bay', year: 2023, category: 'Government', cols: '' },
  { title: 'Residential Tower MEP', location: 'The Pearl', year: 2024, category: 'Residential', cols: '' },
];

function PlaceholderProjectCard({ project, className }) {
  return (
    <div className={`relative overflow-hidden rounded-xl group bg-brand-steel min-h-[200px] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-muted to-brand-dark" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent" />

      <span className="absolute top-3 start-3 bg-brand-red text-white text-xs font-medium px-2.5 py-1 rounded-full z-10">
        {project.category}
      </span>

      <div className="absolute bottom-0 inset-x-0 p-4 z-10">
        <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-brand-gold transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-3 text-white/60 text-xs">
          <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
          <span className="flex items-center gap-1"><Calendar size={11} />{project.year}</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const t = useTranslations('home.projects');

  return (
    <section className="section-padding bg-brand-dark">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <SectionLabel variant="gold" className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg text-brand-text">{t('heading')}</h2>
          </div>
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-brand-gold font-medium hover:gap-2.5 transition-all shrink-0">
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[200px]">
          {PLACEHOLDER_PROJECTS.map((project) => (
            <PlaceholderProjectCard key={project.title} project={project} className={project.cols} />
          ))}
        </div>
      </div>
    </section>
  );
}
