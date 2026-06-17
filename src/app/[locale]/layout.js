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

const BASE_URL = 'https://www.teknomech.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${BASE_URL}/#organization`,
      name: 'Teknomech MEP',
      url: BASE_URL,
      description:
        "Qatar's leading MEP and Fire Protection contractor for commercial, industrial and government projects.",
      telephone: '+97444445555',
      email: 'info@teknomech.qa',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Building 15, Street 850, Zone 55',
        addressLocality: 'Doha',
        addressRegion: 'Qatar',
        addressCountry: 'QA',
      },
      areaServed: { '@type': 'Country', name: 'Qatar' },
      knowsAbout: [
        'MEP Engineering',
        'Fire Protection Systems',
        'HVAC Systems',
        'Electrical Systems',
        'Plumbing Systems',
        'Low Voltage Systems',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Teknomech MEP',
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
  ],
};

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isAr = locale === 'ar';

  const titleEn = 'Teknomech MEP | Qatar MEP & Fire Protection Contractor';
  const descEn =
    "Qatar's certified MEP & Fire Protection contractor for HVAC, electrical, plumbing, fire suppression and LV systems across Doha and Qatar.";
  const titleAr = 'تكنوميك MEP | مقاول MEP وحماية من الحريق في قطر';
  const descAr =
    'مقاول MEP وحماية من الحريق الرائد في قطر — أنظمة HVAC والكهرباء والسباكة ومكافحة الحريق للمشاريع التجارية والحكومية.';

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: isAr ? titleAr : titleEn,
      template: isAr ? '%s | تكنوميك MEP' : '%s | Teknomech MEP',
    },
    description: isAr ? descAr : descEn,
    keywords: [
      'MEP contractor Qatar',
      'fire protection Qatar',
      'HVAC Qatar',
      'electrical contractor Doha',
      'plumbing Qatar',
      'QCDD compliant',
      'UPDA approved',
      'fire suppression Qatar',
      'LV systems Qatar',
      'مقاول MEP قطر',
      'حماية من الحريق قطر',
    ],
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        en: `${BASE_URL}/en`,
        ar: `${BASE_URL}/ar`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isAr ? 'ar_QA' : 'en_QA',
      alternateLocale: isAr ? ['en_QA'] : ['ar_QA'],
      url: `${BASE_URL}/${locale}`,
      siteName: 'Teknomech MEP',
      title: titleEn,
      description: descEn,
      images: [
        {
          url: `${BASE_URL}/images/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Teknomech MEP — Qatar MEP & Fire Protection Contractor',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleEn,
      description: descEn,
      images: [`${BASE_URL}/images/og-image.jpg`],
    },
    icons: {
      icon: '/images/tekno-logo.jpeg',
      apple: '/images/tekno-logo.jpeg',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

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
      <body className="bg-white text-brand-text font-inter antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
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
