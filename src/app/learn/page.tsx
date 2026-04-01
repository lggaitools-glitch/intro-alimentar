'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ProgressBar from '@/components/ProgressBar';
import { useLearningProgress } from '@/hooks/useLearningProgress';
import { modules, lessons } from '@/data/lessons';
import { cn } from '@/lib/utils';

export default function LearnPage() {
  const { progress, getModuleProgress, loaded } = useLearningProgress();

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📖</div>
          <p className="text-text-muted">Cargando...</p>
        </div>
      </div>
    );
  }

  const totalLessons = lessons.length;
  const completedLessons = progress.lessonsCompleted.length;
  const overallPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="pb-20">
      <header className="bg-gradient-to-br from-blue-app to-blue-700 text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">📖 Aprender</h1>
          <p className="text-blue-100 text-sm mt-1">
            Todo lo que necesitas saber sobre alimentación complementaria
          </p>
          <div className="mt-3 bg-white/15 rounded-2xl p-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progreso total</span>
              <span className="font-bold">{completedLessons}/{totalLessons} lecciones</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${overallPct}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        {modules.map((mod, idx) => {
          const modProgress = getModuleProgress(mod.lessonIds);
          const isComplete = modProgress.completed === modProgress.total;
          const isStarted = modProgress.completed > 0;

          return (
            <Link
              key={mod.id}
              href={`/learn/${mod.id}`}
              className="block bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0',
                      isComplete
                        ? 'bg-green-light'
                        : isStarted
                          ? 'bg-orange-light'
                          : 'bg-cream-dark'
                    )}
                  >
                    {mod.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-muted font-medium">Módulo {idx + 1}</span>
                      {isComplete && (
                        <span className="text-xs bg-green-light text-green-dark px-2 py-0.5 rounded-full font-medium">
                          Completado ✓
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold mt-0.5">{mod.title}</h3>
                    <p className="text-xs text-text-muted mt-1 line-clamp-2">{mod.description}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <ProgressBar
                    percentage={modProgress.percentage}
                    label={`${modProgress.completed}/${modProgress.total} lecciones`}
                    size="sm"
                    color={isComplete ? 'green' : 'orange'}
                  />
                </div>
              </div>
            </Link>
          );
        })}

        <div className="bg-green-light rounded-2xl p-4 mt-4">
          <p className="text-sm font-medium text-green-dark">
            Contenido basado en las guías de la AEP, OMS y ESPGHAN.
          </p>
          <p className="text-xs text-text-muted mt-1">
            Para uso informativo. Consulta siempre con tu pediatra.
          </p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
