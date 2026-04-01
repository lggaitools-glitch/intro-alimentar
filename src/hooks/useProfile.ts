'use client';

import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '@/lib/storage';

export interface BabyProfile {
  name: string;
  dateOfBirth: string;
  feedingType: 'breast' | 'formula' | 'mixed';
  approach: 'traditional' | 'blw' | 'mixed' | null;
  startDate: string | null;
  readinessChecked: boolean;
}

const DEFAULT_PROFILE: BabyProfile = {
  name: '',
  dateOfBirth: '',
  feedingType: 'breast',
  approach: null,
  startDate: null,
  readinessChecked: false,
};

const STORAGE_KEY = 'intro-alimentar-profile';

export function useProfile() {
  const [profile, setProfile] = useState<BabyProfile>(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfile(getItem(STORAGE_KEY, DEFAULT_PROFILE));
    setLoaded(true);
  }, []);

  const updateProfile = useCallback((updates: Partial<BabyProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updates };
      setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const isSetUp = loaded && profile.name !== '' && profile.dateOfBirth !== '';

  return { profile, updateProfile, isSetUp, loaded };
}
