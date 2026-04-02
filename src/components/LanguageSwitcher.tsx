'use client';

import { useLocale } from '@/i18n/context';
import type { Locale } from '@/i18n/config';

const localeLabels: Record<Locale, string> = {
  es: 'ES',
  en: 'EN',
  'pt-br': 'PT',
};

export default function LanguageSwitcher() {
  const currentLocale = useLocale();

  const handleChange = (newLocale: Locale) => {
    document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-1">
      {(Object.entries(localeLabels) as [Locale, string][]).map(([locale, label]) => (
        <button
          key={locale}
          onClick={() => handleChange(locale)}
          className={`px-2 py-1 text-xs rounded-lg font-medium transition-colors ${
            currentLocale === locale
              ? 'bg-green-app text-white'
              : 'bg-white/20 text-white/80 hover:bg-white/30'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
