'use client';

import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { generateId } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface FoodEntry {
  id: string;
  foodId: string;
  foodName: string;
  date: string;
  reaction: 'none' | 'mild' | 'moderate' | 'severe';
  notes: string;
  accepted: boolean;
}

const STORAGE_KEY = 'intro-alimentar-diary';

export function useFoodDiary() {
  const [entries, setEntries] = useState<FoodEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { user, loading: authLoading, supabaseAvailable } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (supabaseAvailable && user) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        supabase
          .from('food_diary')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .then(({ data }) => {
            if (data) {
              setEntries(
                data.map(d => ({
                  id: d.id,
                  foodId: d.food_id,
                  foodName: d.food_name,
                  date: d.date,
                  reaction: d.reaction,
                  notes: d.notes ?? '',
                  accepted: d.accepted,
                }))
              );
            }
            setLoaded(true);
          });
        return;
      }
    }
    setEntries(getItem(STORAGE_KEY, []));
    setLoaded(true);
  }, [user, authLoading, supabaseAvailable]);

  const addEntry = useCallback(
    (entry: Omit<FoodEntry, 'id'>) => {
      const id = generateId();
      const newEntry = { ...entry, id };

      setEntries(prev => {
        const next = [newEntry, ...prev];

        if (supabaseAvailable && user) {
          const supabase = getSupabaseBrowserClient();
          if (supabase) {
            supabase
              .from('babies')
              .select('id')
              .eq('user_id', user.id)
              .limit(1)
              .then(({ data }) => {
                const babyId = data?.[0]?.id;
                if (babyId) {
                  supabase.from('food_diary').insert({
                    id,
                    user_id: user.id,
                    baby_id: babyId,
                    food_id: entry.foodId,
                    food_name: entry.foodName,
                    date: entry.date,
                    reaction: entry.reaction,
                    accepted: entry.accepted,
                    notes: entry.notes,
                  }).then(() => {});
                }
              });
          }
        } else {
          setItem(STORAGE_KEY, next);
        }

        return next;
      });
    },
    [user, supabaseAvailable]
  );

  const removeEntry = useCallback(
    (id: string) => {
      setEntries(prev => {
        const next = prev.filter(e => e.id !== id);

        if (supabaseAvailable && user) {
          const supabase = getSupabaseBrowserClient();
          if (supabase) {
            supabase.from('food_diary').delete().eq('id', id).then(() => {});
          }
        } else {
          setItem(STORAGE_KEY, next);
        }

        return next;
      });
    },
    [user, supabaseAvailable]
  );

  const getFoodsTried = useCallback(() => {
    const unique = new Set(entries.map(e => e.foodId));
    return unique.size;
  }, [entries]);

  const hasTriedFood = useCallback(
    (foodId: string) => entries.some(e => e.foodId === foodId),
    [entries]
  );

  const getEntriesByDate = useCallback(
    (date: string) => entries.filter(e => e.date === date),
    [entries]
  );

  const exportDiary = useCallback(() => {
    const lines = ['Fecha,Alimento,Reacción,Aceptado,Notas'];
    entries.forEach(e => {
      lines.push(`${e.date},"${e.foodName}",${e.reaction},${e.accepted ? 'Sí' : 'No'},"${e.notes}"`);
    });
    return lines.join('\n');
  }, [entries]);

  return { entries, addEntry, removeEntry, getFoodsTried, hasTriedFood, getEntriesByDate, exportDiary, loaded };
}
