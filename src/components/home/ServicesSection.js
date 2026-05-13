import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import ServiceCard from '@/components/shared/ServiceCard';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Flame, Wind, Zap, Droplets, Network, Wrench, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    key: 'fire',
    icon: Flame,
    slug: 'fire-protection',
    img: '/images/svc-fire-protection.jpg',
  },
  {
    key: 'hvac',
    icon: Wind,
    slug: 'hvac',
    img: 'https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=600&h=400&fit=crop&q=80',
  },
  {
    key: 'electrical',
    icon: Zap,
    slug: 'electrical',
    img: '/images/svc-electrical.jpg',
  },
  {
    key: 'plumbing',
    icon: Droplets,
    slug: 'plumbing',
    img: '/images/svc-plumbing.jpg',
  },
  {
    key: 'lv',
    icon: Network,
    slug: 'lv-systems',
    img: 'https://images.unsplash.com/photo-1688841747582-41097036109d?w=600&h=400&fit=crop&q=80',
  },
  {
    key: 'maintenance',
    icon: Wrench,
    slug: 'maintenance',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop&q=80',
  },
];

export default function ServicesSection() {
  const t    = useTranslations('home.services');
  const tSvc = useTranslations('services');

  return (
    <section className="section-padding bg-brand-light">
      <div className="container-max">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg max-w-xl">{t('heading')}</h2>
          </AnimateIn>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-brand-blue font-semibold hover:gap-3 transition-all shrink-0 text-sm"
          >
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        {/* 3×2 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map(({ key, icon, slug, img }, index) => (
            <AnimateIn key={key} variant="fadeUp" delay={index * 0.07}>
              <ServiceCard
                icon={icon}
                title={tSvc(`${key}.name`)}
                description={tSvc(`${key}.desc`)}
                href={`/services/${slug}`}
                imageSrc={img}
              />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
