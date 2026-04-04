// @ts-nocheck
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

const BASE_URL = 'https://introalimentar.com';

export const metadata: Metadata = {
  title: 'Horarios de Alimentación del Bebé por Edad (6-12+ meses) | IntroAlimentar',
  description: 'Guía de horarios orientativos de alimentación del bebé: cuántas comidas al día, cómo organizar tomas y sólidos a los 6, 7-8, 9-11 y 12+ meses. Recomendaciones AEP y OMS.',
  openGraph: {
    type: 'article',
    title: 'Horarios de Alimentación del Bebé por Edad',
    description: 'Cuántas comidas al día a los 6, 7-8, 9-11 y 12+ meses. Guía AEP y OMS.',
    url: `${BASE_URL}/guia/horarios-alimentacion`,
  },
  alternates: {
    canonical: `${BASE_URL}/guia/horarios-alimentacion`,
  },
};

export default function HorariosAlimentacionPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Horarios de Alimentación del Bebé por Edad (6-12+ meses)',
    author: { '@type': 'Organization', name: 'IntroAlimentar' },
    publisher: { '@type': 'Organization', name: 'IntroAlimentar' },
    mainEntityOfPage: `${BASE_URL}/guia/horarios-alimentacion`,
  };

  return (
    <div className="pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="bg-gradient-to-br from-orange-app to-orange-dark text-white p-5 rounded-b-3xl">
        <div className="max-w-3xl mx-auto">
          <Link href="/reference" className="inline-flex items-center gap-1 text-orange-100 text-sm mb-3 hover:text-white transition">
            ← Referencia
          </Link>
          <h1 className="text-2xl font-bold">🕐 Horarios de Alimentación por Edad</h1>
          <p className="text-orange-100 text-sm mt-1">
            Guía orientativa de comidas y tomas para cada etapa del bebé
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-4 space-y-6">
        {/* Intro */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-3 border-b border-cream-dark pb-2">
            Lo más importante
          </h2>
          <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
            <p>
              Estos horarios son <strong>orientativos</strong>. Cada bebé es diferente y lo más importante es respetar sus señales de hambre y saciedad. La <strong>alimentación perceptiva</strong> (responsive feeding), recomendada por la OMS, implica:
            </p>
            <ul className="space-y-1.5">
              <li>• Ofrecer comida cuando el bebé muestra señales de hambre</li>
              <li>• Respetar cuando dice «no» (gira la cabeza, cierra la boca, empuja la comida)</li>
              <li>• No forzar NUNCA</li>
              <li>• La leche (materna o fórmula) sigue siendo el alimento PRINCIPAL hasta los 12 meses</li>
            </ul>
          </div>
        </section>

        {/* 6 meses */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-blue-app text-white text-sm font-bold px-3 py-1 rounded-full">6 meses</span>
            <h2 className="text-xl font-bold text-text-primary">Inicio de la alimentación complementaria</h2>
          </div>

          <div className="bg-blue-light rounded-xl p-4 mb-4">
            <p className="text-sm text-blue-700 font-semibold">🍼 Leche: 4-5 tomas al día (sigue siendo &gt;80% de la alimentación)</p>
            <p className="text-sm text-blue-700 font-semibold mt-1">🍽️ Sólidos: 1 comida al día (al mediodía es lo más habitual)</p>
          </div>

          <h3 className="font-semibold text-text-primary mb-2">Horario orientativo</h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">7:00-8:00</span><span>Toma de leche (pecho o biberón)</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">10:00-11:00</span><span>Toma de leche</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">12:00-13:00</span><span><strong>Comida de sólidos</strong> (puré o BLW) + leche después si quiere</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">16:00-17:00</span><span>Toma de leche</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">20:00-21:00</span><span>Toma de leche antes de dormir</span></div>
          </div>

          <div className="mt-4 bg-cream rounded-xl p-3">
            <p className="text-sm text-text-secondary">
              <strong>💡 Consejo:</strong> Ofrecer los sólidos cuando el bebé esté tranquilo y descansado, no excesivamente hambriento. Un bebé muy hambriento se frustra con la comida sólida. Ofrecer primero un poco de pecho/biberón para calmar el hambre.
            </p>
          </div>
        </section>

        {/* 7-8 meses */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-orange-app text-white text-sm font-bold px-3 py-1 rounded-full">7-8 meses</span>
            <h2 className="text-xl font-bold text-text-primary">Consolidación</h2>
          </div>

          <div className="bg-orange-light rounded-xl p-4 mb-4">
            <p className="text-sm text-orange-700 font-semibold">🍼 Leche: 3-4 tomas al día (sigue siendo 70-80% de la alimentación)</p>
            <p className="text-sm text-orange-700 font-semibold mt-1">🍽️ Sólidos: 2 comidas al día (comida + cena o comida + merienda)</p>
          </div>

          <h3 className="font-semibold text-text-primary mb-2">Horario orientativo</h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">7:00-8:00</span><span>Toma de leche</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">10:00-11:00</span><span>Toma de leche (puede reducirse si come bien a mediodía)</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">12:00-13:00</span><span><strong>Comida:</strong> verdura + proteína (carne, pescado, huevo, legumbre)</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">16:00-17:00</span><span><strong>Merienda:</strong> fruta + leche</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">20:00-21:00</span><span>Toma de leche antes de dormir</span></div>
          </div>

          <div className="mt-4 bg-cream rounded-xl p-3">
            <p className="text-sm text-text-secondary">
              <strong>💡 Consejo:</strong> Empezar a ofrecer agua en vaso abierto (pequeños sorbos). No es necesario que beba mucho, pero ir familiarizándose con el vaso. Evitar zumos.
            </p>
          </div>
        </section>

        {/* 9-11 meses */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-app text-white text-sm font-bold px-3 py-1 rounded-full">9-11 meses</span>
            <h2 className="text-xl font-bold text-text-primary">Aumento de variedad</h2>
          </div>

          <div className="bg-green-light rounded-xl p-4 mb-4">
            <p className="text-sm text-green-700 font-semibold">🍼 Leche: 3 tomas al día (sigue siendo 50-60% de la alimentación)</p>
            <p className="text-sm text-green-700 font-semibold mt-1">🍽️ Sólidos: 3 comidas al día (desayuno/comida/cena) + 1 merienda</p>
          </div>

          <h3 className="font-semibold text-text-primary mb-2">Horario orientativo</h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">7:00-8:00</span><span><strong>Desayuno:</strong> leche + fruta o cereal (gachas de avena, tostada con aguacate)</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">10:00-11:00</span><span>Snack ligero: fruta o tostada (si tiene hambre)</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">12:00-13:00</span><span><strong>Comida:</strong> verdura + proteína + cereal (puede ser comida familiar adaptada)</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">16:00-17:00</span><span><strong>Merienda:</strong> fruta + yogur natural o leche</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">19:00-20:00</span><span><strong>Cena:</strong> similar a la comida, más ligera. Leche antes de dormir</span></div>
          </div>

          <div className="mt-4 bg-cream rounded-xl p-3">
            <p className="text-sm text-text-secondary">
              <strong>💡 Consejo:</strong> Es el momento ideal para que el bebé empiece a comer la misma comida que la familia (adaptada sin sal, sin azúcar, sin miel). Esto facilita la transición y mejora la aceptación de alimentos.
            </p>
          </div>
        </section>

        {/* 12+ meses */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">12+ meses</span>
            <h2 className="text-xl font-bold text-text-primary">Alimentación familiar</h2>
          </div>

          <div className="bg-purple-50 rounded-xl p-4 mb-4">
            <p className="text-sm text-purple-700 font-semibold">🍼 Leche: 2-3 tomas al día (máx. 500ml de leche de vaca entera como bebida)</p>
            <p className="text-sm text-purple-700 font-semibold mt-1">🍽️ Sólidos: 3 comidas principales + 1-2 snacks</p>
          </div>

          <h3 className="font-semibold text-text-primary mb-2">Horario orientativo</h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">7:30-8:30</span><span><strong>Desayuno:</strong> leche + tostada con tomate/aguacate o gachas de avena con fruta</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">10:30-11:00</span><span>Snack: fruta, palitos de pan, queso fresco</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">13:00-14:00</span><span><strong>Comida:</strong> menú familiar adaptado (primero, segundo, fruta)</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">17:00-17:30</span><span><strong>Merienda:</strong> fruta + yogur natural o leche</span></div>
            <div className="flex gap-3 items-start"><span className="font-semibold text-text-primary min-w-[80px]">20:00-21:00</span><span><strong>Cena:</strong> más ligera que la comida. Leche antes de dormir si quiere</span></div>
          </div>

          <div className="mt-4 bg-cream rounded-xl p-3">
            <p className="text-sm text-text-secondary">
              <strong>💡 Consejo:</strong> A partir de los 12 meses se puede introducir la leche de vaca entera como bebida (máximo 500ml/día). Siempre entera, nunca desnatada ni semi. La leche materna puede continuar todo el tiempo que madre e hijo deseen (la OMS recomienda hasta los 2 años).
            </p>
          </div>
        </section>

        {/* Distribución nutricional */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Distribución calórica: leche vs sólidos
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold min-w-[80px] text-text-primary">6-8 meses</span>
              <div className="flex-1 h-6 rounded-full overflow-hidden flex">
                <div className="bg-blue-app h-full flex items-center justify-center text-xs text-white font-semibold" style={{ width: '80%' }}>Leche 80%</div>
                <div className="bg-green-app h-full flex items-center justify-center text-xs text-white font-semibold" style={{ width: '20%' }}>20%</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold min-w-[80px] text-text-primary">8-10 meses</span>
              <div className="flex-1 h-6 rounded-full overflow-hidden flex">
                <div className="bg-blue-app h-full flex items-center justify-center text-xs text-white font-semibold" style={{ width: '60%' }}>Leche 60%</div>
                <div className="bg-green-app h-full flex items-center justify-center text-xs text-white font-semibold" style={{ width: '40%' }}>Sólidos 40%</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold min-w-[80px] text-text-primary">10-12 meses</span>
              <div className="flex-1 h-6 rounded-full overflow-hidden flex">
                <div className="bg-blue-app h-full flex items-center justify-center text-xs text-white font-semibold" style={{ width: '45%' }}>Leche 45%</div>
                <div className="bg-green-app h-full flex items-center justify-center text-xs text-white font-semibold" style={{ width: '55%' }}>Sólidos 55%</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold min-w-[80px] text-text-primary">12+ meses</span>
              <div className="flex-1 h-6 rounded-full overflow-hidden flex">
                <div className="bg-blue-app h-full flex items-center justify-center text-xs text-white font-semibold" style={{ width: '30%' }}>30%</div>
                <div className="bg-green-app h-full flex items-center justify-center text-xs text-white font-semibold" style={{ width: '70%' }}>Sólidos 70%</div>
              </div>
            </div>
          </div>
          <p className="text-xs text-text-muted mt-3">Valores aproximados según OMS. Cada bebé es diferente.</p>
        </section>

        {/* Preguntas frecuentes */}
        <section className="bg-white rounded-2xl border border-cream-dark p-5">
          <h2 className="text-xl font-bold text-text-primary mb-4 border-b border-cream-dark pb-2">
            Preguntas frecuentes
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-text-primary text-sm">¿Debo dar el pecho/biberón antes o después de los sólidos?</h3>
              <p className="text-sm text-text-secondary mt-1">Al principio (6-7 meses), ofrecer un poco de leche antes para calmar el hambre inicial. Progresivamente, se puede invertir el orden: sólidos primero y leche después, según lo que funcione mejor con tu bebé.</p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary text-sm">¿Cuánta cantidad debe comer mi bebé?</h3>
              <p className="text-sm text-text-secondary mt-1">No hay cantidades fijas. La AEP y la OMS recomiendan la alimentación perceptiva: ofrecer y dejar que el bebé decida cuánto come. Las primeras semanas es más exploración que alimentación real.</p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary text-sm">¿Qué hago si mi bebé no quiere comer sólidos?</h3>
              <p className="text-sm text-text-secondary mt-1">Es completamente normal. No forzar nunca. Seguir ofreciendo sin presión. Dejar que explore y juegue con la comida. A veces se necesitan 10-15 exposiciones a un alimento antes de que el bebé lo acepte.</p>
            </div>
            <div>
              <h3 className="font-semibold text-text-primary text-sm">¿Cuándo puedo dejar la leche de fórmula?</h3>
              <p className="text-sm text-text-secondary mt-1">La leche de fórmula se puede sustituir por leche de vaca entera a partir de los 12 meses. La leche materna puede continuar todo el tiempo que madre e hijo deseen.</p>
            </div>
          </div>
        </section>

        {/* Related content */}
        <section className="bg-blue-light rounded-2xl p-5">
          <h3 className="font-semibold text-blue-app text-sm mb-2">Contenido relacionado</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/foods" className="text-sm text-blue-700 hover:underline">🍽️ Base de alimentos</Link>
            <Link href="/plan" className="text-sm text-blue-700 hover:underline">📅 Plan semanal</Link>
            <Link href="/blog/guia-alimentacion-complementaria" className="text-sm text-blue-700 hover:underline">📝 Guía completa AC</Link>
            <Link href="/learn" className="text-sm text-blue-700 hover:underline">📖 Aprender</Link>
            <Link href="/guia/atragantamiento" className="text-sm text-blue-700 hover:underline">🚨 Atragantamiento</Link>
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
          </ul>
        </section>

        <div className="text-xs text-text-muted text-center py-4">
          <p>Los horarios son orientativos. Cada bebé tiene su propio ritmo.</p>
          <p>Consulta siempre con tu pediatra.</p>
        </div>
      </main>

      <Navigation />
    </div>
  );
}
