'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

const NAV_LINKS = [
  { href: '/',         key: 'home' },
  { href: '/about',    key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/products', key: 'products' },
  { href: '/projects', key: 'projects' },
  { href: '/blog',     key: 'blog' },
  { href: '/contact',  key: 'contact' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Top utility bar — brand-blue */}
      <div className="bg-brand-blue hidden md:block">
        <div className={cn('container-max flex items-center justify-between py-2 text-xs text-white/90', isRTL && 'flex-row-reverse')}>
          <div className={cn('flex items-center gap-5', isRTL && 'flex-row-reverse')}>
            <a href={`tel:${t('phone')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={11} />
              <span dir="ltr">{t('phone')}</span>
            </a>
            <a href={`mailto:${t('email')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={11} />
              <span>{t('email')}</span>
            </a>
            <a
              href="https://wa.me/97444445555"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <FaWhatsapp size={11} />
              <span>WhatsApp</span>
            </a>
          </div>
          <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
            <a href="#" aria-label="LinkedIn"  className="hover:text-white transition-colors"><FaLinkedin size={13} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><FaInstagram size={13} /></a>
            <a href="#" aria-label="Facebook"  className="hover:text-white transition-colors"><FaFacebook size={13} /></a>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={cn(
          'bg-white transition-all duration-300',
          scrolled ? 'shadow-md' : 'shadow-sm'
        )}
      >
        <div className={cn('container-max flex items-center justify-between h-16 md:h-20', isRTL && 'flex-row-reverse')}>
          {/* Logo */}
          <Link href="/" className={cn('flex items-center gap-2.5 shrink-0', isRTL && 'flex-row-reverse')}>
            <div className="w-9 h-9 rounded-xl bg-brand-blue flex items-center justify-center">
              <span className="text-white font-black text-sm">T</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-brand-text font-bold text-base tracking-tight">TEKNOMECH</span>
              <span className="text-brand-sub text-[9px] tracking-widest uppercase">MEP & Fire Protection</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className={cn('hidden lg:flex items-center gap-1', isRTL && 'flex-row-reverse')}>
            {NAV_LINKS.map(({ href, key }) => {
              const isActive = pathname === href;
              return (
                <li key={key}>
                  <Link
                    href={href}
                    className={cn(
                      'px-3 py-2 text-sm rounded-md transition-all duration-200',
                      isActive
                        ? 'text-brand-blue font-semibold'
                        : 'text-brand-text hover:text-brand-blue font-medium'
                    )}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: language switcher + CTA + mobile toggle */}
          <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <Link
              href="/contact"
              className="hidden lg:inline-flex bg-brand-red text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              {t('getQuote')}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-brand-text hover:bg-brand-light transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-down menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 bg-white z-40 transition-all duration-300 overflow-y-auto shadow-xl',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ top: '64px', maxHeight: 'calc(100vh - 64px)' }}
      >
        <div className="container-max py-6 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                'py-3.5 px-4 text-base font-medium rounded-xl transition-all duration-200 min-h-[44px] flex items-center',
                pathname === href
                  ? 'text-brand-blue bg-brand-blue-light font-semibold'
                  : 'text-brand-text hover:bg-brand-light'
              )}
            >
              {t(key)}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-brand-red text-white rounded-full py-3.5 px-6 text-center font-semibold mt-3 hover:bg-red-700 transition-colors min-h-[44px] flex items-center justify-center"
          >
            {t('getQuote')}
          </Link>
          <div className={cn('flex items-center gap-4 mt-5 pt-5 border-t border-brand-border', isRTL && 'flex-row-reverse')}>
            <LanguageSwitcher />
            <div className="flex items-center gap-4 ms-auto">
              <a href="#" className="text-brand-sub hover:text-brand-blue"><FaLinkedin size={20} /></a>
              <a href="#" className="text-brand-sub hover:text-brand-blue"><FaInstagram size={20} /></a>
              <a href="#" className="text-brand-sub hover:text-brand-blue"><FaFacebook size={20} /></a>
              <a href="https://wa.me/97444445555" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-700"><FaWhatsapp size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
