import { useTranslations } from 'next-intl';
import SectionLabel from '@/components/shared/SectionLabel';
import StatCounter from '@/components/shared/StatCounter';
import { AnimateIn } from '@/components/ui/AnimateIn';

const STATS = [
  { key: 'stat1', value: 500,  suffix: '+' },
  { key: 'stat2', value: 15,   suffix: '+' },
  { key: 'stat3', value: 120,  suffix: '+' },
  { key: 'stat4', value: 250,  suffix: '+' },
];

export default function StatsSection() {
  const t = useTranslations('home.stats');

  return (
    <section className="bg-brand-blue section-padding relative overflow-hidden">
      {/* Diagonal stripe watermark */}
      <div className="absolute inset-0 bg-diagonal-stripe pointer-events-none" />
      <div className="absolute top-0 end-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <AnimateIn variant="fadeUp" className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-white/50 text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            <span className="w-6 h-0.5 bg-white/40 inline-block rounded-full" />
            {t('label')}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">{t('heading')}</h2>
        </AnimateIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ key, value, suffix }, index) => (
            <AnimateIn key={key} variant="scaleUp" delay={index * 0.12} className="text-center">
              <StatCounter
                value={value}
                suffix={suffix}
                label={t(key)}
                className="text-center"
                dark
              />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
