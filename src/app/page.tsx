// @ts-nocheck
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useTranslation } from '@/i18n/context';

export default function LandingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { isSetUp, loaded } = useProfile();

  // Redirect logged-in users with a profile to dashboard
  useEffect(() => {
    if (!authLoading && loaded && user && isSetUp) {
      router.push('/dashboard');
    }
  }, [authLoading, loaded, user, isSetUp, router]);

  // Show loading while checking auth
  if (authLoading || (user && !loaded)) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-2">🥑</div>
          <p className="text-text-muted">Cargando...</p>
        </div>
      </div>
    );
  }

  // If logged in but no profile, show landing (they can click "Empezar")
  // If not logged in, show landing

  return (
    <div className="min-h-screen bg-cream">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-cream-dark">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🥑</span>
            <span className="text-lg font-bold text-text-primary">IntroAlimentar</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/blog" className="text-sm text-text-secondary hover:text-green-dark transition hidden sm:block">
              Blog
            </Link>
            <Link href="/learn" className="text-sm text-text-secondary hover:text-green-dark transition hidden sm:block">
              Aprender
            </Link>
            {user ? (
              <Link href="/dashboard" className="text-sm bg-green-app text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-dark transition">
                Mi panel
              </Link>
            ) : (
              <>
                <Link href="/auth" className="text-sm text-green-dark font-medium hover:underline">
                  Iniciar sesión
                </Link>
                <Link href="/setup" className="text-sm bg-green-app text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-dark transition">
                  Empezar gratis
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-6xl mb-6">🥑👶</div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-primary leading-tight mb-6">
            La alimentación complementaria de tu bebé,{' '}
            <span className="text-green-dark">paso a paso</span>
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            Basada en las guías de la <strong>AEP</strong>, <strong>OMS</strong> y <strong>ESPGHAN</strong>.
            Plan semanal personalizado, diario de alimentación, seguimiento de alérgenos y más.
            100% gratis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/setup"
              className="inline-flex items-center justify-center gap-2 bg-green-app text-white text-lg font-bold px-8 py-4 rounded-2xl hover:bg-green-dark transition shadow-lg shadow-green-app/30"
            >
              Empezar ahora — es gratis
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 bg-white text-text-primary text-lg font-semibold px-8 py-4 rounded-2xl hover:bg-cream-dark transition border border-cream-dark"
            >
              Leer el blog
            </Link>
          </div>
          <p className="text-xs text-text-muted mt-4">
            Sin tarjeta de crédito · Funciona sin cuenta · Tus datos son tuyos
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-4">
            Todo lo que necesitas para empezar con confianza
          </h2>
          <p className="text-center text-text-secondary mb-12 max-w-2xl mx-auto">
            Diseñada por y para padres, con información basada en evidencia científica actualizada.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: '📅',
                title: 'Plan semanal personalizado',
                desc: 'Qué alimentos introducir cada semana según la edad de tu bebé. Sigue el plan o adáptalo a tu ritmo.',
              },
              {
                emoji: '📓',
                title: 'Diario de alimentación',
                desc: 'Registra lo que come tu bebé cada día. Anota reacciones, preferencias y exporta los datos.',
              },
              {
                emoji: '🥜',
                title: 'Seguimiento de alérgenos',
                desc: 'Los 9 alérgenos principales con la regla de los 3 días. Nunca pierdas la pista.',
              },
              {
                emoji: '📖',
                title: '23 lecciones interactivas',
                desc: 'Aprende sobre BLW, purés, seguridad, nutrición y más. Contenido actualizado según AEP y OMS.',
              },
              {
                emoji: '🍽️',
                title: 'Test de enfoque',
                desc: '¿Purés, BLW o mixto? Un test rápido te ayuda a descubrir qué método se adapta a tu familia.',
              },
              {
                emoji: '✅',
                title: 'Test de madurez',
                desc: '¿Está tu bebé listo? Comprueba las 4 señales clave antes de empezar.',
              },
            ].map((f, i) => (
              <div key={i} className="bg-cream rounded-2xl p-6 hover:shadow-md transition">
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-text-primary mb-2">{f.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
            Cómo funciona
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                emoji: '👶',
                title: 'Configura el perfil',
                desc: 'Introduce el nombre y fecha de nacimiento de tu bebé. Solo tardas 30 segundos.',
              },
              {
                step: '2',
                emoji: '🍽️',
                title: 'Elige tu enfoque',
                desc: 'Haz el test para descubrir si te va mejor purés, BLW o un enfoque mixto.',
              },
              {
                step: '3',
                emoji: '🚀',
                title: 'Empieza el plan',
                desc: 'Sigue el plan semanal, registra en el diario y aprende con las lecciones. ¡A comer!',
              },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-green-app text-white rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {s.step}
                </div>
                <div className="text-3xl mb-2">{s.emoji}</div>
                <h3 className="font-bold text-text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-text-secondary">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Science */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Basada en ciencia, no en opiniones
          </h2>
          <p className="text-text-secondary mb-10 max-w-2xl mx-auto">
            Todo nuestro contenido está basado en las guías oficiales más actualizadas sobre alimentación infantil.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: 'AEP', full: 'Asociación Española de Pediatría' },
              { name: 'OMS', full: 'Organización Mundial de la Salud' },
              { name: 'ESPGHAN', full: 'Sociedad Europea de Gastroenterología Pediátrica' },
            ].map((org, i) => (
              <div key={i} className="bg-cream rounded-2xl px-6 py-4 min-w-[200px]">
                <div className="text-xl font-bold text-green-dark">{org.name}</div>
                <div className="text-xs text-text-muted mt-1">{org.full}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food database CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-5xl mb-4">🥕</div>
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Base de datos de alimentos
          </h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
            Consulta más de 50 alimentos con información detallada: edad recomendada, cómo preparar, valor nutricional, precauciones y si es alérgeno. Todo basado en las recomendaciones de la AEP.
          </p>
          <Link
            href="/foods"
            className="inline-block bg-green-app text-white font-semibold px-8 py-3 rounded-xl hover:bg-green-dark transition-colors"
          >
            Explorar alimentos →
          </Link>
        </div>
      </section>

      {/* Blog preview */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-4">
            Artículos para padres
          </h2>
          <p className="text-center text-text-secondary mb-10">
            Guías completas, gratuitas y basadas en evidencia.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Guía completa de alimentación complementaria', slug: 'guia-alimentacion-complementaria', emoji: '📚' },
              { title: 'BLW: Qué es y cómo empezar', slug: 'blw-que-es-como-empezar', emoji: '🖐️' },
              { title: 'Tabla de introducción de alimentos', slug: 'tabla-introduccion-alimentos-bebe', emoji: '📊' },
              { title: 'Alimentos prohibidos para bebés', slug: 'alimentos-prohibidos-bebes', emoji: '🚫' },
              { title: 'Introducción de alérgenos', slug: 'introduccion-alergenos-bebes', emoji: '🥜' },
            ].map((post, i) => (
              <Link
                key={i}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-2xl p-5 border border-cream-dark hover:shadow-md transition group"
              >
                <div className="text-2xl mb-2">{post.emoji}</div>
                <h3 className="font-semibold text-text-primary group-hover:text-green-dark transition text-sm leading-snug">
                  {post.title}
                </h3>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="text-green-dark font-semibold hover:underline">
              Ver todos los artículos →
            </Link>
          </div>
        </div>
      </section>

      {/* Privacy & Guest mode */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Tu privacidad es lo primero
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm text-text-secondary">
            <div>
              <div className="text-2xl mb-2">📱</div>
              <strong className="text-text-primary block mb-1">Funciona sin cuenta</strong>
              Usa la app en modo invitado. Todos los datos se quedan en tu dispositivo.
            </div>
            <div>
              <div className="text-2xl mb-2">🚫</div>
              <strong className="text-text-primary block mb-1">Sin publicidad</strong>
              No hay anuncios, ni rastreo, ni venta de datos. Nunca.
            </div>
            <div>
              <div className="text-2xl mb-2">📦</div>
              <strong className="text-text-primary block mb-1">Tus datos, tuyos</strong>
              Exporta o elimina todo en cualquier momento. Cumplimos el RGPD.
            </div>
          </div>
          <Link href="/privacy" className="text-green-dark text-sm hover:underline mt-6 inline-block">
            Leer nuestra política de privacidad →
          </Link>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-app to-green-dark text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para empezar?
          </h2>
          <p className="text-green-100 text-lg mb-8 max-w-xl mx-auto">
            Miles de familias ya usan IntroAlimentar para guiar la alimentación de sus bebés con confianza y tranquilidad.
          </p>
          <Link
            href="/setup"
            className="inline-flex items-center justify-center gap-2 bg-white text-green-dark text-lg font-bold px-8 py-4 rounded-2xl hover:bg-green-100 transition shadow-lg"
          >
            Empezar ahora — es gratis 🥑
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-cream py-10 px-4 border-t border-cream-dark">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">🥑</span>
              <span className="font-bold text-text-primary">IntroAlimentar</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
              <Link href="/blog" className="hover:text-green-dark transition">Blog</Link>
              <Link href="/learn" className="hover:text-green-dark transition">Aprender</Link>
              <Link href="/reference" className="hover:text-green-dark transition">Referencia</Link>
              <Link href="/infographics" className="hover:text-green-dark transition">Infografías</Link>
              <Link href="/privacy" className="hover:text-green-dark transition">Privacidad</Link>
            </div>
          </div>
          <div className="text-center text-xs text-text-muted mt-8">
            <p>IntroAlimentar es informativa. Consulta siempre con tu pediatra.</p>
            <p className="mt-1">Basada en guías AEP, OMS y ESPGHAN · © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
