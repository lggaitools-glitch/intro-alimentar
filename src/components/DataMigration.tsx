'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import { getItem, removeItem } from '@/lib/storage';
import type { BabyProfile } from '@/hooks/useProfile';
import type { FoodEntry } from '@/hooks/useFoodDiary';
import type { AllergenStatus } from '@/hooks/useAllergens';
import type { LearningProgress } from '@/hooks/useLearningProgress';

const STORAGE_KEYS = {
  profile: 'intro-alimentar-profile',
  diary: 'intro-alimentar-diary',
  allergens: 'intro-alimentar-allergens',
  learning: 'intro-alimentar-learning',
};

const MIGRATION_DONE_KEY = 'intro-alimentar-migration-done';

function hasLocalData(): boolean {
  return Object.values(STORAGE_KEYS).some(key => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed.length > 0;
      if (typeof parsed === 'object' && parsed !== null) {
        return Object.values(parsed).some(v => v !== '' && v !== null && v !== false);
      }
      return false;
    } catch {
      return false;
    }
  });
}

export default function DataMigration() {
  const { user, supabaseAvailable } = useAuth();
  const [show, setShow] = useState(false);
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    if (!user || !supabaseAvailable) return;
    if (typeof window === 'undefined') return;

    const alreadyDone = localStorage.getItem(MIGRATION_DONE_KEY);
    if (alreadyDone) return;

    if (hasLocalData()) {
      setShow(true);
    }
  }, [user, supabaseAvailable]);

  async function handleMigrate() {
    if (!user) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setMigrating(true);

    try {
      // Migrate profile → babies table
      const profile = getItem<BabyProfile>(STORAGE_KEYS.profile, null as unknown as BabyProfile);
      let babyId: string | null = null;

      if (profile && profile.name) {
        const { data } = await supabase.from('babies').insert({
          user_id: user.id,
          name: profile.name,
          date_of_birth: profile.dateOfBirth || null,
          feeding_type: profile.feedingType || 'breast',
          approach: profile.approach || null,
          start_date: profile.startDate || null,
        }).select('id').single();

        babyId = data?.id ?? null;
      }

      // Migrate diary entries
      if (babyId) {
        const diary = getItem<FoodEntry[]>(STORAGE_KEYS.diary, []);
        if (diary.length > 0) {
          const rows = diary.map(e => ({
            user_id: user.id,
            baby_id: babyId,
            food_id: e.foodId,
            food_name: e.foodName,
            date: e.date,
            reaction: e.reaction,
            accepted: e.accepted,
            notes: e.notes,
          }));
          await supabase.from('food_diary').insert(rows);
        }

        // Migrate allergens
        const allergens = getItem<AllergenStatus[]>(STORAGE_KEYS.allergens, []);
        if (allergens.length > 0) {
          const rows = allergens
            .filter(a => a.introduced)
            .map(a => ({
              user_id: user.id,
              baby_id: babyId,
              allergen_id: a.allergenId,
              date_introduced: a.dateIntroduced || null,
              reaction: a.reaction || null,
              notes: a.notes || '',
            }));
          if (rows.length > 0) {
            await supabase.from('allergen_tracking').insert(rows);
          }
        }
      }

      // Migrate learning progress
      const learning = getItem<LearningProgress>(STORAGE_KEYS.learning, { lessonsCompleted: [], quizScores: {} });
      if (learning.lessonsCompleted.length > 0) {
        const rows = learning.lessonsCompleted.map(lessonId => ({
          user_id: user.id,
          module_id: lessonId.split('-')[0] || lessonId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
        }));
        await supabase.from('learning_progress').insert(rows);
      }

      // Clear localStorage
      Object.values(STORAGE_KEYS).forEach(key => removeItem(key));
      localStorage.setItem(MIGRATION_DONE_KEY, 'true');
      setShow(false);
      window.location.reload();
    } catch (err) {
      console.error('Migration failed:', err);
    } finally {
      setMigrating(false);
    }
  }

  function handleSkip() {
    Object.values(STORAGE_KEYS).forEach(key => removeItem(key));
    localStorage.setItem(MIGRATION_DONE_KEY, 'true');
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-sm w-full p-6">
        <h2 className="text-lg font-bold text-text-primary mb-2">📦 Datos locales detectados</h2>
        <p className="text-sm text-text-secondary mb-5">
          Hemos detectado datos guardados en este dispositivo. ¿Quieres vincularlos a tu cuenta?
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            disabled={migrating}
            className="flex-1 py-2 rounded-xl border border-cream-dark text-text-secondary font-medium hover:bg-cream transition disabled:opacity-50"
          >
            Empezar de cero
          </button>
          <button
            onClick={handleMigrate}
            disabled={migrating}
            className="flex-1 py-2 rounded-xl bg-green-app text-white font-semibold hover:bg-green-dark transition disabled:opacity-50"
          >
            {migrating ? 'Migrando...' : 'Sí, vincular'}
          </button>
        </div>
      </div>
    </div>
  );
}
