'use client';

import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { useAuth } from '@/hooks/useAuth';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface AllergenStatus {
  allergenId: string;
  introduced: boolean;
  dateIntroduced: string | null;
  reaction: 'none' | 'mild' | 'moderate' | 'severe' | null;
  notes: string;
}

const STORAGE_KEY = 'intro-alimentar-allergens';

export function useAllergens() {
  const [statuses, setStatuses] = useState<AllergenStatus[]>([]);
  const [loaded, setLoaded] = useState(false);
  const { user, loading: authLoading, supabaseAvailable } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (supabaseAvailable && user) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        supabase
          .from('allergen_tracking')
          .select('*')
          .eq('user_id', user.id)
          .then(({ data }) => {
            if (data) {
              setStatuses(
                data.map(d => ({
                  allergenId: d.allergen_id,
                  introduced: true,
                  dateIntroduced: d.date_introduced,
                  reaction: d.reaction,
                  notes: d.notes ?? '',
                }))
              );
            }
            setLoaded(true);
          });
        return;
      }
    }
    setStatuses(getItem(STORAGE_KEY, []));
    setLoaded(true);
  }, [user, authLoading, supabaseAvailable]);

  const updateAllergen = useCallback(
    (status: AllergenStatus) => {
      setStatuses(prev => {
        const idx = prev.findIndex(s => s.allergenId === status.allergenId);
        const next = idx >= 0 ? prev.map((s, i) => (i === idx ? status : s)) : [...prev, status];

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
                  supabase
                    .from('allergen_tracking')
                    .upsert(
                      {
                        user_id: user.id,
                        baby_id: babyId,
                        allergen_id: status.allergenId,
                        date_introduced: status.dateIntroduced,
                        reaction: status.reaction,
                        notes: status.notes,
                      },
                      { onConflict: 'baby_id,allergen_id' }
                    )
                    .then(() => {});
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

  const getAllergenStatus = useCallback(
    (allergenId: string): AllergenStatus | undefined => statuses.find(s => s.allergenId === allergenId),
    [statuses]
  );

  const getIntroducedCount = useCallback(() => statuses.filter(s => s.introduced).length, [statuses]);

  return { statuses, updateAllergen, getAllergenStatus, getIntroducedCount, loaded };
}
