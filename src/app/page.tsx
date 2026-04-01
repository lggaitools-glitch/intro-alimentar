'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ProgressBar from '@/components/ProgressBar';
import { useProfile } from '@/hooks/useProfile';
import { useFoodDiary } from '@/hooks/useFoodDiary';
import { useAllergens } from '@/hooks/useAllergens';
import { useLearningProgress } from '@/hooks/useLearningProgress';
import { calculateAgeInMonths, calculateWeekOfIntroduction } from '@/lib/utils';
import { getWeekPlan } from '@/data/weekPlan';
import { lessons } from '@/data/lessons';

export default function Dashboard() {
  const router = useRouter();
  const { profile, isSetUp, loaded } = useProfile();
  const { getFoodsTried, loaded: diaryLoaded } = useFoodDiary();
  const { getIntroducedCount, loaded: allergensLoaded } = useAllergens();
  const { progress, loaded: learnLoaded } = useLearningProgress();

  useEffect(() => {
    if (loaded && !isSetUp) {
      router.push('/setup');
    }
  }, [loaded, isSetUp, router]);

  if (!loaded || !diaryLoaded || !allergensLoaded || !learnLoaded || !isSetUp) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🍼</div>
          <p className="text-text-muted">Cargando...</p>
        </div>
      </div>
    );
  }

  const ageMonths = calculateAgeInMonths(profile.dateOfBirth);
  const introWeek = profile.startDate ? calculateWeekOfIntroduction(profile.startDate) : 0;
  const currentPlan = profile.startDate ? getWeekPlan(introWeek) : null;
  const foodsTried = getFoodsTried();
  const allergensIntroduced = getIntroducedCount();
  const lessonsCompleted = progress.lessonsCompleted.length;
  const totalLessons = lessons.length;
  const learningPct = totalLessons > 0 ? Math.round((lessonsCompleted / totalLessons) * 100) : 0;

  return (
    <div className="pb-20">
      {/* Header */}
      <header className="bg-gradient-to-br from-green-app to-green-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold">Hola, {profile.name} 👋</h1>
              <p className="text-green-100 text-sm mt-1">
                {ageMonths} meses de edad
              </p>
            </div>
            <Link href="/setup" className="bg-white/20 rounded-full p-2 hover:bg-white/30 transition">
              <span className="text-lg">⚙️</span>
            </Link>
          </div>
          {currentPlan && (
            <div className="bg-white/15 rounded-2xl p-3 mt-2">
              <p className="text-sm font-medium text-green-100">Fase actual</p>
              <p className="font-bold">{currentPlan.phaseLabel}</p>
              <p className="text-sm text-green-100 mt-0.5">Semana {introWeek} — {currentPlan.title}</p>
            </div>
          )}
          {!profile.startDate && (
            <div className="bg-white/15 rounded-2xl p-3 mt-2">
              <p className="text-sm">Aún no has empezado la alimentación complementaria</p>
              <Link
                href="/readiness"
                className="inline-block mt-2 bg-white text-green-dark font-semibold text-sm px-4 py-2 rounded-xl hover:bg-green-100 transition"
              >
                Comprobar si está listo →
              </Link>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-6 space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-dark">{foodsTried}</div>
            <div className="text-xs text-text-muted mt-1">Alimentos probados</div>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-orange-dark">{allergensIntroduced}/9</div>
            <div className="text-xs text-text-muted mt-1">Alérgenos</div>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-app">{lessonsCompleted}</div>
            <div className="text-xs text-text-muted mt-1">Lecciones</div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-semibold">📖 Tu aprendizaje</h2>
            <Link href="/learn" className="text-green-dark text-sm font-medium">Ver todo →</Link>
          </div>
          <ProgressBar percentage={learningPct} label={`${lessonsCompleted}/${totalLessons} lecciones`} />
        </div>

        {/* Quick Actions */}
        <h2 className="font-semibold text-lg pt-2">Acciones rápidas</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/plan" className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition group">
            <span className="text-2xl">📅</span>
            <h3 className="font-semibold mt-2 group-hover:text-green-dark transition">Plan semanal</h3>
            <p className="text-xs text-text-muted mt-1">Qué alimentos tocan esta semana</p>
          </Link>
          <Link href="/diary" className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition group">
            <span className="text-2xl">📓</span>
            <h3 className="font-semibold mt-2 group-hover:text-green-dark transition">Diario</h3>
            <p className="text-xs text-text-muted mt-1">Registra lo que come hoy</p>
          </Link>
          <Link href="/allergens" className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition group">
            <span className="text-2xl">🥜</span>
            <h3 className="font-semibold mt-2 group-hover:text-green-dark transition">Alérgenos</h3>
            <p className="text-xs text-text-muted mt-1">Seguimiento de alérgenos</p>
          </Link>
          <Link href="/reference" className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition group">
            <span className="text-2xl">⚠️</span>
            <h3 className="font-semibold mt-2 group-hover:text-green-dark transition">Referencia rápida</h3>
            <p className="text-xs text-text-muted mt-1">Guías y emergencias</p>
          </Link>
        </div>

        {/* Tips */}
        {currentPlan && currentPlan.tips.length > 0 && (
          <div className="bg-orange-light rounded-2xl p-4">
            <h2 className="font-semibold mb-2">💡 Tip de la semana</h2>
            <p className="text-sm text-text-secondary">{currentPlan.tips[0]}</p>
          </div>
        )}

        {/* Approach */}
        {!profile.approach && profile.startDate && (
          <Link href="/approach" className="block bg-blue-light rounded-2xl p-4 hover:shadow-md transition">
            <h2 className="font-semibold">🍽️ Elige tu enfoque</h2>
            <p className="text-sm text-text-muted mt-1">¿Purés, BLW o mixto? Descúbrelo aquí.</p>
          </Link>
        )}

        {/* Disclaimer */}
        <div className="text-xs text-text-muted text-center py-4 border-t border-cream-dark mt-6">
          <p>IntroAlimentar es informativa. Consulta siempre con tu pediatra.</p>
          <p className="mt-1">Basada en guías AEP, OMS y ESPGHAN.</p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
