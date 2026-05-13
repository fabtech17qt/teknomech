import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

const PLACEHOLDER_POSTS = [
  {
    title: 'Understanding QCDD Fire Safety Requirements for Commercial Buildings',
    excerpt: 'A comprehensive guide to Qatar Civil Defence Department compliance for fire protection systems in commercial properties.',
    date: '2025-03-15',
    tag: 'Fire Safety',
  },
  {
    title: "Energy Efficiency in HVAC: Reducing Cooling Costs in Qatar's Climate",
    excerpt: "Practical strategies and system design principles for cutting energy consumption in Qatar's extreme heat environment.",
    date: '2025-02-28',
    tag: 'HVAC',
  },
  {
    title: 'Smart Buildings: Integrating BMS with MEP Infrastructure',
    excerpt: 'How modern building management systems are transforming MEP operations for smarter, more efficient facilities.',
    date: '2025-02-10',
    tag: 'BMS',
  },
];

function BlogCard({ post }) {
  return (
    <article className="card-base overflow-hidden group">
      {/* Cover image placeholder — replace with: <Image src="/images/blog-placeholder.jpg" ... /> */}
      <div className="h-48 bg-brand-blue-light relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 to-brand-border" />
        {/* Date badge */}
        <div className="absolute top-3 start-3 flex items-center gap-1.5 bg-brand-blue text-white text-xs font-semibold rounded-full px-3 py-1.5">
          <Calendar size={11} />
          {new Date(post.date).toLocaleDateString('en-QA', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>
      <div className="p-5">
        <span className="inline-flex items-center gap-1.5 text-brand-blue text-xs font-semibold mb-3">
          <Tag size={11} />{post.tag}
        </span>
        <h3 className="text-brand-text font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-brand-sub text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
          Read More <ArrowRight size={13} />
        </span>
      </div>
    </article>
  );
}

export default function BlogSection() {
  const t = useTranslations('home.blog');

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg">{t('heading')}</h2>
          </AnimateIn>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-brand-blue font-medium hover:gap-2.5 transition-all shrink-0 text-sm">
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_POSTS.map((post, index) => (
            <AnimateIn key={post.title} variant="fadeUp" delay={index * 0.1}>
              <BlogCard post={post} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
