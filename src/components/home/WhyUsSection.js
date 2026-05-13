import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Shield, Package, Users, Star, ArrowRight } from 'lucide-react';

const ICONS = [Shield, Package, Users, Star];
const FEATURE_KEYS = ['feature1', 'feature2', 'feature3', 'feature4'];

export default function WhyUsSection() {
  const t = useTranslations('home.whyUs');

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-14 items-center">

          {/* Left — heading + text + CTA + cutout */}
          <AnimateIn variant="fadeLeft">
            <SectionLabel className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg mb-5 max-w-sm">{t('heading')}</h2>
            <p className="text-brand-sub leading-relaxed text-base mb-7">{t('p')}</p>

            <Link href="/about" className="btn-primary mb-8">
              {t('label')} <ArrowRight size={16} />
            </Link>

            {/* Engineer cutout — hidden on mobile */}
            <div className="hidden md:block relative rounded-3xl bg-brand-blue-light overflow-hidden min-h-[240px] mt-8">
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/10 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              {/* Placeholder — replace with:
                  <Image src="/images/whyus-cutout.png" alt="Engineer" fill
                         className="object-contain object-bottom" /> */}
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <div className="text-center text-brand-blue/30">
                  <div className="text-xs font-mono">whyus-cutout.png</div>
                </div>
              </div>

              {/* Trusted by strip */}
              <div className="absolute bottom-0 inset-x-0 bg-white/80 backdrop-blur-sm p-3 border-t border-brand-border">
                <p className="text-brand-sub text-[10px] uppercase tracking-wider mb-1.5">Trusted By</p>
                <div className="flex flex-wrap gap-2">
                  {['Ashghal', 'QP', 'Barwa', 'Qatar Rail', 'HMC'].map((c) => (
                    <span key={c} className="text-brand-sub text-[10px] border border-brand-border rounded px-2 py-0.5">{c}</span>
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
                  <div className="card-base p-6 h-full">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue-light flex items-center justify-center mb-4">
                      <Icon size={22} className="text-brand-blue" />
                    </div>
                    <h3 className="text-brand-text font-semibold mb-2">{t(`${key}Title`)}</h3>
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
