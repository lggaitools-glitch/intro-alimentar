'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { useProfile } from '@/hooks/useProfile';
import { useFoodDiary } from '@/hooks/useFoodDiary';
import { weekPlan, type WeekPlanItem } from '@/data/weekPlan';
import { foods } from '@/data/foods';
import { calculateWeekOfIntroduction } from '@/lib/utils';
import { cn } from '@/lib/utils';

function FoodChip({ foodId, tried }: { foodId: string; tried: boolean }) {
  const food = foods.find(f => f.id === foodId);
  if (!food) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition',
        tried
          ? 'bg-green-light text-green-dark'
          : 'bg-orange-light text-orange-dark'
      )}
    >
      <span>{food.emoji}</span>
      <span>{food.nameEs}</span>
      {tried && <span className="text-xs">✓</span>}
    </span>
  );
}

function WeekCard({
  plan,
  isCurrent,
  isPast,
  hasTriedFood,
  approach,
}: {
  plan: WeekPlanItem;
  isCurrent: boolean;
  isPast: boolean;
  hasTriedFood: (id: string) => boolean;
  approach: string | null;
}) {
  const [expanded, setExpanded] = useState(isCurrent);

  return (
    <div
      className={cn(
        'rounded-2xl shadow-sm overflow-hidden transition-all',
        isCurrent ? 'bg-white ring-2 ring-green-app' : 'bg-white',
        isPast && !isCurrent && 'opacity-75'
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
              isCurrent
                ? 'bg-green-app text-white'
                : isPast
                  ? 'bg-green-light text-green-dark'
                  : 'bg-cream-dark text-text-muted'
            )}
          >
            {plan.week}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{plan.title}</h3>
            <p className="text-xs text-text-muted">{plan.phaseLabel}</p>
          </div>
        </div>
        <span className={cn('text-lg transition-transform', expanded && 'rotate-180')}>
          ▾
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-sm text-text-secondary">{plan.description}</p>

          {plan.foodsToIntroduce.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                Alimentos para introducir
              </h4>
              <div className="flex flex-wrap gap-2">
                {plan.foodsToIntroduce.map(fId => (
                  <FoodChip key={fId} foodId={fId} tried={hasTriedFood(fId)} />
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-light rounded-xl p-3">
              <p className="text-xs font-semibold text-blue-app">Comidas/día</p>
              <p className="text-sm mt-0.5">{plan.mealsPerDay}</p>
            </div>
            <div className="bg-orange-light rounded-xl p-3">
              <p className="text-xs font-semibold text-orange-dark">Leche</p>
              <p className="text-sm mt-0.5 line-clamp-3">{plan.milkNote}</p>
            </div>
          </div>

          {plan.tips.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                Consejos
              </h4>
              <ul className="space-y-1.5">
                {plan.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-text-secondary flex gap-2">
                    <span className="text-green-app shrink-0">💡</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {approach && plan.foodsToIntroduce.length > 0 && (
            <div className="bg-cream rounded-xl p-3 border border-cream-dark">
              <p className="text-xs font-semibold text-text-muted mb-1">
                Preparación {approach === 'blw' ? 'BLW' : approach === 'traditional' ? 'purés' : 'mixta'}
              </p>
              {plan.foodsToIntroduce.slice(0, 2).map(fId => {
                const food = foods.find(f => f.id === fId);
                if (!food) return null;
                return (
                  <p key={fId} className="text-sm text-text-secondary mt-1">
                    <strong>{food.emoji} {food.nameEs}:</strong>{' '}
                    {approach === 'blw' ? food.preparationBLW : approach === 'traditional' ? food.preparationPuree : food.preparationBLW}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PlanPage() {
  const { profile, loaded } = useProfile();
  const { hasTriedFood, loaded: diaryLoaded } = useFoodDiary();
  const [filterPhase, setFilterPhase] = useState<number | null>(null);

  if (!loaded || !diaryLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📅</div>
          <p className="text-text-muted">Cargando plan...</p>
        </div>
      </div>
    );
  }

  if (!profile.startDate) {
    return (
      <div className="pb-20">
        <header className="bg-gradient-to-br from-green-app to-green-dark text-white p-5 rounded-b-3xl">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold">📅 Plan semanal</h1>
            <p className="text-green-100 text-sm mt-1">Tu guía semana a semana</p>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-4 mt-8 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="text-5xl mb-4">🍼</div>
            <h2 className="font-semibold text-lg mb-2">Aún no has empezado</h2>
            <p className="text-text-muted text-sm mb-4">
              Primero comprueba si tu bebé está listo para la alimentación complementaria.
            </p>
            <Link
              href="/readiness"
              className="inline-block bg-green-app text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-dark transition"
            >
              Comprobar preparación →
            </Link>
          </div>
        </main>
        <Navigation />
      </div>
    );
  }

  const currentWeek = calculateWeekOfIntroduction(profile.startDate);
  const phases = [1, 2, 3, 4];
  const phaseLabels: Record<number, string> = {
    1: 'Mes 6',
    2: 'Meses 7-8',
    3: 'Meses 9-12',
    4: '12+ meses',
  };
  const filteredPlan = filterPhase
    ? weekPlan.filter(w => w.phase === filterPhase)
    : weekPlan;

  return (
    <div className="pb-20">
      <header className="bg-gradient-to-br from-green-app to-green-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">📅 Plan semanal</h1>
          <p className="text-green-100 text-sm mt-1">
            Semana {currentWeek} de introducción
          </p>
          <div className="bg-white/15 rounded-2xl p-3 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Progreso general</span>
              <span className="text-sm font-bold">Semana {currentWeek}</span>
            </div>
            <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${Math.min(100, (currentWeek / 25) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        {/* Phase Filter */}
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          <button
            onClick={() => setFilterPhase(null)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition',
              filterPhase === null
                ? 'bg-green-app text-white'
                : 'bg-white text-text-muted'
            )}
          >
            Todas
          </button>
          {phases.map(p => (
            <button
              key={p}
              onClick={() => setFilterPhase(p)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition',
                filterPhase === p
                  ? 'bg-green-app text-white'
                  : 'bg-white text-text-muted'
              )}
            >
              Fase {p}: {phaseLabels[p]}
            </button>
          ))}
        </div>

        {/* Week Cards */}
        {filteredPlan.map(plan => (
          <WeekCard
            key={plan.week}
            plan={plan}
            isCurrent={currentWeek >= plan.week && (weekPlan.find(w => w.week > plan.week)?.week ?? 999) > currentWeek}
            isPast={currentWeek > plan.week}
            hasTriedFood={hasTriedFood}
            approach={profile.approach}
          />
        ))}

        <div className="text-xs text-text-muted text-center py-4">
          <p>Consulta siempre con tu pediatra. Cada bebé tiene su ritmo.</p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
