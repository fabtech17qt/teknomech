import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import SectionLabel from '@/components/shared/SectionLabel';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  const t = useTranslations('home.about');

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left — cutout image on blue-light blob */}
          <AnimateIn variant="fadeLeft">
            <div className="relative rounded-3xl bg-brand-blue-light overflow-hidden min-h-[420px]">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-brand-blue/10 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-blue/5 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />

              {/* Placeholder — replace with:
                  <Image src="/images/about-cutout.png" alt="Engineer" fill
                         className="object-contain object-bottom" />
              */}
              <div className="absolute inset-0 flex items-end justify-center pb-6">
                <div className="text-center text-brand-blue/30">
                  <div className="text-xs font-mono mb-1">about-cutout.png</div>
                  <div className="text-[10px]">Download from Envato Elements</div>
                </div>
              </div>

              {/* Floating stat — projects */}
              <div className="absolute bottom-6 -end-4 bg-white rounded-2xl shadow-xl px-5 py-4 border border-brand-border">
                <p className="text-2xl font-black text-brand-text">500+</p>
                <p className="text-brand-sub text-xs uppercase tracking-wider">Projects Delivered</p>
              </div>

              {/* Floating stat — years */}
              <div className="absolute top-6 -start-4 bg-brand-blue text-white rounded-2xl shadow-xl px-5 py-4">
                <p className="text-2xl font-black">15+</p>
                <p className="text-white/70 text-xs uppercase tracking-wider">Years in Qatar</p>
              </div>
            </div>
          </AnimateIn>

          {/* Right — text */}
          <AnimateIn variant="fadeRight">
            <SectionLabel className="mb-4">{t('label')}</SectionLabel>
            <h2 className="heading-lg mb-6 max-w-lg">{t('heading')}</h2>
            <p className="text-brand-sub leading-relaxed mb-4">{t('p1')}</p>
            <p className="text-brand-sub leading-relaxed mb-8">{t('p2')}</p>

            {/* Inline stats */}
            <div className="flex items-center gap-8 mb-8 p-5 bg-brand-light rounded-2xl w-fit border border-brand-border">
              <div className="text-center">
                <p className="text-brand-blue font-black text-2xl">500+</p>
                <p className="text-brand-sub text-xs uppercase tracking-wider">{t('stat1Label')}</p>
              </div>
              <div className="w-px h-10 bg-brand-border" />
              <div className="text-center">
                <p className="text-brand-blue font-black text-2xl">15+</p>
                <p className="text-brand-sub text-xs uppercase tracking-wider">{t('stat2Label')}</p>
              </div>
            </div>

            <Link href="/about" className="btn-primary">
              {t('cta')} <ArrowRight size={16} />
            </Link>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
