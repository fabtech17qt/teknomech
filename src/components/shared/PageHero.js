import { Link } from '@/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WaveBottom } from '@/components/ui/WaveDivider';

export default function PageHero({ title, subtitle, breadcrumbs = [], className }) {
  return (
    <section
      className={cn(
        'relative bg-white pt-36 pb-20 overflow-hidden',
        className
      )}
    >
      {/* Background gradient — white → blue-soft */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-brand-blue-soft pointer-events-none" />
      {/* Subtle stripe */}
      <div className="absolute inset-0 bg-stripes pointer-events-none" />
      {/* Glow accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-orange/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-brand-sub mb-6 flex-wrap">
            <Link href="/" className="hover:text-brand-blue transition-colors flex items-center gap-1">
              <Home size={11} />
              Home
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={11} className="text-brand-border" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-brand-blue transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-brand-text font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {/* Gold accent bar */}
        <div className="w-10 h-1 gold-bar rounded-full mb-5" />

        <h1 className="text-3xl md:text-5xl font-black text-brand-text mb-4 max-w-3xl leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-brand-sub text-base md:text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Wave into content below */}
      <WaveBottom fill="#ffffff" height={60} />
    </section>
  );
}
