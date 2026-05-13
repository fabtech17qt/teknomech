'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

const NAV_LINKS = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/products', key: 'products' },
  { href: '/projects', key: 'projects' },
  { href: '/blog', key: 'blog' },
  { href: '/contact', key: 'contact' },
];

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Top utility bar */}
      <div className="bg-brand-steel border-b border-white/5">
        <div className="container-max flex items-center justify-between py-2 text-xs text-brand-subtext">
          <div className={cn('flex items-center gap-4', isRTL && 'flex-row-reverse')}>
            <a href={`tel:${t('phone')}`} className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <Phone size={12} />
              <span dir="ltr">{t('phone')}</span>
            </a>
            <a href={`mailto:${t('email')}`} className="flex items-center gap-1.5 hover:text-brand-gold transition-colors">
              <Mail size={12} />
              <span>{t('email')}</span>
            </a>
            <a
              href="https://wa.me/97444445555"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-green-400 hover:text-green-300 transition-colors"
            >
              <FaWhatsapp size={12} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <div className="hidden md:flex items-center gap-3 ps-3 border-s border-white/10">
              <a href="#" aria-label="LinkedIn" className="hover:text-brand-gold transition-colors"><FaLinkedin size={13} /></a>
              <a href="#" aria-label="Instagram" className="hover:text-brand-gold transition-colors"><FaInstagram size={13} /></a>
              <a href="#" aria-label="Facebook" className="hover:text-brand-gold transition-colors"><FaFacebook size={13} /></a>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={cn(
          'transition-all duration-300',
          scrolled
            ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/5'
            : 'bg-transparent'
        )}
      >
        <div className="container-max flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-brand-red flex items-center justify-center">
              <span className="text-white font-black text-sm">T</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-brand-text font-bold text-base tracking-tight">TEKNOMECH</span>
              <span className="text-brand-subtext text-[9px] tracking-widest uppercase">MEP & Fire Protection</span>
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
                      'px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 relative',
                      isActive
                        ? 'text-brand-red after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand-red after:rounded-full'
                        : 'text-brand-subtext hover:text-brand-text'
                    )}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden lg:inline-flex btn-primary text-sm py-2.5 px-5">
              {t('getQuote')}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg text-brand-text hover:bg-brand-steel transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 bg-brand-dark/98 backdrop-blur-sm z-40 transition-all duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ top: '88px' }}
      >
        <div className="container-max py-8 flex flex-col gap-2">
          {NAV_LINKS.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                'py-3.5 px-4 text-lg font-medium rounded-lg transition-all duration-200 border border-transparent',
                pathname === href
                  ? 'text-brand-red bg-brand-red/10 border-brand-red/20'
                  : 'text-brand-text hover:bg-brand-steel'
              )}
            >
              {t(key)}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary mt-4 justify-center">
            {t('getQuote')}
          </Link>
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
            <a href="#" className="text-brand-subtext hover:text-brand-gold"><FaLinkedin size={20} /></a>
            <a href="#" className="text-brand-subtext hover:text-brand-gold"><FaInstagram size={20} /></a>
            <a href="#" className="text-brand-subtext hover:text-brand-gold"><FaFacebook size={20} /></a>
            <a href="https://wa.me/97444445555" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300"><FaWhatsapp size={20} /></a>
          </div>
        </div>
      </div>
    </header>
  );
}
