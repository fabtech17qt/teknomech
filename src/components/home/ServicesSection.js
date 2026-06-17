'use client';

import { Link } from '@/i18n/navigation';
import { AnimateIn } from '@/components/ui/AnimateIn';
import SectionLabel from '@/components/shared/SectionLabel';
import { Flame, Bell, Droplets, Zap, Wind, ShieldCheck } from 'lucide-react';

const SERVICES = [
  {
    num: '01', icon: Flame,       title: 'Fire Protection Systems',
    desc: 'Fully compliant sprinkler, suppression and hydrant systems for all building types in Qatar.',
    href: '/services/fire-protection',
  },
  {
    num: '02', icon: Bell,        title: 'Fire Alarm Systems',
    desc: 'Intelligent detection, alarm and voice evacuation systems designed to NFPA 72 and applicable fire safety standards.',
    href: '/services/fire-protection',
  },
  {
    num: '03', icon: Droplets,    title: 'Plumbing Systems',
    desc: "Complete water distribution, drainage and sanitation engineered for Qatar's extreme climate.",
    href: '/services/plumbing',
  },
  {
    num: '04', icon: Zap,         title: 'Electrical Installation',
    desc: 'LV/MV power distribution, lighting, UPS and generator systems — fully licensed.',
    href: '/services/electrical',
  },
  {
    num: '05', icon: Wind,        title: 'HVAC & Ventilation',
    desc: 'Energy-efficient air conditioning and ventilation optimised for Qatar heat — ASHRAE compliant.',
    href: '/services/hvac',
  },
  {
    num: '06', icon: ShieldCheck, title: 'Low-Voltage & Security',
    desc: 'Structured cabling, CCTV, access control and building management systems integration.',
    href: '/services/lv-systems',
  },
];

export default function ServicesSection() {
  return (
    <section className="py-28 bg-brand-light">
      <div className="container-max">
        <AnimateIn variant="fadeUp" className="text-center mb-16">
          <SectionLabel className="justify-center mb-4">Our Services</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text">
            Complete MEP{' '}
            <span className="text-brand-orange">Engineering Solutions</span>
          </h2>
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <AnimateIn key={svc.num} variant="fadeUp" delay={i * 0.07}>
                <Link
                  href={svc.href}
                  className="group relative bg-white rounded-3xl p-8 border border-brand-border hover:shadow-2xl hover:border-brand-orange/20 transition-all duration-300 overflow-hidden flex flex-col h-full"
                >
                  {/* Ghost number behind content */}
                  <span className="ghost-number absolute -top-4 left-2 select-none pointer-events-none" style={{ opacity: 0.055 }}>
                    {svc.num}
                  </span>

                  {/* Icon — top right, rotates on hover */}
                  <div className="relative z-10 w-12 h-12 rounded-xl bg-brand-blue flex items-center justify-center mb-6 ml-auto group-hover:-rotate-6 transition-transform duration-300 shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>

                  <h3 className="relative z-10 font-bold text-xl text-brand-text mb-3 leading-snug">{svc.title}</h3>
                  <p className="relative z-10 text-sm text-brand-sub leading-relaxed mb-6 flex-1">{svc.desc}</p>

                  <div className="relative z-10 flex items-center gap-1 text-brand-orange text-sm font-semibold group-hover:gap-2 transition-all">
                    Learn More
                    <span className="inline-block group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>

                  {/* Bottom accent line — animates left → right */}
                  <div className="absolute bottom-0 left-0 h-[3px] bg-brand-orange w-0 group-hover:w-full transition-all duration-500 ease-out" />
                </Link>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
