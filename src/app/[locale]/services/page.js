import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import ServiceCard from '@/components/shared/ServiceCard';
import { Flame, Wind, Zap, Droplets, Network, Wrench } from 'lucide-react';

export const metadata = {
  title: 'MEP & Fire Protection Services',
  description: 'Complete MEP and fire protection services in Qatar — HVAC, electrical, plumbing, fire suppression, LV systems and AMC.',
};

const SERVICES = [
  { key: 'fire', icon: Flame, slug: 'fire-protection' },
  { key: 'hvac', icon: Wind, slug: 'hvac' },
  { key: 'electrical', icon: Zap, slug: 'electrical' },
  { key: 'plumbing', icon: Droplets, slug: 'plumbing' },
  { key: 'lv', icon: Network, slug: 'lv-systems' },
  { key: 'maintenance', icon: Wrench, slug: 'maintenance' },
];

export default function ServicesPage() {
  const t = useTranslations('services');

  return (
    <>
      <PageHero
        title="MEP & Fire Protection Services"
        subtitle="End-to-end engineering solutions for Qatar's most demanding projects — designed, supplied, installed and maintained under one roof."
        breadcrumbs={[{ label: 'Services' }]}
      />

      <section className="section-padding bg-brand-dark">
        <div className="container-max">
          <SectionLabel variant="red" className="mb-4">What We Offer</SectionLabel>
          <h2 className="heading-lg text-brand-text mb-12 max-w-2xl">
            Complete <span className="text-brand-red">Engineering</span> Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ key, icon, slug }) => (
              <ServiceCard
                key={key}
                icon={icon}
                title={t(`${key}.name`)}
                description={t(`${key}.desc`)}
                href={`/services/${slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-brand-light">
        <div className="container-max">
          <SectionLabel variant="red" className="mb-4">Our Process</SectionLabel>
          <h2 className="heading-lg text-brand-dark mb-12 text-center">How We Deliver Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Consultation', desc: 'We understand your project requirements and regulatory needs.' },
              { step: '02', title: 'Design & Engineering', desc: 'Our team prepares compliant shop drawings and specifications.' },
              { step: '03', title: 'Installation', desc: 'Skilled technicians execute works to the highest standards.' },
              { step: '04', title: 'Testing & Handover', desc: 'Full system commissioning, testing and as-built documentation.' },
            ].map((p) => (
              <div key={p.step} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-brand-red text-white font-black text-lg flex items-center justify-center mx-auto mb-4">
                  {p.step}
                </div>
                <h3 className="text-brand-dark font-bold mb-2">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
