import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';

export const metadata = {
  title: 'MEP Products & Equipment',
  description: 'Browse Teknomech\'s range of MEP and fire protection equipment — fire suppression, HVAC, electrical, plumbing and LV systems.',
};

const CATEGORIES = ['All', 'fire-protection', 'hvac', 'electrical', 'plumbing', 'lv-systems'];

export default function ProductsPage() {
  const t = useTranslations('products');

  return (
    <>
      <PageHero
        title={t('heading')}
        subtitle="Industry-grade MEP and fire protection equipment from leading global brands — sourced and supplied across Qatar."
        breadcrumbs={[{ label: t('pageTitle') }]}
      />

      <section className="section-padding bg-brand-dark">
        <div className="container-max">
          {/* Filters placeholder */}
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
                {cat === 'All' ? t('allCategories') : cat.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </button>
            ))}
          </div>

          {/* Empty state — products loaded from DB in production */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="card-dark overflow-hidden animate-pulse">
                <div className="h-48 bg-brand-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-3 bg-brand-muted rounded w-1/3" />
                  <div className="h-4 bg-brand-muted rounded w-3/4" />
                  <div className="h-4 bg-brand-muted rounded w-1/2" />
                  <div className="h-9 bg-brand-muted rounded-lg mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
