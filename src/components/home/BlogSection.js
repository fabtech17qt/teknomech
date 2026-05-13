import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

const PLACEHOLDER_POSTS = [
  {
    title: 'Understanding QCDD Fire Safety Requirements for Commercial Buildings in Qatar',
    excerpt: 'A comprehensive guide to Qatar Civil Defence Department compliance for fire protection systems in commercial properties.',
    date: '2025-03-15',
    tags: ['Fire Safety', 'QCDD', 'Qatar'],
  },
  {
    title: "Energy Efficiency in HVAC: How to Reduce Cooling Costs in Qatar's Climate",
    excerpt: "Practical strategies and system design principles for cutting energy consumption in Qatar's extreme heat environment.",
    date: '2025-02-28',
    tags: ['HVAC', 'Energy', 'Sustainability'],
  },
  {
    title: 'The Rise of Smart Building Systems: Integrating BMS with MEP Infrastructure',
    excerpt: 'How modern building management systems are transforming MEP operations for smarter, more efficient facilities.',
    date: '2025-02-10',
    tags: ['BMS', 'Smart Buildings', 'LV Systems'],
  },
];

function PlaceholderBlogCard({ post }) {
  return (
    <article className="card-dark overflow-hidden group">
      <div className="h-48 bg-gradient-to-br from-brand-muted to-brand-steel" />
      <div className="p-5">
        <div className="flex items-center gap-3 text-brand-subtext text-xs mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {new Date(post.date).toLocaleDateString('en-QA', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
          {post.tags.slice(0, 1).map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-brand-gold">
              <Tag size={10} />{tag}
            </span>
          ))}
        </div>
        <h3 className="text-brand-text font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-brand-gold transition-colors duration-200">
          {post.title}
        </h3>
        <p className="text-brand-subtext text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-brand-red text-sm font-medium">
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
          <div>
            <SectionLabel variant="red" className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg text-brand-dark">{t('heading')}</h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-brand-red font-medium hover:gap-2.5 transition-all shrink-0">
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_POSTS.map((post) => (
            <PlaceholderBlogCard key={post.title} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
