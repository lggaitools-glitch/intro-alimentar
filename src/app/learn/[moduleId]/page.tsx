'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import ProgressBar from '@/components/ProgressBar';
import { useLearningProgress } from '@/hooks/useLearningProgress';
import { modules, lessons, type Lesson } from '@/data/lessons';
import { cn } from '@/lib/utils';

function LessonView({
  lesson,
  isCompleted,
  onComplete,
  onQuizScore,
  quizScore,
}: {
  lesson: Lesson;
  isCompleted: boolean;
  onComplete: () => void;
  onQuizScore: (score: number) => void;
  quizScore: number | undefined;
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleQuizSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    const score = selectedAnswer === lesson.quizQuestion?.correctIndex ? 1 : 0;
    onQuizScore(score);
  };

  return (
    <div className="space-y-4">
      {/* Content */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs bg-blue-light text-blue-app px-2 py-0.5 rounded-full font-medium">
            {lesson.readTimeMinutes} min de lectura
          </span>
          {isCompleted && (
            <span className="text-xs bg-green-light text-green-dark px-2 py-0.5 rounded-full font-medium">
              Completada ✓
            </span>
          )}
        </div>
        <h2 className="text-xl font-bold mb-4">{lesson.title}</h2>
        <div className="prose-sm text-text-secondary leading-relaxed space-y-3">
          {lesson.content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('## ')) {
              return <h3 key={i} className="font-bold text-text-primary text-base mt-4">{paragraph.replace('## ', '')}</h3>;
            }
            if (paragraph.startsWith('- ')) {
              return (
                <ul key={i} className="space-y-1.5 ml-1">
                  {paragraph.split('\n').map((line, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <span className="text-green-app shrink-0">•</span>
                      <span>{line.replace(/^- /, '')}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            if (paragraph.startsWith('**')) {
              return <p key={i} className="font-semibold text-text-primary text-sm">{paragraph.replace(/\*\*/g, '')}</p>;
            }
            return <p key={i} className="text-sm">{paragraph}</p>;
          })}
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-green-light rounded-2xl p-4">
        <h3 className="font-semibold text-green-dark mb-2">Puntos clave</h3>
        <ul className="space-y-1.5">
          {lesson.keyTakeaways.map((takeaway, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="text-green-app shrink-0">✓</span>
              <span>{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Quiz */}
      {lesson.quizQuestion && (
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <h3 className="font-semibold mb-3">🧠 Pregunta de repaso</h3>
          <p className="text-sm text-text-secondary mb-3">{lesson.quizQuestion.question}</p>
          <div className="space-y-2">
            {lesson.quizQuestion.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => { if (!showResult) setSelectedAnswer(i); }}
                className={cn(
                  'w-full text-left p-3 rounded-xl text-sm transition border-2',
                  !showResult && selectedAnswer === i && 'border-blue-app bg-blue-light',
                  !showResult && selectedAnswer !== i && 'border-cream-dark bg-cream hover:border-blue-app/50',
                  showResult && i === lesson.quizQuestion!.correctIndex && 'border-green-app bg-green-light',
                  showResult && selectedAnswer === i && i !== lesson.quizQuestion!.correctIndex && 'border-red-app bg-red-light',
                  showResult && selectedAnswer !== i && i !== lesson.quizQuestion!.correctIndex && 'border-cream-dark bg-cream opacity-50'
                )}
              >
                {opt}
              </button>
            ))}
          </div>
          {!showResult && selectedAnswer !== null && (
            <button
              onClick={handleQuizSubmit}
              className="w-full mt-3 bg-blue-app text-white font-semibold py-2.5 rounded-xl hover:bg-blue-700 transition text-sm"
            >
              Comprobar respuesta
            </button>
          )}
          {showResult && (
            <div className={cn(
              'mt-3 p-3 rounded-xl text-sm',
              selectedAnswer === lesson.quizQuestion.correctIndex
                ? 'bg-green-light text-green-dark'
                : 'bg-orange-light text-orange-dark'
            )}>
              <p className="font-semibold">
                {selectedAnswer === lesson.quizQuestion.correctIndex ? '¡Correcto!' : 'No del todo...'}
              </p>
              <p className="mt-1">{lesson.quizQuestion.explanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Mark Complete */}
      {!isCompleted && (
        <button
          onClick={onComplete}
          className="w-full bg-green-app text-white font-semibold py-3 rounded-xl hover:bg-green-dark transition"
        >
          Marcar como completada ✓
        </button>
      )}
    </div>
  );
}

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;
  const { progress, completeLesson, saveQuizScore, isLessonCompleted, getModuleProgress, loaded } = useLearningProgress();
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const mod = modules.find(m => m.id === moduleId);

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

  if (!mod) {
    return (
      <div className="pb-20">
        <main className="max-w-lg mx-auto px-4 mt-8 text-center">
          <div className="text-5xl mb-4">🤔</div>
          <h1 className="font-bold text-xl mb-2">Módulo no encontrado</h1>
          <Link href="/learn" className="text-green-dark font-medium underline">
            Volver a Aprender
          </Link>
        </main>
        <Navigation />
      </div>
    );
  }

  const moduleLessons = mod.lessonIds
    .map(id => lessons.find(l => l.id === id))
    .filter((l): l is Lesson => l !== undefined);
  const modProgress = getModuleProgress(mod.lessonIds);
  const activeLesson = activeLessonId ? moduleLessons.find(l => l.id === activeLessonId) : null;

  if (activeLesson) {
    return (
      <div className="pb-20">
        <header className="bg-gradient-to-br from-blue-app to-blue-700 text-white p-4 rounded-b-3xl">
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => setActiveLessonId(null)}
              className="flex items-center gap-1 text-sm text-blue-100 hover:text-white transition mb-2"
            >
              ← Volver al módulo
            </button>
            <h1 className="text-lg font-bold">{activeLesson.title}</h1>
            <p className="text-blue-100 text-xs mt-0.5">{mod.emoji} {mod.title}</p>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-4 mt-4 space-y-3">
          <LessonView
            lesson={activeLesson}
            isCompleted={isLessonCompleted(activeLesson.id)}
            onComplete={() => completeLesson(activeLesson.id)}
            onQuizScore={(score) => saveQuizScore(activeLesson.id, score)}
            quizScore={progress.quizScores[activeLesson.id]}
          />
        </main>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <header className="bg-gradient-to-br from-blue-app to-blue-700 text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <Link
            href="/learn"
            className="flex items-center gap-1 text-sm text-blue-100 hover:text-white transition mb-2"
          >
            ← Todos los módulos
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{mod.emoji}</span>
            <div>
              <h1 className="text-xl font-bold">{mod.title}</h1>
              <p className="text-blue-100 text-sm mt-0.5">{mod.description}</p>
            </div>
          </div>
          <div className="mt-3">
            <ProgressBar
              percentage={modProgress.percentage}
              label={`${modProgress.completed}/${modProgress.total} lecciones`}
              color="blue"
            />
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4 space-y-2">
        {moduleLessons.map((lesson, idx) => {
          const completed = isLessonCompleted(lesson.id);
          return (
            <button
              key={lesson.id}
              onClick={() => setActiveLessonId(lesson.id)}
              className="w-full text-left bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition flex items-center gap-3"
            >
              <div
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0',
                  completed
                    ? 'bg-green-app text-white'
                    : 'bg-cream-dark text-text-muted'
                )}
              >
                {completed ? '✓' : idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm">{lesson.title}</h3>
                <p className="text-xs text-text-muted mt-0.5">
                  {lesson.readTimeMinutes} min · {lesson.keyTakeaways.length} puntos clave
                  {lesson.quizQuestion && ' · Quiz'}
                </p>
              </div>
              <span className="text-text-muted">→</span>
            </button>
          );
        })}
      </main>

      <Navigation />
    </div>
  );
}
