'use client';

import { useState, useEffect, useCallback } from 'react';
import { getItem, setItem } from '@/lib/storage';

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

  useEffect(() => {
    setProgress(getItem(STORAGE_KEY, DEFAULT));
    setLoaded(true);
  }, []);

  const completeLesson = useCallback((lessonId: string) => {
    setProgress(prev => {
      if (prev.lessonsCompleted.includes(lessonId)) return prev;
      const next = { ...prev, lessonsCompleted: [...prev.lessonsCompleted, lessonId] };
      setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const saveQuizScore = useCallback((lessonId: string, score: number) => {
    setProgress(prev => {
      const next = { ...prev, quizScores: { ...prev.quizScores, [lessonId]: score } };
      setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  const isLessonCompleted = useCallback((lessonId: string) => {
    return progress.lessonsCompleted.includes(lessonId);
  }, [progress]);

  const getModuleProgress = useCallback((lessonIds: string[]) => {
    const completed = lessonIds.filter(id => progress.lessonsCompleted.includes(id)).length;
    return { completed, total: lessonIds.length, percentage: lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0 };
  }, [progress]);

  return { progress, completeLesson, saveQuizScore, isLessonCompleted, getModuleProgress, loaded };
}
