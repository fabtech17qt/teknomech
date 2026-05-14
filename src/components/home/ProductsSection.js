import { AnimateIn } from '@/components/ui/AnimateIn';
import SectionLabel from '@/components/shared/SectionLabel';

const LOGOS_ROW1 = [
  'Qatar Petroleum', 'Ashghal', 'KAHRAMAA', 'Qatargas',
  'Msheireb Properties', 'Al Khayyat Investments', 'QDVC', 'Qatar Museums',
];
const LOGOS_ROW2 = [
  'Barwa Real Estate', 'UDC', 'Gulf Contracting', 'ALEC Qatar',
  'Midmac Contracting', 'Al Jaber Engineering', 'Leighton Qatar', 'HBK Contracting',
];

function LogoItem({ name }) {
  return (
    <div className="mx-6 shrink-0 px-6 py-3 bg-white border border-brand-border rounded-xl grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default">
      <span className="text-brand-blue-dark font-bold text-sm whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function ProductsSection() {
  return (
    <section className="py-20 bg-brand-light overflow-hidden">
      <div className="container-max mb-10">
        <AnimateIn variant="fadeUp" className="text-center">
          <SectionLabel className="justify-center mb-3">Trusted By</SectionLabel>
          <h2 className="text-2xl font-black text-brand-text">Industry Leaders Across Qatar</h2>
        </AnimateIn>
      </div>

      <div className="relative">
        {/* Fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-brand-light to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-brand-light to-transparent z-10 pointer-events-none" />

        {/* Row 1 — scrolls left */}
        <div className="flex overflow-hidden mb-4">
          <div className="flex animate-marquee">
            {[...LOGOS_ROW1, ...LOGOS_ROW1].map((name, i) => (
              <LogoItem key={`r1-${i}`} name={name} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee-reverse">
            {[...LOGOS_ROW2, ...LOGOS_ROW2].map((name, i) => (
              <LogoItem key={`r2-${i}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
