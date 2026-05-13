import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ServiceCard({ icon: Icon, title, description, href, className }) {
  return (
    <div className={cn('card-dark p-6 group cursor-pointer', className)}>
      <div className="w-12 h-12 rounded-xl bg-brand-red/10 flex items-center justify-center mb-4 group-hover:bg-brand-red/20 transition-colors duration-300">
        {Icon && <Icon size={24} className="text-brand-red" />}
      </div>
      <h3 className="text-brand-text font-semibold text-lg mb-2">{title}</h3>
      <p className="text-brand-subtext text-sm leading-relaxed mb-4">{description}</p>
      <Link
        href={href || '/services'}
        className="inline-flex items-center gap-1.5 text-brand-gold text-sm font-medium hover:gap-2.5 transition-all duration-200"
      >
        Learn more <ArrowRight size={14} />
      </Link>
    </div>
  );
}
