import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { Link } from '@/i18n/navigation';

const SERVICE_DATA = {
  'fire-protection': {
    name: 'Fire Protection Systems',
    desc: 'Comprehensive QCDD-compliant fire suppression, detection, alarm and sprinkler systems.',
    details: 'Our fire protection division designs and installs complete fire safety systems for all building classifications in Qatar. Every system is engineered to comply with Qatar Civil Defence Department (QCDD) requirements and international NFPA standards.',
    scope: ['Fire Sprinkler Systems (wet/dry/pre-action)', 'FM200 & Novec 1230 Clean Agent Systems', 'Fire Alarm & Detection Systems', 'Emergency Voice Evacuation Systems', 'Foam Suppression Systems', 'Hydrant & Hose Reel Systems', 'Kitchen Suppression Systems', 'Fire Pump Rooms'],
  },
  hvac: {
    name: 'HVAC Systems',
    desc: 'Energy-efficient air conditioning, ventilation and climate control solutions.',
    details: 'We design, supply and install complete HVAC systems optimized for Qatar\'s demanding climate. Our systems deliver comfort and energy efficiency while meeting all local and international standards.',
    scope: ['Chilled Water Systems (AHUs, FCUs)', 'VRF/VRV Multi-Split Systems', 'Ducted Split Systems', 'Precision Air Conditioning', 'Mechanical Ventilation', 'Smoke Extraction Systems', 'BMS Integration', 'ASHRAE Compliant Design'],
  },
  electrical: {
    name: 'Electrical Systems',
    desc: 'LV/MV power distribution, lighting, UPS, generators and building automation.',
    details: 'From main incoming substations to final outlet circuits, our electrical team delivers safe, reliable and efficient power systems for commercial, industrial and residential projects across Qatar.',
    scope: ['LV Switchgear & Distribution Boards', 'MV/LV Transformers & Substations', 'Lighting Design & Installation', 'Emergency Lighting', 'UPS & Battery Systems', 'Diesel Generators', 'Building Management Systems', 'Power Factor Correction'],
  },
  plumbing: {
    name: 'Plumbing & Drainage',
    desc: 'Complete potable water, drainage and sanitation systems.',
    details: 'Our plumbing division delivers complete water distribution, drainage and sanitation solutions engineered for reliability and long-term performance in Qatar\'s climate.',
    scope: ['Cold & Hot Water Distribution', 'Rainwater Harvesting', 'Gravity & Pressurized Drainage', 'Grease Trap Systems', 'Sewage Pumping Stations', 'Swimming Pool Plumbing', 'Irrigation Systems', 'Water Treatment Systems'],
  },
  'lv-systems': {
    name: 'LV Systems',
    desc: 'Structured cabling, CCTV, access control, PA systems and BMS.',
    details: 'Our low voltage systems team integrates intelligent building technologies that enhance security, communications and operational efficiency for modern facilities.',
    scope: ['Structured Cabling (Cat6A/Fiber)', 'CCTV & Video Surveillance', 'Access Control Systems', 'Public Address Systems', 'IPTV & AV Systems', 'Building Management Systems', 'Intercom Systems', 'Master Clock Systems'],
  },
  maintenance: {
    name: 'AMC & Maintenance',
    desc: '24/7 emergency support and annual maintenance contracts for all MEP systems.',
    details: 'Keep your MEP systems performing at peak efficiency with our comprehensive Annual Maintenance Contracts. Our 24/7 response team ensures minimal downtime and extends equipment lifespan.',
    scope: ['Annual Maintenance Contracts (AMC)', '24/7 Emergency Response', 'Preventive Maintenance Programs', 'Corrective Maintenance', 'System Upgrades & Retrofits', 'Spare Parts Supply', 'Compliance Testing & Certification', 'Energy Audits'],
  },
};

export function generateStaticParams() {
  return Object.keys(SERVICE_DATA).map((slug) => ({ slug }));
}

export function generateMetadata({ params }) {
  const service = SERVICE_DATA[params.slug];
  return {
    title: service?.name || 'Service',
    description: service?.desc,
  };
}

export default function ServiceDetailPage({ params }) {
  const service = SERVICE_DATA[params.slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-brand-subtext">Service not found.</p>
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

      <section className="section-padding bg-brand-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <SectionLabel variant="red" className="mb-4">Overview</SectionLabel>
              <h2 className="heading-md text-brand-text mb-6">{service.name}</h2>
              <p className="text-brand-subtext leading-relaxed mb-8 text-base">{service.details}</p>

              <h3 className="text-brand-text font-semibold text-lg mb-4">Scope of Work</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-brand-subtext text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar CTA */}
            <div className="space-y-4">
              <div className="card-dark p-6">
                <h3 className="text-brand-text font-semibold mb-3">Get a Quote</h3>
                <p className="text-brand-subtext text-sm mb-4">Contact our engineering team for a detailed proposal tailored to your project.</p>
                <Link href="/contact" className="btn-primary w-full justify-center">
                  Request Quote
                </Link>
              </div>
              <div className="card-dark p-6">
                <h3 className="text-brand-text font-semibold mb-3">Need Emergency Support?</h3>
                <p className="text-brand-subtext text-sm mb-4">24/7 emergency maintenance response across Qatar.</p>
                <a href="tel:+97444445555" className="btn-secondary w-full justify-center">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
