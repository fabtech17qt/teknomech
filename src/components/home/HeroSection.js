'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, BadgeCheck, Clock } from 'lucide-react';

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'QCD Licensed' },
  { icon: BadgeCheck,  label: 'ISO Certified' },
  { icon: Clock,       label: '24/7 Support' },
];

const ease = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-split pt-24 md:pt-32">
      <div className="container-max w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 items-center">

          {/* ── Left column ── */}
          <div className="py-10 lg:py-16">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue-light text-brand-blue text-xs font-semibold px-4 py-1.5 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue inline-block" />
              Licensed MEP Contractor · Qatar
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.08 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-5 text-brand-text max-sm:text-4xl"
            >
              {t('headline1')}
              <br />
              <span className="text-brand-blue">{t('headline2')}</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease, delay: 0.16 }}
              className="text-brand-sub text-lg md:text-xl leading-relaxed mb-9 max-w-xl"
            >
              {t('subheading')}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.24 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="/services"
                className="btn-primary text-base px-7 py-3.5 group w-full sm:w-auto justify-center"
              >
                {t('cta1')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                href="/projects"
                className="btn-secondary text-base px-7 py-3.5 w-full sm:w-auto justify-center"
              >
                {t('cta2')}
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.36 }}
              className="flex flex-wrap gap-5"
            >
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-brand-sub text-sm">
                  <Icon size={16} className="text-brand-blue shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right column — cutout image area ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease, delay: 0.12 }}
            className="hidden lg:block relative"
          >
            {/* Blue-light blob */}
            <div className="relative rounded-3xl bg-brand-blue-light overflow-hidden min-h-[520px]">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/10 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-blue/5 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />

              {/* Placeholder — replace with:
                  <Image src="/images/hero-engineer.png" alt="MEP Engineer" fill
                         className="object-contain object-bottom" priority />
              */}
              <div className="absolute inset-0 flex items-end justify-center pb-6">
                <div className="text-center text-brand-blue/30">
                  <div className="text-xs font-mono mb-1">hero-engineer.png</div>
                  <div className="text-[10px]">Download from Envato Elements</div>
                </div>
              </div>
            </div>

            {/* Floating stat card 1 — top left */}
            <div className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 border border-brand-border">
              <p className="text-2xl font-black text-brand-text">5+</p>
              <p className="text-brand-sub text-xs uppercase tracking-wider">Years Experience</p>
            </div>

            {/* Floating stat card 2 — bottom right */}
            <div className="absolute -bottom-4 -right-6 bg-white rounded-2xl shadow-xl px-5 py-4 border border-brand-border">
              <p className="text-2xl font-black text-brand-blue">100%</p>
              <p className="text-brand-sub text-xs uppercase tracking-wider">Code Compliant</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
