import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Shield, Package, Users, Star, ArrowRight } from 'lucide-react';

const ICONS = [Shield, Package, Users, Star];
const FEATURE_KEYS = ['feature1', 'feature2', 'feature3', 'feature4'];

const CLIENTS = ['Ashghal', 'QP', 'Barwa', 'Qatar Rail', 'HMC', 'Lusail Corp'];

export default function WhyUsSection() {
  const t = useTranslations('home.whyUs');

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-[42%_58%] gap-14 items-center">

          {/* Left — heading + text + CTA + cutout */}
          <AnimateIn variant="fadeLeft">
            <SectionLabel className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg mb-5 max-w-sm">{t('heading')}</h2>
            <p className="text-brand-sub leading-relaxed mb-7">{t('p')}</p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-brand-blue text-white rounded-full px-8 py-3.5 font-semibold hover:bg-brand-blue-dark transition-all duration-300 mb-8"
            >
              Learn About Us <ArrowRight size={16} />
            </Link>

            {/* Engineer cutout — hidden on mobile */}
            <div className="hidden md:block relative rounded-3xl overflow-hidden h-[260px] bg-brand-blue-light mt-2">
              <Image
                src="https://images.unsplash.com/photo-1563166423-482a8c14b2d6?w=600&h=400&fit=crop&crop=top&q=80"
                alt="Engineer on construction site"
                fill
                className="object-cover object-top"
                sizes="42vw"
              />
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-brand-blue-light to-transparent pointer-events-none" />

              {/* Trusted by strip */}
              <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm p-3 border-t border-brand-border">
                <p className="text-brand-sub text-[10px] uppercase tracking-widest mb-2 font-semibold">Trusted By</p>
                <div className="flex flex-wrap gap-2">
                  {CLIENTS.map((c) => (
                    <span key={c} className="text-brand-sub text-[10px] border border-brand-border rounded-md px-2 py-0.5 font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Right — 2×2 feature tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURE_KEYS.map((key, i) => {
              const Icon = ICONS[i];
              return (
                <AnimateIn key={key} variant="fadeUp" delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center mb-4">
                      <Icon size={22} className="text-brand-blue" />
                    </div>
                    <h3 className="text-brand-text font-bold text-base mb-2">{t(`${key}Title`)}</h3>
                    <p className="text-brand-sub text-sm leading-relaxed">{t(`${key}Desc`)}</p>
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
