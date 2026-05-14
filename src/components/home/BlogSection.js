'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { AnimateIn } from '@/components/ui/AnimateIn';
import SectionLabel from '@/components/shared/SectionLabel';
import { Calendar, Tag } from 'lucide-react';

const POSTS = [
  {
    slug: 'qcdd-fire-safety-requirements',
    title: 'Understanding QCDD Fire Safety Requirements for Commercial Buildings',
    excerpt: 'A comprehensive guide to Qatar Civil Defence Department compliance for fire protection systems in commercial properties.',
    date: '2025-03-15',
    tag: 'Fire Safety',
    img: '/images/svc-fire-protection.jpg',
  },
  {
    slug: 'hvac-energy-efficiency-qatar',
    title: "Energy Efficiency in HVAC: Reducing Cooling Costs in Qatar's Climate",
    excerpt: "Practical strategies for cutting energy consumption through smart system design in extreme heat environments.",
    date: '2025-02-28',
    tag: 'HVAC',
    img: 'https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=600&h=400&fit=crop&q=80',
  },
  {
    slug: 'smart-buildings-bms-mep',
    title: 'Smart Buildings: Integrating BMS with MEP Infrastructure',
    excerpt: 'How modern building management systems are transforming MEP operations for smarter, more efficient facilities.',
    date: '2025-02-10',
    tag: 'Smart Buildings',
    img: 'https://images.unsplash.com/photo-1765045085124-b29f8db1cf8c?w=600&h=400&fit=crop&q=80',
  },
];

function BlogCard({ post, delay = 0 }) {
  return (
    <AnimateIn variant="fadeUp" delay={delay}>
      <article className="group bg-white rounded-3xl overflow-hidden border border-brand-border hover:shadow-xl transition-all duration-300 flex flex-col h-full">
        {/* Image */}
        <div className="relative h-52 shrink-0 overflow-hidden">
          <Image
            src={post.img}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 bg-brand-orange-soft text-brand-orange-dark text-xs font-semibold rounded-full px-3 py-1">
              <Tag size={10} /> {post.tag}
            </span>
            <span className="flex items-center gap-1.5 text-brand-sub text-xs">
              <Calendar size={10} />
              {new Date(post.date).toLocaleDateString('en-QA', { day: 'numeric', month: 'short', year: 'numeric' })}
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

export default function BlogSection() {
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
          {POSTS.map((post, i) => (
            <BlogCard key={post.slug} post={post} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
