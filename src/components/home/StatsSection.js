'use client';

import { AnimateIn } from '@/components/ui/AnimateIn';
import { WaveTop, WaveBottom } from '@/components/ui/WaveDivider';

const STATS = [
  { value: '500+', label: 'Projects Completed' },
  { value: '100%', label: 'QCD Compliant'      },
  { value: '12+',  label: 'Years Experience'   },
  { value: '50+',  label: 'Expert Engineers'   },
];

export default function StatsSection() {
  return (
    <section className="relative py-28 bg-brand-blue-deep overflow-hidden">
      {/* White dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Orange glow — bottom right */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl pointer-events-none" />
      {/* Blue glow — top left */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-blue/40 rounded-full blur-3xl pointer-events-none" />

      {/* Wave in from white above */}
      <WaveTop fill="#ffffff" height={70} />
      {/* Wave out to white below */}
      <WaveBottom fill="#ffffff" height={70} />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {STATS.map((stat, i) => (
            <AnimateIn key={stat.label} variant="fadeUp" delay={i * 0.1}>
              <div className="relative text-center px-6">
                {/* Divider between items */}
                {i > 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px bg-brand-orange/30" />
                )}
                <p className="text-5xl md:text-6xl font-black text-brand-orange mb-3 leading-none">{stat.value}</p>
                <p className="text-xs uppercase tracking-widest text-white/70">{stat.label}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
