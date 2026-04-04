import { foodDatabase } from '@/data/foodDatabase'

const BASE = 'https://introalimentar.com'
const TODAY = new Date().toISOString().split('T')[0] // YYYY-MM-DD

const locales = ['es', 'en', 'pt-br'] as const

function hreflangLinks(path: string): string {
  return locales
    .map(
      (lang) =>
        `  <xhtml:link rel="alternate" hreflang="${lang}" href="${BASE}${path}?lang=${lang}"/>`
    )
    .join('\n')
}

function urlEntry(
  path: string,
  opts: { priority: number; changefreq: string; hreflang?: boolean }
): string {
  const lines = [
    ` <url>`,
    `  <loc>${BASE}${path}</loc>`,
    `  <lastmod>${TODAY}</lastmod>`,
    `  <changefreq>${opts.changefreq}</changefreq>`,
    `  <priority>${opts.priority}</priority>`,
  ]
  if (opts.hreflang) {
    lines.push(hreflangLinks(path))
  }
  lines.push(` </url>`)
  return lines.join('\n')
}

export async function GET() {
  // --- Core pages ---
  const corePages = [
    { path: '', priority: 1.0, changefreq: 'weekly', hreflang: true },
    { path: '/blog', priority: 0.9, changefreq: 'weekly' },
    { path: '/foods', priority: 0.9, changefreq: 'weekly' },
    { path: '/learn', priority: 0.8, changefreq: 'monthly' },
    { path: '/reference', priority: 0.8, changefreq: 'monthly' },
    { path: '/infographics', priority: 0.7, changefreq: 'monthly' },
  ]

  // --- Blog articles ---
  const blogPosts = [
    'guia-alimentacion-complementaria',
    'blw-que-es-como-empezar',
    'tabla-introduccion-alimentos-bebe',
    'alimentos-prohibidos-bebes',
    'introduccion-alergenos-bebes',
  ]

  // --- Guides ---
  const guides = [
    'atragantamiento',
    'horarios-alimentacion',
    'primeros-auxilios-bebe',
  ]

  // --- Food slugs from database ---
  const foodSlugs = foodDatabase.map((f) => f.slug)

  // Build XML
  const parts: string[] = []

  parts.push(`<?xml version="1.0" encoding="UTF-8"?>`)
  parts.push(`<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>`)
  parts.push(`<urlset`)
  parts.push(` xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`)
  parts.push(` xmlns:xhtml="http://www.w3.org/1999/xhtml">`)

  // Core pages
  parts.push(``)
  parts.push(` <!-- ========================= -->`)
  parts.push(` <!-- CORE PAGES -->`)
  parts.push(` <!-- ========================= -->`)
  for (const page of corePages) {
    parts.push(urlEntry(page.path, page))
  }

  // Blog articles
  parts.push(``)
  parts.push(` <!-- ========================= -->`)
  parts.push(` <!-- BLOG ARTICLES -->`)
  parts.push(` <!-- ========================= -->`)
  for (const slug of blogPosts) {
    parts.push(urlEntry(`/blog/${slug}`, { priority: 0.9, changefreq: 'monthly' }))
  }

  // Guides
  parts.push(``)
  parts.push(` <!-- ========================= -->`)
  parts.push(` <!-- GUIDES -->`)
  parts.push(` <!-- ========================= -->`)
  for (const slug of guides) {
    parts.push(urlEntry(`/guia/${slug}`, { priority: 0.9, changefreq: 'monthly' }))
  }

  // Foods
  parts.push(``)
  parts.push(` <!-- ========================= -->`)
  parts.push(` <!-- FOODS -->`)
  parts.push(` <!-- ========================= -->`)
  for (const slug of foodSlugs) {
    parts.push(urlEntry(`/foods/${slug}`, { priority: 0.8, changefreq: 'monthly' }))
  }

  // Legal
  parts.push(``)
  parts.push(` <!-- ========================= -->`)
  parts.push(` <!-- LEGAL -->`)
  parts.push(` <!-- ========================= -->`)
  parts.push(urlEntry('/privacy', { priority: 0.3, changefreq: 'yearly' }))

  parts.push(``)
  parts.push(`</urlset>`)

  const xml = parts.join('\n')

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
