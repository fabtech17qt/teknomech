'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { AnimateIn } from '@/components/ui/AnimateIn';
import SectionLabel from '@/components/shared/SectionLabel';
import { BadgeCheck, Wrench, Clock, Phone, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: BadgeCheck,
    title: 'Compliance Focused',
    desc: 'All works are carried out in full compliance with Qatar\'s applicable regulations and fire safety standards.',
  },
  {
    icon: Wrench,
    title: 'End-to-End MEP',
    desc: 'Design to long-term maintenance — one experienced team, one single point of contact.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: 'Disciplined project management and milestone-driven execution across all project sizes.',
  },
  {
    icon: Phone,
    title: '24/7 Support',
    desc: 'Emergency response available anywhere in Qatar, every day of the year, within the hour.',
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 items-center">

          {/* ── LEFT : cutout-style image ── */}
          <AnimateIn variant="fadeRight">
            <div className="relative">
              {/* Solid blob decoration behind the container */}
              <div className="absolute inset-6 shape-asym-2 bg-brand-blue-soft z-0" />

              {/* Main image container */}
              <div className="relative shape-asym-2 overflow-hidden min-h-[480px] bg-brand-blue-soft z-10">
                <div className="absolute inset-0 bg-dots z-10" />
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=700&fit=crop&crop=top&q=85"
                  alt="Safety Engineer"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-soft/60 via-transparent to-transparent z-10 pointer-events-none" />
              </div>

              {/* Decorative orange corner */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-orange shape-asym-1 z-0" />
            </div>
          </AnimateIn>

          {/* ── RIGHT : feature grid ── */}
          <div>
            <AnimateIn variant="fadeLeft">
              <SectionLabel className="mb-4">Why Teknomech</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black leading-[1.05] mb-5 text-brand-text">
                The Right Partner for{' '}
                <span className="text-brand-orange">Qatar's Projects</span>
              </h2>
              <p className="text-brand-sub leading-relaxed mb-10 text-base">
                From initial consultation to long-term maintenance, we bring engineering excellence and deep regulatory expertise to every engagement across the region.
              </p>
            </AnimateIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {FEATURES.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <AnimateIn key={feat.title} variant="fadeUp" delay={i * 0.08}>
                    <div className="group bg-white rounded-2xl border border-brand-border p-6 hover:border-brand-orange transition-all duration-300 h-full">
                      <div className="w-12 h-12 rounded-xl bg-brand-orange-soft flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform duration-300">
                        <Icon size={22} className="text-brand-orange" />
                      </div>
                      <h4 className="font-bold text-brand-text mb-2">{feat.title}</h4>
                      <p className="text-brand-sub text-sm leading-relaxed">{feat.desc}</p>
                    </div>
                  </AnimateIn>
                );
              })}
            </div>

            <AnimateIn variant="fadeUp" delay={0.3}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-brand-blue text-white rounded-full px-8 py-4 font-bold hover:bg-brand-blue-dark transition-all duration-300 group shadow-lg shadow-brand-blue/20"
              >
                About Our Team
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
