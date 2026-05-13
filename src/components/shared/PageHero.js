import { Link } from '@/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PageHero({ title, subtitle, breadcrumbs = [], className }) {
  return (
    <section
      className={cn(
        'relative bg-brand-steel pt-36 pb-20 overflow-hidden',
        className
      )}
    >
      {/* Diagonal stripes overlay */}
      <div className="absolute inset-0 bg-diagonal-stripe pointer-events-none opacity-30" />

      {/* Decorative blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-5 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={12} />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-white/30" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white/90">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="w-10 h-1 bg-brand-orange rounded-full mb-5" />

        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 max-w-3xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </section>
  );
}
