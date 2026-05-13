import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { ArrowRight, ExternalLink } from 'lucide-react';

const PRODUCTS = [
  {
    category: 'Fire Protection',
    name: 'FM200 Clean Agent Suppression System',
    brand: 'Kidde',
    img: 'https://images.unsplash.com/photo-1585585825759-979ec75438cc?w=400&h=300&fit=crop&q=80',
  },
  {
    category: 'HVAC',
    name: 'Ceiling Cassette FCU — 4-Way Blow',
    brand: 'Daikin',
    img: 'https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=400&h=300&fit=crop&q=80',
  },
  {
    category: 'Electrical',
    name: 'Online UPS System 10 kVA',
    brand: 'APC by Schneider',
    img: 'https://images.unsplash.com/photo-1555963966-b7ae5404b6ed?w=400&h=300&fit=crop&q=80',
  },
  {
    category: 'LV Systems',
    name: 'IP PTZ Security Camera 4K',
    brand: 'Hikvision',
    img: 'https://images.unsplash.com/photo-1688841747582-41097036109d?w=400&h=300&fit=crop&q=80',
  },
];

function ProductCard({ category, name, brand, img }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-border shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-brand-blue-light">
        <Image
          src={img}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
        <div className="absolute inset-0 bg-brand-steel/0 group-hover:bg-brand-steel/10 transition-all duration-300" />
      </div>
      <div className="p-5">
        {/* Category badge */}
        <span className="inline-flex items-center bg-brand-blue-light text-brand-blue text-xs font-semibold rounded-full px-3 py-1 mb-3">
          {category}
        </span>
        <h3 className="text-brand-text font-bold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-brand-blue transition-colors duration-200">
          {name}
        </h3>
        <p className="text-brand-sub text-xs mb-4">{brand}</p>
        <button className="w-full py-2.5 rounded-xl border-2 border-brand-blue/20 text-brand-blue text-xs font-semibold hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-200 flex items-center justify-center gap-1.5 min-h-[44px]">
          <ExternalLink size={12} />
          View Specifications
        </button>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const t = useTranslations('home.products');

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg">{t('heading')}</h2>
          </AnimateIn>
          <Link href="/products" className="inline-flex items-center gap-1.5 text-brand-blue font-semibold hover:gap-3 transition-all shrink-0 text-sm">
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRODUCTS.map((p, index) => (
            <AnimateIn key={p.name} variant="fadeUp" delay={index * 0.09}>
              <ProductCard {...p} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
