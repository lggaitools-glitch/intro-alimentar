'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { referenceCards } from '@/data/safetyTips';
import { cn } from '@/lib/utils';

function ReferenceCard({ card }: { card: (typeof referenceCards)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const isEmergency = card.id === 'emergency-signs';

  return (
    <div
      className={cn(
        'rounded-2xl shadow-sm overflow-hidden',
        isEmergency ? 'bg-red-light ring-1 ring-red-app/20' : 'bg-white'
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-center gap-3"
      >
        <span className="text-3xl">{card.emoji}</span>
        <div className="flex-1">
          <h3 className={cn(
            'font-semibold',
            isEmergency && 'text-red-app'
          )}>{card.title}</h3>
          <p className="text-xs text-text-muted mt-0.5">{card.items.length} elementos</p>
        </div>
        <span className={cn('text-lg transition-transform', expanded && 'rotate-180')}>
          ▾
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4">
          <div className="space-y-3">
            {card.items.map((item, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-xl p-3',
                  isEmergency ? 'bg-white' : 'bg-cream'
                )}
              >
                <h4 className={cn(
                  'font-semibold text-sm',
                  isEmergency && 'text-red-app'
                )}>{item.label}</h4>
                <p className="text-sm text-text-secondary mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
          {isEmergency && (
            <div className="mt-4 bg-red-app text-white rounded-xl p-4 text-center">
              <p className="font-bold text-lg">Emergencias: 112</p>
              <p className="text-sm mt-1 text-red-100">
                En caso de atragantamiento real o anafilaxia, llama inmediatamente.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ReferencePage() {
  return (
    <div className="pb-20">
      <header className="bg-gradient-to-br from-orange-app to-orange-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">⚠️ Referencia rápida</h1>
          <p className="text-orange-100 text-sm mt-1">
            Guías de seguridad, alimentos a evitar y emergencias
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        {/* Emergency card first */}
        {referenceCards
          .sort((a, b) => (a.id === 'emergency-signs' ? -1 : b.id === 'emergency-signs' ? 1 : 0))
          .map(card => (
            <ReferenceCard key={card.id} card={card} />
          ))}

        <div className="bg-blue-light rounded-2xl p-4 mt-4">
          <h3 className="font-semibold text-blue-app text-sm mb-1">Recuerda siempre</h3>
          <ul className="space-y-1 text-sm text-text-secondary">
            <li>• Supervisa SIEMPRE al bebé mientras come</li>
            <li>• Sentado erguido en su trona, nunca reclinado</li>
            <li>• Sin pantallas ni distracciones durante la comida</li>
            <li>• Nunca forzar ni meter comida en la boca</li>
            <li>• Diferencia entre arcada (normal) y atragantamiento (silencioso)</li>
          </ul>
        </div>

        <div className="text-xs text-text-muted text-center py-4">
          <p>Esta información no sustituye la consulta médica.</p>
          <p>En caso de emergencia, llama al 112.</p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
