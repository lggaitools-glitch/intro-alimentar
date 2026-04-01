'use client';

import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { generateId } from '@/lib/utils';

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

  useEffect(() => {
    setEntries(getItem(STORAGE_KEY, []));
    setLoaded(true);
  }, []);

  const addEntry = useCallback((entry: Omit<FoodEntry, 'id'>) => {
    setEntries(prev => {
      const next = [{ ...entry, id: generateId() }, ...prev];
      setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries(prev => {
      const next = prev.filter(e => e.id !== id);
      setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const getFoodsTried = useCallback(() => {
    const unique = new Set(entries.map(e => e.foodId));
    return unique.size;
  }, [entries]);

  const hasTriedFood = useCallback((foodId: string) => {
    return entries.some(e => e.foodId === foodId);
  }, [entries]);

  const getEntriesByDate = useCallback((date: string) => {
    return entries.filter(e => e.date === date);
  }, [entries]);

  const exportDiary = useCallback(() => {
    const lines = ['Fecha,Alimento,Reacción,Aceptado,Notas'];
    entries.forEach(e => {
      lines.push(`${e.date},"${e.foodName}",${e.reaction},${e.accepted ? 'Sí' : 'No'},"${e.notes}"`);
    });
    return lines.join('\n');
  }, [entries]);

  return { entries, addEntry, removeEntry, getFoodsTried, hasTriedFood, getEntriesByDate, exportDiary, loaded };
}
