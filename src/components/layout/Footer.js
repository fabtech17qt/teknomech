'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const QUICK_LINKS = [
  { href: '/',         key: 'home' },
  { href: '/about',    key: 'about' },
  // { href: '/projects', key: 'projects' },
  { href: '/blog',     key: 'blog' },
  { href: '/contact',  key: 'contact' },
];

const SERVICES = ['fire', 'hvac', 'electrical', 'plumbing', 'lv', 'maintenance'];

export default function Footer() {
  const t        = useTranslations('footer');
  const tNav     = useTranslations('nav');
  const tSvc     = useTranslations('services');
  const locale   = useLocale();
  const isRTL    = locale === 'ar';

  return (
    <footer className="bg-brand-steel">
      {/* Main grid */}
      <div className="container-max py-16">
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10', isRTL && 'text-right')}>
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <img
                src="/images/og-image.jpg"
                alt="Teknomech MEP"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">{t('tagline')}</p>
            <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse justify-end')}>
              <a href="#" aria-label="LinkedIn"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-orange transition-all duration-200">
                <FaLinkedin size={14} />
              </a>
              <a href="#" aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-orange transition-all duration-200">
                <FaInstagram size={14} />
              </a>
              <a href="#" aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-orange transition-all duration-200">
                <FaFacebook size={14} />
              </a>
              <a
                href="https://wa.me/97430443229"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-lg bg-green-800/40 flex items-center justify-center text-green-400 hover:bg-green-700/50 transition-all duration-200"
              >
                <FaWhatsapp size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className={cn(
                      'text-white/60 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2',
                      isRTL && 'flex-row-reverse'
                    )}
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-orange inline-block shrink-0" />
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('servicesLabel')}
            </h4>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link
                    href={`/services/${s}`}
                    className={cn(
                      'text-white/60 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2',
                      isRTL && 'flex-row-reverse'
                    )}
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-orange inline-block shrink-0" />
                    {tSvc(`${s}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('contactInfo')}
            </h4>
            <ul className="space-y-3.5">
              <li className={cn('flex gap-2.5 text-white/60 text-sm', isRTL && 'flex-row-reverse')}>
                <MapPin size={15} className="text-brand-orange shrink-0 mt-0.5" />
                <span>{t('address')}</span>
              </li>
              <li>
                <a
                  href={`tel:${tNav('phone')}`}
                  className={cn('flex gap-2.5 text-white/60 hover:text-white text-sm transition-colors', isRTL && 'flex-row-reverse')}
                >
                  <Phone size={15} className="text-brand-orange shrink-0 mt-0.5" />
                  <span dir="ltr">{tNav('phone')}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${tNav('email')}`}
                  className={cn('flex gap-2.5 text-white/60 hover:text-white text-sm transition-colors', isRTL && 'flex-row-reverse')}
                >
                  <Mail size={15} className="text-brand-orange shrink-0 mt-0.5" />
                  <span>{tNav('email')}</span>
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/97430443229"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-800/30 border border-green-700/30 text-green-400 hover:bg-green-700/40 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <FaWhatsapp size={14} />
                  {t('whatsapp')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-black/20 border-t border-white/5">
        <div className={cn(
          'container-max py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-white/40 text-xs',
          isRTL && 'flex-row-reverse'
        )}>
          <span>{t('copyright')}</span>
          <div className={cn('flex items-center gap-4', isRTL && 'flex-row-reverse')}>
            <Link href="/privacy" className="hover:text-white/70 transition-colors">{t('privacy')}</Link>
            <span>Designed by Studio</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
