import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { ArrowRight, Users, Award } from 'lucide-react';

export default function AboutSection() {
  const t = useTranslations('home.about');

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image with floating stats */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-brand-steel">
              {/* Placeholder image */}
              <div className="w-full h-full bg-gradient-to-br from-brand-muted to-brand-dark flex items-center justify-center">
                <div className="text-center text-brand-subtext/30">
                  <Users size={64} />
                  <p className="text-sm mt-2">Company Image</p>
                </div>
              </div>

              {/* Red accent border */}
              <div className="absolute inset-0 border-2 border-brand-red/20 rounded-2xl pointer-events-none" />
            </div>

            {/* Floating stat cards */}
            <div className="absolute -bottom-6 -end-6 bg-brand-dark border border-white/10 rounded-xl p-4 shadow-xl">
              <p className="text-brand-text font-black text-3xl">500+</p>
              <p className="text-brand-subtext text-xs uppercase tracking-wider">Projects Delivered</p>
            </div>
            <div className="absolute -top-6 -start-6 bg-brand-red text-white rounded-xl p-4 shadow-xl">
              <p className="text-white font-black text-3xl">15+</p>
              <p className="text-white/80 text-xs uppercase tracking-wider">Years in Qatar</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:ps-4">
            <SectionLabel variant="red" className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg text-brand-dark mb-6 leading-tight">
              {t('heading')}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{t('p1')}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{t('p2')}</p>

            <div className="flex items-center gap-8 mb-8 p-4 bg-white rounded-xl border border-gray-100 shadow-sm w-fit">
              <div className="text-center">
                <p className="text-brand-dark font-black text-2xl">500+</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">{t('stat1Label')}</p>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div className="text-center">
                <p className="text-brand-dark font-black text-2xl">15+</p>
                <p className="text-gray-500 text-xs uppercase tracking-wider">{t('stat2Label')}</p>
              </div>
            </div>

            <Link href="/about" className="btn-primary">
              {t('cta')} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
