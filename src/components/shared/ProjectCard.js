import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { MapPin, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProjectCard({ project, className }) {
  const locale = useLocale();
  const title = locale === 'ar' ? project.titleAr : project.titleEn;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn('relative overflow-hidden rounded-xl group block aspect-[4/3]', className)}
    >
      {/* Image */}
      {project.images?.[0] ? (
        <Image
          src={project.images[0]}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full bg-brand-steel" />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/30 to-transparent" />

      {/* Category tag */}
      <span className="absolute top-3 start-3 bg-brand-red text-white text-xs font-medium px-2.5 py-1 rounded-full">
        {project.category}
      </span>

      {/* Content */}
      <div className="absolute bottom-0 inset-x-0 p-4">
        <h3 className="text-white font-semibold text-lg leading-snug mb-2 group-hover:text-brand-gold transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center gap-3 text-white/60 text-xs">
          <span className="flex items-center gap-1">
            <MapPin size={11} />
            {project.location}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {project.completedYear}
          </span>
        </div>
      </div>
    </Link>
  );
}
