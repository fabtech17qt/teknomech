'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';

const BADGES = ['badge1', 'badge2', 'badge3'];

export default function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative min-h-screen flex items-center bg-brand-dark overflow-hidden bg-hero-pattern">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      {/* Diagonal accent bar */}
      <div className="absolute top-0 start-0 w-1.5 h-full bg-gradient-to-b from-brand-red via-brand-red/50 to-transparent" />

      <div className="container-max relative z-10 pt-32 pb-20">
        <div className="max-w-4xl">
          {/* Badge row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {BADGES.map((key) => (
              <span
                key={key}
                className="inline-flex items-center gap-1.5 bg-brand-steel/80 border border-white/10 text-brand-subtext text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                <CheckCircle size={11} className="text-brand-gold" />
                {t(key)}
              </span>
            ))}
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight"
          >
            <span className="text-brand-text">{t('headline1')}</span>
            <br />
            <span className="text-gradient-red-gold">{t('headline2')}</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-brand-subtext text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            {t('subheading')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/services" className="btn-primary text-base px-7 py-3.5 group">
              {t('cta1')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link href="/projects" className="btn-secondary text-base px-7 py-3.5">
              {t('cta2')}
            </Link>
          </motion.div>

          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 inline-flex items-center gap-6 bg-brand-steel/60 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4"
          >
            {[
              { value: '500+', label: 'Projects' },
              { value: '15+', label: 'Years' },
              { value: '120+', label: 'Engineers' },
            ].map(({ value, label }, i) => (
              <div key={label} className={`text-center ${i < 2 ? 'pe-6 border-e border-white/10' : ''}`}>
                <div className="text-2xl font-black text-brand-text">{value}</div>
                <div className="text-brand-subtext text-xs uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none" />
    </section>
  );
}
