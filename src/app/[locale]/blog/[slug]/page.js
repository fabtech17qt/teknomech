import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export const metadata = {
  title: 'Blog Post | Teknomech',
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

      <section className="py-20 bg-white">
        <div className="container-max max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brand-sub hover:text-brand-blue text-sm font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={15} /> Back to Blog
          </Link>

          {/* Hero image placeholder */}
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-brand-blue-soft mb-8 border border-brand-border">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-brand-sub text-sm">Article Image</div>
            </div>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="flex items-center gap-1.5 bg-brand-orange-soft text-brand-orange-dark text-xs font-semibold rounded-full px-3 py-1.5">
              <Tag size={11} /> MEP Engineering
            </span>
            <span className="flex items-center gap-1.5 text-brand-sub text-xs">
              <Calendar size={12} /> May 2025
            </span>
            <span className="flex items-center gap-1.5 text-brand-sub text-xs">
              <Clock size={12} /> 5 min read
            </span>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl border border-brand-border p-8 shadow-sm">
            <SectionLabel className="mb-4">Article</SectionLabel>
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-brand-blue-soft rounded animate-pulse"
                  style={{ width: `${80 + (i % 3) * 7}%` }}
                />
              ))}
            </div>
            <p className="text-brand-sub text-sm mt-6 leading-relaxed">
              Full article content will be loaded from the database once the blog module is configured.
              This section will show the complete post with text, images, and technical diagrams.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
