import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { FileText, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProductCard({ product, className }) {
  const locale = useLocale();
  const t = useTranslations('products');
  const name = locale === 'ar' ? product.nameAr : product.nameEn;

  return (
    <div className={cn('card-dark overflow-hidden group', className)}>
      {/* Image */}
      <div className="relative h-48 bg-brand-muted overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-subtext/30">
            <FileText size={48} />
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 start-3 bg-brand-dark/80 backdrop-blur-sm text-brand-gold text-xs font-medium px-2.5 py-1 rounded-full border border-brand-gold/20">
          {product.category}
        </span>
      </div>

      <div className="p-4">
        <p className="text-brand-subtext text-xs mb-1">{product.brand}</p>
        <h3 className="text-brand-text font-semibold mb-3 line-clamp-2 leading-snug">{name}</h3>
        <Link
          href={`/products/${product.slug}`}
          className="btn-secondary text-sm py-2 w-full justify-center"
        >
          {t('viewSpecs')}
        </Link>
      </div>
    </div>
  );
}
