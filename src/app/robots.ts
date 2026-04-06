import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', // API routes only
        ],
      },
    ],
    sitemap: 'https://introalimentar.com/sitemap.xml',
    host: 'https://introalimentar.com',
  }
}
