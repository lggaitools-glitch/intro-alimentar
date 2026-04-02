'use client';

import Navigation from '@/components/Navigation';

function CardFooter() {
  return (
    <div className="mt-auto pt-4 border-t border-gray-200 text-center">
      <p className="text-xs text-text-muted tracking-wide">
        <span className="font-semibold text-green-app">Intro</span>
        <span className="font-semibold text-orange-app">Alimentar</span>
        <span className="ml-1">&#183; introalimentar.com</span>
      </p>
    </div>
  );
}

function Card1_AlimentosPorEdad() {
  const groups = [
    {
      age: '6 meses',
      color: 'bg-green-light',
      border: 'border-green-app',
      badge: 'bg-green-app',
      items: [
        { cat: 'Cereales', foods: '🌾 Arroz, maíz, avena' },
        { cat: 'Verduras', foods: '🥕 Patata, zanahoria, calabacín' },
        { cat: 'Frutas', foods: '🍎 Manzana, pera, plátano' },
        { cat: 'Carnes', foods: '🍗 Pollo, pavo, conejo' },
      ],
    },
    {
      age: '7-8 meses',
      color: 'bg-blue-light',
      border: 'border-blue-app',
      badge: 'bg-blue-app',
      items: [
        { cat: 'Legumbres', foods: '🫘 Lentejas, garbanzos' },
        { cat: 'Pescado blanco', foods: '🐟 Merluza, lenguado' },
        { cat: 'Huevo', foods: '🥚 Empezar por la yema' },
      ],
    },
    {
      age: '9-12 meses',
      color: 'bg-orange-light',
      border: 'border-orange-app',
      badge: 'bg-orange-app',
      items: [
        { cat: 'Nuevos alimentos', foods: '🍝 Pasta, pan, yogur' },
        { cat: 'Lácteos', foods: '🧀 Queso fresco' },
        { cat: 'Variedad', foods: '🥗 Más combinaciones' },
      ],
    },
    {
      age: '12-24 meses',
      color: 'bg-cream-dark',
      border: 'border-orange-dark',
      badge: 'bg-orange-dark',
      items: [
        { cat: 'Lácteos', foods: '🥛 Leche entera' },
        { cat: 'Otros', foods: '🍯 Miel, sardinas' },
        { cat: 'Dieta completa', foods: '🍽️ Todo tipo de alimentos' },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col aspect-[4/5] max-w-md mx-auto">
      <div className="bg-green-app px-6 py-5 text-white">
        <h2 className="text-xl font-bold text-center">🍽️ Tabla de Alimentos por Edad</h2>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-3 overflow-y-auto">
        {groups.map((g) => (
          <div key={g.age} className={`${g.color} rounded-xl p-3 border-l-4 ${g.border}`}>
            <span className={`${g.badge} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
              {g.age}
            </span>
            <div className="mt-2 space-y-1">
              {g.items.map((item) => (
                <p key={item.cat} className="text-sm text-text-primary">
                  <span className="font-semibold">{item.cat}:</span>{' '}
                  <span className="text-text-secondary">{item.foods}</span>
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 pb-4">
        <CardFooter />
      </div>
    </div>
  );
}

function Card2_SenalesListo() {
  const signs = [
    {
      emoji: '🪑',
      title: 'Se mantiene sentado con apoyo',
      desc: 'Puede sostener la cabeza y el tronco de forma estable.',
      color: 'bg-green-light border-green-app',
    },
    {
      emoji: '👅',
      title: 'Ha perdido el reflejo de extrusión',
      desc: 'Ya no empuja la comida fuera de la boca con la lengua.',
      color: 'bg-blue-light border-blue-app',
    },
    {
      emoji: '🤲',
      title: 'Coordinación mano-boca',
      desc: 'Es capaz de agarrar objetos y llevarlos a la boca.',
      color: 'bg-orange-light border-orange-app',
    },
    {
      emoji: '👀',
      title: 'Muestra interés por la comida',
      desc: 'Observa cómo comen los demás y trata de alcanzar la comida.',
      color: 'bg-cream-dark border-orange-dark',
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col aspect-[4/5] max-w-md mx-auto">
      <div className="bg-gradient-to-r from-blue-app to-green-app px-6 py-5 text-white">
        <h2 className="text-xl font-bold text-center">✅ Señales de que tu Bebé está Listo</h2>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-4">
        {signs.map((s, i) => (
          <div key={i} className={`${s.color} border-l-4 rounded-xl p-4 flex items-start gap-3`}>
            <span className="text-3xl flex-shrink-0">{s.emoji}</span>
            <div>
              <p className="font-bold text-text-primary text-sm">{s.title}</p>
              <p className="text-xs text-text-secondary mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
        <div className="bg-cream rounded-lg p-3 text-center mt-auto">
          <p className="text-xs text-text-muted italic">
            Generalmente alrededor de los <span className="font-bold text-green-dark">6 meses</span> — consulta con tu pediatra
          </p>
        </div>
      </div>
      <div className="px-5 pb-4">
        <CardFooter />
      </div>
    </div>
  );
}

function Card3_BLWvsPures() {
  const rows = [
    { aspect: 'Inicio', blw: 'Trozos desde el principio', pures: 'Texturas progresivas' },
    { aspect: 'Control', blw: 'El bebé decide', pures: 'El adulto decide ritmo' },
    { aspect: 'Motricidad', blw: 'Estimula motricidad fina', pures: 'Menor estimulación' },
    { aspect: 'Atragantamiento', blw: 'Similar riesgo (con formación)', pures: 'Similar riesgo' },
    { aspect: 'Nutrientes', blw: 'Posible menor ingesta Fe', pures: 'Más control de Fe' },
    { aspect: 'Preparación', blw: 'Más sencilla', pures: 'Requiere triturar' },
    { aspect: 'Suciedad', blw: 'Más suciedad', pures: 'Menos suciedad' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col aspect-[4/5] max-w-md mx-auto">
      <div className="bg-gradient-to-r from-green-app to-orange-app px-6 py-5 text-white">
        <h2 className="text-xl font-bold text-center">⚖️ BLW vs Purés: Comparativa</h2>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="grid grid-cols-3 gap-0 text-xs flex-1">
          {/* Header row */}
          <div className="bg-gray-100 p-2 font-bold text-text-primary rounded-tl-lg">Aspecto</div>
          <div className="bg-green-light p-2 font-bold text-green-dark text-center">🥦 BLW</div>
          <div className="bg-orange-light p-2 font-bold text-orange-dark text-center rounded-tr-lg">🥣 Purés</div>
          {/* Data rows */}
          {rows.map((r, i) => {
            const isLast = i === rows.length - 1;
            return (
              <div key={r.aspect} className="contents">
                <div className={`bg-gray-50 p-2 font-semibold text-text-primary border-t border-gray-100 ${isLast ? 'rounded-bl-lg' : ''}`}>
                  {r.aspect}
                </div>
                <div className="bg-green-light/50 p-2 text-text-secondary border-t border-gray-100 text-center">
                  {r.blw}
                </div>
                <div className={`bg-orange-light/50 p-2 text-text-secondary border-t border-gray-100 text-center ${isLast ? 'rounded-br-lg' : ''}`}>
                  {r.pures}
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-cream rounded-lg p-3 text-center mt-4">
          <p className="text-xs text-text-muted italic">
            La <span className="font-bold">AEP</span> avala ambos métodos. Lo importante es respetar las señales del bebé.
          </p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <CardFooter />
      </div>
    </div>
  );
}

function Card4_AlimentosProhibidos() {
  const sections = [
    {
      icon: '❌',
      title: 'Antes de 12 meses',
      color: 'bg-red-light border-red-app',
      badge: 'bg-red-app',
      items: [
        '🍯 Miel (riesgo de botulismo)',
        '🧂 Sal añadida',
        '🍬 Azúcar añadido',
        '🥛 Leche de vaca como bebida',
      ],
    },
    {
      icon: '❌',
      title: 'Antes de 3 años',
      color: 'bg-red-light border-red-app',
      badge: 'bg-red-app',
      items: [
        '🥜 Frutos secos enteros (atragantamiento)',
        '🍇 Uvas enteras',
        '🍿 Palomitas',
        '🌭 Salchichas sin cortar',
      ],
    },
    {
      icon: '❌',
      title: 'Antes de 10 años',
      color: 'bg-orange-light border-orange-app',
      badge: 'bg-orange-app',
      items: [
        '🦈 Pez espada, tiburón',
        '🐟 Atún rojo, lucio (mercurio)',
      ],
    },
    {
      icon: '⚠️',
      title: 'Con precaución',
      color: 'bg-cream-dark border-orange-dark',
      badge: 'bg-orange-dark',
      items: [
        '🥬 Espinacas/acelgas (<12m: máx 1 ración/día)',
        '🐟 Pescado azul grande',
      ],
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col aspect-[4/5] max-w-md mx-auto">
      <div className="bg-red-app px-6 py-5 text-white">
        <h2 className="text-xl font-bold text-center">🚫 Alimentos que NUNCA dar a un Bebé</h2>
      </div>
      <div className="p-5 flex-1 flex flex-col gap-3 overflow-y-auto">
        {sections.map((s) => (
          <div key={s.title} className={`${s.color} border-l-4 rounded-xl p-3`}>
            <span className={`${s.badge} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>
              {s.icon} {s.title}
            </span>
            <ul className="mt-2 space-y-1">
              {s.items.map((item) => (
                <li key={item} className="text-sm text-text-primary">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="px-5 pb-4">
        <CardFooter />
      </div>
    </div>
  );
}

function Card5_Alergenos() {
  const allergens = [
    { emoji: '🥛', name: 'Leche de vaca', info: 'Yogur/queso desde 9-12m, como bebida desde 12m', color: 'bg-blue-light' },
    { emoji: '🥚', name: 'Huevo', info: 'Bien cocido desde 6m (tortilla, huevo duro)', color: 'bg-orange-light' },
    { emoji: '🥜', name: 'Cacahuete', info: 'Mantequilla de cacahuete desde 6m (nunca entero)', color: 'bg-cream-dark' },
    { emoji: '🌰', name: 'Frutos secos', info: 'Molidos o en crema desde 6m (enteros >3 años)', color: 'bg-orange-light' },
    { emoji: '🌾', name: 'Trigo / Gluten', info: 'Pan, pasta desde 6m', color: 'bg-green-light' },
    { emoji: '🫘', name: 'Soja', info: 'Desde 6m en pequeñas cantidades', color: 'bg-cream-dark' },
    { emoji: '🐟', name: 'Pescado', info: 'Blanco desde 6-7m, azul desde 9m', color: 'bg-blue-light' },
    { emoji: '🦐', name: 'Marisco', info: 'Desde 12m, bien cocido', color: 'bg-red-light' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col aspect-[4/5] max-w-md mx-auto">
      <div className="bg-gradient-to-r from-orange-app to-orange-dark px-6 py-5 text-white">
        <h2 className="text-xl font-bold text-center">⚠️ Guía de Alérgenos</h2>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2 overflow-y-auto">
        {allergens.map((a, i) => (
          <div key={i} className={`${a.color} rounded-lg px-3 py-2 flex items-center gap-3`}>
            <span className="text-2xl flex-shrink-0">{a.emoji}</span>
            <div className="min-w-0">
              <p className="font-bold text-text-primary text-sm">{a.name}</p>
              <p className="text-xs text-text-secondary">{a.info}</p>
            </div>
          </div>
        ))}
        <div className="bg-green-light rounded-lg p-3 text-center mt-auto border border-green-app/30">
          <p className="text-xs text-green-dark font-semibold">
            Introduce un alérgeno nuevo cada 3 días. Ofrece por la mañana para observar reacciones.
          </p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <CardFooter />
      </div>
    </div>
  );
}

export default function InfographicsPage() {
  return (
    <main className="min-h-screen bg-cream pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-app to-green-dark px-6 py-10 text-white text-center">
        <h1 className="text-3xl font-bold">Infografías</h1>
        <p className="mt-2 text-green-light text-sm">
          Comparte información útil sobre alimentación infantil
        </p>
      </div>

      {/* Cards */}
      <section className="px-4 py-8 space-y-8 max-w-md mx-auto">
        <Card1_AlimentosPorEdad />
        <Card2_SenalesListo />
        <Card3_BLWvsPures />
        <Card4_AlimentosProhibidos />
        <Card5_Alergenos />
      </section>

      <Navigation />
    </main>
  );
}
