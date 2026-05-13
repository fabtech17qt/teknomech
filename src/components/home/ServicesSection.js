import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import ServiceCard from '@/components/shared/ServiceCard';
import { Flame, Wind, Zap, Droplets, Network, Wrench, ArrowRight } from 'lucide-react';

const SERVICES = [
  { key: 'fire', icon: Flame, slug: 'fire-protection' },
  { key: 'hvac', icon: Wind, slug: 'hvac' },
  { key: 'electrical', icon: Zap, slug: 'electrical' },
  { key: 'plumbing', icon: Droplets, slug: 'plumbing' },
  { key: 'lv', icon: Network, slug: 'lv-systems' },
  { key: 'maintenance', icon: Wrench, slug: 'maintenance' },
];

export default function ServicesSection() {
  const t = useTranslations('home.services');
  const tServices = useTranslations('services');

  return (
    <section className="section-padding bg-brand-dark">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <SectionLabel variant="red" className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg text-brand-text max-w-xl">
              {t('heading')}
            </h2>
          </div>
          <Link href="/services" className="btn-ghost text-brand-gold shrink-0">
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(({ key, icon, slug }) => (
            <ServiceCard
              key={key}
              icon={icon}
              title={tServices(`${key}.name`)}
              description={tServices(`${key}.desc`)}
              href={`/services/${slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
