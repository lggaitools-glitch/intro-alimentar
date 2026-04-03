// @ts-nocheck
'use client';

import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { useAuth } from '@/hooks/useAuth';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

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
  const { user, loading: authLoading, supabaseAvailable } = useAuth();

  useEffect(() => {
    // Wait for auth to finish loading before deciding data source
    if (authLoading) return;

    if (supabaseAvailable && user) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        supabase
          .from('babies')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })
          .limit(1)
          .then(({ data }) => {
            if (data && data.length > 0) {
              const b = data[0];
              setProfile({
                name: b.name ?? '',
                dateOfBirth: b.date_of_birth ?? '',
                feedingType: b.feeding_type ?? 'breast',
                approach: b.approach ?? null,
                startDate: b.start_date ?? null,
                readinessChecked: true,
              });
            }
            setLoaded(true);
          });
        return;
      }
    }
    setProfile(getItem(STORAGE_KEY, DEFAULT_PROFILE));
    setLoaded(true);
  }, [user, authLoading, supabaseAvailable]);

  const updateProfile = useCallback(
    (updates: Partial<BabyProfile>) => {
      setProfile(prev => {
        const next = { ...prev, ...updates };

        if (supabaseAvailable && user) {
          const supabase = getSupabaseBrowserClient();
          if (supabase) {
            const payload = {
              name: next.name,
              date_of_birth: next.dateOfBirth || null,
              feeding_type: next.feedingType,
              approach: next.approach,
              start_date: next.startDate,
            };
            supabase
              .from('babies')
              .select('id')
              .eq('user_id', user.id)
              .limit(1)
              .then(({ data, error: selErr }) => {
                if (selErr) { console.error('Profile select error:', selErr); return; }
                if (data && data.length > 0) {
                  supabase.from('babies').update(payload).eq('id', data[0].id)
                    .then(({ error }) => { if (error) console.error('Profile update error:', error); });
                } else {
                  supabase.from('babies').insert({ user_id: user.id, ...payload })
                    .then(({ error }) => { if (error) console.error('Profile insert error:', error); });
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

  const isSetUp = loaded && profile.name !== '' && profile.dateOfBirth !== '';

  return { profile, updateProfile, isSetUp, loaded };
}
