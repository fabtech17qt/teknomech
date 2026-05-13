import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AnimateIn } from '@/components/ui/AnimateIn';
import { Phone, ArrowRight } from 'lucide-react';

export default function CTASection() {
  const t = useTranslations('home.cta');

  return (
    <section className="relative overflow-hidden bg-brand-steel py-24 md:py-32">
      {/* Background photo with overlay */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1548838670-cb67b43a6adb?w=1600&h=700&fit=crop&q=75"
          alt="Engineering team"
          fill
          className="object-cover opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-steel/95 via-brand-steel/80 to-brand-steel/60" />
      </div>

      {/* Diagonal stripes */}
      <div className="absolute inset-0 bg-diagonal-stripe pointer-events-none" />

      <div className="container-max relative z-10 text-center">
        <AnimateIn variant="fadeIn">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold rounded-full px-4 py-1.5 mb-6 uppercase tracking-widest">
              Ready to Start?
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
              {t('heading')}
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              {t('subtext')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-brand-orange text-white rounded-full px-9 py-4 font-semibold hover:bg-orange-700 transition-all duration-300 text-base w-full sm:w-auto group shadow-lg shadow-brand-orange/30"
              >
                {t('btn1')}
                <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+97444445555"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white rounded-full px-9 py-4 font-semibold hover:bg-white hover:text-brand-steel transition-all duration-300 text-base w-full sm:w-auto"
              >
                <Phone size={17} />
                {t('btn2')}
              </a>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
