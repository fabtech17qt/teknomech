import Image from 'next/image';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { Link } from '@/i18n/navigation';
import { CheckCircle, Phone, ArrowRight } from 'lucide-react';
import { AnimateIn } from '@/components/ui/AnimateIn';

const SERVICE_DATA = {
  'fire-protection': {
    name: 'Fire Protection Systems',
    desc: 'Comprehensive QCDD-compliant fire suppression, detection, alarm and sprinkler systems.',
    details:
      'Our fire protection division designs and installs complete fire safety systems for all building classifications in Qatar. Every system is engineered to comply with Qatar Civil Defence Department (QCDD) requirements and international NFPA standards.',
    img: '/images/svc-fire-protection.jpg',
    scope: [
      'Fire Sprinkler Systems (wet/dry/pre-action)',
      'FM200 & Novec 1230 Clean Agent Systems',
      'Fire Alarm & Detection Systems',
      'Emergency Voice Evacuation Systems',
      'Foam Suppression Systems',
      'Hydrant & Hose Reel Systems',
      'Kitchen Suppression Systems',
      'Fire Pump Rooms',
    ],
  },
  hvac: {
    name: 'HVAC Systems',
    desc: "Energy-efficient air conditioning, ventilation and climate control solutions.",
    details:
      "We design, supply and install complete HVAC systems optimized for Qatar's demanding climate. Our systems deliver comfort and energy efficiency while meeting all local and international standards.",
    img: 'https://images.unsplash.com/photo-1718203862467-c33159fdc504?w=1200&h=600&fit=crop&q=80',
    scope: [
      'Chilled Water Systems (AHUs, FCUs)',
      'VRF/VRV Multi-Split Systems',
      'Ducted Split Systems',
      'Precision Air Conditioning',
      'Mechanical Ventilation',
      'Smoke Extraction Systems',
      'BMS Integration',
      'ASHRAE Compliant Design',
    ],
  },
  electrical: {
    name: 'Electrical Systems',
    desc: 'LV/MV power distribution, lighting, UPS, generators and building automation.',
    details:
      'From main incoming substations to final outlet circuits, our electrical team delivers safe, reliable and efficient power systems for commercial, industrial and residential projects across Qatar.',
    img: '/images/svc-electrical.jpg',
    scope: [
      'LV Switchgear & Distribution Boards',
      'MV/LV Transformers & Substations',
      'Lighting Design & Installation',
      'Emergency Lighting',
      'UPS & Battery Systems',
      'Diesel Generators',
      'Building Management Systems',
      'Power Factor Correction',
    ],
  },
  plumbing: {
    name: 'Plumbing & Drainage',
    desc: 'Complete potable water, drainage and sanitation systems.',
    details:
      "Our plumbing division delivers complete water distribution, drainage and sanitation solutions engineered for reliability and long-term performance in Qatar's climate.",
    img: '/images/svc-plumbing.jpg',
    scope: [
      'Cold & Hot Water Distribution',
      'Rainwater Harvesting',
      'Gravity & Pressurized Drainage',
      'Grease Trap Systems',
      'Sewage Pumping Stations',
      'Swimming Pool Plumbing',
      'Irrigation Systems',
      'Water Treatment Systems',
    ],
  },
  'lv-systems': {
    name: 'LV Systems',
    desc: 'Structured cabling, CCTV, access control, PA systems and BMS.',
    details:
      'Our low voltage systems team integrates intelligent building technologies that enhance security, communications and operational efficiency for modern facilities.',
    img: 'https://images.unsplash.com/photo-1688841747582-41097036109d?w=1200&h=600&fit=crop&q=80',
    scope: [
      'Structured Cabling (Cat6A/Fiber)',
      'CCTV & Video Surveillance',
      'Access Control Systems',
      'Public Address Systems',
      'IPTV & AV Systems',
      'Building Management Systems',
      'Intercom Systems',
      'Master Clock Systems',
    ],
  },
  maintenance: {
    name: 'AMC & Maintenance',
    desc: '24/7 emergency support and annual maintenance contracts for all MEP systems.',
    details:
      'Keep your MEP systems performing at peak efficiency with our comprehensive Annual Maintenance Contracts. Our 24/7 response team ensures minimal downtime and extends equipment lifespan.',
    img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200&h=600&fit=crop&q=80',
    scope: [
      'Annual Maintenance Contracts (AMC)',
      '24/7 Emergency Response',
      'Preventive Maintenance Programs',
      'Corrective Maintenance',
      'System Upgrades & Retrofits',
      'Spare Parts Supply',
      'Compliance Testing & Certification',
      'Energy Audits',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(SERVICE_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = SERVICE_DATA[slug];
  return {
    title: service ? `${service.name} | Teknomech` : 'Service | Teknomech',
    description: service?.desc,
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = SERVICE_DATA[slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="text-center">
          <p className="text-brand-sub mb-4">Service not found.</p>
          <Link href="/services" className="btn-primary">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageHero
        title={service.name}
        subtitle={service.desc}
        breadcrumbs={[
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]}
      />

      <section className="section-padding bg-brand-light">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service image */}
              <AnimateIn variant="fadeUp">
                <div className="relative h-72 rounded-2xl overflow-hidden bg-brand-blue-light shadow-md">
                  <Image
                    src={service.img}
                    alt={service.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-steel/60 to-transparent" />
                </div>
              </AnimateIn>

              {/* Overview */}
              <AnimateIn variant="fadeUp">
                <div className="bg-white rounded-2xl border border-brand-border shadow-md p-8">
                  <SectionLabel className="mb-4">Overview</SectionLabel>
                  <h2 className="heading-md mb-5">{service.name}</h2>
                  <p className="text-brand-sub leading-relaxed text-base">{service.details}</p>
                </div>
              </AnimateIn>

              {/* Scope of work */}
              <AnimateIn variant="fadeUp">
                <div className="bg-white rounded-2xl border border-brand-border shadow-md p-8">
                  <SectionLabel className="mb-5">Scope of Work</SectionLabel>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.scope.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle size={16} className="text-brand-blue shrink-0 mt-0.5" />
                        <span className="text-brand-text text-sm leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            </div>

            {/* Right: sidebar */}
            <div className="space-y-5">
              {/* Get a Quote */}
              <AnimateIn variant="fadeRight">
                <div className="bg-brand-blue rounded-2xl p-6 shadow-lg">
                  <h3 className="text-white font-bold text-lg mb-2">Get a Quote</h3>
                  <p className="text-white/70 text-sm mb-5">
                    Contact our engineering team for a detailed proposal tailored to your project.
                  </p>
                  <Link href="/contact"
                    className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white rounded-full py-3 font-semibold hover:bg-orange-700 transition-colors text-sm">
                    Request Quote <ArrowRight size={15} />
                  </Link>
                </div>
              </AnimateIn>

              {/* Emergency support */}
              <AnimateIn variant="fadeRight" delay={0.1}>
                <div className="bg-white rounded-2xl border border-brand-border shadow-md p-6">
                  <h3 className="text-brand-text font-bold mb-2">Need Emergency Support?</h3>
                  <p className="text-brand-sub text-sm mb-4">
                    24/7 emergency maintenance response across Qatar.
                  </p>
                  <a href="tel:+97444445555"
                    className="w-full flex items-center justify-center gap-2 border-2 border-brand-blue text-brand-blue rounded-full py-3 font-semibold hover:bg-brand-blue hover:text-white transition-colors text-sm">
                    <Phone size={15} /> Call Now
                  </a>
                </div>
              </AnimateIn>

              {/* Related services */}
              <AnimateIn variant="fadeRight" delay={0.15}>
                <div className="bg-brand-light rounded-2xl border border-brand-border p-6">
                  <h3 className="text-brand-text font-bold text-sm mb-4">Related Services</h3>
                  <div className="space-y-2">
                    {Object.entries(SERVICE_DATA)
                      .filter(([s]) => s !== slug)
                      .slice(0, 4)
                      .map(([s, svc]) => (
                        <Link key={s} href={`/services/${s}`}
                          className="flex items-center justify-between py-2 text-sm text-brand-text hover:text-brand-blue transition-colors group">
                          <span className="group-hover:translate-x-1 transition-transform">{svc.name}</span>
                          <ArrowRight size={13} className="text-brand-sub shrink-0" />
                        </Link>
                      ))}
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
