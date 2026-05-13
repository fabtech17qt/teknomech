import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CHECKPOINTS = ['QCD Certified Fire & Safety', 'ISO 9001:2015 Certified', 'Ashghal & QP Approved Contractor'];

export default function AboutSection() {
  const t = useTranslations('home.about');

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — team photo with floating stats */}
          <AnimateIn variant="fadeLeft">
            <div className="relative">
              {/* Main photo */}
              <div className="relative rounded-3xl overflow-hidden h-[460px] md:h-[520px] bg-brand-blue-light">
                <Image
                  src="https://images.unsplash.com/photo-1548838670-cb67b43a6adb?w=700&h=600&fit=crop&crop=center&q=85"
                  alt="Teknomech engineering team on construction site"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Subtle overlay for text readability */}
                <div className="absolute inset-0 bg-brand-steel/10" />
              </div>

              {/* Floating stat — projects */}
              <div className="absolute -bottom-5 -end-5 md:-bottom-6 md:-end-6 bg-white rounded-2xl shadow-xl px-5 py-4 border border-brand-border">
                <p className="text-3xl font-black text-brand-blue">500+</p>
                <p className="text-brand-sub text-xs uppercase tracking-wider mt-0.5">Projects Delivered</p>
              </div>

              {/* Floating stat — years */}
              <div className="absolute -top-5 -start-5 md:-top-6 md:-start-6 bg-brand-blue rounded-2xl shadow-xl px-5 py-4">
                <p className="text-3xl font-black text-white">15+</p>
                <p className="text-white/70 text-xs uppercase tracking-wider mt-0.5">Years in Qatar</p>
              </div>
            </div>
          </AnimateIn>

          {/* Right — text */}
          <AnimateIn variant="fadeRight">
            <SectionLabel className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg mb-5 max-w-lg">{t('heading')}</h2>
            <p className="text-brand-sub leading-relaxed mb-4">{t('p1')}</p>
            <p className="text-brand-sub leading-relaxed mb-7">{t('p2')}</p>

            {/* Checkpoints */}
            <ul className="space-y-2.5 mb-8">
              {CHECKPOINTS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-brand-sub">
                  <CheckCircle size={17} className="text-brand-blue shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Inline stats */}
            <div className="flex items-center gap-8 mb-8 p-5 bg-brand-light rounded-2xl w-fit border border-brand-border">
              <div className="text-center">
                <p className="text-brand-blue font-black text-2xl">500+</p>
                <p className="text-brand-sub text-xs uppercase tracking-wider mt-0.5">{t('stat1Label')}</p>
              </div>
              <div className="w-px h-10 bg-brand-border" />
              <div className="text-center">
                <p className="text-brand-blue font-black text-2xl">15+</p>
                <p className="text-brand-sub text-xs uppercase tracking-wider mt-0.5">{t('stat2Label')}</p>
              </div>
            </div>

            <Link href="/about" className="inline-flex items-center gap-2 bg-brand-orange text-white rounded-full px-8 py-3.5 font-semibold hover:bg-orange-700 transition-all duration-300">
              {t('cta')} <ArrowRight size={16} />
            </Link>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
