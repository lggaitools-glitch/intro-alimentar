'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';

export default function SetupPage() {
  const router = useRouter();
  const { profile, updateProfile, loaded } = useProfile();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [feedingType, setFeedingType] = useState<'breast' | 'formula' | 'mixed'>('breast');

  useEffect(() => {
    if (loaded) {
      setName(profile.name);
      setDob(profile.dateOfBirth);
      setFeedingType(profile.feedingType);
    }
  }, [loaded, profile]);

  if (!loaded) return null;

  const canSave = name.trim() !== '' && dob !== '';

  const handleSave = () => {
    updateProfile({ name: name.trim(), dateOfBirth: dob, feedingType });
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gradient-to-br from-green-app to-green-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">🍼 Configurar perfil</h1>
          <p className="text-green-100 text-sm mt-1">Datos de tu bebé para personalizar el plan</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 mt-6 flex-1 w-full">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1.5">Nombre del bebé</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Ej: Lucía"
              className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-green-app text-text-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5">Fecha de nacimiento</label>
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-cream-dark bg-white focus:outline-none focus:ring-2 focus:ring-green-app text-text-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Tipo de alimentación actual</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: 'breast' as const, label: 'Pecho', emoji: '🤱' },
                { value: 'formula' as const, label: 'Fórmula', emoji: '🍼' },
                { value: 'mixed' as const, label: 'Mixta', emoji: '🤱🍼' },
              ]).map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFeedingType(opt.value)}
                  className={`p-3 rounded-xl text-center border-2 transition ${
                    feedingType === opt.value
                      ? 'border-green-app bg-green-light'
                      : 'border-cream-dark bg-white hover:border-green-app/50'
                  }`}
                >
                  <div className="text-xl">{opt.emoji}</div>
                  <div className="text-xs font-medium mt-1">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {profile.approach && (
            <div className="bg-blue-light rounded-xl p-3">
              <p className="text-sm font-medium">
                Enfoque seleccionado: {
                  profile.approach === 'traditional' ? '🥣 Purés tradicional' :
                  profile.approach === 'blw' ? '🤚 BLW' : '🍽️ Mixto'
                }
              </p>
            </div>
          )}

          {profile.startDate && (
            <div className="bg-green-light rounded-xl p-3">
              <p className="text-sm font-medium text-green-dark">
                AC iniciada el {new Date(profile.startDate).toLocaleDateString('es-ES')}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={!canSave}
          className={`w-full mt-8 py-3 rounded-xl font-semibold text-white transition ${
            canSave ? 'bg-green-app hover:bg-green-dark' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Guardar y continuar
        </button>

        <p className="text-xs text-text-muted text-center mt-4 mb-8">
          Los datos se guardan solo en tu dispositivo. No se comparten con nadie.
        </p>
      </main>
    </div>
  );
}
