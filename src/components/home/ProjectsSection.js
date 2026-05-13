import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { ArrowRight, MapPin, Calendar } from 'lucide-react';

const PLACEHOLDER_PROJECTS = [
  { title: 'Lusail Commercial Tower',       location: 'Lusail City',     year: 2024, category: 'Commercial',  img: '/images/project-1.jpg' },
  { title: 'Industrial Warehouse Complex',  location: 'Industrial Area', year: 2023, category: 'Industrial',  img: '/images/project-2.jpg' },
  { title: 'Government Ministry Offices',   location: 'West Bay',        year: 2023, category: 'Government',  img: '/images/project-3.jpg' },
];

function ProjectCard({ project }) {
  return (
    <div className="relative overflow-hidden rounded-2xl group bg-brand-blue-light min-h-[240px] border border-brand-border shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image placeholder — replace with:
          <Image src={project.img} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" /> */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-light to-brand-border" />

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 bg-brand-steel/0 group-hover:bg-brand-steel/60 transition-all duration-300" />

      {/* Category badge */}
      <span className="absolute top-3 start-3 bg-brand-blue text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
        {project.category}
      </span>

      {/* Year badge */}
      <span className="absolute top-3 end-3 bg-white/90 text-brand-text text-xs font-semibold px-3 py-1 rounded-full z-10">
        {project.year}
      </span>

      {/* Info — visible on hover */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
        <h3 className="text-white font-semibold text-base leading-snug mb-2">{project.title}</h3>
        <div className="flex items-center gap-2 text-white/70 text-xs">
          <MapPin size={11} /><span>{project.location}</span>
          <Calendar size={11} className="ms-2" /><span>{project.year}</span>
        </div>
      </div>

      {/* Default title (visible always) */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-10 group-hover:opacity-0 transition-opacity duration-300">
        <h3 className="text-brand-text font-semibold text-base leading-snug mb-1">{project.title}</h3>
        <span className="flex items-center gap-1 text-brand-sub text-xs">
          <MapPin size={11} />{project.location}
        </span>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const t = useTranslations('home.projects');

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg">{t('heading')}</h2>
          </AnimateIn>
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-brand-blue font-medium hover:gap-2.5 transition-all shrink-0 text-sm">
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_PROJECTS.map((project, index) => (
            <AnimateIn key={project.title} variant="fadeUp" delay={index * 0.1}>
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
