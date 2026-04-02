'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading, supabaseAvailable } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && supabaseAvailable && !user) {
      router.push('/auth');
    }
  }, [user, loading, supabaseAvailable, router]);

  // No Supabase configured — guest mode, allow access
  if (!supabaseAvailable) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-pulse text-text-muted">Cargando...</div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
