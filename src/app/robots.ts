import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',        // API routes
          '/auth',        // Login/signup page
          '/auth/',
          '/account',     // Private account settings
          '/account/',
          '/setup',       // Onboarding (no value for search)
          '/setup/',
          '/approach',    // Onboarding step
          '/approach/',
          '/readiness',   // Onboarding step
          '/readiness/',
          '/plan',        // User-specific content (no value for search)
          '/plan/',
          '/diary',       // User-specific content
          '/diary/',
          '/allergens',   // User-specific content
          '/allergens/',
        ],
      },
    ],
    sitemap: 'https://introalimentar.com/sitemap.xml',
    host: 'https://introalimentar.com',
  }
}
