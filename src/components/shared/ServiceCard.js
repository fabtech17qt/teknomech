import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ServiceCard({ icon: Icon, title, description, href, imageSrc, className }) {
  return (
    <div className={cn('bg-white rounded-2xl border border-brand-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group', className)}>
      {/* Image area */}
      <div className="relative h-48 overflow-hidden bg-brand-blue-light">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-blue-light to-brand-border flex items-center justify-center">
            {Icon && <Icon size={36} className="text-brand-blue/30" />}
          </div>
        )}
        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-brand-steel/0 group-hover:bg-brand-steel/20 transition-all duration-300" />
        {/* Icon badge — overlaps bottom-left of image */}
        <div className="absolute bottom-3 start-4 w-11 h-11 rounded-xl bg-white shadow-lg flex items-center justify-center z-10">
          {Icon && <Icon size={20} className="text-brand-blue" />}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-brand-text font-bold text-base mb-2 group-hover:text-brand-blue transition-colors duration-200">
          {title}
        </h3>
        <p className="text-brand-sub text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>
        <Link
          href={href || '/services'}
          className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-semibold hover:gap-3 transition-all duration-200"
        >
          Learn More <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
