export interface WeekPlanItem {
  week: number;
  phase: number;
  phaseLabel: string;
  title: string;
  description: string;
  foodsToIntroduce: string[]; // food IDs
  tips: string[];
  mealsPerDay: string;
  milkNote: string;
}

export const weekPlan: WeekPlanItem[] = [
  // === PHASE 1: Month 6 (Weeks 1-4) ===
  {
    week: 1,
    phase: 1,
    phaseLabel: 'Mes 6 — Primeros sabores',
    title: 'Semana 1: ¡Empezamos!',
    description: 'Los primeros días son de exploración. El objetivo NO es que coma mucho, sino que descubra texturas y sabores. La leche sigue siendo el alimento principal.',
    foodsToIntroduce: ['calabacin', 'calabaza', 'patata', 'arroz'],
    tips: [
      'Elige un momento del día en que el bebé esté contento y no muy hambriento ni muy lleno',
      'Ofrece la leche primero y luego la comida como complemento',
      'Un alimento nuevo cada 2-3 días para detectar posibles reacciones',
      'No te preocupes si casi no come — es normal y esperado',
      'Añade siempre un chorrito de aceite de oliva virgen extra (AOVE)',
    ],
    mealsPerDay: '1 comida + leche a demanda',
    milkNote: 'La leche materna o de fórmula sigue siendo el alimento principal. La comida es un complemento.',
  },
  {
    week: 2,
    phase: 1,
    phaseLabel: 'Mes 6 — Primeros sabores',
    title: 'Semana 2: Más verduras y primera fruta',
    description: 'Seguimos ampliando el repertorio de sabores. Introducimos las primeras frutas. Recuerda: un alimento nuevo cada 2-3 días.',
    foodsToIntroduce: ['zanahoria', 'boniato', 'platano', 'pera'],
    tips: [
      'Si rechaza un alimento, no forzar. Vuelve a ofrecerlo otro día',
      'Las frutas se pueden ofrecer como merienda o después de la comida',
      'Si haces BLW, corta en bastones del tamaño del dedo de un adulto',
      'Varía los sabores: dulce (boniato, plátano) y más neutros (calabacín)',
    ],
    mealsPerDay: '1-2 comidas + leche a demanda',
    milkNote: 'Sigue dando pecho o biberón a demanda. No reduzcas tomas de leche.',
  },
  {
    week: 3,
    phase: 1,
    phaseLabel: 'Mes 6 — Primeros sabores',
    title: 'Semana 3: Hierro — carne y cereales',
    description: '¡Momento clave! La AEP recomienda priorizar alimentos ricos en hierro desde el inicio. Introducimos carne y cereales.',
    foodsToIntroduce: ['pollo', 'ternera', 'avena', 'brocoli'],
    tips: [
      'El hierro es crítico a partir de los 6 meses — las reservas del nacimiento se agotan',
      'La carne es la mejor fuente de hierro hemo (mejor absorción)',
      'Combina carne/hierro con vitamina C (naranja, tomate) para mejor absorción',
      'Los cereales pueden tener gluten — la AEP dice que está bien introducirlo ahora en pequeñas cantidades',
      'Si haces puré: mezcla la carne bien triturada con verduras',
    ],
    mealsPerDay: '1-2 comidas + leche a demanda',
    milkNote: 'La leche sigue siendo fundamental. Ofrece primero pecho/biberón.',
  },
  {
    week: 4,
    phase: 1,
    phaseLabel: 'Mes 6 — Primeros sabores',
    title: 'Semana 4: Legumbres y más variedad',
    description: 'Ampliamos con legumbres (excelente fuente de hierro vegetal) y consolidamos lo aprendido.',
    foodsToIntroduce: ['lentejas', 'garbanzos', 'manzana', 'judias-verdes'],
    tips: [
      'Las lentejas rojas son ideales para empezar: se deshacen y son suaves',
      'El hummus casero (sin sal) es perfecto para BLW con bastones de verdura',
      'La manzana SIEMPRE cocida para BLW (cruda es riesgo de atragantamiento)',
      'Ya puedes empezar a combinar alimentos que ya ha probado por separado',
      'Comienza a establecer una rutina: comida y merienda a horas similares',
    ],
    mealsPerDay: '2 comidas + leche a demanda',
    milkNote: 'Mantén las tomas de leche. La comida complementa pero no sustituye.',
  },

  // === PHASE 2: Month 7-8 (Weeks 5-12) ===
  {
    week: 5,
    phase: 2,
    phaseLabel: 'Mes 7 — Ampliando horizontes',
    title: 'Semana 5: Gluten y primeros alérgenos',
    description: 'Si no lo has hecho ya, es buen momento para introducir alimentos con gluten (pan, pasta) y empezar con los alérgenos principales.',
    foodsToIntroduce: ['trigo', 'huevo', 'pavo', 'guisantes'],
    tips: [
      'Introduce el huevo bien cocido: empieza con la yema, luego la clara',
      'La tortilla francesa cortada en tiras es ideal para BLW',
      'Pan tostado en bastones para chupar (introduce el gluten del trigo)',
      'Recuerda: no hay beneficio en retrasar alérgenos según la AEP y evidencia actual',
      'Observa 2-3 días después de cada alérgeno nuevo',
    ],
    mealsPerDay: '2 comidas + leche a demanda',
    milkNote: 'Sigue con lactancia a demanda. Las 2 comidas son complementarias.',
  },
  {
    week: 6,
    phase: 2,
    phaseLabel: 'Mes 7 — Ampliando horizontes',
    title: 'Semana 6: Pescado y más frutas',
    description: 'Introducimos el pescado (empezando por pescado blanco) y seguimos variando frutas.',
    foodsToIntroduce: ['merluza', 'lenguado', 'fresa', 'melocoton'],
    tips: [
      'El pescado blanco es más suave para empezar (merluza, lenguado)',
      'Revisa MUY bien que no haya espinas',
      'Las fresas no hay que retrasarlas — es un mito que sean alergénicas',
      'Sigue variando: cuantos más sabores diferentes pruebe, mejor',
    ],
    mealsPerDay: '2 comidas + leche a demanda',
    milkNote: 'El pescado no sustituye la leche como fuente de proteínas principal todavía.',
  },
  {
    week: 7,
    phase: 2,
    phaseLabel: 'Mes 7 — Ampliando horizontes',
    title: 'Semana 7: Más alérgenos — cacahuete y sésamo',
    description: 'Seguimos con la introducción de alérgenos importantes. La introducción temprana del cacahuete puede ser protectora.',
    foodsToIntroduce: ['cacahuete', 'sesamo', 'aguacate', 'salmon'],
    tips: [
      'Cacahuete: SOLO como mantequilla fina diluida o polvo. NUNCA entero',
      'El tahini (sésamo) es perfecto en hummus o diluido en purés',
      'El salmón es excelente fuente de omega-3 para el desarrollo cerebral',
      'El aguacate es muy calórico — perfecto para bebés en crecimiento',
      'Si hay antecedentes de alergia en la familia, consulta al pediatra antes',
    ],
    mealsPerDay: '2 comidas + leche a demanda',
    milkNote: 'Mantén la lactancia. Puedes empezar a ofrecer agua en vaso abierto con las comidas.',
  },
  {
    week: 8,
    phase: 2,
    phaseLabel: 'Mes 7 — Ampliando horizontes',
    title: 'Semana 8: Frutos secos y soja',
    description: 'Completamos la introducción de los alérgenos principales y seguimos ampliando variedad.',
    foodsToIntroduce: ['frutos-secos', 'soja', 'naranja', 'puerro'],
    tips: [
      'Frutos secos: SIEMPRE en crema fina o molidos. Nunca enteros hasta los 3+ años',
      'Tofu firme a la plancha es perfecto para BLW — cortado en tiras',
      'La naranja en gajos mejora la absorción del hierro de las legumbres',
      'Ya puedes hacer combinaciones más complejas con alimentos probados',
    ],
    mealsPerDay: '2-3 comidas + leche a demanda',
    milkNote: 'Puedes empezar a añadir una tercera comida si el bebé muestra interés.',
  },
  {
    week: 9,
    phase: 2,
    phaseLabel: 'Mes 8 — Más texturas',
    title: 'Semana 9: Aumentar texturas',
    description: '¡Momento importante! La AEP recomienda que a los 8-9 meses el bebé pruebe texturas grumosas. Si solo come purés lisos, empieza a espesarlos.',
    foodsToIntroduce: ['cordero', 'sardina', 'mango', 'tomate'],
    tips: [
      'Si haces purés: empieza a dejarlos más grumosos (chafa con tenedor en vez de triturar)',
      'La AEP advierte: retrasar las texturas grumosas más allá de 9-10 meses dificulta la aceptación',
      'Las sardinas son riquísimas en omega-3 y hierro',
      'El tomate pelado en gajos es genial para BLW',
    ],
    mealsPerDay: '2-3 comidas + leche a demanda',
    milkNote: 'La leche sigue siendo importante pero la comida va ganando peso.',
  },
  {
    week: 10,
    phase: 2,
    phaseLabel: 'Mes 8 — Más texturas',
    title: 'Semana 10: Combinaciones y comida familiar',
    description: 'El bebé ya conoce muchos alimentos. Es momento de combinarlos y empezar a adaptar comidas familiares.',
    foodsToIntroduce: ['cerdo', 'alubias', 'quinoa', 'sandia'],
    tips: [
      'Haz versiones sin sal de tus platos habituales para el bebé',
      'Guisos familiares son perfectos: retira la porción del bebé antes de salar',
      'Lentejas con arroz = proteína completa vegetal (ideal para familias vegetarianas)',
      'Deja que explore las texturas — ensuciar es parte del aprendizaje',
    ],
    mealsPerDay: '3 comidas + leche a demanda',
    milkNote: '3 comidas establecidas + meriendas. La leche complementa.',
  },
  {
    week: 11,
    phase: 2,
    phaseLabel: 'Mes 8 — Más texturas',
    title: 'Semana 11: Consolidación',
    description: 'Semana para consolidar hábitos y variar combinaciones. El bebé ya debería estar probando trozos blandos.',
    foodsToIntroduce: ['arandanos', 'maiz'],
    tips: [
      'Evalúa: ¿come al menos 2-3 comidas al día? ¿Acepta texturas variadas?',
      'Ofrece la comida en un plato: empieza a usar cuchara y tenedor (aunque sea torpe)',
      'Comer en familia siempre que sea posible — el ejemplo es el mejor maestro',
      'Los arándanos siempre aplastados ligeramente',
    ],
    mealsPerDay: '3 comidas + 1-2 meriendas + leche',
    milkNote: 'Ritmo más establecido. Leche a demanda entre comidas.',
  },
  {
    week: 12,
    phase: 2,
    phaseLabel: 'Mes 8 — Más texturas',
    title: 'Semana 12: Preparándose para más autonomía',
    description: 'El bebé va ganando habilidad. Fomenta la autoalimentación sea cual sea tu enfoque.',
    foodsToIntroduce: ['uvas'],
    tips: [
      'Uvas SIEMPRE cortadas longitudinalmente — uno de los alimentos más peligrosos enteros',
      'Deja que use las manos y vaya explorando cubiertos',
      'Ofrece agua en vaso abierto o con asas',
      'Es normal que la ingesta varíe mucho de un día a otro',
      'Si rechaza algo nuevo, no desistas: pueden hacer falta 10-15 exposiciones',
    ],
    mealsPerDay: '3 comidas + 1-2 meriendas + leche',
    milkNote: 'Patrón estable. Sigue con pecho/biberón a demanda.',
  },

  // === PHASE 3: Months 9-12 (Weeks 13-24) ===
  {
    week: 13,
    phase: 3,
    phaseLabel: 'Meses 9-10 — Lácteos y autonomía',
    title: 'Semana 13-14: Yogur y queso fresco',
    description: 'A partir de los 9-10 meses, según la AEP, se pueden introducir yogur natural (sin azúcar) y queso fresco pasteurizado.',
    foodsToIntroduce: ['yogur', 'queso-fresco'],
    tips: [
      'Solo yogur NATURAL sin azúcar añadido — nada de yogures de sabores',
      'El queso fresco pasteurizado, cortado en bastones para BLW',
      'Puedes mezclar yogur con fruta triturada',
      'Evita quesos curados por su alto contenido en sal',
      'El bebé ya debería comer trozos blandos sin problema',
    ],
    mealsPerDay: '3 comidas + 1-2 meriendas + leche',
    milkNote: 'El yogur cuenta como lácteo pero no sustituye la leche materna/fórmula.',
  },
  {
    week: 15,
    phase: 3,
    phaseLabel: 'Meses 9-10 — Lácteos y autonomía',
    title: 'Semanas 15-18: Comida familiar adaptada',
    description: 'El bebé come prácticamente de todo (con excepciones). Adapta las comidas familiares: retira su porción antes de añadir sal.',
    foodsToIntroduce: [],
    tips: [
      'El bebé puede comer la mayoría de comidas familiares sin sal',
      'Practica con cuchara y tenedor (aunque use las manos también)',
      'Ofrece variedad: si hoy rechaza algo, prueba mañana',
      'Las comidas en familia enseñan hábitos para toda la vida',
      'La AEP recomienda: el adulto decide QUÉ, CUÁNDO y DÓNDE; el bebé decide CUÁNTO',
      'Intenta que pruebe al menos una proteína (carne, pescado, huevo o legumbre) en cada comida principal',
    ],
    mealsPerDay: '3 comidas + 1-2 meriendas + leche',
    milkNote: 'Continúa lactancia materna si lo deseas. La OMS recomienda hasta los 2 años o más.',
  },
  {
    week: 19,
    phase: 3,
    phaseLabel: 'Meses 11-12 — Casi todo',
    title: 'Semanas 19-24: Camino al primer cumpleaños',
    description: 'El bebé se acerca al año. Casi todo está permitido ya. Pronto podrá tomar leche de vaca entera y miel.',
    foodsToIntroduce: [],
    tips: [
      'Practica el vaso abierto — objetivo: dejar el biberón pronto',
      'Puedes empezar a ofrecer cubiertos de forma más consistente',
      'Si aún no has introducido todos los alérgenos, es buen momento',
      'Recuerda: sigue SIN añadir sal ni azúcar',
      'Al cumplir 12 meses: puede tomar leche de vaca entera y miel',
    ],
    mealsPerDay: '3 comidas + 2 meriendas + leche',
    milkNote: 'Si toma fórmula, a los 12 meses puede pasar a leche de vaca entera.',
  },

  // === PHASE 4: Months 12-24 (Weeks 25+) ===
  {
    week: 25,
    phase: 4,
    phaseLabel: 'Meses 12-24 — Comida familiar',
    title: 'A partir de los 12 meses',
    description: 'El bebé come prácticamente todo. Se incorporan los últimos alimentos: leche de vaca entera, miel, espinacas/acelgas con moderación.',
    foodsToIntroduce: ['leche-vaca', 'miel', 'espinacas', 'acelgas'],
    tips: [
      'Leche de vaca entera (no desnatada) como bebida, en vaso abierto',
      'Miel: ya es segura pero sigue siendo azúcar — con moderación',
      'Espinacas y acelgas: ahora sí, pero sin abusar (nitratos)',
      'Sigue sin añadir sal ni azúcar de forma activa',
      'Frutos secos enteros: todavía NO hasta los 3+ años (atragantamiento)',
      'Minimiza zumos, procesados y ultraprocesados',
      'Come en familia siempre que sea posible — es el mejor aprendizaje',
    ],
    mealsPerDay: '3 comidas principales + 2 meriendas',
    milkNote: 'Leche de vaca entera (500 ml/día aprox). Si sigue con lactancia materna, perfecto — OMS recomienda hasta 2+ años.',
  },
];

export function getWeekPlan(week: number): WeekPlanItem | undefined {
  // Find the exact week or the most recent plan before that week
  const sorted = [...weekPlan].sort((a, b) => b.week - a.week);
  return sorted.find(w => w.week <= week);
}

export function getCurrentPhase(week: number): number {
  const plan = getWeekPlan(week);
  return plan?.phase ?? 1;
}
