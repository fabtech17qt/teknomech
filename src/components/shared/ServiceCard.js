import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ServiceCard({ icon: Icon, title, description, href, imageSrc, className }) {
  return (
    <div className={cn('card-base overflow-hidden group', className)}>
      {/* Image / placeholder */}
      <div className="relative h-48 bg-brand-blue-light overflow-hidden">
        {imageSrc ? (
          /* Replace div with next/image when file is available */
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-blue-light to-brand-border">
            <span className="text-brand-blue/30 text-xs font-mono">{title}</span>
          </div>
        )}
        {/* Icon badge — overlaps bottom-left of image */}
        <div className="absolute bottom-3 start-4 w-10 h-10 rounded-xl bg-white shadow-md flex items-center justify-center">
          {Icon && <Icon size={20} className="text-brand-blue" />}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-brand-text font-semibold text-base mb-1.5 group-hover:text-brand-blue transition-colors duration-200">
          {title}
        </h3>
        <p className="text-brand-sub text-sm leading-relaxed mb-4 line-clamp-2">{description}</p>
        <Link
          href={href || '/services'}
          className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-medium hover:gap-2.5 transition-all duration-200"
        >
          Learn More <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
