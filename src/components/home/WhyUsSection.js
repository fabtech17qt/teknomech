import { useTranslations } from 'next-intl';
import SectionLabel from '@/components/shared/SectionLabel';
import { Shield, Package, Users, Star } from 'lucide-react';

const ICONS = [Shield, Package, Users, Star];
const FEATURE_KEYS = ['feature1', 'feature2', 'feature3', 'feature4'];

export default function WhyUsSection() {
  const t = useTranslations('home.whyUs');

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <SectionLabel variant="red" className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg text-brand-dark mb-6">{t('heading')}</h2>
            <p className="text-gray-600 leading-relaxed text-base">{t('p')}</p>

            {/* Client logos marquee placeholder */}
            <div className="mt-8 p-4 bg-white rounded-xl border border-gray-100">
              <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Trusted By</p>
              <div className="flex flex-wrap gap-2">
                {['Ashghal', 'QP', 'Barwa', 'Lusail Corp', 'Qatar Rail', 'HMC'].map((c) => (
                  <span key={c} className="text-gray-400 text-xs border border-gray-200 rounded px-2 py-1">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: feature tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURE_KEYS.map((key, i) => {
              const Icon = ICONS[i];
              return (
                <div key={key} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-xl bg-brand-red/10 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-brand-red" />
                  </div>
                  <h3 className="text-brand-dark font-semibold mb-1.5">{t(`${key}Title`)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(`${key}Desc`)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
