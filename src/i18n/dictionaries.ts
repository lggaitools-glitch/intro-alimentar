import type { Locale } from './config';
import type { Dictionary } from './context';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import('@/messages/es.json').then((m) => m.default),
  en: () => import('@/messages/en.json').then((m) => m.default),
  'pt-br': () => import('@/messages/pt-br.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
