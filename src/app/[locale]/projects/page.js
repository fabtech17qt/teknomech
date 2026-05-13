import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';

export const metadata = {
  title: 'MEP Projects Portfolio',
  description: 'Explore Teknomech\'s portfolio of completed MEP and fire protection projects across Qatar.',
};

const CATEGORIES = ['All', 'commercial', 'residential', 'industrial', 'government'];

export default function ProjectsPage() {
  const t = useTranslations('projects');

  return (
    <>
      <PageHero
        title={t('heading')}
        subtitle="500+ completed MEP and fire protection projects across Qatar — from commercial towers to industrial facilities."
        breadcrumbs={[{ label: t('pageTitle') }]}
      />

      <section className="section-padding bg-brand-dark">
        <div className="container-max">
          <div className="flex flex-wrap gap-3 mb-10">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                  cat === 'All'
                    ? 'bg-brand-red border-brand-red text-white'
                    : 'border-white/10 text-brand-subtext hover:border-brand-gold hover:text-brand-gold'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="card-dark aspect-[4/3] animate-pulse bg-brand-steel rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
