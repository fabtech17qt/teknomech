import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { ArrowRight, Package } from 'lucide-react';

// Placeholder product cards — real data fetched from API in production
function PlaceholderProductCard({ category, name, brand }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="h-44 bg-gray-50 flex items-center justify-center">
        <Package size={40} className="text-gray-300" />
      </div>
      <div className="p-4">
        <span className="text-brand-red text-xs font-semibold uppercase tracking-wider">{category}</span>
        <h3 className="text-brand-dark font-semibold text-sm mt-1 mb-0.5 line-clamp-2">{name}</h3>
        <p className="text-gray-400 text-xs">{brand}</p>
        <button className="mt-3 w-full py-2 rounded-lg border border-brand-gold/40 text-brand-gold text-xs font-semibold hover:bg-brand-gold hover:text-black transition-all duration-200">
          View Specs
        </button>
      </div>
    </div>
  );
}

const PLACEHOLDER_PRODUCTS = [
  { category: 'Fire Protection', name: 'FM200 Clean Agent Suppression System', brand: 'Kidde' },
  { category: 'HVAC', name: 'Ceiling Cassette FCU — 4-Way', brand: 'Daikin' },
  { category: 'Electrical', name: 'Online UPS System 10kVA', brand: 'APC by Schneider' },
  { category: 'LV Systems', name: 'IP PTZ Security Camera 4K', brand: 'Hikvision' },
];

export default function ProductsSection() {
  const t = useTranslations('home.products');

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <SectionLabel variant="red" className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg text-brand-dark">{t('heading')}</h2>
          </div>
          <Link href="/products" className="inline-flex items-center gap-1.5 text-brand-red font-medium hover:gap-2.5 transition-all shrink-0">
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLACEHOLDER_PRODUCTS.map((p) => (
            <PlaceholderProductCard key={p.name} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
