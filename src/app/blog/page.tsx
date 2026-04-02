import type { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/data/articles';
import Navigation from '@/components/Navigation';

const BASE_URL = 'https://introalimentar.com';

export const metadata: Metadata = {
  title: 'Blog de Alimentacion Complementaria | IntroAlimentar',
  description:
    'Articulos y guias sobre alimentacion complementaria para bebes. BLW, tablas de introduccion de alimentos, alergenos, seguridad alimentaria y mas.',
  openGraph: {
    title: 'Blog de Alimentacion Complementaria | IntroAlimentar',
    description:
      'Articulos y guias sobre alimentacion complementaria para bebes. BLW, introduccion de alimentos, alergenos y seguridad.',
    url: `${BASE_URL}/blog`,
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/blog`,
  },
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-green-app to-green-dark text-white">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-3">Blog de IntroAlimentar</h1>
          <p className="text-white/90 text-lg leading-relaxed">
            Guias y articulos sobre alimentacion complementaria para bebes,
            basados en evidencia cientifica y recomendaciones de la OMS y la AEP.
          </p>
        </div>
      </header>

      {/* Articles grid */}
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block bg-white rounded-2xl shadow-sm border border-cream-dark hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-center gap-3 text-sm text-text-muted mb-3">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span className="w-1 h-1 rounded-full bg-text-muted" />
                  <span>{article.readingTime} min de lectura</span>
                </div>

                <h2 className="text-lg font-bold text-text-primary mb-2 leading-snug">
                  {article.title}
                </h2>

                <p className="text-text-secondary text-sm leading-relaxed mb-4">
                  {article.summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-green-light text-green-dark px-2 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA banner */}
        <section className="mt-12 bg-gradient-to-br from-orange-light to-orange-app/20 rounded-2xl p-8 text-center border border-orange-app/20">
          <h2 className="text-xl font-bold text-text-primary mb-2">
            Planifica la alimentacion de tu bebe
          </h2>
          <p className="text-text-secondary mb-5">
            Usa IntroAlimentar para crear un plan semanal personalizado, llevar
            un diario de comidas y controlar los alergenos.
          </p>
          <Link
            href="/"
            className="inline-block bg-orange-app text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-dark transition-colors"
          >
            Empezar ahora
          </Link>
        </section>
      </main>

      <Navigation />
    </div>
  );
}
