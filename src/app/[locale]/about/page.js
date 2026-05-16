import Image from 'next/image';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import StatCounter from '@/components/shared/StatCounter';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { CheckCircle, BadgeCheck } from 'lucide-react';

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
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimateIn variant="fadeLeft">
              <SectionLabel className="mb-4">{t('label')}</SectionLabel>
              <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text mb-6">
                Built on Engineering<br />
                <span className="text-brand-orange">Excellence</span>
              </h2>
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
              <div className="space-y-3">
                {['UPDA & QCDD licensed contractor', 'ISO 9001:2015 quality management', 'In-house design and engineering team', 'Multilingual Arabic & English support'].map((pt) => (
                  <div key={pt} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-orange-soft flex items-center justify-center shrink-0">
                      <CheckCircle size={12} className="text-brand-orange" />
                    </div>
                    <span className="text-brand-text text-sm">{pt}</span>
                  </div>
                ))}
              </div>
            </AnimateIn>

            <AnimateIn variant="fadeRight">
              <div className="relative">
                {/* Blob behind */}
                <div className="absolute inset-6 shape-asym-2 bg-brand-blue-soft z-0" />
                {/* Image container */}
                <div className="relative shape-asym-1 overflow-hidden min-h-[480px] bg-brand-blue-soft z-10">
                  <div className="absolute inset-0 bg-dots z-10" />
                  <Image
                    src="/images/fire-team.jpg"
                    alt="Teknomech engineering team"
                    fill
                    className="object-cover object-top"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-soft/60 via-transparent to-transparent z-10 pointer-events-none" />
                </div>
                {/* Floating stat badge */}
                <div className="absolute top-6 -left-4 bg-white rounded-2xl shadow-xl border border-brand-border px-5 py-4 z-20">
                  <p className="text-brand-orange font-black text-2xl leading-none">500+</p>
                  <p className="text-brand-sub text-xs mt-1">Projects Delivered</p>
                </div>
                {/* Orange accent */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-brand-orange shape-asym-1 z-0" />
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-brand-blue-deep py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />
        <div className="container-max relative z-10">
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
      <section className="py-24 bg-brand-blue-soft">
        <div className="container-max">
          <AnimateIn variant="fadeUp" className="text-center mb-14">
            <SectionLabel className="mb-4 justify-center">Our Values</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text">
              What Drives Us <span className="text-brand-blue">Every Day</span>
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v, i) => (
              <AnimateIn key={v.title} variant="fadeUp" delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 border border-brand-border hover:border-brand-orange hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-10 h-1 bg-brand-orange rounded-full mb-6" />
                  <h3 className="text-brand-text font-black text-xl mb-3 group-hover:text-brand-orange transition-colors duration-300">{v.title}</h3>
                  <p className="text-brand-sub text-sm leading-relaxed">{v.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications — bright */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <AnimateIn variant="fadeUp" className="text-center mb-12">
            <SectionLabel className="mb-4 justify-center">Accreditations</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-black leading-[1.05] text-brand-text">
              Certified &amp; <span className="text-brand-blue">Compliant</span>
            </h2>
            <p className="text-brand-sub mt-4 max-w-xl mx-auto">
              Every project we undertake is backed by industry-recognised accreditations and authority approvals.
            </p>
          </AnimateIn>
          <div className="flex flex-wrap justify-center gap-4">
            {CERTS.map((cert, i) => (
              <AnimateIn key={cert} variant="scaleUp" delay={i * 0.06}>
                <div className="flex items-center gap-2 bg-brand-blue-soft border border-brand-blue/20 text-brand-blue px-6 py-3 rounded-full text-sm font-semibold hover:bg-brand-blue hover:text-white transition-all duration-300 cursor-default">
                  <BadgeCheck size={14} />
                  {cert}
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
