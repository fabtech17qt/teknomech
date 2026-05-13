import { Inter, Cairo } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFAB from '@/components/shared/WhatsAppFAB';
import AIAssistant from '@/components/shared/AIAssistant';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: {
    default: 'Teknomech MEP | Qatar MEP & Fire Protection Contractor',
    template: '%s | Teknomech MEP',
  },
  description:
    "Qatar's trusted MEP and Fire Protection contractor. Certified mechanical, electrical, plumbing and fire suppression systems for commercial, industrial and government projects.",
  keywords: [
    'MEP contractor Qatar',
    'fire protection Qatar',
    'HVAC Qatar',
    'electrical contractor Doha',
    'plumbing Qatar',
    'QCDD compliant',
    'UPDA approved',
  ],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://teknomech.qa'),
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      className={`${inter.variable} ${cairo.variable}`}
    >
      <body className="bg-brand-dark text-brand-text font-inter antialiased">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppFAB />
          <AIAssistant />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
