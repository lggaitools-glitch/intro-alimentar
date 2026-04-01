export interface Allergen {
  id: string;
  nameEs: string;
  nameEn: string;
  emoji: string;
  description: string;
  tipForIntroduction: string;
  commonFoods: string[];
}

export const allergens: Allergen[] = [
  {
    id: 'huevo',
    nameEs: 'Huevo',
    nameEn: 'Egg',
    emoji: '🥚',
    description: 'Uno de los alérgenos más comunes en la infancia. La clara es la parte más alergénica.',
    tipForIntroduction: 'Empezar con huevo bien cocido (duro). Ofrecer primero yema, luego clara. Tortilla francesa es ideal. Observar 2-3 días tras la primera toma.',
    commonFoods: ['Huevo duro', 'Tortilla', 'Rebozados', 'Repostería', 'Pasta al huevo'],
  },
  {
    id: 'lacteos',
    nameEs: 'Lácteos (proteína de leche de vaca)',
    nameEn: 'Dairy (cow\'s milk protein)',
    emoji: '🥛',
    description: 'Proteína de la leche de vaca. Yogur y queso desde 9-10 meses, leche entera como bebida desde 12 meses.',
    tipForIntroduction: 'Se pueden usar pequeñas cantidades de leche para cocinar desde los 6 meses. Yogur natural sin azúcar desde los 9-10 meses. Si hay antecedentes familiares, consultar pediatra.',
    commonFoods: ['Yogur', 'Queso', 'Mantequilla', 'Leche en recetas', 'Bechamel'],
  },
  {
    id: 'gluten',
    nameEs: 'Gluten / Trigo',
    nameEn: 'Gluten / Wheat',
    emoji: '🌾',
    description: 'Proteína presente en trigo, cebada, centeno y avena (contaminación cruzada). La AEP recomienda introducirlo alrededor de los 6 meses.',
    tipForIntroduction: 'Ofrecer pequeñas cantidades de pan, pasta o cereales con gluten. La AEP indica introducir entre 4-11 meses, idealmente alrededor de los 6 meses. No retrasar la introducción.',
    commonFoods: ['Pan', 'Pasta', 'Galletas', 'Cereales', 'Avena'],
  },
  {
    id: 'pescado',
    nameEs: 'Pescado',
    nameEn: 'Fish',
    emoji: '🐟',
    description: 'Alérgeno relativamente común. Empezar con pescados blancos suaves (merluza, lenguado).',
    tipForIntroduction: 'Empezar con pescado blanco cocido al vapor. Introducir uno cada vez. Evitar grandes depredadores (atún rojo, pez espada, cazón, lucio) por mercurio.',
    commonFoods: ['Merluza', 'Salmón', 'Lenguado', 'Sardinas', 'Bacalao'],
  },
  {
    id: 'cacahuete',
    nameEs: 'Cacahuete',
    nameEn: 'Peanut',
    emoji: '🥜',
    description: 'La introducción temprana puede reducir el riesgo de alergia (estudio LEAP). NUNCA ofrecer entero.',
    tipForIntroduction: 'Ofrecer como mantequilla de cacahuete diluida o polvo mezclado en puré. Empezar con muy poca cantidad. NUNCA cacahuetes enteros hasta 3+ años.',
    commonFoods: ['Mantequilla de cacahuete', 'Polvo de cacahuete', 'Salsas asiáticas'],
  },
  {
    id: 'frutos-secos',
    nameEs: 'Frutos secos (nueces, almendras...)',
    nameEn: 'Tree nuts',
    emoji: '🌰',
    description: 'Incluye nueces, almendras, anacardos, avellanas, pistachos, etc. Alérgeno importante.',
    tipForIntroduction: 'Solo como cremas finas o molidos. Untar en tostada o mezclar con gachas. NUNCA enteros ni en trozos hasta 3+ años por riesgo de atragantamiento.',
    commonFoods: ['Crema de almendras', 'Harina de frutos secos', 'Nueces molidas'],
  },
  {
    id: 'soja',
    nameEs: 'Soja',
    nameEn: 'Soy',
    emoji: '🫛',
    description: 'Presente en muchos alimentos procesados. El tofu es una buena forma de introducirla.',
    tipForIntroduction: 'Ofrecer tofu firme en bastones o edamame aplastado. Introducir y observar 2-3 días.',
    commonFoods: ['Tofu', 'Edamame', 'Salsa de soja', 'Bebida de soja'],
  },
  {
    id: 'marisco',
    nameEs: 'Marisco',
    nameEn: 'Shellfish',
    emoji: '🦐',
    description: 'Incluye crustáceos (gambas, langostinos) y moluscos (mejillones, almejas).',
    tipForIntroduction: 'Bien cocido siempre. Empezar con pequeñas cantidades. No hay razón para retrasar según la evidencia actual.',
    commonFoods: ['Gambas', 'Langostinos', 'Mejillones', 'Almejas'],
  },
  {
    id: 'sesamo',
    nameEs: 'Sésamo',
    nameEn: 'Sesame',
    emoji: '🫘',
    description: 'Alérgeno en aumento. El tahini (pasta de sésamo) es la forma más habitual de introducirlo.',
    tipForIntroduction: 'Ofrecer tahini diluido en purés o untado fino en tostada. También como parte del hummus.',
    commonFoods: ['Tahini', 'Hummus', 'Pan con sésamo', 'Aceite de sésamo'],
  },
];
