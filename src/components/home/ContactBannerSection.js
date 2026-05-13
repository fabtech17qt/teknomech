import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function ContactBannerSection() {
  const t = useTranslations('home.contactBanner');

  return (
    <section className="bg-brand-steel border-t border-white/5">
      <div className="container-max py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          {/* Heading */}
          <div className="lg:col-span-1">
            <div className="w-10 h-1 bg-brand-red rounded-full mb-4" />
            <h2 className="text-brand-text font-bold text-2xl leading-tight">{t('heading')}</h2>
          </div>

          {/* Contact details */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-brand-red shrink-0 mt-0.5" />
              <div>
                <p className="text-brand-subtext text-xs mb-0.5 uppercase tracking-wider">Address</p>
                <p className="text-brand-text text-sm">{t('address')}</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Phone size={16} className="text-brand-red shrink-0 mt-0.5" />
              <div>
                <p className="text-brand-subtext text-xs mb-0.5 uppercase tracking-wider">Phone</p>
                <a href={`tel:${t('phone')}`} className="text-brand-text text-sm hover:text-brand-gold transition-colors" dir="ltr">
                  {t('phone')}
                </a>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Mail size={16} className="text-brand-red shrink-0 mt-0.5" />
              <div>
                <p className="text-brand-subtext text-xs mb-0.5 uppercase tracking-wider">Email</p>
                <a href={`mailto:${t('email')}`} className="text-brand-text text-sm hover:text-brand-gold transition-colors">
                  {t('email')}
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:text-end">
            <Link href="/contact" className="btn-primary">
              {t('cta')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
