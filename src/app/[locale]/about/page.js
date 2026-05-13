import Image from 'next/image';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import StatCounter from '@/components/shared/StatCounter';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'About Us | Teknomech',
  description:
    "Learn about Teknomech MEP — Qatar's trusted MEP and Fire Protection contractor with 15+ years of engineering excellence.",
};

const STATS = [
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 15,  suffix: '+', label: 'Years Experience' },
  { value: 120, suffix: '+', label: 'Certified Engineers' },
  { value: 98,  suffix: '%', label: 'Client Satisfaction' },
];

const VALUES = [
  { title: 'Quality First',  desc: 'Every installation meets or exceeds international engineering standards. We never compromise on quality.' },
  { title: 'Safety Always',  desc: 'Safety is embedded in every process — from design review to final commissioning and beyond.' },
  { title: 'Client Focus',   desc: "We listen, adapt, and deliver solutions tailored to each client's unique requirements and budget." },
];

const CERTS = ['UPDA Approved', 'QCDD Compliant', 'ISO 9001:2015', 'NFPA Member', 'ASHRAE Compliant', 'FIDIC Standard'];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      <PageHero
        title={t('heading')}
        subtitle="15+ years of engineering excellence across Qatar's most ambitious projects."
        breadcrumbs={[{ label: t('pageTitle') }]}
      />

      {/* Story section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <AnimateIn variant="fadeLeft">
              <SectionLabel className="mb-4">{t('label')}</SectionLabel>
              <h2 className="heading-lg mb-6">Built on Engineering Excellence</h2>
              <p className="text-brand-sub leading-relaxed mb-4">
                Teknomech MEP has been a cornerstone of Qatar's construction and infrastructure landscape since 2008.
                We specialize in delivering comprehensive MEP (Mechanical, Electrical, and Plumbing) solutions alongside
                world-class Fire Protection systems.
              </p>
              <p className="text-brand-sub leading-relaxed mb-4">
                Our team of UPDA-certified engineers and technicians brings decades of combined experience across
                commercial towers, industrial facilities, healthcare, hospitality, and government projects.
              </p>
              <p className="text-brand-sub leading-relaxed mb-8">
                With full compliance to Qatar Civil Defence Department (QCDD) requirements and international standards
                including NFPA and ASHRAE, every system we design and install is built to perform reliably for decades.
              </p>
              <div className="space-y-2.5">
                {['UPDA & QCDD licensed contractor', 'ISO 9001:2015 quality management', 'In-house design and engineering team', 'Multilingual Arabic & English support'].map((pt) => (
                  <div key={pt} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-brand-blue shrink-0" />
                    <span className="text-brand-text text-sm">{pt}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeRight">
              <div className="relative rounded-3xl overflow-hidden h-[440px] bg-brand-blue-light shadow-xl">
                <Image
                  src="/images/fire-team.jpg"
                  alt="Teknomech engineering team"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-steel/50 to-transparent" />
                <div className="absolute bottom-5 inset-x-5 bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                  <p className="text-brand-blue text-[10px] font-semibold uppercase tracking-widest mb-2">Our Team</p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {STATS.slice(0, 3).map((s) => (
                      <div key={s.label}>
                        <div className="text-brand-blue font-extrabold text-xl">{s.value}{s.suffix}</div>
                        <div className="text-brand-sub text-[10px] leading-tight">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-blue py-16">
        <div className="container-max">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, i) => (
              <AnimateIn key={stat.label} variant="scaleUp" delay={i * 0.08}>
                <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} dark={true} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-brand-light">
        <div className="container-max">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4 justify-center">Our Values</SectionLabel>
            <h2 className="heading-lg text-brand-text text-center mb-12">What Drives Us Every Day</h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v, i) => (
              <AnimateIn key={v.title} variant="fadeUp" delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-7 shadow-md border border-brand-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-1 bg-brand-blue rounded-full mb-5" />
                  <h3 className="text-brand-text font-bold text-xl mb-3">{v.title}</h3>
                  <p className="text-brand-sub text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding bg-brand-steel">
        <div className="container-max text-center">
          <AnimateIn variant="fadeUp">
            <SectionLabel className="mb-4 justify-center" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <span className="text-white/60">Accreditations</span>
            </SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-10">Certified & Compliant</h2>
          </AnimateIn>
          <div className="flex flex-wrap justify-center gap-3">
            {CERTS.map((cert, i) => (
              <AnimateIn key={cert} variant="scaleUp" delay={i * 0.06}>
                <span className="bg-white/10 border border-white/20 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors">
                  {cert}
                </span>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
