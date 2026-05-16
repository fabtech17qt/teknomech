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
      <section className="py-24 bg-white">
        <div className="container-max">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4">What We Offer</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text mb-12 max-w-2xl">
              Complete MEP &amp; Fire Protection <span className="text-brand-orange">Solutions</span>
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
      <section className="py-24 bg-brand-blue-soft">
        <div className="container-max">
          <AnimateIn variant="fadeUp" className="text-center mb-14">
            <SectionLabel className="mb-4 justify-center">Our Process</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text">
              How We <span className="text-brand-blue">Deliver Projects</span>
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <AnimateIn key={p.step} variant="fadeUp" delay={i * 0.1}>
                <div className="relative bg-white rounded-2xl border border-brand-border p-6 hover:border-brand-orange transition-all duration-300 group overflow-hidden">
                  <span
                    className="absolute -top-3 right-3 font-black text-brand-border select-none pointer-events-none"
                    style={{ fontSize: '80px', lineHeight: 1 }}
                  >
                    {p.step}
                  </span>
                  <div className="relative z-10 w-10 h-10 rounded-xl bg-brand-orange text-white font-black text-xs flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {p.step}
                  </div>
                  <h3 className="relative z-10 text-brand-text font-bold mb-2">{p.title}</h3>
                  <p className="relative z-10 text-brand-sub text-sm leading-relaxed">{p.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band — bright */}
      <section className="py-20 bg-brand-blue-soft relative overflow-hidden">
        <div className="absolute inset-0 bg-stripes pointer-events-none" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-blue/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-brand-orange/8 rounded-full blur-3xl pointer-events-none" />
        <div className="container-max text-center relative z-10">
          <div className="w-10 h-1 bg-brand-orange rounded-full mx-auto mb-5" />
          <h2 className="text-3xl md:text-4xl font-black text-brand-text mb-4">Need a Custom MEP Solution?</h2>
          <p className="text-brand-sub mb-8 max-w-xl mx-auto">Our engineering team is ready to assess your project and provide a detailed proposal — at no cost.</p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-brand-orange text-white rounded-full px-9 py-4 font-bold hover:bg-brand-orange-dark transition-colors shadow-lg shadow-brand-orange/30">
            Get a Free Consultation
          </a>
        </div>
      </section>
    </>
  );
}
