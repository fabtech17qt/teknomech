import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';

export const metadata = {
  title: 'Blog Post',
};

export default async function BlogPostPage({ params }) {
  const { slug } = await params;

  return (
    <>
      <PageHero
        title="Blog Post Title"
        subtitle="Published by Teknomech MEP Engineering Team"
        breadcrumbs={[
          { label: 'Blog', href: '/blog' },
          { label: slug },
        ]}
      />

      <section className="section-padding bg-brand-dark">
        <div className="container-max max-w-4xl">
          <div className="card-dark p-8">
            <div className="h-72 bg-brand-muted rounded-xl mb-8 animate-pulse" />
            <SectionLabel variant="red" className="mb-4">Article</SectionLabel>
            <div className="prose prose-invert max-w-none space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-4 bg-brand-muted/60 rounded animate-pulse" style={{ width: `${85 + Math.random() * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
