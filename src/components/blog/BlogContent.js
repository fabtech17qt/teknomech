'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Link } from '@/i18n/navigation';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=600&h=400&fit=crop&q=80';

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
        {post.tag && (
          <div className="flex items-center gap-1.5 text-brand-orange text-xs font-semibold mb-3">
            <Tag size={11} />{post.tag}
          </div>
        )}
        <h3 className="text-brand-text font-bold text-base leading-snug mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors duration-200 flex-1">
          {post.title}
        </h3>
        <p className="text-brand-sub text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-brand-blue text-sm font-semibold hover:gap-3 transition-all duration-200 mt-auto"
        >
          Read More <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-brand-border shadow-md overflow-hidden flex flex-col animate-pulse">
      <div className="h-52 bg-slate-100" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-slate-100 rounded w-1/4" />
        <div className="h-5 bg-slate-100 rounded w-full" />
        <div className="h-4 bg-slate-100 rounded w-3/4" />
        <div className="h-3 bg-slate-100 rounded w-1/2" />
      </div>
    </div>
  );
}

export default function BlogContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.json())
      .then(data => {
        const mapped = (Array.isArray(data) ? data : []).map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.titleEn || p.titleAr || 'Untitled',
          excerpt: p.excerptEn || p.excerptAr || '',
          date: p.publishedAt || p.createdAt || new Date().toISOString(),
          tag: Array.isArray(p.tags) && p.tags.length > 0 ? p.tags[0] : null,
          img: p.coverImage || FALLBACK_IMG,
        }));
        setPosts(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center text-brand-sub text-sm">No posts published yet.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, i) => (
        <AnimateIn key={post.id} variant="fadeUp" delay={i * 0.07}>
          <BlogCard post={post} />
        </AnimateIn>
      ))}
    </div>
  );
}
