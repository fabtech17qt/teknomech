'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { Flame, Wind, Zap, Droplets, Network, Wrench } from 'lucide-react';
import { FaWhatsapp, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';

const SERVICES_NAV = [
  { slug: 'fire-protection', key: 'fire',        Icon: Flame,    color: 'text-red-500',    bg: 'bg-red-50' },
  { slug: 'hvac',            key: 'hvac',         Icon: Wind,     color: 'text-brand-blue', bg: 'bg-brand-blue-light' },
  { slug: 'electrical',      key: 'electrical',   Icon: Zap,      color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { slug: 'plumbing',        key: 'plumbing',     Icon: Droplets, color: 'text-cyan-600',   bg: 'bg-cyan-50' },
  { slug: 'lv-systems',      key: 'lv',           Icon: Network,  color: 'text-purple-600', bg: 'bg-purple-50' },
  { slug: 'maintenance',     key: 'maintenance',  Icon: Wrench,   color: 'text-gray-600',   bg: 'bg-gray-50' },
];

const PRODUCT_CATS = [
  { label: 'All Products',    href: '/products' },
  { label: 'Fire Protection', href: '/products?cat=fire-protection' },
  { label: 'HVAC',            href: '/products?cat=hvac' },
  { label: 'Electrical',      href: '/products?cat=electrical' },
  { label: 'Plumbing',        href: '/products?cat=plumbing' },
  { label: 'LV Systems',      href: '/products?cat=lv-systems' },
];

const SIMPLE_LINKS = [
  { href: '/',         key: 'home' },
  { href: '/about',    key: 'about' },
  { href: '/projects', key: 'projects' },
  { href: '/blog',     key: 'blog' },
  { href: '/contact',  key: 'contact' },
];

export default function Navbar() {
  const t    = useTranslations('nav');
  const tSvc = useTranslations('services');
  const locale   = useLocale();
  const pathname = usePathname();
  const isRTL    = locale === 'ar';

  const [scrolled,       setScrolled]       = useState(false);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [openMenu,       setOpenMenu]       = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const closeTimeout = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function menuEnter(name) {
    clearTimeout(closeTimeout.current);
    setOpenMenu(name);
  }
  function menuLeave() {
    closeTimeout.current = setTimeout(() => setOpenMenu(null), 180);
  }

  const linkCls = (href) => cn(
    'px-3 py-2 text-sm rounded-md transition-all duration-200 font-medium',
    pathname === href ? 'text-brand-blue font-semibold' : 'text-brand-text hover:text-brand-blue'
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* ── Top utility bar ── */}
      <div className="bg-brand-blue hidden md:block">
        <div className={cn('container-max flex items-center justify-between py-2 text-xs text-white/90', isRTL && 'flex-row-reverse')}>
          <div className={cn('flex items-center gap-5', isRTL && 'flex-row-reverse')}>
            <a href={`tel:${t('phone')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={11} /><span dir="ltr">{t('phone')}</span>
            </a>
            <a href={`mailto:${t('email')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={11} /><span>{t('email')}</span>
            </a>
            <a href="https://wa.me/97430443229" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 hover:text-white transition-colors">
              <FaWhatsapp size={11} /><span>WhatsApp</span>
            </a>
          </div>
          <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
            <a href="#" aria-label="LinkedIn"  className="hover:text-white transition-colors"><FaLinkedin  size={13} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors"><FaInstagram size={13} /></a>
            <a href="#" aria-label="Facebook"  className="hover:text-white transition-colors"><FaFacebook  size={13} /></a>
          </div>
        </div>
      </div>

      {/* ── Main nav bar ── */}
      <nav className={cn('bg-white transition-all duration-300', scrolled ? 'shadow-md' : 'shadow-sm')}>
        <div className={cn('container-max flex items-center justify-between h-16 md:h-20', isRTL && 'flex-row-reverse')}>

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <img
              src="/images/og-image.png"
              alt="Teknomech MEP"
              className="h-12 md:h-14 w-auto"
              style={{ maxWidth: '220px' }}
            />
          </Link>

          {/* Desktop nav links */}
          <ul className={cn('hidden lg:flex items-center gap-0.5', isRTL && 'flex-row-reverse')}>
            {/* Simple links */}
            <li><Link href="/"        className={linkCls('/')}       >{t('home')}</Link></li>
            <li><Link href="/about"   className={linkCls('/about')}  >{t('about')}</Link></li>

            {/* Services dropdown */}
            <li
              className="relative"
              onMouseEnter={() => menuEnter('services')}
              onMouseLeave={menuLeave}
            >
              <button className={cn(
                'flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-all duration-200 font-medium',
                pathname.startsWith('/services') ? 'text-brand-blue font-semibold' : 'text-brand-text hover:text-brand-blue'
              )}>
                {t('services')}
                <ChevronDown size={14} className={cn('transition-transform duration-200', openMenu === 'services' && 'rotate-180')} />
              </button>

              {openMenu === 'services' && (
                <div className="absolute top-full start-0 mt-2 w-[540px] bg-white rounded-2xl shadow-2xl border border-brand-border p-4 z-50">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-brand-border">
                    <span className="text-[11px] text-brand-sub font-semibold uppercase tracking-wider">Our Services</span>
                    <Link href="/services" className="text-xs text-brand-blue font-semibold hover:underline">View All →</Link>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {SERVICES_NAV.map(({ slug, key, Icon, color, bg }) => (
                      <Link key={slug} href={`/services/${slug}`}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-light transition-colors group">
                        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', bg)}>
                          <Icon size={16} className={color} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-brand-text text-sm font-semibold group-hover:text-brand-blue transition-colors leading-snug">
                            {tSvc(`${key}.name`)}
                          </p>
                          <p className="text-brand-sub text-xs line-clamp-1 leading-tight mt-0.5">
                            {tSvc(`${key}.desc`)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* Products dropdown */}
            <li
              className="relative"
              onMouseEnter={() => menuEnter('products')}
              onMouseLeave={menuLeave}
            >
              <button className={cn(
                'flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-all duration-200 font-medium',
                pathname.startsWith('/products') ? 'text-brand-blue font-semibold' : 'text-brand-text hover:text-brand-blue'
              )}>
                {t('products')}
                <ChevronDown size={14} className={cn('transition-transform duration-200', openMenu === 'products' && 'rotate-180')} />
              </button>

              {openMenu === 'products' && (
                <div className="absolute top-full start-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-brand-border py-2 z-50">
                  {PRODUCT_CATS.map(({ label, href }) => (
                    <Link key={label} href={href}
                      className="block px-4 py-2.5 text-sm text-brand-text hover:bg-brand-light hover:text-brand-blue transition-colors font-medium">
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li><Link href="/projects" className={linkCls('/projects')}>{t('projects')}</Link></li>
            <li><Link href="/blog"     className={linkCls('/blog')}    >{t('blog')}</Link></li>
            <li><Link href="/contact"  className={linkCls('/contact')} >{t('contact')}</Link></li>
          </ul>

          {/* Right controls */}
          <div className={cn('flex items-center gap-3', isRTL && 'flex-row-reverse')}>
            <div className="hidden md:block"><LanguageSwitcher /></div>
            <Link href="/contact"
              className="hidden lg:inline-flex bg-brand-orange text-white rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-brand-orange-dark transition-colors">
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

      {/* ── Mobile menu ── */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 bg-white z-40 transition-all duration-300 overflow-y-auto shadow-xl',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ top: '64px', maxHeight: 'calc(100vh - 64px)' }}
      >
        <div className="container-max py-6 flex flex-col gap-1">
          {/* Simple links */}
          {SIMPLE_LINKS.map(({ href, key }) => (
            <Link key={key} href={href}
              className={cn(
                'py-3.5 px-4 text-base font-medium rounded-xl transition-all min-h-[44px] flex items-center',
                pathname === href ? 'text-brand-blue bg-brand-blue-light font-semibold' : 'text-brand-text hover:bg-brand-light'
              )}>
              {t(key)}
            </Link>
          ))}

          {/* Services accordion */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === 'services' ? null : 'services')}
              className={cn(
                'w-full py-3.5 px-4 text-base font-medium rounded-xl transition-all min-h-[44px] flex items-center justify-between',
                pathname.startsWith('/services') ? 'text-brand-blue bg-brand-blue-light' : 'text-brand-text hover:bg-brand-light'
              )}
            >
              {t('services')}
              <ChevronDown size={16} className={cn('transition-transform', mobileExpanded === 'services' && 'rotate-180')} />
            </button>
            {mobileExpanded === 'services' && (
              <div className="pl-3 mt-1 space-y-0.5">
                <Link href="/services" className="block py-2.5 px-4 text-sm text-brand-blue font-semibold rounded-lg hover:bg-brand-light">
                  All Services
                </Link>
                {SERVICES_NAV.map(({ slug, key, Icon }) => (
                  <Link key={slug} href={`/services/${slug}`}
                    className="flex items-center gap-2.5 py-2.5 px-4 text-sm text-brand-text rounded-lg hover:bg-brand-light hover:text-brand-blue">
                    <Icon size={14} className="text-brand-sub" />
                    {tSvc(`${key}.name`)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Products accordion */}
          <div>
            <button
              onClick={() => setMobileExpanded(mobileExpanded === 'products' ? null : 'products')}
              className={cn(
                'w-full py-3.5 px-4 text-base font-medium rounded-xl transition-all min-h-[44px] flex items-center justify-between',
                pathname.startsWith('/products') ? 'text-brand-blue bg-brand-blue-light' : 'text-brand-text hover:bg-brand-light'
              )}
            >
              {t('products')}
              <ChevronDown size={16} className={cn('transition-transform', mobileExpanded === 'products' && 'rotate-180')} />
            </button>
            {mobileExpanded === 'products' && (
              <div className="pl-3 mt-1 space-y-0.5">
                {PRODUCT_CATS.map(({ label, href }) => (
                  <Link key={label} href={href}
                    className="block py-2.5 px-4 text-sm text-brand-text rounded-lg hover:bg-brand-light hover:text-brand-blue">
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact"
            className="bg-brand-orange text-white rounded-full py-3.5 px-6 text-center font-semibold mt-3 hover:bg-brand-orange-dark transition-colors min-h-[44px] flex items-center justify-center">
            {t('getQuote')}
          </Link>

          <div className={cn('flex items-center gap-4 mt-5 pt-5 border-t border-brand-border', isRTL && 'flex-row-reverse')}>
            <LanguageSwitcher />
            <div className="flex items-center gap-4 ms-auto">
              <a href="#" className="text-brand-sub hover:text-brand-blue"><FaLinkedin size={20} /></a>
              <a href="#" className="text-brand-sub hover:text-brand-blue"><FaInstagram size={20} /></a>
              <a href="#" className="text-brand-sub hover:text-brand-blue"><FaFacebook size={20} /></a>
              <a href="https://wa.me/97430443229" target="_blank" rel="noopener noreferrer"
                 className="text-green-600 hover:text-green-700"><FaWhatsapp size={20} /></a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
