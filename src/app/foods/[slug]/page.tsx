// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { foodDatabase, getFoodBySlug, categoryInfo } from '@/data/foodDatabase';
import Navigation from '@/components/Navigation';

const BASE_URL = 'https://introalimentar.com';

/* ---------- Metadata ---------- */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const food = getFoodBySlug(slug);
  if (!food) return {};

  const title = `${food.name} para bebés — Cómo preparar y servir | IntroAlimentar`;
  const description = `Guía completa de ${food.name.toLowerCase()} para bebés: preparación por edad (6, 9, 12+ meses), riesgo de atragantamiento, alérgenos, nutrientes y consejos. Recomendaciones AEP y OMS.`;

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${BASE_URL}/foods/${food.slug}`,
    },
    alternates: {
      canonical: `${BASE_URL}/foods/${food.slug}`,
    },
  };
}

/* ---------- Static params ---------- */

export function generateStaticParams() {
  return foodDatabase.map((f) => ({ slug: f.slug }));
}

/* ---------- Helpers ---------- */

function ChokingBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const config = {
    low: { label: 'Bajo', color: 'bg-green-100 text-green-700', dot: '🟢' },
    medium: { label: 'Medio', color: 'bg-yellow-100 text-yellow-700', dot: '🟡' },
    high: { label: 'Alto', color: 'bg-red-100 text-red-700', dot: '🔴' },
  };
  const c = config[level];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${c.color}`}>
      {c.dot} {c.label}
    </span>
  );
}

/* ---------- Page component ---------- */

export default async function FoodDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const food = getFoodBySlug(slug);
  if (!food) notFound();

  const catInfo = categoryInfo[food.category];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${food.name} para bebés: guía de preparación por edad`,
    description: `Cómo preparar y servir ${food.name.toLowerCase()} para bebés de 6, 9 y 12+ meses.`,
    author: { '@type': 'Organization', name: 'IntroAlimentar' },
    publisher: { '@type': 'Organization', name: 'IntroAlimentar' },
    mainEntityOfPage: `${BASE_URL}/foods/${food.slug}`,
  };

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero header */}
      <header className="bg-gradient-to-br from-green-app to-green-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/foods"
            className="inline-flex items-center gap-1 text-green-100 text-sm mb-3 hover:text-white transition"
          >
            ← Todos los alimentos
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-5xl">{food.emoji}</span>
            <div>
              <h1 className="text-2xl font-bold">{food.name}</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                  {catInfo.emoji} {catInfo.label}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                  Desde {food.ageIntro} meses
                </span>
                {food.allergen && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-400/30 text-white">
                    ⚠️ {food.allergenGroup}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-4 space-y-4">
        {/* Serving guide by age */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-lg font-bold text-text-primary mb-4">
            🍽️ Cómo servir por edad
          </h2>
          <div className="space-y-4">
            {Object.entries(food.servingGuide).map(([age, guide]) => {
              const ageLabel = age === '6m' ? '6 meses' : age === '9m' ? '9 meses' : '12+ meses';
              const ageColor = age === '6m' ? 'bg-blue-app' : age === '9m' ? 'bg-orange-app' : 'bg-green-app';
              return (
                <div key={age} className="flex gap-3">
                  <span className={`${ageColor} text-white text-xs font-bold px-2 py-1 rounded-full h-fit whitespace-nowrap mt-0.5`}>
                    {ageLabel}
                  </span>
                  <p className="text-sm text-text-secondary leading-relaxed">{guide}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Allergen info */}
        {food.allergen && (
          <section className="bg-red-light rounded-2xl p-5 ring-1 ring-red-app/20">
            <h2 className="text-lg font-bold text-red-app mb-2">
              ⚠️ Información alérgena
            </h2>
            <p className="text-sm text-text-secondary leading-relaxed">
              <strong>{food.name}</strong> pertenece al grupo de alérgenos: <strong>{food.allergenGroup}</strong>.
              Introducir en pequeña cantidad y observar durante 2-3 días antes de ofrecer otro
              alimento nuevo. Si hay antecedentes familiares de alergia, consultar con el pediatra antes de introducir.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mt-2">
              Signos de reacción alérgica: urticaria, hinchazón de labios/cara, vómitos, dificultad
              respiratoria. Ante cualquier síntoma grave, llamar al <strong>112</strong>.
            </p>
          </section>
        )}

        {/* Choking risk */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-text-primary">
              🛡️ Riesgo de atragantamiento
            </h2>
            <ChokingBadge level={food.chokingRisk} />
          </div>
          <p className="text-sm text-text-secondary leading-relaxed">{food.chokingNotes}</p>
        </section>

        {/* Key nutrients */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-lg font-bold text-text-primary mb-3">
            💪 Nutrientes clave
          </h2>
          <div className="flex flex-wrap gap-2">
            {food.nutrition.map((nutrient) => (
              <span
                key={nutrient}
                className="px-3 py-1.5 rounded-full text-sm bg-green-light text-green-dark font-medium"
              >
                {nutrient}
              </span>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-lg font-bold text-text-primary mb-3">
            💡 Consejos de preparación
          </h2>
          <ul className="space-y-2">
            {food.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-green-app mt-0.5">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Related links */}
        <section className="bg-blue-light rounded-2xl p-5">
          <h3 className="font-semibold text-blue-app text-sm mb-2">Contenido relacionado</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/guia/atragantamiento" className="text-sm text-blue-700 hover:underline">
              🚨 Guía de atragantamiento
            </Link>
            <Link href="/reference" className="text-sm text-blue-700 hover:underline">
              ⚠️ Referencia rápida
            </Link>
            <Link href="/learn" className="text-sm text-blue-700 hover:underline">
              📖 Aprender
            </Link>
            <Link href="/guia/horarios-alimentacion" className="text-sm text-blue-700 hover:underline">
              🕐 Horarios de alimentación
            </Link>
            <Link href="/foods" className="text-sm text-blue-700 hover:underline">
              🍽️ Todos los alimentos
            </Link>
          </div>
        </section>

        {/* Sources */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-lg font-bold text-text-primary mb-3">📚 Fuentes</h2>
          <ul className="space-y-2">
            {food.sources.map((source, i) => (
              <li key={i} className="text-sm">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-app hover:underline"
                >
                  {source.title} ↗
                </a>
              </li>
            ))}
            <li className="text-sm">
              <a
                href="https://espghan.org/knowledge-center/publications"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-app hover:underline"
              >
                ESPGHAN — Position paper on complementary feeding ↗
              </a>
            </li>
          </ul>
        </section>

        <div className="text-xs text-text-muted text-center py-4">
          <p>Esta información no sustituye la consulta médica.</p>
          <p>Consulta siempre con tu pediatra ante cualquier duda.</p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
