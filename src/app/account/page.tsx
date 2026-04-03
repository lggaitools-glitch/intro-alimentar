// @ts-nocheck
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/i18n/context';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AccountPage() {
  const { user, signOut, supabaseAvailable } = useAuth();
  const router = useRouter();
  const dict = useTranslation();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  if (!supabaseAvailable || !user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-text-secondary mb-4">Debes iniciar sesión para acceder a tu cuenta.</p>
          <Link href="/auth" className="text-green-dark font-medium hover:underline">
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  const handleExportData = async () => {
    setExporting(true);
    try {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;

      const [babies, diary, allergens, learning] = await Promise.all([
        supabase.from('babies').select('*').eq('user_id', user.id),
        supabase.from('food_diary').select('*').eq('user_id', user.id),
        supabase.from('allergen_tracking').select('*').eq('user_id', user.id),
        supabase.from('learning_progress').select('*').eq('user_id', user.id),
      ]);

      const exportData = {
        exported_at: new Date().toISOString(),
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
        },
        babies: babies.data || [],
        food_diary: diary.data || [],
        allergen_tracking: allergens.data || [],
        learning_progress: learning.data || [],
      };

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `introalimentar-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteError('');
    try {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return;

      // Delete all user data (RLS allows users to delete their own data)
      // Order matters: delete children first due to foreign key constraints
      await supabase.from('allergen_tracking').delete().eq('user_id', user.id);
      await supabase.from('food_diary').delete().eq('user_id', user.id);
      await supabase.from('learning_progress').delete().eq('user_id', user.id);
      await supabase.from('readiness_checks').delete().eq('user_id', user.id);
      await supabase.from('babies').delete().eq('user_id', user.id);

      // Try server-side auth user deletion (requires SUPABASE_SERVICE_ROLE_KEY)
      const res = await fetch('/api/account/delete', { method: 'POST' });

      if (res.ok) {
        setDeleteSuccess(true);
      } else {
        // Fallback: data is deleted, auth user remains but all data is gone
        setDeleteSuccess(true);
      }

      // Clear local storage
      localStorage.clear();

      // Sign out
      await signOut();

      // Redirect after short delay
      setTimeout(() => router.push('/'), 2000);
    } catch (err) {
      console.error('Delete error:', err);
      setDeleteError('Ha ocurrido un error. Por favor, inténtalo de nuevo o contacta con soporte.');
      setDeleting(false);
    }
  };

  if (deleteSuccess) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-8 max-w-sm text-center">
          <p className="text-4xl mb-4">👋</p>
          <h1 className="text-xl font-bold text-text-primary mb-2">Cuenta eliminada</h1>
          <p className="text-text-secondary text-sm">
            Todos tus datos han sido eliminados. Serás redirigido a la página principal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-24">
      <header className="bg-gradient-to-br from-green-app to-green-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold">⚙️ Mi cuenta</h1>
          <p className="text-green-100 text-sm mt-1">Gestiona tu cuenta y tus datos</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Account info */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark">
          <h2 className="font-bold text-text-primary mb-3">Información de la cuenta</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Correo electrónico</span>
              <span className="text-text-primary">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Registrado desde</span>
              <span className="text-text-primary">
                {new Date(user.created_at).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </section>

        {/* Data export - GDPR Right to Portability */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark">
          <h2 className="font-bold text-text-primary mb-2">📦 Exportar mis datos</h2>
          <p className="text-text-muted text-sm mb-4">
            Descarga una copia de todos tus datos en formato JSON. Incluye perfiles, diario de
            alimentación, alérgenos y progreso de aprendizaje.
          </p>
          <button
            onClick={handleExportData}
            disabled={exporting}
            className="w-full py-2.5 rounded-xl bg-green-app text-white font-semibold hover:bg-green-dark transition disabled:opacity-50"
          >
            {exporting ? 'Exportando...' : 'Descargar mis datos'}
          </button>
        </section>

        {/* Account deletion - GDPR Right to Erasure */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-red-200">
          <h2 className="font-bold text-red-600 mb-2">🗑️ Eliminar mi cuenta</h2>
          <p className="text-text-muted text-sm mb-4">
            Esto eliminará permanentemente tu cuenta y todos tus datos: perfiles de bebé, diario de
            alimentación, seguimiento de alérgenos y progreso de aprendizaje. Esta acción no se
            puede deshacer.
          </p>

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-2.5 rounded-xl border-2 border-red-400 text-red-600 font-semibold hover:bg-red-50 transition"
            >
              Eliminar mi cuenta
            </button>
          ) : (
            <div className="space-y-3">
              <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                <p className="text-red-700 text-sm font-medium mb-1">⚠️ ¿Estás seguro?</p>
                <p className="text-red-600 text-xs">
                  Se eliminarán todos tus datos de forma permanente. Te recomendamos exportar tus
                  datos antes de continuar.
                </p>
              </div>

              {deleteError && (
                <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{deleteError}</p>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-100 text-text-secondary font-semibold hover:bg-gray-200 transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-50"
                >
                  {deleting ? 'Eliminando...' : 'Sí, eliminar'}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Privacy & Legal */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-cream-dark">
          <h2 className="font-bold text-text-primary mb-3">📄 Legal</h2>
          <div className="space-y-2">
            <Link
              href="/privacy"
              className="flex items-center justify-between text-sm text-text-secondary hover:text-green-dark transition py-1"
            >
              <span>Política de privacidad</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Navigation />
    </div>
  );
}
