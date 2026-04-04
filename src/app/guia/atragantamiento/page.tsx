// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const BASE_URL = 'https://introalimentar.com';

export const metadata: Metadata = {
  title: 'Atragantamiento en Bebés: Guía Completa de Prevención y Actuación | IntroAlimentar',
  description: 'Aprende a diferenciar arcada de atragantamiento, cómo actuar, maniobra de Heimlich para bebés, prevención y primeros auxilios. Guía basada en AEP y Cruz Roja.',
  openGraph: {
    type: 'article',
    title: 'Atragantamiento en Bebés: Guía Completa',
    description: 'Arcada vs atragantamiento, cómo actuar, maniobra de Heimlich, prevención. Guía AEP.',
    url: `${BASE_URL}/guia/atragantamiento`,
  },
  alternates: {
    canonical: `${BASE_URL}/guia/atragantamiento`,
  },
};

export default function AtragantamientoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Atragantamiento en Bebés: Guía Completa de Prevención y Actuación',
    author: { '@type': 'Organization', name: 'IntroAlimentar' },
    publisher: { '@type': 'Organization', name: 'IntroAlimentar' },
    mainEntityOfPage: `${BASE_URL}/guia/atragantamiento`,
  };

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bg-gradient-to-br from-red-app to-red-700 text-white p-5 rounded-b-3xl">
        <div className="max-w-3xl mx-auto">
          <Link href="/reference" className="inline-flex items-center gap-1 text-red-100 text-sm mb-3 hover:text-white transition">
            ← Referencia
          </Link>
          <h1 className="text-2xl font-bold">🚨 Atragantamiento en Bebés</h1>
          <p className="text-red-100 text-sm mt-1">
            Guía completa: prevención, diferencias con la arcada y cómo actuar
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-4 space-y-6">
        {/* Emergency banner */}
        <div className="bg-red-app text-white rounded-2xl p-4 text-center">
          <p className="font-bold text-lg">En caso de atragantamiento real: llama al 112</p>
          <p className="text-sm text-red-100 mt-1">Mientras tanto, aplica las maniobras de desobstrucción descritas abajo</p>
        </div>

        {/* Arcada vs Atragantamiento */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Arcada vs. Atragantamiento: ¿cuál es la diferencia?
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Es <strong>fundamental</strong> saber diferenciar entre una arcada (reflejo de náusea) y un atragantamiento real. Confundirlos puede llevar a actuaciones innecesarias o, peor, a no actuar cuando sí es necesario.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Arcada */}
            <div className="bg-green-light rounded-xl p-4">
              <h3 className="font-bold text-green-dark mb-2">✅ Arcada (Gag Reflex)</h3>
              <p className="text-sm text-text-secondary mb-2"><strong>Es NORMAL y es un mecanismo de PROTECCIÓN</strong></p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li>• El bebé <strong>tose, hace ruido</strong> y tiene arcadas</li>
                <li>• La cara puede ponerse roja</li>
                <li>• Los ojos pueden lagrimear</li>
                <li>• El bebé puede vomitar (esto ayuda a expulsar el alimento)</li>
                <li>• Dura unos segundos y se resuelve solo</li>
                <li>• El bebé sigue respirando</li>
              </ul>
              <p className="text-sm text-green-dark font-semibold mt-3">
                👉 Qué hacer: NO intervenir. Mantener la calma. No meter los dedos en la boca del bebé. Dejar que el reflejo haga su trabajo.
              </p>
            </div>

            {/* Atragantamiento */}
            <div className="bg-red-light rounded-xl p-4">
              <h3 className="font-bold text-red-app mb-2">🚨 Atragantamiento (Choking)</h3>
              <p className="text-sm text-text-secondary mb-2"><strong>Es una EMERGENCIA que requiere actuación</strong></p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li>• El bebé <strong>NO puede toser, NO hace ruido</strong></li>
                <li>• El silencio es la señal de alarma</li>
                <li>• La cara se pone azulada o pálida</li>
                <li>• No puede respirar o respira con dificultad extrema</li>
                <li>• Hace movimientos desesperados con las manos</li>
                <li>• Puede perder la consciencia</li>
              </ul>
              <p className="text-sm text-red-app font-semibold mt-3">
                👉 Qué hacer: ACTUAR INMEDIATAMENTE con las maniobras de desobstrucción. Llamar al 112.
              </p>
            </div>
          </div>
        </section>

        {/* Maniobras de desobstrucción */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Maniobras de desobstrucción para bebés menores de 1 año
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Si el bebé presenta signos de atragantamiento real (silencio, no puede toser, cara azulada), sigue estos pasos <strong>inmediatamente</strong>:
          </p>

          <div className="space-y-4">
            <div className="bg-cream rounded-xl p-4">
              <h3 className="font-semibold text-text-primary mb-2">Paso 1: Golpes interescapulares (en la espalda)</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• Coloca al bebé boca abajo sobre tu antebrazo, sujetando su mandíbula con tu mano</li>
                <li>• La cabeza del bebé debe estar más baja que el tronco</li>
                <li>• Da <strong>5 golpes secos entre los omóplatos</strong> con el talón de tu otra mano</li>
                <li>• Los golpes deben ser firmes pero controlados</li>
              </ul>
            </div>

            <div className="bg-cream rounded-xl p-4">
              <h3 className="font-semibold text-text-primary mb-2">Paso 2: Compresiones torácicas (si los golpes no funcionan)</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• Gira al bebé boca arriba sobre tu antebrazo, sujetando la cabeza</li>
                <li>• La cabeza sigue más baja que el tronco</li>
                <li>• Coloca 2 dedos en el centro del pecho (sobre el esternón, justo debajo de la línea entre los pezones)</li>
                <li>• Realiza <strong>5 compresiones torácicas</strong> firmes y rápidas</li>
              </ul>
            </div>

            <div className="bg-cream rounded-xl p-4">
              <h3 className="font-semibold text-text-primary mb-2">Paso 3: Repetir</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• Alterna ciclos de 5 golpes + 5 compresiones hasta que el objeto salga o el bebé empiece a toser/llorar</li>
                <li>• Si alguien está contigo, que llame al <strong>112</strong> mientras tú actúas</li>
                <li>• Si estás solo/a: realiza 1 minuto de maniobras y luego llama al 112</li>
                <li>• Si el bebé pierde la consciencia: iniciar RCP (reanimación cardiopulmonar) pediátrica</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-orange-light rounded-xl p-4">
            <h4 className="font-semibold text-orange-dark text-sm mb-1">⚠️ Lo que NUNCA debes hacer</h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>• <strong>NUNCA</strong> meter los dedos a ciegas en la boca del bebé (puedes empujar el objeto más adentro)</li>
              <li>• <strong>NUNCA</strong> poner al bebé boca arriba (la gravedad empujaría el objeto hacia dentro)</li>
              <li>• <strong>NUNCA</strong> sacudir al bebé</li>
              <li>• <strong>NUNCA</strong> intentar la maniobra de Heimlich abdominal en menores de 1 año (riesgo de lesión de órganos)</li>
            </ul>
          </div>
        </section>

        {/* Para mayores de 1 año */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Maniobra de Heimlich para niños mayores de 1 año
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>A partir del año de edad, si el niño no puede toser ni respirar:</p>
            <ul className="space-y-1.5">
              <li>• Colócate detrás del niño (de rodillas si es necesario)</li>
              <li>• Rodea su cintura con los brazos</li>
              <li>• Coloca el puño cerrado (con el pulgar hacia dentro) entre el ombligo y el esternón</li>
              <li>• Cubre el puño con la otra mano</li>
              <li>• Realiza <strong>compresiones rápidas hacia dentro y hacia arriba</strong></li>
              <li>• Repite hasta que el objeto salga expulsado</li>
            </ul>
          </div>
        </section>

        {/* Prevención */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Prevención: alimentos de alto riesgo
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            La mayoría de atragantamientos se pueden prevenir con una correcta preparación de los alimentos. Estos son los alimentos que causan más incidentes:
          </p>

          <div className="space-y-3">
            <div className="bg-red-light/50 rounded-xl p-3">
              <h4 className="font-semibold text-red-app text-sm">🔴 Riesgo MUY ALTO (cortar SIEMPRE)</h4>
              <ul className="mt-1 space-y-1 text-sm text-text-secondary">
                <li>• <strong>Uvas:</strong> siempre cortadas longitudinalmente en cuartos</li>
                <li>• <strong>Tomates cherry:</strong> cortados en cuartos</li>
                <li>• <strong>Salchichas:</strong> cortadas longitudinalmente, nunca en rodajas</li>
                <li>• <strong>Frutos secos enteros:</strong> PROHIBIDOS hasta 3-5 años. Solo molidos o en crema</li>
                <li>• <strong>Cacahuetes enteros:</strong> PROHIBIDOS. Solo en mantequilla fina</li>
              </ul>
            </div>

            <div className="bg-orange-light/50 rounded-xl p-3">
              <h4 className="font-semibold text-orange-dark text-sm">🟡 Riesgo ALTO (preparar adecuadamente)</h4>
              <ul className="mt-1 space-y-1 text-sm text-text-secondary">
                <li>• <strong>Manzana cruda:</strong> siempre cocida o rallada muy fina</li>
                <li>• <strong>Zanahoria cruda:</strong> siempre cocida hasta muy blanda</li>
                <li>• <strong>Palomitas:</strong> evitar hasta los 4-5 años</li>
                <li>• <strong>Caramelos duros:</strong> prohibidos para niños pequeños</li>
                <li>• <strong>Pan fresco blando:</strong> puede formar bola; tostar ligeramente</li>
              </ul>
            </div>

            <div className="bg-green-light/50 rounded-xl p-3">
              <h4 className="font-semibold text-green-dark text-sm">✅ Reglas de seguridad generales</h4>
              <ul className="mt-1 space-y-1 text-sm text-text-secondary">
                <li>• El bebé debe estar <strong>sentado erguido</strong> en su trona, nunca reclinado</li>
                <li>• <strong>Siempre supervisar</strong> mientras come (no dejarlo solo NUNCA)</li>
                <li>• <strong>Sin pantallas ni distracciones</strong> durante la comida</li>
                <li>• <strong>Nunca forzar</strong> ni meter comida en la boca del bebé</li>
                <li>• Los alimentos deben <strong>aplastarse con los dedos</strong> (test de blandura)</li>
                <li>• Cortar alimentos en <strong>bastones (no dados redondos)</strong> al inicio</li>
                <li>• Los alimentos redondos se cortan <strong>longitudinalmente</strong>, nunca en rodajas</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cuándo ir a urgencias */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            ¿Cuándo acudir a urgencias?
          </h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-start gap-2"><span className="text-red-app">•</span> Después de un episodio de atragantamiento, aunque se haya resuelto (para valorar posibles daños)</li>
            <li className="flex items-start gap-2"><span className="text-red-app">•</span> Si el bebé tiene dificultad para respirar después de un episodio de arcada</li>
            <li className="flex items-start gap-2"><span className="text-red-app">•</span> Si sospechas que puede haber tragado un objeto o trozo que no se ha expulsado</li>
            <li className="flex items-start gap-2"><span className="text-red-app">•</span> Si el bebé babea en exceso o tiene dificultad para tragar después del episodio</li>
            <li className="flex items-start gap-2"><span className="text-red-app">•</span> Si presenta tos persistente después del episodio</li>
          </ul>
        </section>

        {/* Related content */}
        <section className="bg-blue-light rounded-2xl p-5">
          <h3 className="font-semibold text-blue-app text-sm mb-2">Contenido relacionado</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guia/primeros-auxilios-bebe" className="text-sm text-blue-700 hover:underline">🩺 Primeros auxilios bebé</Link>
            <Link href="/foods" className="text-sm text-blue-700 hover:underline">🍽️ Base de alimentos</Link>
            <Link href="/reference" className="text-sm text-blue-700 hover:underline">⚠️ Referencia rápida</Link>
            <Link href="/learn/safety" className="text-sm text-blue-700 hover:underline">📖 Módulo de seguridad</Link>
            <Link href="/guia/horarios-alimentacion" className="text-sm text-blue-700 hover:underline">🕐 Horarios alimentación</Link>
          </div>
        </section>

        {/* Sources */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-lg font-bold text-text-primary mb-3">📚 Fuentes</h2>
          <ul className="space-y-2">
            <li className="text-sm">
              <a href="https://www.aeped.es/comite-nutricion-y-lactancia-materna/nutricion-infantil/documentos/recomendaciones-sobre-alimentacion-complementaria" target="_blank" rel="noopener noreferrer" className="text-green-app hover:underline">
                AEP — Recomendaciones sobre alimentación complementaria ↗
              </a>
            </li>
            <li className="text-sm">
              <a href="https://www.who.int/health-topics/complementary-feeding" target="_blank" rel="noopener noreferrer" className="text-green-app hover:underline">
                OMS — Alimentación complementaria ↗
              </a>
            </li>
            <li className="text-sm">
              <a href="https://espghan.org/knowledge-center/publications" target="_blank" rel="noopener noreferrer" className="text-green-app hover:underline">
                ESPGHAN — Position paper on complementary feeding ↗
              </a>
            </li>
            <li className="text-sm">
              <a href="https://www.aesan.gob.es/" target="_blank" rel="noopener noreferrer" className="text-green-app hover:underline">
                AESAN — Seguridad alimentaria ↗
              </a>
            </li>
          </ul>
        </section>

        <div className="text-xs text-text-muted text-center py-4">
          <p>Esta guía es informativa y no sustituye la formación en primeros auxilios.</p>
          <p>Recomendamos realizar un curso de primeros auxilios pediátricos presencial.</p>
          <p>En caso de emergencia, llama al <strong>112</strong>.</p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
