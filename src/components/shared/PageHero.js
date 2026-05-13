import { Link } from '@/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PageHero({ title, subtitle, breadcrumbs = [], className }) {
  return (
    <section
      className={cn(
        'relative bg-brand-dark pt-36 pb-20 overflow-hidden bg-hero-pattern',
        className
      )}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-brand-subtext mb-5 flex-wrap">
            <Link href="/" className="hover:text-brand-gold transition-colors flex items-center gap-1">
              <Home size={12} />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-brand-subtext/50" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand-gold transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-brand-text">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Accent line */}
        <div className="w-12 h-1 bg-brand-red rounded-full mb-5" />

        <h1 className="heading-xl text-brand-text mb-4 max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-brand-subtext text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-red/30 to-transparent" />
    </section>
  );
}
