import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone } from 'lucide-react';

export default function CTASection() {
  const t = useTranslations('home.cta');

  return (
    <section className="bg-brand-dark border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern pointer-events-none" />
      <div className="absolute top-0 start-0 w-1/2 h-full bg-brand-red/3 pointer-events-none" />

      <div className="container-max py-20 relative z-10 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="w-16 h-1 bg-brand-red rounded-full mx-auto mb-6" />
          <h2 className="heading-lg text-brand-text mb-4">{t('heading')}</h2>
          <p className="text-brand-subtext text-lg mb-10 leading-relaxed">{t('subtext')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base px-8 py-3.5">
              {t('btn1')}
            </Link>
            <a href="tel:+97444445555" className="btn-secondary text-base px-8 py-3.5">
              <Phone size={16} />
              {t('btn2')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
