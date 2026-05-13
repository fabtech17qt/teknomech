'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher({ className }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className={cn('flex items-center gap-1 bg-brand-dark/60 rounded-md p-0.5', className)}>
      <button
        onClick={() => switchLocale('en')}
        className={cn(
          'px-2.5 py-1 text-xs font-semibold rounded transition-all duration-200',
          locale === 'en'
            ? 'bg-brand-red text-white'
            : 'text-brand-subtext hover:text-brand-text'
        )}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('ar')}
        className={cn(
          'px-2.5 py-1 text-xs font-semibold rounded transition-all duration-200',
          locale === 'ar'
            ? 'bg-brand-red text-white'
            : 'text-brand-subtext hover:text-brand-text'
        )}
      >
        AR
      </button>
    </div>
  );
}
