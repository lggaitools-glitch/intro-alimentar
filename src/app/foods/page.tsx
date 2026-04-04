// @ts-nocheck
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { foodDatabase, categoryInfo } from '@/data/foodDatabase';
import type { FoodCategory } from '@/data/foodDatabase';

const ageFilters = [
  { label: 'Todos', value: 0 },
  { label: '6+ meses', value: 6 },
  { label: '9+ meses', value: 9 },
  { label: '12+ meses', value: 12 },
];

export default function FoodsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | 'all'>('all');
  const [selectedAge, setSelectedAge] = useState(0);
  const [showAllergens, setShowAllergens] = useState(false);

  const categories = useMemo(() => Object.entries(categoryInfo) as [FoodCategory, typeof categoryInfo[FoodCategory]][], []);

  const filtered = useMemo(() => {
    return foodDatabase.filter((food) => {
      if (search && !food.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCategory !== 'all' && food.category !== selectedCategory) return false;
      if (selectedAge > 0 && food.ageIntro > selectedAge) return false;
      if (showAllergens && !food.allergen) return false;
      return true;
    });
  }, [search, selectedCategory, selectedAge, showAllergens]);

  return (
    <div className="pb-20">
      <header className="bg-gradient-to-br from-green-app to-green-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold">🍽️ Base de Alimentos</h1>
          <p className="text-green-100 text-sm mt-1">
            Guía completa de {foodDatabase.length} alimentos para la alimentación complementaria
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-4">
        {/* Search */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Buscar alimento..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 pl-10 rounded-xl border border-cream-dark bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-green-app/50"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">🔍</span>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
              selectedCategory === 'all'
                ? 'bg-green-app text-white'
                : 'bg-white border border-cream-dark text-text-secondary'
            }`}
          >
            Todos
          </button>
          {categories.map(([key, info]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                selectedCategory === key
                  ? 'bg-green-app text-white'
                  : 'bg-white border border-cream-dark text-text-secondary'
              }`}
            >
              {info.emoji} {info.label}
            </button>
          ))}
        </div>

        {/* Age + Allergen filter row */}
        <div className="flex gap-2 flex-wrap mb-4">
          {ageFilters.map((af) => (
            <button
              key={af.value}
              onClick={() => setSelectedAge(af.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                selectedAge === af.value
                  ? 'bg-orange-app text-white'
                  : 'bg-white border border-cream-dark text-text-secondary'
              }`}
            >
              {af.label}
            </button>
          ))}
          <button
            onClick={() => setShowAllergens(!showAllergens)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              showAllergens
                ? 'bg-red-app text-white'
                : 'bg-white border border-cream-dark text-text-secondary'
            }`}
          >
            ⚠️ Alérgenos
          </button>
        </div>

        {/* Results count */}
        <p className="text-sm text-text-muted mb-3">
          {filtered.length} alimento{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Food grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((food) => {
            const catInfo = categoryInfo[food.category];
            return (
              <Link
                key={food.slug}
                href={`/foods/${food.slug}`}
                className="bg-white rounded-2xl border border-cream-dark p-4 hover:shadow-md transition active:scale-95"
              >
                <div className="text-3xl mb-2">{food.emoji}</div>
                <h3 className="font-semibold text-text-primary text-sm leading-tight">
                  {food.name}
                </h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${catInfo.color}`}>
                    {catInfo.label}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {food.ageIntro}m+
                  </span>
                </div>
                {food.allergen && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700 mt-1 inline-block">
                    ⚠️ {food.allergenGroup}
                  </span>
                )}
                {food.chokingRisk === 'high' && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 mt-1 inline-block">
                    🔴 Riesgo alto
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-2">🔍</p>
            <p className="text-text-muted">No se encontraron alimentos con esos filtros</p>
          </div>
        )}

        {/* SEO content */}
        <section className="mt-8 bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-lg font-bold text-text-primary mb-3">
            Guía de alimentación complementaria
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            Esta base de datos incluye los alimentos más comunes para iniciar la alimentación
            complementaria de tu bebé, siguiendo las recomendaciones de la{' '}
            <strong>Asociación Española de Pediatría (AEP)</strong>, la{' '}
            <strong>Organización Mundial de la Salud (OMS)</strong> y la{' '}
            <strong>ESPGHAN</strong>.
          </p>
          <p className="text-sm text-text-secondary leading-relaxed mb-3">
            Cada alimento incluye guías de preparación por edad (6, 9 y 12+ meses), información
            sobre alérgenos, nivel de riesgo de atragantamiento, nutrientes clave y consejos
            prácticos de preparación.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Link href="/blog" className="text-sm text-green-app hover:underline">📝 Blog</Link>
            <Link href="/learn" className="text-sm text-green-app hover:underline">📖 Aprender</Link>
            <Link href="/reference" className="text-sm text-green-app hover:underline">⚠️ Referencia</Link>
            <Link href="/guia/atragantamiento" className="text-sm text-green-app hover:underline">🚨 Atragantamiento</Link>
          </div>
        </section>

        <div className="text-xs text-text-muted text-center py-4 mt-4">
          <p>Fuentes: AEP, OMS, ESPGHAN, AESAN. Esta información no sustituye la consulta médica.</p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
