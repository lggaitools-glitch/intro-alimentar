// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const BASE_URL = 'https://introalimentar.com';

export const metadata: Metadata = {
  title: 'Primeros Auxilios para Bebés: Reacciones Alérgicas y Emergencias Alimentarias | IntroAlimentar',
  description: 'Guía de primeros auxilios para bebés durante la alimentación: reacciones alérgicas, anafilaxia, cuándo llamar al 112, qué hacer ante una emergencia. Basada en AEP.',
  openGraph: {
    type: 'article',
    title: 'Primeros Auxilios para Bebés: Emergencias Alimentarias',
    description: 'Reacciones alérgicas, anafilaxia, cuándo llamar al 112. Guía AEP para padres.',
    url: `${BASE_URL}/guia/primeros-auxilios-bebe`,
  },
  alternates: {
    canonical: `${BASE_URL}/guia/primeros-auxilios-bebe`,
  },
};

export default function PrimerosAuxiliosBebePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Primeros Auxilios para Bebés: Reacciones Alérgicas y Emergencias Alimentarias',
    author: { '@type': 'Organization', name: 'IntroAlimentar' },
    publisher: { '@type': 'Organization', name: 'IntroAlimentar' },
    mainEntityOfPage: `${BASE_URL}/guia/primeros-auxilios-bebe`,
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
          <h1 className="text-2xl font-bold">🩺 Primeros Auxilios para Bebés</h1>
          <p className="text-red-100 text-sm mt-1">
            Reacciones alérgicas, emergencias alimentarias y cuándo llamar al 112
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-4 space-y-6">
        {/* Emergency banner */}
        <div className="bg-red-app text-white rounded-2xl p-4 text-center">
          <p className="font-bold text-lg">Emergencias: 112</p>
          <p className="text-sm text-red-100 mt-1">Ante cualquier emergencia grave, llama inmediatamente</p>
        </div>

        {/* Reacciones alérgicas */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Reacciones alérgicas alimentarias
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            Durante la introducción de alimentos complementarios, es fundamental saber identificar una reacción alérgica. Los <strong>alérgenos más comunes</strong> en bebés son: huevo, leche de vaca, pescado, frutos secos, cacahuete, soja, sésamo, trigo (gluten) y marisco.
          </p>

          <div className="space-y-4">
            {/* Reacciones leves */}
            <div className="bg-yellow-50 rounded-xl p-4">
              <h3 className="font-bold text-yellow-700 mb-2">🟡 Reacción leve-moderada</h3>
              <p className="text-sm text-text-secondary mb-2">Aparece entre minutos y 2 horas tras la ingesta:</p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li>• <strong>Piel:</strong> urticaria (ronchas rojas con picor), enrojecimiento, eccema que empeora</li>
                <li>• <strong>Cara:</strong> hinchazón de labios, párpados o cara</li>
                <li>• <strong>Digestivo:</strong> vómitos, diarrea, dolor abdominal</li>
                <li>• <strong>Nariz:</strong> estornudos, congestión nasal, moqueo</li>
              </ul>
              <div className="mt-3 bg-white rounded-lg p-3">
                <h4 className="font-semibold text-text-primary text-sm mb-1">✅ Qué hacer:</h4>
                <ul className="space-y-1 text-sm text-text-secondary">
                  <li>• Retirar el alimento sospechoso inmediatamente</li>
                  <li>• No volver a ofrecer ese alimento</li>
                  <li>• Consultar con el pediatra lo antes posible (no tiene que ser urgencias si la reacción es solo cutánea y leve)</li>
                  <li>• Anotar qué alimento era, cuánto comió, cuándo empezaron los síntomas y qué síntomas tuvo</li>
                  <li>• Si tienes antihistamínico prescrito por el pediatra, administrarlo según indicación</li>
                </ul>
              </div>
            </div>

            {/* Anafilaxia */}
            <div className="bg-red-light rounded-xl p-4 ring-1 ring-red-app/20">
              <h3 className="font-bold text-red-app mb-2">🔴 Anafilaxia (EMERGENCIA)</h3>
              <p className="text-sm text-text-secondary mb-2">Reacción grave y potencialmente mortal. Puede aparecer en minutos:</p>
              <ul className="space-y-1.5 text-sm text-text-secondary">
                <li>• <strong>Respiración:</strong> dificultad para respirar, sibilancias, tos persistente, voz ronca</li>
                <li>• <strong>Garganta:</strong> sensación de cierre, dificultad para tragar, babeo excesivo</li>
                <li>• <strong>Circulación:</strong> palidez intensa, labios azulados, pulso débil</li>
                <li>• <strong>Conciencia:</strong> somnolencia extrema, pérdida de consciencia, flacidez</li>
                <li>• <strong>Piel:</strong> urticaria generalizada rápida (todo el cuerpo)</li>
                <li>• <strong>Digestivo:</strong> vómitos intensos repetidos, diarrea profusa</li>
              </ul>
              <div className="mt-3 bg-white rounded-lg p-3">
                <h4 className="font-semibold text-red-app text-sm mb-1">🚨 ACTUAR INMEDIATAMENTE:</h4>
                <ol className="space-y-1.5 text-sm text-text-secondary list-decimal pl-4">
                  <li><strong>Llamar al 112</strong> inmediatamente</li>
                  <li>Si tienes <strong>adrenalina autoinyectable</strong> (EpiPen/Jext) prescrita: administrar en la cara externa del muslo</li>
                  <li>Tumbar al bebé con las piernas elevadas (si no vomita ni tiene dificultad para respirar)</li>
                  <li>Si vomita: ponerlo de lado (posición lateral de seguridad)</li>
                  <li>NO provocar el vómito</li>
                  <li>Vigilar la respiración hasta que llegue la ambulancia</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Intolerancias vs alergias */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Alergia vs. Intolerancia: ¿cuál es la diferencia?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-red-light/50 rounded-xl p-4">
              <h3 className="font-semibold text-red-app mb-2">Alergia alimentaria</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• Reacción del <strong>sistema inmunológico</strong></li>
                <li>• Puede ser <strong>grave y rápida</strong></li>
                <li>• Pequeñas cantidades pueden provocar reacción</li>
                <li>• Puede provocar anafilaxia</li>
                <li>• Requiere evitar el alimento completamente</li>
              </ul>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <h3 className="font-semibold text-yellow-700 mb-2">Intolerancia alimentaria</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• Reacción del <strong>sistema digestivo</strong></li>
                <li>• Generalmente <strong>leve y gradual</strong></li>
                <li>• Depende de la cantidad consumida</li>
                <li>• No provoca anafilaxia</li>
                <li>• Se puede tolerar en pequeñas cantidades</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cómo introducir alérgenos */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Cómo introducir alérgenos de forma segura
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>La AEP y los estudios recientes (LEAP, EAT) recomiendan la <strong>introducción temprana de alérgenos</strong> (desde los 6 meses), ya que puede reducir el riesgo de desarrollar alergias:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2"><span className="text-green-app font-bold">1.</span> Introducir un solo alimento nuevo a la vez</li>
              <li className="flex items-start gap-2"><span className="text-green-app font-bold">2.</span> Ofrecer por la mañana o a mediodía (nunca por la noche) para poder observar reacciones</li>
              <li className="flex items-start gap-2"><span className="text-green-app font-bold">3.</span> Empezar con <strong>cantidad muy pequeña</strong> (media cucharadita)</li>
              <li className="flex items-start gap-2"><span className="text-green-app font-bold">4.</span> Esperar <strong>2-3 días</strong> antes de introducir otro alimento nuevo</li>
              <li className="flex items-start gap-2"><span className="text-green-app font-bold">5.</span> Observar durante 2 horas tras la primera toma (reacciones inmediatas)</li>
              <li className="flex items-start gap-2"><span className="text-green-app font-bold">6.</span> Vigilar también en las 24-48h siguientes (reacciones tardías)</li>
              <li className="flex items-start gap-2"><span className="text-green-app font-bold">7.</span> Si no hay reacción: seguir ofreciendo regularmente (la exposición regular mantiene la tolerancia)</li>
            </ul>
          </div>

          <div className="mt-4 bg-orange-light rounded-xl p-4">
            <h4 className="font-semibold text-orange-dark text-sm mb-1">⚠️ Mayor precaución si...</h4>
            <ul className="space-y-1 text-sm text-text-secondary">
              <li>• El bebé tiene eccema atópico moderado-grave</li>
              <li>• Hay antecedentes familiares directos de alergia alimentaria (padres, hermanos)</li>
              <li>• El bebé ya ha mostrado reacción a algún alimento</li>
              <li>→ En estos casos, consultar con el pediatra o alergólogo ANTES de introducir alérgenos potentes (cacahuete, huevo, pescado)</li>
            </ul>
          </div>
        </section>

        {/* Otras emergencias alimentarias */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Otras emergencias relacionadas con la alimentación
          </h2>

          <div className="space-y-4">
            <div className="bg-cream rounded-xl p-4">
              <h3 className="font-semibold text-text-primary mb-2">Botulismo infantil (miel)</h3>
              <p className="text-sm text-text-secondary mb-2">
                La miel puede contener esporas de <em>Clostridium botulinum</em> que son inofensivas para adultos pero peligrosas para bebés menores de 12 meses.
              </p>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• <strong>Síntomas:</strong> estreñimiento, debilidad muscular, llanto débil, dificultad para succionar, flacidez</li>
                <li>• <strong>Prevención:</strong> NO dar miel en ninguna forma antes de los 12 meses</li>
                <li>• <strong>Actuación:</strong> acudir a urgencias inmediatamente si sospechas botulismo</li>
              </ul>
            </div>

            <div className="bg-cream rounded-xl p-4">
              <h3 className="font-semibold text-text-primary mb-2">Intoxicación alimentaria</h3>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• <strong>Síntomas:</strong> vómitos, diarrea, fiebre, dolor abdominal (aparecen horas después de comer)</li>
                <li>• <strong>Qué hacer:</strong> mantener la hidratación (pecho/biberón a demanda, suero de rehidratación oral si el pediatra lo indica)</li>
                <li>• <strong>Cuándo ir a urgencias:</strong> si hay sangre en heces/vómitos, fiebre alta (+39°C), deshidratación (boca seca, pocas lágrimas, pañal seco), somnolencia extrema</li>
              </ul>
            </div>

            <div className="bg-cream rounded-xl p-4">
              <h3 className="font-semibold text-text-primary mb-2">Deshidratación</h3>
              <p className="text-sm text-text-secondary mb-2">Puede ocurrir tras vómitos o diarrea prolongados:</p>
              <ul className="space-y-1 text-sm text-text-secondary">
                <li>• <strong>Signos:</strong> boca seca, pocas lágrimas al llorar, pañal seco (+6h sin mojar), fontanela hundida, irritabilidad o somnolencia</li>
                <li>• <strong>Qué hacer:</strong> ofrecer líquidos frecuentemente (pecho, suero oral), acudir al pediatra</li>
                <li>• <strong>Urgencias si:</strong> el bebé está muy adormecido, no quiere beber, tiene los ojos hundidos</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cuándo llamar al 112 */}
        <section className="bg-red-light rounded-2xl p-5 ring-1 ring-red-app/20">
          <h2 className="text-xl font-bold text-red-app mb-4">
            🚨 Cuándo llamar al 112
          </h2>
          <p className="text-sm text-text-secondary mb-3">Llama al 112 (emergencias) inmediatamente si el bebé presenta:</p>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-start gap-2"><span className="text-red-app font-bold">•</span> Dificultad para respirar o labios/cara azulados</li>
            <li className="flex items-start gap-2"><span className="text-red-app font-bold">•</span> Atragantamiento con obstrucción de vía aérea (no tose, silencio)</li>
            <li className="flex items-start gap-2"><span className="text-red-app font-bold">•</span> Hinchazón rápida de cara, lengua o garganta</li>
            <li className="flex items-start gap-2"><span className="text-red-app font-bold">•</span> Pérdida de consciencia o flacidez extrema</li>
            <li className="flex items-start gap-2"><span className="text-red-app font-bold">•</span> Palidez intensa con pulso débil</li>
            <li className="flex items-start gap-2"><span className="text-red-app font-bold">•</span> Convulsiones</li>
            <li className="flex items-start gap-2"><span className="text-red-app font-bold">•</span> Sospecha de anafilaxia (2 o más sistemas afectados: piel + respiratorio, piel + digestivo, etc.)</li>
          </ul>
          <div className="mt-4 bg-red-app text-white rounded-xl p-4 text-center">
            <p className="font-bold text-xl">112</p>
            <p className="text-sm text-red-100 mt-1">Emergencias sanitarias en toda España</p>
          </div>
        </section>

        {/* Botiquín */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Botiquín básico para la alimentación complementaria
          </h2>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-start gap-2"><span className="text-green-app">✓</span> Termómetro digital</li>
            <li className="flex items-start gap-2"><span className="text-green-app">✓</span> Suero de rehidratación oral (Bioralsuero o similar, prescrito por pediatra)</li>
            <li className="flex items-start gap-2"><span className="text-green-app">✓</span> Antihistamínico oral (si prescrito por el pediatra para reacciones alérgicas)</li>
            <li className="flex items-start gap-2"><span className="text-green-app">✓</span> Adrenalina autoinyectable (si prescrita por alergólogo en caso de alergia diagnosticada)</li>
            <li className="flex items-start gap-2"><span className="text-green-app">✓</span> Teléfono con el 112 accesible y número del pediatra a mano</li>
            <li className="flex items-start gap-2"><span className="text-green-app">✓</span> Conocimiento de las maniobras de desobstrucción (ver <Link href="/guia/atragantamiento" className="text-green-app hover:underline">guía de atragantamiento</Link>)</li>
          </ul>
        </section>

        {/* Related content */}
        <section className="bg-blue-light rounded-2xl p-5">
          <h3 className="font-semibold text-blue-app text-sm mb-2">Contenido relacionado</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/guia/atragantamiento" className="text-sm text-blue-700 hover:underline">🚨 Guía de atragantamiento</Link>
            <Link href="/foods" className="text-sm text-blue-700 hover:underline">🍽️ Base de alimentos</Link>
            <Link href="/reference" className="text-sm text-blue-700 hover:underline">⚠️ Referencia rápida</Link>
            <Link href="/blog/introduccion-alergenos-bebes" className="text-sm text-blue-700 hover:underline">📝 Introducción de alérgenos</Link>
            <Link href="/allergens" className="text-sm text-blue-700 hover:underline">📋 Tracker de alérgenos</Link>
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
                AESAN — Agencia Española de Seguridad Alimentaria ↗
              </a>
            </li>
          </ul>
        </section>

        <div className="text-xs text-text-muted text-center py-4">
          <p>Esta guía es informativa y no sustituye la formación en primeros auxilios.</p>
          <p>Recomendamos un curso de primeros auxilios pediátricos presencial.</p>
          <p>En caso de emergencia, llama al <strong>112</strong>.</p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
