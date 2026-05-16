'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight, ShieldCheck, BadgeCheck, Clock,
  Wrench, FileText, Calendar, AlertTriangle,
} from 'lucide-react';
import { WaveBottom } from '@/components/ui/WaveDivider';

const ease = [0.22, 1, 0.36, 1];

const QUICK_ACTIONS = [
  { icon: Wrench,        title: 'Free Site Inspection', subtitle: 'Book an engineer visit',          href: '/contact',              accent: 'orange' },
  { icon: FileText,      title: 'Get a Quote',           subtitle: 'Tailored MEP proposals',          href: '/contact',              accent: 'blue'   },
  { icon: Calendar,       title: 'AMC Plans',             subtitle: 'Annual maintenance contracts',    href: '/services/maintenance', accent: 'orange' },
  { icon: AlertTriangle, title: 'Emergency Service',     subtitle: '24/7 fire & safety response',     href: '/contact',              accent: 'blue'   },
];

const TRUST = [
  { icon: ShieldCheck, label: 'QCD Licensed' },
  { icon: BadgeCheck,  label: 'ISO 9001 Certified' },
  { icon: Clock,       label: '24/7 Emergency Response' },
];

export default function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <>
      {/* ── SECTION 1 : MAIN HERO ── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white pt-24 pb-36">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-brand-blue-soft pointer-events-none" />
        <div className="absolute inset-0 bg-stripes pointer-events-none" />

        <div className="container-max relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-10 items-center">

            {/* ── LEFT ── */}
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="inline-flex items-center gap-2 rounded-full bg-brand-orange-soft text-brand-orange-dark text-xs font-semibold px-4 py-1.5 mb-7 uppercase tracking-widest"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
                Licensed MEP &amp; Fire Contractor · Qatar
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.08 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black leading-[0.95] tracking-tight mb-6"
              >
                <span className="text-brand-text">Building</span>
                <br />
                <span className="text-brand-text">Qatar's Safest</span>
                <br />
                <span className="text-brand-orange">Infrastructure.</span>
              </motion.h1>

              {/* Subhead */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease, delay: 0.16 }}
                className="text-brand-sub text-lg leading-relaxed mb-9 max-w-xl"
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
                  className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white rounded-full px-8 py-4 font-bold hover:bg-brand-orange-dark transition-all duration-300 text-base group shadow-lg shadow-brand-orange/30"
                >
                  Get a Quote
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue rounded-full px-8 py-4 font-bold hover:bg-brand-blue hover:text-white transition-all duration-300 text-base"
                >
                  Our Services
                </Link>
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease, delay: 0.36 }}
                className="flex flex-wrap gap-6 items-center"
              >
                {TRUST.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-brand-sub text-sm">
                    <Icon size={15} className="text-brand-blue shrink-0" />
                    {label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── RIGHT : asymmetric image container ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.12 }}
              className="hidden lg:block relative"
            >
              {/* Decoration behind container */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-orange/15 shape-asym-2 z-0" />

              {/* Main image container */}
              <div className="relative shape-asym-1 bg-brand-blue-soft min-h-[560px] z-10">
                <div className="absolute inset-0 bg-dots z-0" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/15 rounded-full blur-3xl z-0" />
                <Image
                  src="/images/fire-team.jpg"
                  alt="Teknomech MEP Engineering Team"
                  fill
                  className="object-cover object-top"
                  sizes="45vw"
                  priority
                />
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-brand-blue-soft via-brand-blue-soft/50 to-transparent pointer-events-none z-10" />
              </div>

              {/* Floating badge 1 — top left */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.55 }}
                className="absolute top-10 -left-6 bg-white shadow-2xl rounded-2xl p-4 z-20 border border-brand-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue-soft flex items-center justify-center shrink-0">
                    <BadgeCheck size={18} className="text-brand-blue" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-text leading-none">100% Compliant</p>
                    <p className="text-xs text-brand-sub mt-0.5">QCD Certified</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge 2 — bottom left */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: 0.65 }}
                className="absolute bottom-10 -left-6 bg-brand-orange text-white shadow-2xl rounded-2xl p-4 z-20"
              >
                <p className="text-3xl font-black leading-none">24/7</p>
                <p className="text-xs text-white/80 mt-1 font-medium">Emergency Response</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Wave transition into quick-action cards / next section */}
        <WaveBottom fill="#f7f9fc" height={80} />
      </section>

      {/* ── SECTION 2 : QUICK ACTION CARDS (overlapping hero bottom) ── */}
      <section className="relative z-20 -mt-20 pb-0">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_ACTIONS.map((item, i) => {
              const Icon = item.icon;
              const isOrange = item.accent === 'orange';
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.5 + i * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className={`group flex flex-col bg-white rounded-2xl shadow-2xl p-6 border-t-4 h-full ${
                      isOrange ? 'border-brand-orange' : 'border-brand-blue'
                    } hover:-translate-y-1 transition-all duration-300`}
                  >
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 shrink-0 ${
                      isOrange ? 'bg-brand-orange-soft' : 'bg-brand-blue-soft'
                    }`}>
                      <Icon size={24} className={isOrange ? 'text-brand-orange' : 'text-brand-blue'} />
                    </div>
                    <p className="font-bold text-brand-text text-base mb-1">{item.title}</p>
                    <p className="text-brand-sub text-sm flex-1">{item.subtitle}</p>
                    <div className={`flex items-center gap-1 mt-4 text-sm font-semibold group-hover:gap-2 transition-all ${
                      isOrange ? 'text-brand-orange' : 'text-brand-blue'
                    }`}>
                      Learn More <ArrowRight size={13} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
