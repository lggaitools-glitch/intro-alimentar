/**
 * Sitemap generator for IntroAlimentar
 * 
 * Google best practices (https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap):
 * - Google IGNORES <priority> and <changefreq> — omitted intentionally
 * - <lastmod> only useful if accurately maintained
 * - hreflang: each page must list itself + all alternates (bidirectional)
 * - Use fully-qualified absolute URLs
 * - x-default for language fallback
 * 
 * Run: npx tsx scripts/generate-sitemap.ts
 */
import { writeFileSync } from 'fs'
import { foodDatabase } from '../src/data/foodDatabase'

const BASE = 'https://introalimentar.com'
const TODAY = new Date().toISOString().split('T')[0]
const LOCALES = ['es', 'en', 'pt-br'] as const

// All public, indexable pages with their last meaningful update
const pages = [
  // Core
  { path: '', lastmod: TODAY },
  { path: '/blog', lastmod: TODAY },
  { path: '/foods', lastmod: TODAY },
  { path: '/learn', lastmod: TODAY },
  { path: '/reference', lastmod: TODAY },
  { path: '/infographics', lastmod: TODAY },

  // Blog articles
  { path: '/blog/guia-alimentacion-complementaria', lastmod: '2026-04-02' },
  { path: '/blog/blw-que-es-como-empezar', lastmod: '2026-04-02' },
  { path: '/blog/tabla-introduccion-alimentos-bebe', lastmod: '2026-04-02' },
  { path: '/blog/alimentos-prohibidos-bebes', lastmod: '2026-04-02' },
  { path: '/blog/introduccion-alergenos-bebes', lastmod: '2026-04-02' },

  // Guides
  { path: '/guia/atragantamiento', lastmod: '2026-04-04' },
  { path: '/guia/horarios-alimentacion', lastmod: '2026-04-04' },
  { path: '/guia/primeros-auxilios-bebe', lastmod: '2026-04-04' },

  // Legal
  { path: '/privacy', lastmod: '2026-04-01' },
]

function hreflangBlock(path: string): string {
  const lines = LOCALES.map(
    (lang) => `  <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE}${path}?lang=${lang}"/>`
  )
  // x-default points to Spanish (primary language)
  lines.push(`  <xhtml:link rel="alternate" hreflang="x-default" href="${BASE}${path}"/>`)
  return lines.join('\n')
}

function urlEntry(path: string, lastmod: string): string {
  return [
    ' <url>',
    `  <loc>${BASE}${path}</loc>`,
    `  <lastmod>${lastmod}</lastmod>`,
    hreflangBlock(path),
    ' </url>',
  ].join('\n')
}

// Build XML
const parts: string[] = []

parts.push('<?xml version="1.0" encoding="UTF-8"?>')
parts.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">')

// Static pages
parts.push('')
parts.push(' <!-- Páginas Principales -->')
for (const page of pages.filter(p => !p.path.startsWith('/blog/') && !p.path.startsWith('/guia/') && p.path !== '/privacy')) {
  parts.push(urlEntry(page.path, page.lastmod))
}

parts.push('')
parts.push(' <!-- Blog -->')
for (const page of pages.filter(p => p.path.startsWith('/blog/'))) {
  parts.push(urlEntry(page.path, page.lastmod))
}

parts.push('')
parts.push(' <!-- Guías -->')
for (const page of pages.filter(p => p.path.startsWith('/guia/'))) {
  parts.push(urlEntry(page.path, page.lastmod))
}

parts.push('')
parts.push(' <!-- Alimentos -->')
for (const food of foodDatabase) {
  parts.push(urlEntry(`/foods/${food.slug}`, '2026-04-04'))
}

parts.push('')
parts.push(' <!-- Legal -->')
parts.push(urlEntry('/privacy', '2026-04-01'))

parts.push('')
parts.push('</urlset>')

const xml = parts.join('\n')
writeFileSync('./public/sitemap.xml', xml)
console.log(`✅ Sitemap generated: ${pages.length + foodDatabase.length} URLs`)
