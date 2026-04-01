'use client';

import { useState, useMemo } from 'react';
import Navigation from '@/components/Navigation';
import { useFoodDiary, type FoodEntry } from '@/hooks/useFoodDiary';
import { foods } from '@/data/foods';
import { cn, formatDate } from '@/lib/utils';

function AddEntryForm({ onAdd, onCancel }: { onAdd: (entry: Omit<FoodEntry, 'id'>) => void; onCancel: () => void }) {
  const [foodId, setFoodId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [reaction, setReaction] = useState<FoodEntry['reaction']>('none');
  const [accepted, setAccepted] = useState(true);
  const [notes, setNotes] = useState('');
  const [search, setSearch] = useState('');

  const filteredFoods = useMemo(() => {
    if (!search) return foods.slice(0, 20);
    const q = search.toLowerCase();
    return foods.filter(f => f.nameEs.toLowerCase().includes(q) || f.nameEn.toLowerCase().includes(q));
  }, [search]);

  const selectedFood = foods.find(f => f.id === foodId);

  const handleSubmit = () => {
    if (!foodId || !selectedFood) return;
    onAdd({
      foodId,
      foodName: selectedFood.nameEs,
      date,
      reaction,
      accepted,
      notes,
    });
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
      <h3 className="font-semibold">Nuevo registro</h3>

      {/* Food selection */}
      <div>
        <label className="text-xs font-semibold text-text-muted block mb-1">Alimento</label>
        {selectedFood ? (
          <div className="flex items-center justify-between bg-green-light rounded-xl p-3">
            <span className="text-sm font-medium">
              {selectedFood.emoji} {selectedFood.nameEs}
            </span>
            <button
              onClick={() => { setFoodId(''); setSearch(''); }}
              className="text-xs text-text-muted underline"
            >
              Cambiar
            </button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              placeholder="Buscar alimento..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-cream border border-cream-dark rounded-lg px-3 py-2 text-sm mb-2"
            />
            <div className="max-h-40 overflow-y-auto space-y-1">
              {filteredFoods.map(f => (
                <button
                  key={f.id}
                  onClick={() => { setFoodId(f.id); setSearch(''); }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-green-light transition flex items-center gap-2"
                >
                  <span>{f.emoji}</span>
                  <span>{f.nameEs}</span>
                  <span className="text-xs text-text-muted ml-auto">{f.nameEn}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="text-xs font-semibold text-text-muted block mb-1">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="w-full bg-cream border border-cream-dark rounded-lg px-3 py-2 text-sm"
        />
      </div>

      {/* Reaction */}
      <div>
        <label className="text-xs font-semibold text-text-muted block mb-1">Reacción</label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'none' as const, label: 'Ninguna ✅' },
            { value: 'mild' as const, label: 'Leve ⚠️' },
            { value: 'moderate' as const, label: 'Moderada 🟠' },
            { value: 'severe' as const, label: 'Severa 🚨' },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setReaction(opt.value)}
              className={cn(
                'px-3 py-2 rounded-lg text-xs font-medium transition border-2',
                reaction === opt.value ? 'border-green-app bg-green-light' : 'border-cream-dark bg-cream'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Accepted */}
      <div>
        <label className="text-xs font-semibold text-text-muted block mb-1">¿Le gustó?</label>
        <div className="flex gap-2">
          <button
            onClick={() => setAccepted(true)}
            className={cn(
              'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition border-2',
              accepted ? 'border-green-app bg-green-light' : 'border-cream-dark bg-cream'
            )}
          >
            Sí 😋
          </button>
          <button
            onClick={() => setAccepted(false)}
            className={cn(
              'flex-1 px-3 py-2 rounded-lg text-sm font-medium transition border-2',
              !accepted ? 'border-orange-app bg-orange-light' : 'border-cream-dark bg-cream'
            )}
          >
            No 😕
          </button>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="text-xs font-semibold text-text-muted block mb-1">Notas (opcional)</label>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Cantidad, textura, cómo lo preparaste..."
          className="w-full bg-cream border border-cream-dark rounded-lg px-3 py-2 text-sm resize-none"
          rows={2}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={!foodId}
          className={cn(
            'flex-1 font-semibold py-2.5 rounded-xl transition text-sm',
            foodId
              ? 'bg-green-app text-white hover:bg-green-dark'
              : 'bg-cream-dark text-text-muted cursor-not-allowed'
          )}
        >
          Guardar
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2.5 rounded-xl bg-cream-dark text-text-muted text-sm"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

function DiaryEntry({ entry, onRemove }: { entry: FoodEntry; onRemove: () => void }) {
  const food = foods.find(f => f.id === entry.foodId);
  const reactionLabel = {
    none: '✅ Sin reacción',
    mild: '⚠️ Leve',
    moderate: '🟠 Moderada',
    severe: '🚨 Severa',
  }[entry.reaction];

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm flex items-start gap-3">
      <span className="text-2xl">{food?.emoji ?? '🍽️'}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">{entry.foodName}</h4>
          <span className="text-xs text-text-muted">{entry.accepted ? '😋' : '😕'}</span>
        </div>
        <p className="text-xs text-text-muted mt-0.5">{reactionLabel}</p>
        {entry.notes && <p className="text-xs text-text-secondary mt-1">{entry.notes}</p>}
      </div>
      <button
        onClick={onRemove}
        className="text-text-muted hover:text-red-app text-xs p-1 transition shrink-0"
        title="Eliminar"
      >
        ✕
      </button>
    </div>
  );
}

export default function DiaryPage() {
  const { entries, addEntry, removeEntry, getFoodsTried, exportDiary, loaded } = useFoodDiary();
  const [showForm, setShowForm] = useState(false);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, FoodEntry[]> = {};
    entries.forEach(e => {
      if (!groups[e.date]) groups[e.date] = [];
      groups[e.date].push(e);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [entries]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">📓</div>
          <p className="text-text-muted">Cargando...</p>
        </div>
      </div>
    );
  }

  const handleExport = () => {
    const csv = exportDiary();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `diario-alimentar-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pb-20">
      <header className="bg-gradient-to-br from-green-app to-green-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">📓 Diario de comidas</h1>
          <p className="text-green-100 text-sm mt-1">
            {getFoodsTried()} alimentos diferentes probados
          </p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        {/* Actions */}
        <div className="flex gap-2">
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex-1 bg-green-app text-white font-semibold py-3 rounded-xl hover:bg-green-dark transition text-sm"
            >
              + Nuevo registro
            </button>
          )}
          {entries.length > 0 && (
            <button
              onClick={handleExport}
              className="px-4 py-3 rounded-xl bg-white shadow-sm text-text-muted text-sm hover:bg-cream transition"
              title="Exportar CSV"
            >
              📤 Exportar
            </button>
          )}
        </div>

        {/* Add Form */}
        {showForm && (
          <AddEntryForm
            onAdd={(entry) => { addEntry(entry); setShowForm(false); }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Entries grouped by date */}
        {groupedByDate.length === 0 && !showForm && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="font-semibold text-lg mb-2">Tu diario está vacío</h2>
            <p className="text-text-muted text-sm">
              Registra lo que come tu bebé para llevar un seguimiento.
            </p>
          </div>
        )}

        {groupedByDate.map(([date, dayEntries]) => (
          <div key={date}>
            <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2 mt-2">
              {formatDate(date)}
            </h3>
            <div className="space-y-2">
              {dayEntries.map(entry => (
                <DiaryEntry
                  key={entry.id}
                  entry={entry}
                  onRemove={() => removeEntry(entry.id)}
                />
              ))}
            </div>
          </div>
        ))}

        {entries.length > 0 && (
          <div className="text-xs text-text-muted text-center py-4">
            <p>Puedes exportar el diario como CSV para mostrárselo a tu pediatra.</p>
          </div>
        )}
      </main>

      <Navigation />
    </div>
  );
}
