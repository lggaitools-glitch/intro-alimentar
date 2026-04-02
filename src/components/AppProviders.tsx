'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { I18nProvider, type Dictionary } from '@/i18n/context';
import { defaultLocale, isValidLocale, type Locale } from '@/i18n/config';
import DataMigration from '@/components/DataMigration';

function getLocaleFromCookie(): Locale {
  if (typeof document === 'undefined') return defaultLocale;
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
  if (match && isValidLocale(match[1])) return match[1] as Locale;
  return defaultLocale;
}

export default function AppProviders({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ locale: Locale; dict: Dictionary } | null>(null);

  useEffect(() => {
    const locale = getLocaleFromCookie();
    import(`@/messages/${locale}.json`)
      .then((mod) => setState({ locale, dict: mod.default }))
      .catch(() => {
        import('@/messages/es.json').then((mod) =>
          setState({ locale: defaultLocale, dict: mod.default })
        );
      });
  }, []);

  if (!state) return <>{children}</>;

  return (
    <I18nProvider locale={state.locale} dictionary={state.dict}>
      <DataMigration />
      {children}
    </I18nProvider>
  );
}
