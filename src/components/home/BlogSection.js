import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { AnimateIn } from '@/components/ui/AnimateIn';
import SectionLabel from '@/components/shared/SectionLabel';
import { Calendar, Tag } from 'lucide-react';
import { prisma } from '@/lib/prisma';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=600&h=400&fit=crop&q=80';

function BlogCard({ post, delay = 0 }) {
  return (
    <AnimateIn variant="fadeUp" delay={delay}>
      <article className="group bg-white rounded-3xl overflow-hidden border border-brand-border hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        <div className="relative h-52 shrink-0 overflow-hidden">
          <Image
            src={post.img}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-4">
            {post.tag ? (
              <span className="inline-flex items-center gap-1.5 bg-brand-orange-soft text-brand-orange-dark text-xs font-semibold rounded-full px-3 py-1">
                <Tag size={10} /> {post.tag}
              </span>
            ) : <span />}
            <span className="flex items-center gap-1.5 text-brand-sub text-xs">
              <Calendar size={10} />
              {new Date(post.date).toLocaleDateString('en-QA', {
                day: 'numeric', month: 'short', year: 'numeric',
              })}
            </span>
          </div>

          <h3 className="font-bold text-lg text-brand-text leading-snug mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors duration-200 flex-1">
            {post.title}
          </h3>
          <p className="text-brand-sub text-sm leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-semibold group-hover:gap-2.5 transition-all mt-auto"
          >
            Read More →
          </Link>
        </div>
      </article>
    </AnimateIn>
  );
}

export default async function BlogSection() {
  let posts = [];
  try {
    const raw = await prisma.blogPost.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: 'desc' },
      take: 3,
    });
    posts = raw.map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.titleEn || p.titleAr || 'Untitled',
      excerpt: p.excerptEn || p.excerptAr || '',
      date: p.publishedAt || p.createdAt,
      tag: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags[0] : null,
      img: p.coverImage || FALLBACK_IMG,
    }));
  } catch {}

  if (posts.length === 0) return null;

  return (
    <section className="py-28 bg-white">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">Latest Insights</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text">
              From Our{' '}
              <span className="text-brand-blue">Engineering Team</span>
            </h2>
          </AnimateIn>
          <AnimateIn variant="fadeLeft">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-brand-blue font-semibold hover:gap-2.5 transition-all text-sm shrink-0"
            >
              View All Articles →
            </Link>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.id} post={post} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
