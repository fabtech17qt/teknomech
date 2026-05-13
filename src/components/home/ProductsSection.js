import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { ArrowRight, Package, ExternalLink } from 'lucide-react';

const PLACEHOLDER_PRODUCTS = [
  { category: 'Fire Protection', name: 'FM200 Clean Agent Suppression System', brand: 'Kidde' },
  { category: 'HVAC', name: 'Ceiling Cassette FCU — 4-Way Blow', brand: 'Daikin' },
  { category: 'Electrical', name: 'Online UPS System 10 kVA', brand: 'APC by Schneider' },
  { category: 'LV Systems', name: 'IP PTZ Security Camera 4K', brand: 'Hikvision' },
];

function ProductCard({ category, name, brand }) {
  return (
    <div className="card-base overflow-hidden group">
      {/* Image placeholder */}
      <div className="h-44 bg-brand-blue-light flex items-center justify-center relative">
        {/* Replace with: <Image src="/images/product-placeholder.jpg" alt={name} fill className="object-contain p-4" /> */}
        <Package size={44} className="text-brand-blue/30" />
      </div>
      <div className="p-5">
        <span className="inline-flex items-center gap-1.5 bg-brand-blue-light text-brand-blue text-xs font-semibold rounded-full px-3 py-1 mb-3">
          {category}
        </span>
        <h3 className="text-brand-text font-semibold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-brand-blue transition-colors duration-200">
          {name}
        </h3>
        <p className="text-brand-sub text-xs mb-4">{brand}</p>
        <button className="w-full py-2.5 rounded-xl border-2 border-brand-blue/20 text-brand-blue text-xs font-semibold hover:bg-brand-blue hover:text-white transition-all duration-200 flex items-center justify-center gap-1.5 min-h-[44px]">
          <ExternalLink size={12} />
          View Specs
        </button>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const t = useTranslations('home.products');

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg">{t('heading')}</h2>
          </AnimateIn>
          <Link href="/products" className="inline-flex items-center gap-1.5 text-brand-blue font-medium hover:gap-2.5 transition-all shrink-0 text-sm">
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLACEHOLDER_PRODUCTS.map((p, index) => (
            <AnimateIn key={p.name} variant="fadeUp" delay={index * 0.09}>
              <ProductCard {...p} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
