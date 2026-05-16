import Image from 'next/image';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Link } from '@/i18n/navigation';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'MEP Engineering Blog | Teknomech',
  description:
    'MEP and fire protection engineering insights, industry news and technical articles from Teknomech Qatar.',
};

const POSTS = [
  {
    slug: 'qcdd-fire-safety-requirements',
    title: 'Understanding QCDD Fire Safety Requirements for Commercial Buildings',
    excerpt:
      'A comprehensive guide to Qatar Civil Defence Department compliance for fire protection systems in commercial properties.',
    date: '2025-03-15',
    tag: 'Fire Safety',
    readTime: '5 min read',
    img: '/images/svc-fire-protection.jpg',
  },
  {
    slug: 'hvac-energy-efficiency-qatar',
    title: "Energy Efficiency in HVAC: Reducing Cooling Costs in Qatars Climate",
    excerpt:
      "Practical strategies for cutting energy consumption in Qatars extreme heat environment through smart system design.",
    date: '2025-02-28',
    tag: 'HVAC',
    readTime: '7 min read',
    img: 'https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=600&h=400&fit=crop&q=80',
  },
  {
    slug: 'smart-buildings-bms-mep',
    title: 'Smart Buildings: Integrating BMS with MEP Infrastructure',
    excerpt:
      'How modern building management systems are transforming MEP operations for smarter, more efficient facilities.',
    date: '2025-02-10',
    tag: 'Smart Buildings',
    readTime: '6 min read',
    img: 'https://images.unsplash.com/photo-1765045085124-b29f8db1cf8c?w=600&h=400&fit=crop&q=80',
  },
  {
    slug: 'fm200-vs-novec-clean-agents',
    title: 'FM200 vs Novec 1230: Choosing the Right Clean Agent System',
    excerpt:
      'Side-by-side comparison of the two leading clean agent suppression technologies for data centres and server rooms.',
    date: '2025-01-20',
    tag: 'Fire Protection',
    readTime: '8 min read',
    img: '/images/product-fire-equipment.jpg',
  },
  {
    slug: 'electrical-upda-compliance',
    title: 'UPDA Electrical Compliance: What Contractors Need to Know',
    excerpt:
      'A practical breakdown of UPDA licensing requirements for electrical works on commercial and industrial projects in Qatar.',
    date: '2025-01-08',
    tag: 'Electrical',
    readTime: '5 min read',
    img: '/images/svc-electrical.jpg',
  },
  {
    slug: 'plumbing-standards-qatar',
    title: "Plumbing Standards for Qatars Extreme Climate",
    excerpt:
      "How to specify and install plumbing systems that withstand Qatars heat, humidity and water quality challenges.",
    date: '2024-12-15',
    tag: 'Plumbing',
    readTime: '6 min read',
    img: '/images/svc-plumbing.jpg',
  },
];

function BlogCard({ post }) {
  return (
    <article className="bg-white rounded-2xl border border-brand-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col">
      <div className="relative h-52 overflow-hidden bg-brand-blue-light shrink-0">
        <Image
          src={post.img}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-3 start-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-brand-text text-xs font-semibold rounded-full px-3 py-1.5 z-10 shadow-md">
          <Calendar size={10} />
          {new Date(post.date).toLocaleDateString('en-QA', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-brand-orange text-xs font-semibold">
            <Tag size={11} />{post.tag}
          </div>
          <span className="text-brand-sub text-xs">{post.readTime}</span>
        </div>
        <h3 className="text-brand-text font-bold text-base leading-snug mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors duration-200 flex-1">
          {post.title}
        </h3>
        <p className="text-brand-sub text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-semibold hover:gap-3 transition-all duration-200 mt-auto">
          Read More <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {POSTS.map((post, i) => (
              <AnimateIn key={post.slug} variant="fadeUp" delay={i * 0.07}>
                <BlogCard post={post} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
