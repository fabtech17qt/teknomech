import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import BlogContent from '@/components/blog/BlogContent';

export const metadata = {
  title: 'MEP Engineering Blog | Teknomech',
  description:
    'MEP and fire protection engineering insights, industry news and technical articles from Teknomech Qatar.',
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

      <section className="py-24 bg-white">
        <div className="container-max">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">Latest Insights</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text mb-12">
              From Our <span className="text-brand-orange">Engineering Team</span>
            </h2>
          </AnimateIn>
          <BlogContent />
        </div>
      </section>
    </>
  );
}
