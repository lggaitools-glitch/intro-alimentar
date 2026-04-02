'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Locale } from './config';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Dictionary = Record<string, any>;

interface I18nContextValue {
  locale: Locale;
  dict: Dictionary;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'es',
  dict: {},
});

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  return (
    <I18nContext.Provider value={{ locale, dict: dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const { dict } = useContext(I18nContext);
  return dict;
}

export function useLocale(): Locale {
  const { locale } = useContext(I18nContext);
  return locale;
}

/**
 * Returns a function that prefixes paths with the locale (except for default 'es').
 */
export function useLocalePath() {
  const locale = useLocale();
  return (path: string) => (locale === 'es' ? path : `/${locale}${path}`);
}
