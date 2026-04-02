'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

type Mode = 'signin' | 'signup' | 'forgot';

export default function AuthPage() {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    try {
      if (mode === 'signin') {
        await signIn(email, password);
        router.push('/');
      } else if (mode === 'signup') {
        await signUp(email, password);
        setMessage('¡Cuenta creada! Revisa tu correo para confirmar tu cuenta.');
      } else {
        await resetPassword(email);
        setMessage('Te hemos enviado un enlace para restablecer tu contraseña.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Ha ocurrido un error';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  const title = mode === 'signin' ? 'Iniciar sesión' : mode === 'signup' ? 'Crear cuenta' : 'Recuperar contraseña';

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="text-3xl">🥑</span>
          <span className="text-xl font-bold text-text-primary">IntroAlimentar</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-cream-dark p-6">
          <h1 className="text-xl font-bold text-text-primary mb-6 text-center">{title}</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-cream-dark bg-cream/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-green-app/50 focus:border-green-app transition"
                placeholder="tu@correo.com"
              />
            </div>

            {mode !== 'forgot' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-cream-dark bg-cream/50 text-text-primary focus:outline-none focus:ring-2 focus:ring-green-app/50 focus:border-green-app transition"
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-app bg-red-app/10 rounded-lg px-3 py-2">{error}</p>
            )}
            {message && (
              <p className="text-sm text-green-dark bg-green-app/10 rounded-lg px-3 py-2">{message}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl bg-green-app text-white font-semibold hover:bg-green-dark transition disabled:opacity-50"
            >
              {submitting
                ? '...'
                : mode === 'signin'
                  ? 'Entrar'
                  : mode === 'signup'
                    ? 'Crear cuenta'
                    : 'Enviar enlace'}
            </button>
          </form>

          <div className="mt-5 space-y-2 text-center text-sm">
            {mode === 'signin' && (
              <>
                <button onClick={() => { setMode('forgot'); setError(''); setMessage(''); }} className="text-green-dark hover:underline block w-full">
                  ¿Olvidaste tu contraseña?
                </button>
                <p className="text-text-muted">
                  ¿No tienes cuenta?{' '}
                  <button onClick={() => { setMode('signup'); setError(''); setMessage(''); }} className="text-green-dark font-medium hover:underline">
                    Regístrate
                  </button>
                </p>
              </>
            )}
            {mode === 'signup' && (
              <p className="text-text-muted">
                ¿Ya tienes cuenta?{' '}
                <button onClick={() => { setMode('signin'); setError(''); setMessage(''); }} className="text-green-dark font-medium hover:underline">
                  Inicia sesión
                </button>
              </p>
            )}
            {mode === 'forgot' && (
              <button onClick={() => { setMode('signin'); setError(''); setMessage(''); }} className="text-green-dark hover:underline">
                Volver a iniciar sesión
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-text-muted mt-6">
          También puedes usar la app sin cuenta (modo invitado).{' '}
          <Link href="/" className="text-green-dark hover:underline">Continuar sin cuenta</Link>
        </p>
      </div>
    </div>
  );
}
