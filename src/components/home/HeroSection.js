'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, BadgeCheck, Clock } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1];

const TRUST = [
  { icon: ShieldCheck, label: 'QCD Licensed' },
  { icon: BadgeCheck,  label: 'ISO 9001 Certified' },
  { icon: Clock,       label: '24/7 Emergency' },
];

export default function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-24 md:pt-28">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-brand-blue-light pointer-events-none" />

      <div className="container-max relative z-10 w-full py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 items-center">

          {/* ── Left ── */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-blue-light text-brand-blue text-xs font-semibold px-4 py-1.5 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              Licensed MEP &amp; Fire Protection Contractor · Qatar
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.08 }}
              className="text-[2.8rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.05] tracking-tight mb-5 text-brand-text"
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
              className="text-brand-sub text-lg leading-relaxed mb-9 max-w-lg"
            >
              {t('subheading')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.24 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white rounded-full px-8 py-3.5 font-semibold hover:bg-orange-700 transition-all duration-300 text-base group"
              >
                Get a Free Quote
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue rounded-full px-8 py-3.5 font-semibold hover:bg-brand-blue hover:text-white transition-all duration-300 text-base"
              >
                View Projects
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.36 }}
              className="flex flex-wrap gap-5 items-center"
            >
              {TRUST.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-brand-sub text-sm">
                  <Icon size={16} className="text-brand-blue shrink-0" />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right — engineer photo "cutout" ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, x: 24 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="hidden lg:block relative"
          >
            {/* Main photo container */}
            <div className="relative rounded-3xl overflow-hidden bg-brand-blue-light h-[540px]">
              <Image
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=700&h=700&fit=crop&crop=top&q=85"
                alt="Professional MEP Engineer"
                fill
                className="object-cover object-top"
                sizes="45vw"
                priority
              />
              {/* Bottom fade — creates "emerging from background" cutout feel */}
              <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-brand-blue-light via-brand-blue-light/60 to-transparent pointer-events-none" />

              {/* Decorative top-right circle */}
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-brand-blue/10 rounded-full pointer-events-none" />
            </div>

            {/* Floating stat card — top left */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.55 }}
              className="absolute -top-4 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 border border-brand-border"
            >
              <p className="text-2xl font-black text-brand-text">5+</p>
              <p className="text-brand-sub text-xs uppercase tracking-wider mt-0.5">Years in Qatar</p>
            </motion.div>

            {/* Floating stat card — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.65 }}
              className="absolute -bottom-4 -right-6 bg-brand-blue text-white rounded-2xl shadow-xl px-5 py-4"
            >
              <p className="text-2xl font-black">100%</p>
              <p className="text-white/70 text-xs uppercase tracking-wider mt-0.5">Code Compliant</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-brand-sub/50 hidden md:flex"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-brand-border animate-pulse" />
      </motion.div>
    </section>
  );
}
