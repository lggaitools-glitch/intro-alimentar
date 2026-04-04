'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { useProfile } from '@/hooks/useProfile';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  question: string;
  options: { text: string; scores: { traditional: number; blw: number; mixed: number } }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    question: '¿Cómo te sientes preparando la comida del bebé?',
    options: [
      { text: 'Prefiero tener control total sobre qué y cuánto come', scores: { traditional: 3, blw: 0, mixed: 1 } },
      { text: 'Me gusta la idea de que explore la comida por sí mismo', scores: { traditional: 0, blw: 3, mixed: 1 } },
      { text: 'Un poco de cada: a veces purés, a veces trozos', scores: { traditional: 1, blw: 1, mixed: 3 } },
    ],
  },
  {
    question: '¿Qué opinas sobre el tema de ensuciar?',
    options: [
      { text: 'Prefiero minimizar el caos al máximo', scores: { traditional: 3, blw: 0, mixed: 1 } },
      { text: 'No me importa: ensuciar es aprender', scores: { traditional: 0, blw: 3, mixed: 1 } },
      { text: 'Lo tolero, pero no me entusiasma', scores: { traditional: 1, blw: 1, mixed: 3 } },
    ],
  },
  {
    question: '¿Cuánto tiempo puedes dedicar a cada comida?',
    options: [
      { text: 'Poco — necesito que sea rápido y eficiente', scores: { traditional: 3, blw: 0, mixed: 1 } },
      { text: 'Puedo dedicar 20-30 minutos sin prisas', scores: { traditional: 0, blw: 3, mixed: 2 } },
      { text: 'Depende del día, variable', scores: { traditional: 1, blw: 1, mixed: 3 } },
    ],
  },
  {
    question: '¿El bebé va a una guardería?',
    options: [
      { text: 'Sí, y allí le dan purés', scores: { traditional: 3, blw: 0, mixed: 2 } },
      { text: 'No, come siempre conmigo/familia', scores: { traditional: 0, blw: 3, mixed: 1 } },
      { text: 'Sí, pero son flexibles con el formato', scores: { traditional: 1, blw: 1, mixed: 3 } },
    ],
  },
  {
    question: '¿Cómo de nervioso/a estás con el tema del atragantamiento?',
    options: [
      { text: 'Mucho — prefiero empezar con texturas suaves', scores: { traditional: 3, blw: 0, mixed: 1 } },
      { text: 'He leído sobre ello y confío en los reflejos del bebé', scores: { traditional: 0, blw: 3, mixed: 1 } },
      { text: 'Normal — quiero informarme pero no me paraliza', scores: { traditional: 1, blw: 1, mixed: 3 } },
    ],
  },
];

const approachInfo = {
  traditional: {
    name: 'Tradicional (purés)',
    emoji: '🥣',
    color: 'orange',
    description: 'Empiezas con purés y triturados finos, y vas aumentando la textura gradualmente. El adulto da de comer al bebé con cuchara.',
    pros: [
      'Mayor control de la cantidad ingerida',
      'Menos estrés con el atragantamiento al inicio',
      'Compatible con guarderías',
      'Más rápido al principio',
    ],
    cons: [
      'Puede retrasar la aceptación de texturas si no se progresa',
      'Menos exploración sensorial',
      'Hay que evolucionar las texturas activamente (8-9 meses: grumoso)',
    ],
    tip: 'La AEP recuerda: es fundamental avanzar hacia texturas grumosas antes de los 8-9 meses. No quedarse en purés finos demasiado tiempo.',
  },
  blw: {
    name: 'BLW (Baby-Led Weaning)',
    emoji: '🤲',
    color: 'green',
    description: 'El bebé come trozos adaptados a su edad desde el inicio. Él decide qué coger, cuánto comer y a qué ritmo.',
    pros: [
      'Fomenta la autonomía y la motricidad fina',
      'El bebé come la misma comida que la familia (adaptada)',
      'Mayor aceptación de texturas variadas',
      'Respeta el apetito del bebé naturalmente',
    ],
    cons: [
      'Más caos y limpieza',
      'Requiere más tiempo en cada comida',
      'Las arcadas iniciales pueden asustar',
      'Hay que aprender los cortes seguros',
    ],
    tip: 'La AEP indica que el BLW es seguro cuando se cumplen los signos de preparación y se siguen las recomendaciones de seguridad.',
  },
  mixed: {
    name: 'Mixto (BLISS)',
    emoji: '🍽️',
    color: 'blue',
    description: 'Combina lo mejor de ambos mundos: purés cuando sea práctico y trozos cuando haya tiempo. El enfoque BLISS añade un foco especial en hierro.',
    pros: [
      'Flexibilidad según el día y la situación',
      'Compatible con guardería (purés) y casa (trozos)',
      'El bebé explora pero también recibe nutrientes de forma eficiente',
      'Menor presión sobre los padres',
    ],
    cons: [
      'Menos definido: puede ser confuso al principio',
      'Requiere estar atento a no quedarse solo en purés',
    ],
    tip: 'Muchas familias acaban haciendo un enfoque mixto de forma natural. La AEP no recomienda un método sobre otro: lo importante es la variedad y la seguridad.',
  },
};

export default function ApproachPage() {
  const router = useRouter();
  const { profile, updateProfile, loaded } = useProfile();
  const [step, setStep] = useState<'intro' | 'quiz' | 'result' | 'detail'>('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ traditional: 0, blw: 0, mixed: 0 });
  const [selectedApproach, setSelectedApproach] = useState<'traditional' | 'blw' | 'mixed' | null>(null);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🍽️</div>
          <p className="text-text-muted">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleAnswer = (optScores: { traditional: number; blw: number; mixed: number }) => {
    const newScores = {
      traditional: scores.traditional + optScores.traditional,
      blw: scores.blw + optScores.blw,
      mixed: scores.mixed + optScores.mixed,
    };
    setScores(newScores);

    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      const best = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0] as 'traditional' | 'blw' | 'mixed';
      setSelectedApproach(best);
      setStep('result');
    }
  };

  const handleConfirm = (approach: 'traditional' | 'blw' | 'mixed') => {
    updateProfile({ approach });
    router.push('/dashboard');
  };

  const handleReset = () => {
    setStep('intro');
    setCurrentQ(0);
    setScores({ traditional: 0, blw: 0, mixed: 0 });
    setSelectedApproach(null);
  };

  if (profile.approach && step === 'intro') {
    const current = approachInfo[profile.approach];
    return (
      <div className="pb-20">
        <header className="bg-gradient-to-br from-blue-app to-blue-700 text-white p-5 rounded-b-3xl">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold">🍽️ Tu enfoque</h1>
            <p className="text-blue-100 text-sm mt-1">Puedes cambiarlo cuando quieras</p>
          </div>
        </header>
        <main className="max-w-lg mx-auto px-4 mt-4 space-y-3">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-center mb-4">
              <span className="text-5xl">{current.emoji}</span>
              <h2 className="text-xl font-bold mt-2">{current.name}</h2>
            </div>
            <p className="text-sm text-text-secondary">{current.description}</p>
            <div className="bg-green-light rounded-xl p-3 mt-3">
              <p className="text-xs font-semibold text-green-dark mb-1">AEP dice:</p>
              <p className="text-sm">{current.tip}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 bg-white shadow-sm text-text-secondary font-semibold py-3 rounded-xl hover:bg-cream transition text-sm"
            >
              Repetir test
            </button>
            <button
              onClick={() => setStep('detail')}
              className="flex-1 bg-blue-app text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition text-sm"
            >
              Cambiar enfoque
            </button>
          </div>
        </main>
        <Navigation />
      </div>
    );
  }

  return (
    <div className="pb-20">
      <header className="bg-gradient-to-br from-blue-app to-blue-700 text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">🍽️ Elige tu enfoque</h1>
          <p className="text-blue-100 text-sm mt-1">
            {step === 'quiz'
              ? `Pregunta ${currentQ + 1} de ${quizQuestions.length}`
              : step === 'result'
                ? 'Tu resultado'
                : 'Purés, BLW o mixto'}
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        {/* Intro */}
        {step === 'intro' && (
          <>
            <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <div className="text-5xl mb-3">🤔</div>
              <h2 className="font-bold text-lg mb-2">¿Cómo quieres alimentar a tu bebé?</h2>
              <p className="text-sm text-text-secondary">
                Responde unas preguntas rápidas y te ayudamos a encontrar el enfoque que mejor se adapta a tu familia.
              </p>
            </div>
            <button
              onClick={() => setStep('quiz')}
              className="w-full bg-green-app text-white font-semibold py-3 rounded-xl hover:bg-green-dark transition"
            >
              Empezar el test
            </button>
            <button
              onClick={() => setStep('detail')}
              className="w-full bg-white shadow-sm text-text-secondary font-semibold py-3 rounded-xl hover:bg-cream transition text-sm"
            >
              Ya sé cuál quiero — elegir directamente
            </button>
          </>
        )}

        {/* Quiz */}
        {step === 'quiz' && (
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="h-1.5 bg-cream-dark rounded-full mb-4 overflow-hidden">
              <div
                className="h-full bg-blue-app rounded-full transition-all"
                style={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
              />
            </div>
            <h2 className="font-semibold text-lg mb-4">{quizQuestions[currentQ].question}</h2>
            <div className="space-y-2">
              {quizQuestions[currentQ].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.scores)}
                  className="w-full text-left p-4 rounded-xl bg-cream hover:bg-green-light transition text-sm border border-cream-dark hover:border-green-app/50"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {step === 'result' && selectedApproach && (
          <>
            <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
              <span className="text-5xl">{approachInfo[selectedApproach].emoji}</span>
              <h2 className="text-xl font-bold mt-3">Te recomendamos: {approachInfo[selectedApproach].name}</h2>
              <p className="text-sm text-text-secondary mt-2">{approachInfo[selectedApproach].description}</p>
            </div>

            <div className="bg-green-light rounded-2xl p-4">
              <h3 className="font-semibold text-green-dark text-sm mb-2">Ventajas</h3>
              <ul className="space-y-1">
                {approachInfo[selectedApproach].pros.map((p, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-green-app shrink-0">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-orange-light rounded-2xl p-4">
              <h3 className="font-semibold text-orange-dark text-sm mb-2">A tener en cuenta</h3>
              <ul className="space-y-1">
                {approachInfo[selectedApproach].cons.map((c, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-orange-app shrink-0">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-light rounded-2xl p-3">
              <p className="text-xs font-semibold text-blue-app mb-1">Nota de la AEP</p>
              <p className="text-sm">{approachInfo[selectedApproach].tip}</p>
            </div>

            <button
              onClick={() => handleConfirm(selectedApproach)}
              className="w-full bg-green-app text-white font-semibold py-3 rounded-xl hover:bg-green-dark transition"
            >
              Elegir {approachInfo[selectedApproach].name}
            </button>

            <button
              onClick={() => setStep('detail')}
              className="w-full bg-white shadow-sm text-text-muted py-3 rounded-xl text-sm"
            >
              Prefiero elegir otro enfoque
            </button>

            <button
              onClick={handleReset}
              className="w-full text-text-muted py-2 text-xs underline"
            >
              Repetir test
            </button>
          </>
        )}

        {/* Detail — direct selection */}
        {step === 'detail' && (
          <>
            <p className="text-sm text-text-muted text-center">
              Elige el enfoque que prefieras. Puedes cambiarlo en cualquier momento.
            </p>
            {(['traditional', 'blw', 'mixed'] as const).map(key => {
              const info = approachInfo[key];
              return (
                <div key={key} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{info.emoji}</span>
                    <h3 className="font-bold">{info.name}</h3>
                  </div>
                  <p className="text-sm text-text-secondary mb-3">{info.description}</p>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-green-light rounded-lg p-2">
                      <p className="text-xs font-semibold text-green-dark mb-1">Ventajas</p>
                      {info.pros.slice(0, 2).map((p, i) => (
                        <p key={i} className="text-xs">✓ {p}</p>
                      ))}
                    </div>
                    <div className="bg-orange-light rounded-lg p-2">
                      <p className="text-xs font-semibold text-orange-dark mb-1">Tener en cuenta</p>
                      {info.cons.slice(0, 2).map((c, i) => (
                        <p key={i} className="text-xs">• {c}</p>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleConfirm(key)}
                    className={cn(
                      'w-full font-semibold py-2.5 rounded-xl transition text-sm',
                      profile.approach === key
                        ? 'bg-green-app text-white'
                        : 'bg-cream text-text-secondary hover:bg-green-light'
                    )}
                  >
                    {profile.approach === key ? 'Enfoque actual ✓' : `Elegir ${info.name}`}
                  </button>
                </div>
              );
            })}

            <button
              onClick={handleReset}
              className="w-full text-text-muted py-2 text-xs underline"
            >
              ← Volver al test
            </button>
          </>
        )}

        <div className="text-xs text-text-muted text-center py-4">
          <p>La AEP no recomienda un método sobre otro. Lo importante es la seguridad y la variedad.</p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
