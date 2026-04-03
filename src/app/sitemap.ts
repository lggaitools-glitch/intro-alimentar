import type { MetadataRoute } from 'next'

const BASE_URL = 'https://introalimentar.com'

// Only public, crawlable pages — no private/user-specific routes
const routes: Array<{ path: string; priority: number; changeFreq: 'daily' | 'weekly' | 'monthly' | 'yearly' }> = [
  { path: '',                                          priority: 1.0, changeFreq: 'weekly' },
  // Blog & content (highest SEO value)
  { path: '/blog',                                     priority: 0.9, changeFreq: 'weekly' },
  { path: '/blog/guia-alimentacion-complementaria',    priority: 0.9, changeFreq: 'monthly' },
  { path: '/blog/blw-que-es-como-empezar',             priority: 0.9, changeFreq: 'monthly' },
  { path: '/blog/tabla-introduccion-alimentos-bebe',   priority: 0.9, changeFreq: 'monthly' },
  { path: '/blog/alimentos-prohibidos-bebes',          priority: 0.9, changeFreq: 'monthly' },
  { path: '/blog/introduccion-alergenos-bebes',        priority: 0.9, changeFreq: 'monthly' },
  // Educational content
  { path: '/learn',                                    priority: 0.8, changeFreq: 'monthly' },
  { path: '/reference',                                priority: 0.8, changeFreq: 'monthly' },
  { path: '/infographics',                             priority: 0.7, changeFreq: 'monthly' },
  // Legal
  { path: '/privacy',                                  priority: 0.3, changeFreq: 'yearly' },
]

const locales = ['es', 'en', 'pt-br']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    entries.push({
      url: `${BASE_URL}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.changeFreq,
      priority: route.priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${BASE_URL}${route.path}?lang=${locale}`])
        ),
      },
    })
  }

  return entries
}
