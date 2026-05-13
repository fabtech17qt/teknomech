import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Phone } from 'lucide-react';

export default function CTASection() {
  const t = useTranslations('home.cta');

  return (
    <section className="bg-brand-red relative overflow-hidden">
      {/* Diagonal stripe */}
      <div className="absolute inset-0 bg-diagonal-stripe pointer-events-none" />

      {/* Decorative hexagon watermark — right side */}
      <svg
        className="absolute right-0 top-0 h-full w-auto opacity-[0.07] pointer-events-none"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
      >
        <polygon points="100,10 190,55 190,145 100,190 10,145 10,55" stroke="white" strokeWidth="1" fill="none" />
        <polygon points="100,30 170,67 170,133 100,170 30,133 30,67" stroke="white" strokeWidth="1" fill="none" />
        <polygon points="100,50 150,79 150,121 100,150 50,121 50,79" stroke="white" strokeWidth="1" fill="none" />
      </svg>

      <div className="container-max py-20 relative z-10 text-center">
        <AnimateIn variant="fadeIn">
          <div className="max-w-2xl mx-auto">
            <div className="w-12 h-0.5 bg-white/40 rounded-full mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              {t('heading')}
            </h2>
            <p className="text-white/80 text-lg mb-10 leading-relaxed">{t('subtext')}</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-brand-red rounded-full px-8 py-3.5 font-semibold hover:bg-brand-red-light transition-colors inline-flex items-center gap-2 text-base w-full sm:w-auto justify-center"
              >
                {t('btn1')}
              </Link>
              <a
                href="tel:+97444445555"
                className="border-2 border-white text-white rounded-full px-8 py-3.5 font-semibold hover:bg-white hover:text-brand-red transition-all inline-flex items-center gap-2 text-base w-full sm:w-auto justify-center"
              >
                <Phone size={16} />
                {t('btn2')}
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
