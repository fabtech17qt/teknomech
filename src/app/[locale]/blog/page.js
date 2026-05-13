import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';

export const metadata = {
  title: 'MEP Engineering Blog',
  description: 'MEP and fire protection engineering insights, industry news and technical articles from Teknomech Qatar.',
};

export default function BlogPage() {
  const t = useTranslations('blog');

  return (
    <>
      <PageHero
        title={t('heading')}
        subtitle="Technical insights, industry news and engineering guides from Teknomech's expert team."
        breadcrumbs={[{ label: t('pageTitle') }]}
      />

      <section className="section-padding bg-brand-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card-dark overflow-hidden animate-pulse">
                <div className="h-48 bg-brand-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-brand-muted rounded w-1/2" />
                  <div className="h-5 bg-brand-muted rounded w-full" />
                  <div className="h-4 bg-brand-muted rounded w-3/4" />
                  <div className="h-3 bg-brand-muted rounded w-1/4 mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
