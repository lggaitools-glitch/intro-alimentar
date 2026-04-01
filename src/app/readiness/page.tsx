'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useProfile } from '@/hooks/useProfile';

const checks = [
  {
    id: 'sit',
    title: 'Se mantiene sentado con apoyo',
    description: 'El bebé puede sentarse erguido con buen control de cabeza y tronco, al menos con apoyo mínimo. Esto es esencial para tragar de forma segura.',
    emoji: '🪑',
  },
  {
    id: 'tongue',
    title: 'Ha perdido el reflejo de extrusión',
    description: 'Ya no empuja con la lengua todo lo que entra en la boca. Si le ofreces comida y la empuja con la lengua, aún no está listo.',
    emoji: '👅',
  },
  {
    id: 'grab',
    title: 'Puede agarrar objetos y llevarlos a la boca',
    description: 'Coordinación mano-boca: agarra objetos y se los lleva a la boca con cierta precisión.',
    emoji: '✋',
  },
  {
    id: 'interest',
    title: 'Muestra interés activo por la comida',
    description: 'Mira con curiosidad lo que comes, intenta agarrar tu comida, abre la boca cuando ve comida acercarse.',
    emoji: '👀',
  },
];

export default function ReadinessPage() {
  const router = useRouter();
  const { profile, updateProfile } = useProfile();
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allChecked = checked.size === checks.length;

  const handleStart = () => {
    updateProfile({
      readinessChecked: true,
      startDate: new Date().toISOString().split('T')[0],
    });
    router.push('/approach');
  };

  return (
    <div className="min-h-screen pb-8">
      <header className="bg-gradient-to-br from-orange-app to-orange-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <Link href="/" className="text-white/80 text-sm mb-2 inline-block">← Volver</Link>
          <h1 className="text-2xl font-bold">📋 ¿Está listo tu bebé?</h1>
          <p className="text-orange-100 text-sm mt-1">
            Señales de preparación según la AEP. Todas deben estar presentes.
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-6 space-y-4">
        {checks.map(check => (
          <button
            key={check.id}
            onClick={() => toggle(check.id)}
            className={`w-full text-left p-4 rounded-2xl border-2 transition ${
              checked.has(check.id)
                ? 'border-green-app bg-green-light'
                : 'border-cream-dark bg-white'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`mt-0.5 w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                checked.has(check.id) ? 'border-green-app bg-green-app' : 'border-gray-300'
              }`}>
                {checked.has(check.id) && <span className="text-white text-sm">✓</span>}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl">{check.emoji}</span>
                  <h3 className="font-semibold">{check.title}</h3>
                </div>
                <p className="text-sm text-text-muted mt-1">{check.description}</p>
              </div>
            </div>
          </button>
        ))}

        <div className="bg-orange-light rounded-2xl p-4 mt-4">
          <h3 className="font-semibold text-sm mb-1">⚠️ Esto NO indica que esté listo:</h3>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Despertarse mucho por la noche</li>
            <li>• Chuparse las manos constantemente</li>
            <li>• Pedir el pecho más a menudo (brote de crecimiento)</li>
            <li>• Tener un &quot;percentil bajo&quot;</li>
          </ul>
        </div>

        {allChecked && (
          <div className="bg-green-light rounded-2xl p-4">
            <h3 className="font-semibold text-green-dark mb-1">✅ ¡Tu bebé cumple todas las señales!</h3>
            <p className="text-sm text-text-secondary mb-3">
              Parece que está listo para empezar la alimentación complementaria. ¡Vamos a elegir el enfoque!
            </p>
            <button
              onClick={handleStart}
              className="w-full bg-green-app text-white font-semibold py-3 rounded-xl hover:bg-green-dark transition"
            >
              ¡Empezar la aventura! 🎉
            </button>
          </div>
        )}

        {!allChecked && checked.size > 0 && (
          <p className="text-sm text-text-muted text-center">
            {checks.length - checked.size} señal{checks.length - checked.size !== 1 ? 'es' : ''} más por confirmar. Todas deben estar presentes.
          </p>
        )}
      </main>
    </div>
  );
}
