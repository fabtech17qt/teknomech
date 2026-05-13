import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import ServiceCard from '@/components/shared/ServiceCard';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Flame, Wind, Zap, Droplets, Network, Wrench } from 'lucide-react';

export const metadata = {
  title: 'MEP & Fire Protection Services | Teknomech',
  description:
    'Complete MEP and fire protection services in Qatar — HVAC, electrical, plumbing, fire suppression, LV systems and AMC.',
};

const SERVICES = [
  { key: 'fire',        icon: Flame,    slug: 'fire-protection', img: '/images/svc-fire-protection.jpg' },
  { key: 'hvac',        icon: Wind,     slug: 'hvac',            img: 'https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=600&h=400&fit=crop&q=80' },
  { key: 'electrical',  icon: Zap,      slug: 'electrical',      img: '/images/svc-electrical.jpg' },
  { key: 'plumbing',    icon: Droplets, slug: 'plumbing',        img: '/images/svc-plumbing.jpg' },
  { key: 'lv',          icon: Network,  slug: 'lv-systems',      img: 'https://images.unsplash.com/photo-1688841747582-41097036109d?w=600&h=400&fit=crop&q=80' },
  { key: 'maintenance', icon: Wrench,   slug: 'maintenance',     img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=400&fit=crop&q=80' },
];

const PROCESS = [
  { step: '01', title: 'Consultation',         desc: 'We understand your project requirements and regulatory needs.' },
  { step: '02', title: 'Design & Engineering', desc: 'Our team prepares compliant shop drawings and specifications.' },
  { step: '03', title: 'Installation',         desc: 'Skilled technicians execute works to the highest standards.' },
  { step: '04', title: 'Testing & Handover',   desc: 'Full system commissioning, testing and as-built documentation.' },
];

export default function ServicesPage() {
  const t    = useTranslations('services');

  return (
    <>
      <PageHero
        title="MEP & Fire Protection Services"
        subtitle="End-to-end engineering solutions for Qatar's most demanding projects — designed, supplied, installed and maintained under one roof."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* Services grid */}
      <section className="section-padding bg-brand-light">
        <div className="container-max">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">What We Offer</SectionLabel>
            <h2 className="heading-lg mb-12 max-w-2xl">
              Complete MEP & Fire Protection Solutions
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(({ key, icon, slug, img }, i) => (
              <AnimateIn key={key} variant="fadeUp" delay={i * 0.07}>
                <ServiceCard
                  icon={icon}
                  title={t(`${key}.name`)}
                  description={t(`${key}.desc`)}
                  href={`/services/${slug}`}
                  imageSrc={img}
                />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4 justify-center">Our Process</SectionLabel>
            <h2 className="heading-lg text-brand-text text-center mb-12">How We Deliver Projects</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <AnimateIn key={p.step} variant="fadeUp" delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-brand-blue text-white font-black text-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-brand-blue/20">
                    {p.step}
                  </div>
                  <h3 className="text-brand-text font-bold mb-2">{p.title}</h3>
                  <p className="text-brand-sub text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brand-steel py-16">
        <div className="container-max text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Need a Custom MEP Solution?</h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">Our engineering team is ready to assess your project and provide a detailed proposal — at no cost.</p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-brand-orange text-white rounded-full px-9 py-4 font-semibold hover:bg-orange-700 transition-colors shadow-lg shadow-brand-orange/30">
            Get a Free Consultation
          </a>
        </div>
      </section>
    </>
  );
}
