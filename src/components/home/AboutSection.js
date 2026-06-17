'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { AnimateIn } from '@/components/ui/AnimateIn';
import SectionLabel from '@/components/shared/SectionLabel';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-28 bg-white overflow-hidden">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-16 items-center">

          {/* ── LEFT : asymmetric image treatment ── */}
          <AnimateIn variant="fadeRight">
            <div className="relative">
              {/* Decoration behind — orange asymmetric block */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-brand-orange shape-asym-2 z-0" />
              {/* Dots overlay */}
              <div
                className="absolute -top-6 -right-6 w-32 h-32 z-0"
                style={{
                  backgroundImage: 'radial-gradient(circle, #0B4FD0 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                  opacity: 0.25,
                }}
              />

              {/* Main image container */}
              <div className="relative shape-asym-1 overflow-hidden h-[520px] z-10">
                <div className="absolute inset-0 bg-dots z-10" />
                <Image
                  src="/images/fire-team.jpg"
                  alt="Teknomech Engineering Team"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-transparent z-10 pointer-events-none" />
              </div>

              {/* Floating stat badge */}
              <div className="absolute top-8 -right-6 bg-white shadow-2xl rounded-2xl p-5 z-20 border border-brand-border hidden sm:block">
                <p className="text-3xl font-black text-brand-blue leading-none">12+</p>
                <p className="text-xs uppercase text-brand-sub tracking-widest mt-1">Years in Qatar</p>
              </div>
            </div>
          </AnimateIn>

          {/* ── RIGHT : content ── */}
          <AnimateIn variant="fadeLeft">
            <div>
              <SectionLabel className="mb-4">About Us</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black leading-[1.05] mb-6 text-brand-text">
                Qatar's Most Trusted{' '}
                <span className="text-brand-orange">MEP Partner</span>
              </h2>
              <p className="text-brand-sub leading-relaxed mb-5 text-base">
                Teknomech is a fully licensed MEP and fire protection contractor delivering end-to-end engineering solutions for commercial, industrial and government projects across Qatar. We design, supply, install and maintain all mechanical, electrical and plumbing systems.
              </p>
              <p className="text-brand-sub leading-relaxed mb-10 text-base">
                Our certified engineers bring international standards to every project — from large-scale fire suppression systems to precision electrical installations — ensuring full regulatory compliance and long-term operational reliability.
              </p>

              {/* Inline mini-stats */}
              <div className="flex items-center gap-10 mb-10">
                <div>
                  <p className="text-4xl font-black text-brand-blue leading-none">500+</p>
                  <p className="text-xs uppercase text-brand-sub tracking-wider mt-1.5">Projects Delivered</p>
                </div>
                <div className="w-px h-14 bg-brand-border" />
                <div>
                  <p className="text-4xl font-black text-brand-blue leading-none">50+</p>
                  <p className="text-xs uppercase text-brand-sub tracking-wider mt-1.5">Expert Engineers</p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-brand-blue text-white rounded-full px-8 py-4 font-bold hover:bg-brand-blue-dark transition-all duration-300 group shadow-lg shadow-brand-blue/20"
              >
                Learn More About Us
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
