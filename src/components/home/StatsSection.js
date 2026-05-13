import { useTranslations } from 'next-intl';
import SectionLabel from '@/components/shared/SectionLabel';
import StatCounter from '@/components/shared/StatCounter';

const STATS = [
  { key: 'stat1', value: 500, suffix: '+' },
  { key: 'stat2', value: 15, suffix: '+' },
  { key: 'stat3', value: 120, suffix: '+' },
  { key: 'stat4', value: 250, suffix: '+' },
];

export default function StatsSection() {
  const t = useTranslations('home.stats');

  return (
    <section className="bg-brand-red section-padding relative overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute top-0 end-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="text-center mb-12">
          <div className="section-label text-white/60 justify-center mb-3">
            <span className="w-6 h-0.5 bg-white/40 inline-block rounded-full" />
            <span>{t('label')}</span>
          </div>
          <h2 className="heading-lg text-white">{t('heading')}</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ key, value, suffix }) => (
            <StatCounter
              key={key}
              value={value}
              suffix={suffix}
              label={t(key)}
              className="text-center"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
