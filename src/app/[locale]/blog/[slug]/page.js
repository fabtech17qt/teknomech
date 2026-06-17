import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    return {
      title: post ? `${post.titleEn || post.titleAr} | Teknomech Blog` : 'Blog | Teknomech',
      description: (post?.excerptEn || post?.excerptAr || '').slice(0, 160),
    };
  } catch {
    return { title: 'Blog | Teknomech' };
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  let post = null;
  try {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  } catch {}

  const title = post ? (post.titleEn || post.titleAr || 'Blog Post') : 'Post Not Found';

  return (
    <>
      <PageHero
        title={title}
        subtitle={post ? (post.excerptEn || post.excerptAr || '') : 'This post could not be found.'}
        breadcrumbs={[
          { label: 'Blog', href: '/blog' },
          { label: title },
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

          {!post ? (
            <div className="py-20 text-center text-brand-sub text-sm">
              This post could not be found or has been removed.
            </div>
          ) : (
            <>
              {post.coverImage && (
                <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-8 border border-brand-border">
                  <Image
                    src={post.coverImage}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                    priority
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-4 mb-8">
                {post.tags?.length > 0 && (
                  <span className="flex items-center gap-1.5 bg-brand-orange/10 text-brand-orange text-xs font-semibold rounded-full px-3 py-1.5">
                    <Tag size={11} /> {post.tags[0]}
                  </span>
                )}
                {post.publishedAt && (
                  <span className="flex items-center gap-1.5 text-brand-sub text-xs">
                    <Calendar size={12} />
                    {new Date(post.publishedAt).toLocaleDateString('en-QA', {
                      month: 'long', day: 'numeric', year: 'numeric',
                    })}
                  </span>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-brand-border p-8 shadow-sm">
                <SectionLabel className="mb-6">Article</SectionLabel>
                <div className="prose prose-slate max-w-none">
                  {(post.contentEn || post.contentAr || '').split('\n').filter(Boolean).map((para, i) => (
                    <p key={i} className="text-brand-sub text-base leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                </div>

                {post.tags?.length > 1 && (
                  <div className="mt-8 pt-6 border-t border-brand-border flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-brand-light text-brand-sub text-xs font-medium px-3 py-1 rounded-full border border-brand-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
