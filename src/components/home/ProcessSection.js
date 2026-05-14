'use client';

import { AnimateIn } from '@/components/ui/AnimateIn';
import SectionLabel from '@/components/shared/SectionLabel';
import { ClipboardList, HardHat, CheckCircle } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: ClipboardList,
    title: 'Assessment & Design',
    desc: 'Our engineers assess your site, understand project scope and produce a fully compliant MEP design with complete calculations and authority-ready documentation.',
    bg: 'bg-white',
  },
  {
    num: '02',
    icon: HardHat,
    title: 'Installation & Commissioning',
    desc: 'Experienced technicians install all systems to exact design specifications. Every installation is independently tested and commissioned before client handover.',
    bg: 'bg-brand-blue-soft',
  },
  {
    num: '03',
    icon: CheckCircle,
    title: 'Compliance & Handover',
    desc: 'We obtain all required authority approvals — QCDD, KAHRAMAA, Ashghal — and hand over with complete as-built drawings and maintenance documentation.',
    bg: 'bg-white',
  },
];

export default function ProcessSection() {
  return (
    <section className="py-28 bg-white">
      <div className="container-max">
        <AnimateIn variant="fadeUp" className="text-center mb-16">
          <SectionLabel className="justify-center mb-4">How We Work</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text">
            How We{' '}
            <span className="text-brand-blue">Deliver</span>
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Dashed connector line (desktop) */}
          <div
            className="hidden md:block absolute top-14 z-0"
            style={{ left: '22%', right: '22%', borderTop: '2px dashed rgba(249,115,22,0.35)' }}
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <AnimateIn key={step.num} variant="fadeUp" delay={i * 0.12}>
                <div className={`relative shape-asym-soft ${step.bg} border border-brand-border p-8 h-full overflow-hidden`}>
                  {/* Ghost number */}
                  <span
                    className="ghost-number absolute -top-4 right-4 select-none pointer-events-none"
                    style={{ fontSize: '120px', WebkitTextStroke: '2px #E5EAF2', color: 'transparent', lineHeight: 1 }}
                  >
                    {step.num}
                  </span>

                  {/* Step number badge */}
                  <div className="relative z-10 w-10 h-10 rounded-xl bg-brand-blue text-white flex items-center justify-center font-black text-xs mb-5">
                    {step.num}
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-brand-orange-soft flex items-center justify-center mb-5">
                    <Icon size={26} className="text-brand-orange" />
                  </div>

                  <h3 className="relative z-10 font-bold text-xl text-brand-text mb-3">{step.title}</h3>
                  <p className="relative z-10 text-sm text-brand-sub leading-relaxed">{step.desc}</p>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
