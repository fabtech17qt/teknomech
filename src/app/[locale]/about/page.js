import Image from 'next/image';
import { useTranslations } from 'next-intl';
import PageHero from '@/components/shared/PageHero';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { CheckCircle, BadgeCheck } from 'lucide-react';

export const metadata = {
  title: 'About Us | Teknomech',
  description:
    "Learn about Teknomech MEP — Qatar's dedicated MEP and Fire Protection contractor committed to engineering excellence and quality service.",
};

const VALUES = [
  { title: 'Quality First',  desc: 'Every installation meets or exceeds international engineering standards. We never compromise on quality.' },
  { title: 'Safety Always',  desc: 'Safety is embedded in every process — from design review to final commissioning and beyond.' },
  { title: 'Client Focus',   desc: "We listen, adapt, and deliver solutions tailored to each client's unique requirements and budget." },
];

const CERTS = ['UPDA Compliant', 'QCDD Compliant', 'ISO 9001:2015', 'BNI Member', 'ASHRAE Compliant', 'FIDIC Standard'];

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      <PageHero
        title={t('heading')}
        subtitle="A fresh, quality-driven MEP and Fire Protection contractor built for Qatar's growing infrastructure demands."
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
                Teknomech MEP is a fresh, dynamic MEP and Fire Protection contracting company established in Doha, Qatar in 2026.
                We were founded with a clear mission: to bring a new standard of quality, transparency and reliability to
                Qatars growing construction and infrastructure market.
              </p>
              <p className="text-brand-sub leading-relaxed mb-4">
                We specialise in delivering comprehensive MEP (Mechanical, Electrical, and Plumbing) solutions alongside
                professional Fire Protection systems — covering commercial, industrial, healthcare and government projects
                across the region.
              </p>
              <p className="text-brand-sub leading-relaxed mb-8">
                Our team of experienced engineers brings sharp technical knowledge and a modern, client-first approach
                to every engagement. Every system we design and install is built to perform reliably and in full
                compliance with Qatars applicable regulations and international standards.
              </p>
              <div className="space-y-3">
                {['Regulatory compliant operations', 'ISO 9001:2015 quality management', 'In-house design and engineering team', 'Multilingual Arabic & English support'].map((pt) => (
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
                {/* Orange accent */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-brand-orange shape-asym-1 z-0" />
              </div>
            </AnimateIn>
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
