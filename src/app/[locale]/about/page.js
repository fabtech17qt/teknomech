import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import StatCounter from '@/components/shared/StatCounter';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Teknomech MEP — Qatar\'s trusted MEP and Fire Protection contractor with 15+ years of engineering excellence.',
};

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      <PageHero
        title={t('heading')}
        subtitle="15+ years of engineering excellence across Qatar's most ambitious projects."
        breadcrumbs={[{ label: t('pageTitle') }]}
      />

      {/* Mission & Vision */}
      <section className="section-padding bg-brand-dark">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel variant="red" className="mb-4">{t('label')}</SectionLabel>
              <h2 className="heading-lg text-brand-text mb-6">
                Built on <span className="text-brand-red">Engineering</span> Excellence
              </h2>
              <p className="text-brand-subtext leading-relaxed mb-4">
                Teknomech MEP has been a cornerstone of Qatar's construction and infrastructure landscape since 2008.
                We specialize in delivering comprehensive MEP (Mechanical, Electrical, and Plumbing) solutions alongside
                world-class Fire Protection systems.
              </p>
              <p className="text-brand-subtext leading-relaxed mb-4">
                Our team of UPDA-certified engineers and technicians brings decades of combined experience across
                commercial towers, industrial facilities, healthcare, hospitality, and government projects.
              </p>
              <p className="text-brand-subtext leading-relaxed">
                With full compliance to Qatar Civil Defence Department (QCDD) requirements and international standards
                including NFPA and ASHRAE, every system we design and install is built to perform reliably for decades.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: 500, suffix: '+', label: 'Projects Delivered' },
                { value: 15, suffix: '+', label: 'Years Experience' },
                { value: 120, suffix: '+', label: 'Certified Engineers' },
                { value: 98, suffix: '%', label: 'Client Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="card-dark p-6 text-center">
                  <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-brand-light">
        <div className="container-max">
          <SectionLabel variant="red" className="mb-4 justify-center">Our Values</SectionLabel>
          <h2 className="heading-lg text-brand-dark text-center mb-12">
            What Drives Us Every Day
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Quality First', desc: 'Every installation meets or exceeds international engineering standards. We never compromise on quality.' },
              { title: 'Safety Always', desc: 'Safety is embedded in every process — from design review to final commissioning and beyond.' },
              { title: 'Client Focus', desc: 'We listen, adapt, and deliver solutions tailored to each client\'s unique requirements and budget.' },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="w-10 h-1 bg-brand-red rounded-full mb-4" />
                <h3 className="text-brand-dark font-bold text-xl mb-3">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-brand-dark">
        <div className="container-max text-center">
          <SectionLabel variant="gold" className="mb-4 justify-center">Accreditations</SectionLabel>
          <h2 className="heading-lg text-brand-text mb-12">
            Certified & Compliant
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['UPDA Approved', 'QCDD Compliant', 'ISO 9001:2015', 'NFPA Member', 'ASHRAE Compliant', 'FIDIC Standard'].map((cert) => (
              <span key={cert} className="bg-brand-steel border border-brand-gold/20 text-brand-gold px-5 py-2.5 rounded-full text-sm font-semibold">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
