'use client';

import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '@/lib/storage';

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

  useEffect(() => {
    setStatuses(getItem(STORAGE_KEY, []));
    setLoaded(true);
  }, []);

  const updateAllergen = useCallback((status: AllergenStatus) => {
    setStatuses(prev => {
      const idx = prev.findIndex(s => s.allergenId === status.allergenId);
      const next = idx >= 0 ? prev.map((s, i) => (i === idx ? status : s)) : [...prev, status];
      setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const getAllergenStatus = useCallback((allergenId: string): AllergenStatus | undefined => {
    return statuses.find(s => s.allergenId === allergenId);
  }, [statuses]);

  const getIntroducedCount = useCallback(() => {
    return statuses.filter(s => s.introduced).length;
  }, [statuses]);

  return { statuses, updateAllergen, getAllergenStatus, getIntroducedCount, loaded };
}
