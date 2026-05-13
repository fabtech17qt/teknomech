import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail } from 'lucide-react';
import QuickContactForm from '@/components/shared/QuickContactForm';

export default function ContactBannerSection() {
  const t    = useTranslations('home.contactBanner');
  const tNav = useTranslations('nav');

  return (
    <section className="bg-brand-steel">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Left — contact info */}
          <div>
            <div className="w-8 h-0.5 bg-brand-blue rounded-full mb-5" />
            <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-3 leading-tight">
              {t('heading')}
            </h2>
            <p className="text-white/60 text-base mb-8 leading-relaxed max-w-md">
              Reach out and our team will respond within one business day.
            </p>

            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={17} className="text-brand-blue" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Address</p>
                  <p className="text-white text-sm">{t('address')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={17} className="text-brand-blue" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Phone</p>
                  <a href={`tel:${t('phone')}`} className="text-white text-sm hover:text-brand-blue transition-colors" dir="ltr">
                    {t('phone')}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail size={17} className="text-brand-blue" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Email</p>
                  <a href={`mailto:${tNav('email')}`} className="text-white text-sm hover:text-brand-blue transition-colors">
                    {tNav('email')}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Right — quick form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h3 className="text-white font-semibold text-lg mb-5">Send a Quick Message</h3>
            <QuickContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
