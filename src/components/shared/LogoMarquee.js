import { cn } from '@/lib/utils';

const PLACEHOLDER_LOGOS = [
  'Ashghal', 'QP', 'Barwa', 'Lusail Corp', 'Qatar Rail',
  'HMC', 'Lekhwiya', 'Milaha', 'QNB', 'Msheireb',
];

export default function LogoMarquee({ logos = PLACEHOLDER_LOGOS, className }) {
  const doubled = [...logos, ...logos];

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Fade edges */}
      <div className="absolute start-0 top-0 bottom-0 w-16 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute end-0 top-0 bottom-0 w-16 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee gap-12 items-center whitespace-nowrap">
        {doubled.map((logo, i) => (
          <div
            key={i}
            className="shrink-0 px-6 py-3 bg-brand-steel/50 rounded-lg border border-white/5 text-brand-subtext text-sm font-semibold tracking-wider hover:text-brand-gold hover:border-brand-gold/20 transition-all duration-300"
          >
            {logo}
          </div>
        ))}
      </div>
    </div>
  );
}
