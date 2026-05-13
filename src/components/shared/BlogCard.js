import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

export default function BlogCard({ post, className }) {
  const locale = useLocale();
  const t = useTranslations('blog');
  const title = locale === 'ar' ? post.titleAr : post.titleEn;
  const excerpt = locale === 'ar' ? post.excerptAr : post.excerptEn;

  return (
    <article className={cn('card-dark overflow-hidden group', className)}>
      {/* Cover image */}
      <div className="relative h-48 bg-brand-muted overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-muted to-brand-steel" />
        )}
      </div>

      <div className="p-5">
        {/* Meta */}
        <div className="flex items-center gap-3 text-brand-subtext text-xs mb-3">
          {post.publishedAt && (
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDate(post.publishedAt, locale)}
            </span>
          )}
          {post.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-brand-gold">
              <Tag size={10} />
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-brand-text font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-brand-gold transition-colors duration-200">
          {title}
        </h3>
        <p className="text-brand-subtext text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1.5 text-brand-red text-sm font-medium hover:gap-2.5 transition-all duration-200"
        >
          {t('readMore')} <ArrowRight size={13} />
        </Link>
      </div>
    </article>
  );
}
