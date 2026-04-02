import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles, getArticleBySlug, getRelatedArticles } from '@/data/articles';
import Navigation from '@/components/Navigation';

const BASE_URL = 'https://introalimentar.com';

/* ---------- Metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    openGraph: {
      type: 'article',
      title: article.metaTitle,
      description: article.metaDescription,
      url: `${BASE_URL}/blog/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${article.slug}`,
    },
  };
}

/* ---------- Static params ---------- */

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

/* ---------- Helpers ---------- */

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Extract h2 headings for the table of contents */
function extractHeadings(content: string): { id: string; text: string }[] {
  const headings: { id: string; text: string }[] = [];
  for (const line of content.split('\n')) {
    const match = line.match(/^## (.+)$/);
    if (match) {
      const text = match[1];
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      headings.push({ id, text });
    }
  }
  return headings;
}

/** Parse the markdown-like content string into React elements */
function parseContent(content: string): React.ReactNode[] {
  const blocks = content.split('\n\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  let listBuffer: string[] = [];

  const flushList = () => {
    if (listBuffer.length > 0) {
      elements.push(
        <ul
          key={key++}
          className="list-disc pl-6 mb-4 space-y-2 text-text-secondary"
        >
          {listBuffer.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Heading h2
    if (trimmed.startsWith('## ') && !trimmed.startsWith('### ')) {
      flushList();
      const text = trimmed.replace(/^## /, '');
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      elements.push(
        <h2
          key={key++}
          id={id}
          className="text-2xl font-bold mt-10 mb-4 text-text-primary border-b border-cream-dark pb-2"
        >
          {text}
        </h2>
      );
      continue;
    }

    // Heading h3
    if (trimmed.startsWith('### ')) {
      flushList();
      const text = trimmed.replace(/^### /, '');
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');
      elements.push(
        <h3
          key={key++}
          id={id}
          className="text-xl font-semibold mt-8 mb-3 text-text-secondary"
        >
          {text}
        </h3>
      );
      continue;
    }

    // List items (may span a single block with \n-separated lines)
    if (trimmed.startsWith('- ')) {
      const lines = trimmed.split('\n');
      for (const line of lines) {
        if (line.trim().startsWith('- ')) {
          listBuffer.push(line.trim().replace(/^- /, ''));
        }
      }
      continue;
    }

    // Paragraph
    flushList();
    elements.push(
      <p key={key++} className="text-text-secondary leading-relaxed mb-4">
        {renderInline(trimmed)}
      </p>
    );
  }

  flushList();
  return elements;
}

/** Render inline markdown: **bold** */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="text-text-primary font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

/* ---------- Page component ---------- */

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const headings = extractHeadings(article.content);
  const related = getRelatedArticles(article.relatedSlugs);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    datePublished: article.date,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    description: article.metaDescription,
    url: `${BASE_URL}/blog/${article.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'IntroAlimentar',
      url: BASE_URL,
    },
  };

  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="bg-gradient-to-br from-green-app to-green-dark text-white">
        <div className="max-w-3xl mx-auto px-4 py-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors"
          >
            <span aria-hidden="true">&larr;</span> Volver al blog
          </Link>

          <h1 className="text-3xl font-bold mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-white/85">
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span className="w-1 h-1 rounded-full bg-white/60" />
            <span>{article.author}</span>
            <span className="w-1 h-1 rounded-full bg-white/60" />
            <span>{article.readingTime} min de lectura</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 lg:flex lg:gap-10">
        {/* Table of Contents - sidebar on large screens */}
        {headings.length > 0 && (
          <aside className="lg:w-56 lg:shrink-0 mb-8 lg:mb-0">
            <nav className="lg:sticky lg:top-6">
              {/* Desktop: always visible */}
              <div className="hidden lg:block">
                <h2 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-3">
                  Contenido
                </h2>
                <ul className="space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="text-text-muted hover:text-green-dark transition-colors"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mobile: collapsible via <details> */}
              <details className="lg:hidden bg-white rounded-xl border border-cream-dark p-4">
                <summary className="text-sm font-bold text-text-primary cursor-pointer">
                  Tabla de contenido
                </summary>
                <ul className="mt-3 space-y-2 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="text-text-muted hover:text-green-dark transition-colors"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </nav>
          </aside>
        )}

        {/* Article body */}
        <article className="min-w-0 flex-1">
          {parseContent(article.content)}
        </article>
      </div>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 mt-8">
          <h2 className="text-xl font-bold text-text-primary mb-5">
            Articulos relacionados
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="block bg-white rounded-2xl border border-cream-dark p-5 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-text-primary mb-1 leading-snug">
                  {r.title}
                </h3>
                <p className="text-sm text-text-muted">
                  {r.readingTime} min de lectura
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-4 mt-10">
        <div className="bg-gradient-to-br from-orange-light to-orange-app/20 rounded-2xl p-8 text-center border border-orange-app/20">
          <h2 className="text-xl font-bold text-text-primary mb-2">
            Planifica la alimentacion de tu bebe con IntroAlimentar
          </h2>
          <p className="text-text-secondary mb-5">
            Crea un plan semanal personalizado, lleva un diario de comidas y
            controla la introduccion de alergenos paso a paso.
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-app text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-dark transition-colors"
          >
            Ir a la app
          </Link>
        </div>
      </section>

      <Navigation />
    </div>
  );
}
