import type { MetadataRoute } from 'next'

const BASE_URL = 'https://introalimentar.com'

const routes = [
  '',
  '/plan',
  '/diary',
  '/learn',
  '/reference',
  '/setup',
  '/readiness',
  '/approach',
  '/allergens',
  '/blog',
  '/blog/guia-alimentacion-complementaria',
  '/blog/blw-que-es-como-empezar',
  '/blog/tabla-introduccion-alimentos-bebe',
  '/blog/alimentos-prohibidos-bebes',
  '/blog/introduccion-alergenos-bebes',
  '/infographics',
]

const locales = ['es', 'en', 'pt-br']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    entries.push({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((locale) => [locale, `${BASE_URL}${route}?lang=${locale}`])
        ),
      },
    })
  }

  return entries
}
