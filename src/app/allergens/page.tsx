'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ProgressBar from '@/components/ProgressBar';
import { useAllergens, type AllergenStatus } from '@/hooks/useAllergens';
import { allergens } from '@/data/allergens';
import { cn } from '@/lib/utils';

function AllergenCard({
  allergen,
  status,
  onUpdate,
}: {
  allergen: (typeof allergens)[0];
  status: AllergenStatus | undefined;
  onUpdate: (s: AllergenStatus) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [date, setDate] = useState(status?.dateIntroduced ?? new Date().toISOString().split('T')[0]);
  const [reaction, setReaction] = useState<AllergenStatus['reaction']>(status?.reaction ?? 'none');
  const [notes, setNotes] = useState(status?.notes ?? '');

  const isIntroduced = status?.introduced ?? false;
  const statusIcon = !isIntroduced
    ? '⏳'
    : status?.reaction === 'none'
      ? '✅'
      : status?.reaction === 'mild'
        ? '⚠️'
        : '🚨';
  const statusLabel = !isIntroduced
    ? 'Pendiente'
    : status?.reaction === 'none'
      ? 'Introducido sin reacción'
      : status?.reaction === 'mild'
        ? 'Reacción leve'
        : status?.reaction === 'moderate'
          ? 'Reacción moderada'
          : 'Reacción severa';

  const handleSave = () => {
    onUpdate({
      allergenId: allergen.id,
      introduced: true,
      dateIntroduced: date,
      reaction,
      notes,
    });
    setShowForm(false);
  };

  const handleReset = () => {
    onUpdate({
      allergenId: allergen.id,
      introduced: false,
      dateIntroduced: null,
      reaction: null,
      notes: '',
    });
    setShowForm(false);
    setExpanded(false);
  };

  return (
    <div
      className={cn(
        'bg-white rounded-2xl shadow-sm overflow-hidden transition-all',
        isIntroduced && status?.reaction === 'none' && 'ring-1 ring-green-app/30',
        isIntroduced && status?.reaction && status.reaction !== 'none' && 'ring-1 ring-red-app/30'
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 flex items-center gap-3"
      >
        <span className="text-3xl">{allergen.emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">{allergen.nameEs}</h3>
          <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
            <span>{statusIcon}</span>
            <span>{statusLabel}</span>
          </p>
        </div>
        <span className={cn('text-lg transition-transform', expanded && 'rotate-180')}>
          ▾
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3">
          <p className="text-sm text-text-secondary">{allergen.description}</p>

          <div className="bg-blue-light rounded-xl p-3">
            <p className="text-xs font-semibold text-blue-app mb-1">Cómo introducirlo</p>
            <p className="text-sm">{allergen.tipForIntroduction}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-text-muted mb-1.5">Alimentos comunes</p>
            <div className="flex flex-wrap gap-1.5">
              {allergen.commonFoods.map(f => (
                <span key={f} className="bg-cream-dark px-2.5 py-1 rounded-full text-xs">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {isIntroduced && !showForm && (
            <div className="bg-green-light rounded-xl p-3">
              <p className="text-xs text-text-muted">
                Introducido el {new Date(status!.dateIntroduced!).toLocaleDateString('es-ES')}
              </p>
              {status?.notes && <p className="text-sm mt-1">{status.notes}</p>}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setShowForm(true)}
                  className="text-xs text-green-dark font-medium underline"
                >
                  Editar
                </button>
                <button
                  onClick={handleReset}
                  className="text-xs text-red-app font-medium underline"
                >
                  Resetear
                </button>
              </div>
            </div>
          )}

          {!isIntroduced && !showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-green-app text-white font-semibold py-2.5 rounded-xl hover:bg-green-dark transition text-sm"
            >
              Registrar introducción
            </button>
          )}

          {showForm && (
            <div className="bg-cream rounded-xl p-3 space-y-3">
              <div>
                <label className="text-xs font-semibold text-text-muted block mb-1">
                  Fecha de introducción
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-white border border-cream-dark rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-text-muted block mb-1">
                  Reacción
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: 'none' as const, label: 'Ninguna ✅', color: 'bg-green-light text-green-dark' },
                    { value: 'mild' as const, label: 'Leve ⚠️', color: 'bg-orange-light text-orange-dark' },
                    { value: 'moderate' as const, label: 'Moderada 🟠', color: 'bg-orange-light text-orange-dark' },
                    { value: 'severe' as const, label: 'Severa 🚨', color: 'bg-red-light text-red-app' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setReaction(opt.value)}
                      className={cn(
                        'px-3 py-2 rounded-lg text-xs font-medium transition',
                        reaction === opt.value ? opt.color + ' ring-2 ring-current' : 'bg-white text-text-muted'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-text-muted block mb-1">
                  Notas (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Observaciones sobre la reacción, cantidad, etc."
                  className="w-full bg-white border border-cream-dark rounded-lg px-3 py-2 text-sm resize-none"
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-app text-white font-semibold py-2.5 rounded-xl hover:bg-green-dark transition text-sm"
                >
                  Guardar
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 rounded-xl bg-cream-dark text-text-muted text-sm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function AllergensPage() {
  const { statuses, updateAllergen, getAllergenStatus, getIntroducedCount, loaded } = useAllergens();

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🥜</div>
          <p className="text-text-muted">Cargando...</p>
        </div>
      </div>
    );
  }

  const introduced = getIntroducedCount();
  const total = allergens.length;
  const pct = Math.round((introduced / total) * 100);

  return (
    <div className="pb-20">
      <header className="bg-gradient-to-br from-orange-app to-orange-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">🥜 Alérgenos</h1>
          <p className="text-orange-100 text-sm mt-1">
            Seguimiento de alérgenos principales
          </p>
          <div className="mt-3 bg-white/15 rounded-2xl p-3">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progreso</span>
              <span className="font-bold">{introduced}/{total} introducidos</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        <div className="bg-blue-light rounded-2xl p-4">
          <p className="text-sm">
            <strong>Según la AEP:</strong> No hay beneficio en retrasar la introducción de alérgenos
            más allá de los 6 meses. La introducción temprana puede reducir el riesgo de alergia.
          </p>
          <p className="text-xs text-text-muted mt-2">
            Observa 2-3 días después de cada alérgeno nuevo. Si hay antecedentes familiares, consulta primero con tu pediatra.
          </p>
        </div>

        {allergens.map(allergen => (
          <AllergenCard
            key={allergen.id}
            allergen={allergen}
            status={getAllergenStatus(allergen.id)}
            onUpdate={updateAllergen}
          />
        ))}

        <div className="text-xs text-text-muted text-center py-4">
          <p>Ante cualquier reacción moderada o severa, acude a urgencias.</p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
