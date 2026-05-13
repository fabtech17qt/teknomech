'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { cn } from '@/lib/utils';

const QUICK_LINKS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
];

const SERVICES = [
  'fire', 'hvac', 'electrical', 'plumbing', 'lv', 'maintenance',
];

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tServices = useTranslations('services');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <footer className="bg-brand-dark border-t border-white/5">
      {/* Main grid */}
      <div className="container-max py-16">
        <div className={cn('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10', isRTL && 'text-right')}>
          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-red flex items-center justify-center shrink-0">
                <span className="text-white font-black">T</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-brand-text font-bold tracking-tight">TEKNOMECH</span>
                <span className="text-brand-subtext text-[9px] tracking-widest uppercase">MEP & Fire Protection</span>
              </div>
            </Link>
            <p className="text-brand-subtext text-sm leading-relaxed mb-5">
              {t('tagline')}
            </p>
            <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse justify-end')}>
              <a href="#" aria-label="LinkedIn" className="w-8 h-8 rounded-lg bg-brand-steel flex items-center justify-center text-brand-subtext hover:text-brand-gold hover:bg-brand-muted transition-all duration-200">
                <FaLinkedin size={14} />
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-lg bg-brand-steel flex items-center justify-center text-brand-subtext hover:text-brand-gold hover:bg-brand-muted transition-all duration-200">
                <FaInstagram size={14} />
              </a>
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-lg bg-brand-steel flex items-center justify-center text-brand-subtext hover:text-brand-gold hover:bg-brand-muted transition-all duration-200">
                <FaFacebook size={14} />
              </a>
              <a
                href="https://wa.me/97444445555"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-lg bg-green-900/30 flex items-center justify-center text-green-400 hover:bg-green-800/40 transition-all duration-200"
              >
                <FaWhatsapp size={14} />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-brand-text font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ href, key }) => (
                <li key={key}>
                  <Link
                    href={href}
                    className="text-brand-subtext hover:text-brand-gold text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-red inline-block shrink-0" />
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-brand-text font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('servicesLabel')}
            </h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link
                    href={`/services/${s}`}
                    className="text-brand-subtext hover:text-brand-gold text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-brand-red inline-block shrink-0" />
                    {tServices(`${s}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-brand-text font-semibold mb-4 text-sm uppercase tracking-wider">
              {t('contactInfo')}
            </h4>
            <ul className="space-y-3">
              <li className={cn('flex gap-2.5 text-brand-subtext text-sm', isRTL && 'flex-row-reverse')}>
                <MapPin size={15} className="text-brand-red shrink-0 mt-0.5" />
                <span>{t('address')}</span>
              </li>
              <li>
                <a
                  href={`tel:${tNav('phone')}`}
                  className={cn('flex gap-2.5 text-brand-subtext hover:text-brand-gold text-sm transition-colors', isRTL && 'flex-row-reverse')}
                >
                  <Phone size={15} className="text-brand-red shrink-0 mt-0.5" />
                  <span dir="ltr">{tNav('phone')}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${tNav('email')}`}
                  className={cn('flex gap-2.5 text-brand-subtext hover:text-brand-gold text-sm transition-colors', isRTL && 'flex-row-reverse')}
                >
                  <Mail size={15} className="text-brand-red shrink-0 mt-0.5" />
                  <span>{tNav('email')}</span>
                </a>
              </li>
              <li className="pt-1">
                <a
                  href="https://wa.me/97444445555"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-900/20 border border-green-800/30 text-green-400 hover:bg-green-800/30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                >
                  <FaWhatsapp size={15} />
                  {t('whatsapp')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className={cn('container-max py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-brand-subtext text-xs', isRTL && 'flex-row-reverse')}>
          <span>{t('copyright')}</span>
          <Link href="/privacy" className="hover:text-brand-gold transition-colors">
            {t('privacy')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
