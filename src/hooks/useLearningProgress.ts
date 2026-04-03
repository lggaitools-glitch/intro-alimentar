'use client';

import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '@/lib/storage';
import { useAuth } from '@/hooks/useAuth';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export interface LearningProgress {
  lessonsCompleted: string[];
  quizScores: Record<string, number>;
}

const DEFAULT: LearningProgress = {
  lessonsCompleted: [],
  quizScores: {},
};

const STORAGE_KEY = 'intro-alimentar-learning';

export function useLearningProgress() {
  const [progress, setProgress] = useState<LearningProgress>(DEFAULT);
  const [loaded, setLoaded] = useState(false);
  const { user, loading: authLoading, supabaseAvailable } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (supabaseAvailable && user) {
      const supabase = getSupabaseBrowserClient();
      if (supabase) {
        supabase
          .from('learning_progress')
          .select('*')
          .eq('user_id', user.id)
          .then(({ data }) => {
            if (data) {
              const lessonsCompleted = data.filter(d => d.completed).map(d => d.lesson_id);
              setProgress({ lessonsCompleted, quizScores: {} });
            }
            setLoaded(true);
          });
        return;
      }
    }
    setProgress(getItem(STORAGE_KEY, DEFAULT));
    setLoaded(true);
  }, [user, authLoading, supabaseAvailable]);

  const completeLesson = useCallback(
    (lessonId: string) => {
      setProgress(prev => {
        if (prev.lessonsCompleted.includes(lessonId)) return prev;
        const next = { ...prev, lessonsCompleted: [...prev.lessonsCompleted, lessonId] };

        if (supabaseAvailable && user) {
          const supabase = getSupabaseBrowserClient();
          if (supabase) {
            const moduleId = lessonId.split('-')[0] || lessonId;
            supabase
              .from('learning_progress')
              .upsert(
                {
                  user_id: user.id,
                  module_id: moduleId,
                  lesson_id: lessonId,
                  completed: true,
                  completed_at: new Date().toISOString(),
                },
                { onConflict: 'user_id,module_id,lesson_id' }
              )
              .then(() => {});
          }
        } else {
          setItem(STORAGE_KEY, next);
        }

        return next;
      });
    },
    [user, supabaseAvailable]
  );

  const saveQuizScore = useCallback(
    (lessonId: string, score: number) => {
      setProgress(prev => {
        const next = { ...prev, quizScores: { ...prev.quizScores, [lessonId]: score } };
        if (!supabaseAvailable || !user) {
          setItem(STORAGE_KEY, next);
        }
        return next;
      });
    },
    [user, supabaseAvailable]
  );

  const isLessonCompleted = useCallback(
    (lessonId: string) => progress.lessonsCompleted.includes(lessonId),
    [progress]
  );

  const getModuleProgress = useCallback(
    (lessonIds: string[]) => {
      const completed = lessonIds.filter(id => progress.lessonsCompleted.includes(id)).length;
      return {
        completed,
        total: lessonIds.length,
        percentage: lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0,
      };
    },
    [progress]
  );

  return { progress, completeLesson, saveQuizScore, isLessonCompleted, getModuleProgress, loaded };
}
