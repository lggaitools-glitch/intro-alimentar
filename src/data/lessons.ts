export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  readTimeMinutes: number;
  content: string; // Markdown-like content
  keyTakeaways: string[];
  quizQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Module {
  id: string;
  title: string;
  emoji: string;
  description: string;
  lessonIds: string[];
}

export const modules: Module[] = [
  {
    id: 'foundations',
    title: 'Fundamentos',
    emoji: '📚',
    description: 'Qué es la alimentación complementaria, por qué esperar a los 6 meses y cómo empezar.',
    lessonIds: ['found-1', 'found-2', 'found-3', 'found-4'],
  },
  {
    id: 'approaches',
    title: 'Elige tu enfoque',
    emoji: '🍽️',
    description: 'Purés tradicionales, BLW, BLISS o mixto. Conoce cada método y elige el tuyo.',
    lessonIds: ['appr-1', 'appr-2', 'appr-3', 'appr-4'],
  },
  {
    id: 'nutrition',
    title: 'Nutrición esencial',
    emoji: '💪',
    description: 'Hierro, zinc, vitamina D y todo lo que tu bebé necesita. Qué alimentos priorizar.',
    lessonIds: ['nutr-1', 'nutr-2', 'nutr-3', 'nutr-4'],
  },
  {
    id: 'safety',
    title: 'Seguridad',
    emoji: '🛡️',
    description: 'Prevención de atragantamientos, cortes seguros, alimentos prohibidos y primeros auxilios.',
    lessonIds: ['safe-1', 'safe-2', 'safe-3', 'safe-4'],
  },
  {
    id: 'responsive',
    title: 'Alimentación perceptiva',
    emoji: '💛',
    description: 'Cómo respetar el apetito del bebé, crear un entorno positivo y no forzar.',
    lessonIds: ['resp-1', 'resp-2', 'resp-3'],
  },
  {
    id: 'practical',
    title: 'Tips prácticos',
    emoji: '🧑‍🍳',
    description: 'Planificación de menús, comer fuera de casa, lidiar con el rechazo y cuándo preocuparse.',
    lessonIds: ['prac-1', 'prac-2', 'prac-3', 'prac-4'],
  },
];

export const lessons: Lesson[] = [
  // ==========================================
  // MODULE 1: FOUNDATIONS
  // ==========================================
  {
    id: 'found-1',
    moduleId: 'foundations',
    title: '¿Qué es la alimentación complementaria?',
    readTimeMinutes: 3,
    content: `La **alimentación complementaria (AC)** es el proceso de introducir alimentos sólidos y líquidos diferentes a la leche materna o de fórmula en la dieta del bebé. Se llama "complementaria" porque no sustituye la leche, sino que la complementa.

La Organización Mundial de la Salud (OMS) y la Asociación Española de Pediatría (AEP) recomiendan iniciar la AC alrededor de los **6 meses de edad**, manteniendo la lactancia materna de forma simultánea.

**Puntos clave:**
- La leche (materna o de fórmula) sigue siendo el alimento principal durante el primer año
- Los alimentos sólidos "complementan" la leche, no la sustituyen
- Es un proceso gradual: de probar pequeñas cantidades a comer comidas completas
- No hay un orden rígido de introducción de alimentos
- Lo importante es priorizar alimentos ricos en hierro y ofrecer variedad

**¿Por qué "complementaria" y no "destete"?**
El término "destete" puede confundir, porque no se trata de quitar la leche. De hecho, la OMS recomienda continuar con lactancia materna hasta los 2 años o más, junto con los alimentos sólidos.

**El objetivo final** es que hacia los 12-24 meses el bebé coma prácticamente lo mismo que la familia, adaptado en textura y sin sal/azúcar añadidos.`,
    keyTakeaways: [
      'La alimentación complementaria comienza alrededor de los 6 meses',
      'No sustituye la leche: la complementa',
      'No hay un orden rígido de alimentos',
      'Priorizar alimentos ricos en hierro',
    ],
    quizQuestion: {
      question: '¿Qué significa "alimentación complementaria"?',
      options: [
        'Que los alimentos sólidos sustituyen a la leche',
        'Que los alimentos sólidos complementan la leche, sin sustituirla',
        'Que solo se pueden dar purés',
        'Que hay que dejar de dar el pecho',
      ],
      correctIndex: 1,
      explanation: 'La alimentación complementaria COMPLEMENTA la leche materna o de fórmula, que sigue siendo el alimento principal durante el primer año.',
    },
  },
  {
    id: 'found-2',
    moduleId: 'foundations',
    title: '¿Por qué esperar hasta los 6 meses?',
    readTimeMinutes: 4,
    content: `La recomendación de esperar hasta aproximadamente los 6 meses se basa en la maduración de varios sistemas del bebé:

**1. Maduración neurológica**
Hacia los 6 meses, el bebé desarrolla la capacidad de sentarse con apoyo, coordinar la mano-boca y manejar alimentos en la boca. El reflejo de extrusión (empujar con la lengua lo que entra en la boca) desaparece.

**2. Maduración renal**
Los riñones del bebé maduran para manejar la carga de solutos (sales y proteínas) de los alimentos sólidos. Antes de los 6 meses, los riñones son inmaduros.

**3. Maduración gastrointestinal**
El intestino del bebé "cierra" sus uniones celulares, reduciendo la permeabilidad. Esto disminuye el riesgo de que proteínas alergénicas grandes pasen a la sangre.

**4. Maduración inmunológica**
El sistema inmunitario del intestino madura, mejorando la tolerancia a nuevos alimentos.

**5. Necesidades nutricionales**
Las reservas de hierro del nacimiento empiezan a agotarse alrededor de los 6 meses. La leche materna, aunque perfecta, es baja en hierro a partir de esta edad.

**Riesgos de empezar demasiado pronto (<4 meses):**
- Mayor riesgo de atragantamiento
- Posibles problemas renales por sobrecarga
- Mayor riesgo de alergias alimentarias (evidencia limitada)
- Interferencia con la lactancia materna
- Mayor riesgo de obesidad futura

**Riesgos de empezar demasiado tarde (>7 meses):**
- Déficit de hierro y zinc
- Dificultad para aceptar texturas grumosas más adelante
- Posible impacto en el crecimiento
- Ventana de oportunidad para la introducción de alérgenos`,
    keyTakeaways: [
      'A los 6 meses maduran riñones, intestino, sistema nervioso e inmunológico',
      'Las reservas de hierro del nacimiento se agotan alrededor de los 6 meses',
      'Antes de 4 meses: riesgo de atragantamiento y sobrecarga renal',
      'Después de 7 meses: riesgo de déficit nutricional y rechazo de texturas',
    ],
    quizQuestion: {
      question: '¿Cuál NO es una razón para esperar hasta los 6 meses?',
      options: [
        'Los riñones necesitan madurar',
        'Las reservas de hierro se agotan a los 6 meses',
        'El bebé necesita dientes para comer',
        'El intestino necesita cerrar sus uniones celulares',
      ],
      correctIndex: 2,
      explanation: 'Los dientes NO son necesarios para empezar con sólidos. Los bebés mastican con las encías, que son muy duras. Muchos bebés empiezan la AC sin ningún diente.',
    },
  },
  {
    id: 'found-3',
    moduleId: 'foundations',
    title: 'Señales de que tu bebé está listo',
    readTimeMinutes: 3,
    content: `La edad de 6 meses es orientativa. Lo importante es observar estas **señales de preparación (readiness signs)**:

**✅ Señales de que SÍ está listo:**

**1. Se mantiene sentado con apoyo (sedestación)**
El bebé puede mantenerse erguido con buen control de la cabeza y el tronco, al menos con apoyo mínimo. Esto es esencial para tragar de forma segura.

**2. Ha perdido el reflejo de extrusión**
El reflejo de empujar con la lengua todo lo que entra en la boca ha desaparecido o está disminuyendo. Si le ofreces comida y la empuja con la lengua, aún no está listo.

**3. Muestra interés activo por la comida**
Mira con curiosidad lo que comes, intenta agarrar tu comida, abre la boca cuando ve comida acercarse. Esto no es un criterio suficiente por sí solo.

**4. Coordinación mano-boca**
Puede agarrar objetos y llevárselos a la boca con cierta precisión. Esta habilidad es especialmente importante si optas por BLW.

**❌ Señales que NO indican que está listo:**
- Despertarse por la noche (es normal a cualquier edad)
- Chuparse las manos (es exploración normal)
- Pedir el pecho más a menudo (puede ser un brote de crecimiento)
- Tener un "percentil bajo" (la AC no es la solución automática)

**Importante:**
Todas las señales deben presentarse JUNTAS. Si solo muestra interés pero no se sienta bien, no es momento aún. Si tiene 7 meses y cumple todas las señales, no esperes más.`,
    keyTakeaways: [
      'Debe mantenerse sentado con apoyo (control de cabeza y tronco)',
      'El reflejo de extrusión debe haber desaparecido',
      'Debe mostrar interés activo por la comida',
      'Despertarse por la noche NO es señal de necesitar sólidos',
    ],
    quizQuestion: {
      question: '¿Cuál de estas señales indica que el bebé está listo para empezar?',
      options: [
        'Se despierta mucho por la noche',
        'Se chupa las manos constantemente',
        'Se mantiene sentado y ha perdido el reflejo de extrusión',
        'Tiene dientes',
      ],
      correctIndex: 2,
      explanation: 'Las señales clave son: sedestación con apoyo, pérdida del reflejo de extrusión, interés por la comida y coordinación mano-boca. Despertarse por la noche o chupar manos son normales a cualquier edad.',
    },
  },
  {
    id: 'found-4',
    moduleId: 'foundations',
    title: 'La leche sigue siendo fundamental',
    readTimeMinutes: 3,
    content: `Uno de los conceptos más importantes: **durante todo el primer año, la leche (materna o de fórmula) sigue siendo el alimento principal**.

**¿Cuánta leche necesita?**
- **6-8 meses:** La leche aporta ~70% de las calorías. Los sólidos complementan.
- **9-11 meses:** La leche aporta ~50% de las calorías. Los sólidos ganan protagonismo.
- **12+ meses:** Los sólidos son el alimento principal. La leche complementa.

**Lactancia materna:**
La OMS recomienda mantener la lactancia materna hasta los 2 años o más, junto con la alimentación complementaria. El pecho se ofrece a demanda, antes o después de las comidas (como prefiera la familia).

**Leche de fórmula:**
Si toma fórmula, mantener las tomas habituales. A partir de los 12 meses, se puede sustituir por leche de vaca entera (no desnatada ni semidesnatada hasta los 2-3 años).

**Errores comunes:**
- ❌ Reducir drásticamente las tomas de leche al empezar con sólidos
- ❌ Pensar que si come mucho puré ya no necesita leche
- ❌ Dar leche de vaca como bebida antes de los 12 meses
- ❌ Usar bebidas vegetales como sustituto (no son nutricionalmente equivalentes)

**Consejo:** Especialmente al principio, ofrece el pecho o biberón ANTES de la comida. Así te aseguras de que toma suficiente leche. Con el tiempo, esto se invertirá naturalmente.`,
    keyTakeaways: [
      'La leche es el alimento principal durante todo el primer año',
      'Lactancia materna recomendada hasta los 2 años o más',
      'No reducir tomas de leche al empezar con sólidos',
      'Leche de vaca como bebida solo a partir de los 12 meses',
    ],
    quizQuestion: {
      question: 'Durante el primer año, ¿cuál es el alimento principal del bebé?',
      options: [
        'Los purés de verduras',
        'Los cereales',
        'La leche materna o de fórmula',
        'La carne por su hierro',
      ],
      correctIndex: 2,
      explanation: 'La leche (materna o de fórmula) sigue siendo el alimento principal durante todo el primer año. Los sólidos la complementan, no la sustituyen.',
    },
  },

  // ==========================================
  // MODULE 2: APPROACHES
  // ==========================================
  {
    id: 'appr-1',
    moduleId: 'approaches',
    title: 'Método tradicional: purés y papillas',
    readTimeMinutes: 3,
    content: `El método tradicional consiste en ofrecer los alimentos triturados (purés, papillas) con cuchara, aumentando progresivamente la textura.

**Progresión de texturas:**
1. **6 meses:** Purés finos y homogéneos (sin grumos)
2. **7-8 meses:** Purés más espesos, menos triturados
3. **8-9 meses:** Alimentos chafados con tenedor, con grumos suaves
4. **10-12 meses:** Trocitos blandos, comida familiar adaptada

**Ventajas:**
- Fácil control de las cantidades ingeridas
- Menos estrés para padres preocupados por el atragantamiento
- Permite añadir alimentos como carne fácilmente
- Más habitual en el entorno cultural español
- Guarderías suelen manejar bien este formato

**Desventajas:**
- Riesgo de quedarse en purés demasiado tiempo (la AEP advierte)
- El bebé participa menos activamente en la comida
- Puede generar dependencia de la cuchara
- Menos exploración sensorial de texturas variadas

**⚠️ Error más frecuente:**
La AEP advierte que retrasar la introducción de texturas grumosas más allá de los 8-9 meses puede dificultar la aceptación de texturas más adelante. ¡No te quedes en purés finos demasiado tiempo!

**Recomendación de la AEP:**
Independientemente del método, a los 8-9 meses el bebé debe estar expuesto a texturas grumosas y trozos blandos.`,
    keyTakeaways: [
      'Progresión: puré fino → espeso → chafado → trocitos',
      'A los 8-9 meses debe haber textura grumosa — no quedarse en purés finos',
      'Fácil control de cantidades y menos estrés inicial',
      'Riesgo: retrasar texturas puede causar rechazo futuro',
    ],
    quizQuestion: {
      question: '¿Hasta qué edad recomienda la AEP introducir texturas grumosas como máximo?',
      options: [
        '6 meses',
        '8-9 meses',
        '12 meses',
        '18 meses',
      ],
      correctIndex: 1,
      explanation: 'La AEP recomienda que a los 8-9 meses el bebé ya esté expuesto a texturas grumosas. Retrasarlas más allá de esta edad puede dificultar su aceptación futura.',
    },
  },
  {
    id: 'appr-2',
    moduleId: 'approaches',
    title: 'Baby-Led Weaning (BLW)',
    readTimeMinutes: 4,
    content: `El **Baby-Led Weaning (BLW)** es un enfoque donde el bebé se alimenta solo desde el inicio, usando las manos para comer trozos de alimentos blandos del tamaño apropiado.

**Principios del BLW:**
- El bebé come solo, a su ritmo (no se le da con cuchara)
- Se ofrecen alimentos en trozos grandes que pueda agarrar
- El bebé decide cuánto come (autorregulación total)
- Come lo mismo que la familia (adaptado en forma y sin sal)
- Se salta la fase de purés

**Forma de los alimentos:**
- **6-8 meses:** Bastones del tamaño del dedo de un adulto (el puño cerrado del bebé con un trozo asomando)
- **8-9 meses:** Trozos más pequeños a medida que desarrolla la pinza
- **12+ meses:** Trozos de tamaño normal, con cubiertos

**Ventajas (según la AEP y evidencia):**
- Fomenta la autonomía y la coordinación motora
- Mayor exposición a texturas variadas desde el inicio
- El bebé come con la familia, participando en la comida
- Puede favorecer mejor autorregulación del apetito
- Menos "batallas" con la comida

**Desventajas / Precauciones:**
- Mayor ansiedad en padres por miedo al atragantamiento (arcadas ≠ atragantamiento)
- Puede ser más difícil asegurar la ingesta de hierro al inicio
- Más sucio y desordenado
- Requiere que un adulto SIEMPRE esté presente y atento
- No es adecuado para bebés con problemas neurológicos sin consultar

**La AEP dice:**
"Tanto la alimentación con triturados como el BLW son opciones válidas y seguras." No hay evidencia de que uno sea superior al otro en términos de seguridad o nutrición cuando se hacen correctamente.`,
    keyTakeaways: [
      'El bebé come solo desde el inicio, con trozos blandos adecuados',
      'Bastones del tamaño del dedo adulto al principio',
      'Arcada (gag reflex) NO es atragantamiento — es un reflejo protector',
      'La AEP lo considera tan válido y seguro como los purés',
    ],
    quizQuestion: {
      question: '¿Qué forma deben tener los alimentos en BLW al inicio (6-8 meses)?',
      options: [
        'Trozos pequeños del tamaño de una uña',
        'Bastones del tamaño del dedo de un adulto',
        'Purés servidos en plato',
        'Trozos redondos pequeños',
      ],
      correctIndex: 1,
      explanation: 'Al inicio del BLW, los alimentos se cortan en bastones largos (tamaño del dedo adulto), para que el bebé pueda agarrarlos con el puño y la parte que sobresale la chupa/muerde.',
    },
  },
  {
    id: 'appr-3',
    moduleId: 'approaches',
    title: 'BLISS: BLW mejorado con foco en hierro',
    readTimeMinutes: 3,
    content: `El **BLISS (Baby-Led Introduction to SolidS)** es una versión modificada del BLW que surgió como respuesta a dos preocupaciones principales: la ingesta de hierro y el riesgo de atragantamiento.

**¿En qué se diferencia del BLW clásico?**

**1. Énfasis en alimentos ricos en hierro en cada comida:**
BLISS añade la recomendación explícita de incluir al menos un alimento rico en hierro en cada comida ofrecida. Ejemplos:
- Tira de ternera guisada
- Muslo de pollo desmenuzado
- Tortilla de huevo en tiras
- Hamburguesa de lentejas

**2. Educación específica sobre prevención de atragantamiento:**
- Se enseña activamente a las familias a distinguir arcada de atragantamiento
- Se enfatiza qué alimentos evitar (duros, redondos, pegajosos)
- Formación en cortes seguros

**3. Alimento energético en cada comida:**
Incluir al menos un alimento de alta densidad calórica (aguacate, boniato, plátano).

**Estudios BLISS:**
Los estudios que evaluaron BLISS mostraron que los bebés que seguían este enfoque tenían una ingesta de hierro comparable a los alimentados con cuchara, y no había diferencia significativa en episodios de atragantamiento.

**¿Para quién es ideal?**
- Familias que quieren BLW pero les preocupa el hierro
- Padres que quieren autonomía del bebé con algo más de estructura
- Familias con antecedentes de anemia ferropénica`,
    keyTakeaways: [
      'BLISS = BLW + enfoque específico en hierro + prevención de atragantamiento',
      'Incluir un alimento rico en hierro en cada comida',
      'Los estudios muestran ingesta de hierro comparable a métodos tradicionales',
      'Ideal si te gusta el BLW pero quieres más estructura',
    ],
    quizQuestion: {
      question: '¿Qué añade BLISS al BLW clásico?',
      options: [
        'Uso de cuchara en todas las comidas',
        'Énfasis en hierro, prevención de atragantamiento y alimentos energéticos',
        'Solo purés durante los primeros 2 meses',
        'Restricción de alérgenos hasta el año',
      ],
      correctIndex: 1,
      explanation: 'BLISS modifica el BLW añadiendo tres elementos: 1) un alimento rico en hierro en cada comida, 2) educación sobre prevención de atragantamientos, y 3) un alimento energético denso en cada toma.',
    },
  },
  {
    id: 'appr-4',
    moduleId: 'approaches',
    title: 'Enfoque mixto: lo mejor de ambos mundos',
    readTimeMinutes: 3,
    content: `La mayoría de familias en la práctica acaban usando un **enfoque mixto**: combinan purés/papillas con cuchara y alimentos en trozos para que el bebé coma solo.

**¿Cómo funciona?**
- Puré como base de la comida (asegura ingesta nutricional)
- Trozos blandos adicionales para que explore y practique
- A medida que mejora la destreza, más trozos y menos puré
- Transición natural hacia comida familiar

**Ejemplo de comida mixta:**
- Puré de lentejas con verduras (con cuchara, ofrecida por adulto)
- Bastones de boniato cocido (para que agarre solo)
- Gajos de pera madura (para explorar)

**Ventajas:**
- Flexibilidad total — se adapta al día, al alimento, al contexto
- Menos presión que un BLW "puro" o un enfoque solo purés
- El bebé practica autoalimentación sin depender de ella al 100%
- Funciona bien con guarderías (que suelen usar purés)
- La AEP avala este enfoque

**¿Es "hacer trampa" en BLW?**
No. No hay purismo necesario. Lo importante es que el bebé:
- Esté expuesto a diferentes texturas
- Pueda practicar la autoalimentación
- No se quede en purés finos más allá de los 8-9 meses
- Coma sentado, erguido y supervisado siempre

**Consejo:** No hay un enfoque "mejor". El mejor método es el que funcione para vuestra familia, que sea seguro y que el bebé disfrute.`,
    keyTakeaways: [
      'Combinar puré con cuchara + trozos para explorar es perfectamente válido',
      'La mayoría de familias acaban usando un enfoque mixto',
      'No hay purismo: lo importante es texturas variadas y supervisión',
      'El mejor método es el que funcione para tu familia',
    ],
  },

  // ==========================================
  // MODULE 3: NUTRITION
  // ==========================================
  {
    id: 'nutr-1',
    moduleId: 'nutrition',
    title: 'Hierro: el nutriente estrella a los 6 meses',
    readTimeMinutes: 4,
    content: `El hierro es probablemente el nutriente más importante a considerar cuando empiezas con la alimentación complementaria. ¿Por qué?

**¿Por qué es tan importante a los 6 meses?**
- Los bebés nacen con reservas de hierro que duran aproximadamente 6 meses
- A partir de esa edad, las reservas se agotan y necesitan obtenerlo de la alimentación
- La leche materna es baja en hierro (aunque el poco que tiene se absorbe muy bien)
- El hierro es esencial para el desarrollo cerebral, el sistema inmune y el crecimiento

**Tipos de hierro:**
- **Hierro hemo** (de origen animal): se absorbe mucho mejor (15-35%)
  - Mejores fuentes: ternera, cordero, pollo (muslo), cerdo, sardinas
- **Hierro no hemo** (de origen vegetal): absorción menor (2-20%)
  - Fuentes: lentejas, garbanzos, espinacas, quinoa, cereales fortificados

**Truco para mejorar la absorción del hierro vegetal:**
Combinar con vitamina C. Ejemplo: lentejas + naranja, garbanzos + tomate, cereales + fresa.

**Alimentos que DIFICULTAN la absorción del hierro:**
- Leche de vaca (por eso no se da como bebida antes de 12 meses)
- Té y café (obviamente no para bebés, pero ojo con infusiones)
- Fitatos de cereales integrales (menos relevante en cantidades pequeñas)

**La AEP recomienda:**
Priorizar alimentos ricos en hierro desde el primer día de alimentación complementaria. No existe un "orden" obligatorio, pero la carne, el huevo y las legumbres deberían estar entre los primeros alimentos.

**¿Necesita suplemento de hierro?**
Solo si el pediatra lo prescribe tras un análisis. Bebés prematuros o de bajo peso al nacer pueden necesitarlo.`,
    keyTakeaways: [
      'Las reservas de hierro del nacimiento se agotan a los 6 meses',
      'Priorizar alimentos ricos en hierro desde el inicio',
      'Hierro hemo (animal) se absorbe mucho mejor que no hemo (vegetal)',
      'Vitamina C mejora la absorción del hierro vegetal',
    ],
    quizQuestion: {
      question: '¿Cómo se mejora la absorción del hierro de las lentejas?',
      options: [
        'Cocinándolas con leche de vaca',
        'Añadiendo un chorrito de naranja o tomate (vitamina C)',
        'Triturándolas muy finas',
        'Cociéndolas durante más tiempo',
      ],
      correctIndex: 1,
      explanation: 'La vitamina C (naranja, tomate, fresa, pimiento) mejora significativamente la absorción del hierro no hemo de las legumbres. ¡Es una combinación ganadora!',
    },
  },
  {
    id: 'nutr-2',
    moduleId: 'nutrition',
    title: 'Zinc, vitamina D y otros nutrientes clave',
    readTimeMinutes: 3,
    content: `Además del hierro, hay otros nutrientes que merecen atención especial:

**ZINC**
- Importante para el crecimiento, el sistema inmune y el desarrollo
- Se encuentra en: carne roja, pollo, legumbres, cereales integrales, queso
- Al priorizar alimentos ricos en hierro, normalmente también cubres el zinc

**VITAMINA D**
- Esencial para la absorción de calcio y la salud ósea
- La principal fuente es la exposición solar, pero en bebés se limita
- La AEP recomienda suplementar con 400 UI/día durante el primer año
- Alimentos ricos: pescado azul (salmón, sardinas), huevo (yema)
- Consulta con tu pediatra sobre la suplementación

**ÁCIDOS GRASOS OMEGA-3 (DHA)**
- Cruciales para el desarrollo cerebral y visual
- Mejores fuentes: pescado azul (salmón, sardinas, caballa pequeña)
- Por eso la AEP recomienda introducir pescado desde los 6 meses

**CALCIO**
- Fuentes principales: leche materna/fórmula, yogur (desde 9-10 meses), queso, brócoli, almendras molidas
- Si toma leche materna o fórmula suficiente, el calcio no suele ser problema

**FIBRA**
- Importante pero sin excesos: demasiada fibra puede dificultar la absorción de minerales
- Variedad de frutas, verduras y legumbres es la mejor estrategia

**En resumen:**
Si ofreces variedad (carne, pescado, huevo, legumbres, frutas, verduras, cereales) y mantienes la leche, tu bebé estará bien nutrido. No hace falta obsesionarse con cada nutriente individual.`,
    keyTakeaways: [
      'Zinc: en carnes, legumbres y cereales integrales',
      'Vitamina D: suplementar 400 UI/día (consultar pediatra)',
      'Omega-3 (DHA): pescado azul, importante para el cerebro',
      'La variedad alimentaria es la mejor garantía nutricional',
    ],
    quizQuestion: {
      question: '¿Qué recomienda la AEP sobre la vitamina D en bebés?',
      options: [
        'No es necesaria porque la obtienen del sol',
        'Suplementar con 400 UI/día durante el primer año',
        'Solo necesitan suplemento los prematuros',
        'Se obtiene toda de los alimentos sólidos',
      ],
      correctIndex: 1,
      explanation: 'La AEP recomienda suplementar con 400 UI/día de vitamina D durante al menos el primer año de vida, ya que la exposición solar limitada y la dieta no suelen ser suficientes.',
    },
  },
  {
    id: 'nutr-3',
    moduleId: 'nutrition',
    title: 'Lo que NO debe comer un bebé',
    readTimeMinutes: 4,
    content: `Hay alimentos y sustancias que deben evitarse durante el primer año (y más allá). Estas son las restricciones basadas en la AEP y autoridades sanitarias:

**🚫 ANTES DE LOS 12 MESES — PROHIBIDOS:**

**Miel** 🍯
Riesgo de botulismo infantil por Clostridium botulinum. Ni siquiera cocida, ni en pequeñas cantidades.

**Sal (y alimentos muy salados)** 🧂
Los riñones del bebé no pueden manejar exceso de sodio. No añadir sal a sus comidas. Evitar: embutidos, conservas en salmuera, snacks salados.

**Azúcar añadido** 🍬
No aporta nada nutricionalmente. Evitar: zumos comerciales, galletas, cereales azucarados, yogures de sabores, bollería.

**Leche de vaca como bebida** 🥛
Es pobre en hierro y rica en proteínas y sodio. Puede causar microsangrado intestinal. Sí se puede usar en pequeñas cantidades para cocinar.

**🚫 ANTES DE LOS 3 AÑOS:**

**Frutos secos enteros o en trozos** 🥜
Riesgo muy alto de atragantamiento. Solo molidos finos o en crema.

**🚫 ANTES DE LOS 10 AÑOS (AESAN):**

**Grandes peces depredadores** 🦈
Atún rojo (no atún en lata normal), pez espada, cazón/tintorera, lucio. Alto contenido en mercurio (metilmercurio), neurotóxico.

**⚠️ CON PRECAUCIÓN ANTES DE 12 MESES:**

**Espinacas, acelgas, borraja** 🥬
Alto contenido en nitratos. Limitar a <20% del plato o evitar hasta los 12 meses.

**Algas** 🌿
Contenido variable y a veces excesivo de yodo.

**Bebidas vegetales** (arroz, avena, almendras)
No son sustitutos de la leche materna/fórmula. Pueden causar déficits nutricionales graves.

**Zumos de fruta** 🧃
La AEP dice claramente: "el zumo no ofrece ningún beneficio respecto a la fruta entera." Ofrecer fruta entera siempre.`,
    keyTakeaways: [
      'Miel: prohibida antes de 12 meses (botulismo)',
      'Sin sal ni azúcar añadidos antes de los 12 meses',
      'Frutos secos enteros: nunca antes de 3 años (atragantamiento)',
      'Grandes peces depredadores: evitar hasta los 10 años (mercurio)',
    ],
    quizQuestion: {
      question: '¿Por qué se prohíbe la miel antes de los 12 meses?',
      options: [
        'Es demasiado dulce para el bebé',
        'Puede contener esporas de Clostridium botulinum (botulismo)',
        'Provoca caries',
        'Es alergénica',
      ],
      correctIndex: 1,
      explanation: 'La miel puede contener esporas de Clostridium botulinum, que en el intestino inmaduro del bebé pueden germinar y producir toxina botulínica, causando botulismo infantil. Este riesgo desaparece a partir del año.',
    },
  },
  {
    id: 'nutr-4',
    moduleId: 'nutrition',
    title: 'Grasas saludables y aceite de oliva',
    readTimeMinutes: 3,
    content: `Las grasas son ESENCIALES para el desarrollo del bebé. No las limites ni las temas.

**¿Por qué son tan importantes?**
- El cerebro del bebé está compuesto en un 60% de grasa
- Las grasas aportan energía concentrada (fundamental para bebés con estómagos pequeños)
- Son necesarias para absorber vitaminas A, D, E y K
- Los ácidos grasos esenciales (omega-3, omega-6) son cruciales para el desarrollo neurológico

**Aceite de oliva virgen extra (AOVE) 🫒**
La AEP recomienda el AOVE como la grasa principal en la dieta del bebé:
- Añadir un chorrito (1 cucharadita) a purés y preparaciones
- Rico en ácido oleico (grasa monoinsaturada)
- Fuente de vitamina E y polifenoles
- Es el oro líquido de la dieta mediterránea

**Otras grasas saludables:**
- **Aguacate:** rico en grasas monoinsaturadas, perfecto desde los 6 meses
- **Pescado azul:** salmón, sardinas — omega-3 DHA
- **Huevo:** la yema es rica en grasas saludables y colina
- **Frutos secos molidos:** grasas insaturadas, vitamina E
- **Mantequilla:** se puede usar para cocinar con moderación

**Grasas a EVITAR:**
- Grasas trans (bollería industrial, margarinas hidrogenadas)
- Aceites refinados de baja calidad
- Frituras excesivas (en niños, no como método principal de cocción)

**Consejo:** No tengas miedo a las grasas naturales. Un puré de verduras sin un chorrito de AOVE es incompleto nutricionalmente para un bebé.`,
    keyTakeaways: [
      'Las grasas son esenciales para el desarrollo cerebral del bebé',
      'AOVE: un chorrito en cada comida, recomendado por la AEP',
      'Aguacate, pescado azul y huevo: excelentes fuentes de grasas saludables',
      'No temas las grasas naturales — el bebé las necesita',
    ],
  },

  // ==========================================
  // MODULE 4: SAFETY
  // ==========================================
  {
    id: 'safe-1',
    moduleId: 'safety',
    title: 'Prevención de atragantamientos',
    readTimeMinutes: 4,
    content: `El atragantamiento es el mayor miedo de los padres, y es comprensible. Pero con las precauciones adecuadas, es un riesgo muy manejable.

**Primero: arcada (GAG) ≠ atragantamiento (CHOKING)**

**Arcada (normal y frecuente):**
- Reflejo protector: el bebé tose, hace gestos, puede ponerse rojo brevemente
- Se resuelve solo — el bebé maneja la situación
- Es NORMAL y esperado, especialmente con BLW
- Indica que el cuerpo funciona correctamente
- NO debes intervenir: deja que el bebé lo resuelva

**Atragantamiento (emergencia):**
- Obstrucción de vía aérea: el bebé NO puede toser, llorar ni respirar
- Silencio, labios azulados, incapacidad para emitir sonidos
- REQUIERE intervención inmediata (maniobra de Heimlich adaptada)
- Es MUY poco frecuente si se siguen las precauciones

**Reglas de oro para PREVENIR atragantamientos:**

**1. Posición correcta:**
- Siempre sentado erguido (90°), nunca reclinado
- En trona con arnés de seguridad
- Pies apoyados (reposapiés ajustable)

**2. Supervisión constante:**
- UN ADULTO ATENTO siempre presente
- Sin distracciones (NO pantallas, NO comer con prisa)
- No dejar solo al bebé con comida NUNCA

**3. Cortes seguros:**
- Alimentos redondeados: cortar LONGITUDINALMENTE (uvas, cherry, salchichas)
- Alimentos duros: cocinar hasta que estén blandos (zanahoria, manzana)
- Test: debe poder aplastarse entre tus dedos

**4. Alimentos a EVITAR por alto riesgo:**
- Uvas enteras, tomates cherry enteros
- Frutos secos enteros o en trozos
- Manzana cruda en trozos
- Zanahoria cruda
- Salchichas en rodajas redondas (cortar longitudinalmente)
- Palomitas de maíz
- Caramelos duros
- Aceitunas enteras`,
    keyTakeaways: [
      'Arcada (gag) es NORMAL — atragantamiento (choking) es emergencia y es raro',
      'Siempre sentado erguido, supervisado, sin pantallas',
      'Cortar alimentos redondos LONGITUDINALMENTE (uvas, cherry)',
      'Test de seguridad: el alimento debe aplastarse entre tus dedos',
    ],
    quizQuestion: {
      question: '¿Cuál es la diferencia entre arcada y atragantamiento?',
      options: [
        'Son lo mismo, siempre hay que intervenir',
        'La arcada es silenciosa y el atragantamiento no',
        'La arcada es un reflejo protector normal; el atragantamiento es silencioso y requiere intervención',
        'El atragantamiento es normal y la arcada es peligrosa',
      ],
      correctIndex: 2,
      explanation: 'La arcada (gag) es un reflejo protector normal donde el bebé tose y hace gestos. El atragantamiento es silencioso (no puede toser ni emitir sonidos) y es una emergencia que requiere intervención.',
    },
  },
  {
    id: 'safe-2',
    moduleId: 'safety',
    title: 'Cortes seguros para BLW',
    readTimeMinutes: 3,
    content: `Independientemente del enfoque, es importante saber cómo preparar los alimentos de forma segura. Esto es especialmente relevante para BLW.

**Regla general: TEST DEL DEDO**
Si puedes aplastar el alimento entre tu pulgar e índice, es seguro para el bebé.

**Formas según edad:**

**6-8 meses (puño):**
El bebé agarra con toda la mano. Los alimentos deben:
- Ser más largos que su puño (que sobresalga un trozo para chupar)
- Tamaño: dedo índice de adulto aprox.
- Formas: bastones, tiras largas, ramilletes (brócoli)

**8-10 meses (pinza en desarrollo):**
El bebé empieza a hacer pinza con dos dedos:
- Trozos más pequeños están bien
- Se pueden ofrecer alimentos más desmenuzados
- Sigue siendo importante que sean blandos

**10-12+ meses (pinza fina):**
- Trozos del tamaño de un garbanzo grande
- Puede usar cubiertos (con torpeza, y eso está bien)
- Prácticamente cualquier forma blanda

**Guía rápida de cortes por alimento:**

| Alimento | Corte seguro |
|---|---|
| Plátano | Media luna larga con piel como asa |
| Aguacate | Bastones gruesos |
| Zanahoria | Bastones MUY cocidos |
| Manzana | COCIDA en gajos blandos |
| Uvas | SIEMPRE en cuartos longitudinales |
| Tomate cherry | En cuartos |
| Carne | Tiras del tamaño de un dedo, muy tierna |
| Brócoli | Ramilletes con tallo |
| Pan | Tiras tostadas |
| Huevo | Tortilla en tiras o huevo duro en mitades |
| Pescado | Trozos grandes sin espinas |

**Alimentos que NUNCA se dan enteros a un bebé:**
Uvas, tomates cherry, aceitunas, salchichas, frutos secos, manzana cruda, zanahoria cruda, palomitas.`,
    keyTakeaways: [
      'Test del dedo: si se aplasta entre pulgar e índice, es seguro',
      '6-8 meses: bastones largos como dedo de adulto',
      '8-10 meses: trozos más pequeños (pinza en desarrollo)',
      'Alimentos redondos siempre cortados longitudinalmente',
    ],
    quizQuestion: {
      question: '¿Qué test rápido puedes hacer para saber si un alimento es seguro?',
      options: [
        'Cortarlo en rodajas redondas',
        'Darlo crudo si es fruta',
        'Aplastarlo entre pulgar e índice — si cede, es seguro',
        'Probarlo tú primero para ver si está blando',
      ],
      correctIndex: 2,
      explanation: 'El test del dedo: si puedes aplastar el alimento entre tu pulgar e índice sin esfuerzo, es lo suficientemente blando para el bebé.',
    },
  },
  {
    id: 'safe-3',
    moduleId: 'safety',
    title: 'Primeros auxilios: qué hacer ante un atragantamiento',
    readTimeMinutes: 4,
    content: `Es fundamental que TODOS los cuidadores sepan actuar ante un atragantamiento real. Recomendamos encarecidamente hacer un curso presencial de primeros auxilios.

**⚠️ ESTO NO SUSTITUYE UN CURSO PRESENCIAL DE PRIMEROS AUXILIOS ⚠️**

**¿Cómo reconocer un atragantamiento real?**
- El bebé NO puede toser, llorar ni emitir sonidos
- Labios o cara que se ponen azulados
- Movimientos desesperados pero sin sonido
- Esto es diferente de la arcada, donde el bebé tose y hace ruido

**¿Qué hacer?**

**Si el bebé TOSE (arcada):**
1. NO intervengas
2. Deja que tosa y expulse el alimento
3. Mantén la calma
4. No metas los dedos en su boca
5. La arcada se resuelve sola en segundos

**Si el bebé NO puede toser ni respirar (atragantamiento):**

**Bebé menor de 1 año:**
1. Colócalo boca abajo sobre tu antebrazo, con la cabeza más baja que el cuerpo
2. Da 5 golpes secos entre los omóplatos con el talón de la mano
3. Si no se resuelve: gíralo boca arriba
4. Realiza 5 compresiones torácicas con 2 dedos en el centro del pecho (esternón)
5. Alterna: 5 golpes en espalda → 5 compresiones en pecho
6. Si pierde la consciencia: llama al 112 e inicia RCP

**NUNCA hagas esto:**
- No metas los dedos a ciegas en su boca (puedes empujar el objeto más adentro)
- No le des palmaditas suaves — deben ser golpes secos y firmes
- No lo cojas de los pies boca abajo

**Recursos recomendados:**
- Cruz Roja Española: cursos de primeros auxilios para familias
- Solicitar información en tu centro de salud
- Practicar con muñecos en un curso presencial
- Número de emergencias: 112`,
    keyTakeaways: [
      'Si tose: NO intervenir, dejar que resuelva solo',
      'Si NO puede toser/respirar: 5 golpes en espalda + 5 compresiones en pecho',
      'NUNCA meter dedos a ciegas en la boca del bebé',
      'Haz un curso presencial de primeros auxilios — es imprescindible',
    ],
    quizQuestion: {
      question: 'Si un bebé menor de 1 año se atraganta y NO puede toser, ¿qué haces primero?',
      options: [
        'Meter los dedos en su boca para sacar el objeto',
        'Colocarlo boca abajo y dar 5 golpes firmes entre los omóplatos',
        'Darle agua para que trague',
        'Cogerlo de los pies boca abajo y sacudirlo',
      ],
      correctIndex: 1,
      explanation: 'Ante atragantamiento real en un bebé <1 año: colocarlo boca abajo sobre el antebrazo y dar 5 golpes secos entre los omóplatos. Si no funciona, girarlo y dar 5 compresiones torácicas.',
    },
  },
  {
    id: 'safe-4',
    moduleId: 'safety',
    title: 'Entorno seguro para las comidas',
    readTimeMinutes: 3,
    content: `Crear un entorno seguro y positivo para las comidas es tan importante como elegir los alimentos correctos.

**Equipamiento básico:**

**Trona adecuada:**
- Con arnés de seguridad de 5 puntos
- Respaldo que permita sentarse a 90°
- Reposapiés ajustable (pies apoyados = mejor postura y seguridad)
- Bandeja fácil de limpiar
- Estable y sin riesgo de volcar

**Vajilla:**
- Platos con ventosa (para que no los tire)
- Cucharas de silicona suave (pre-cuchara desde los 6 meses)
- Vaso abierto o de aprendizaje (evitar vasos con boquilla)
- Babero con recogedor (mantiene la mesa algo más limpia)

**Reglas para cada comida:**

**1. Siempre sentado, nunca tumbado ni en movimiento**
El bebé come en su trona, sentado erguido. Nunca caminando, jugando o en el coche.

**2. Un adulto atento siempre presente**
Sin teléfono, sin distracciones. Tu atención es la mejor prevención.

**3. Sin pantallas**
La AEP recomienda evitar pantallas durante las comidas. Las pantallas distraen del acto de comer y dificultan que el bebé aprenda a reconocer señales de hambre y saciedad.

**4. Comer en familia**
Siempre que sea posible, come con el bebé. Los bebés aprenden por imitación. Ver a otros comer les motiva y les enseña.

**5. Ambiente tranquilo**
Sin prisa, sin estrés, sin presión. Las comidas deben ser momentos agradables.

**6. Duración razonable**
Si después de 20-30 minutos no come más, retira sin drama. No alargar las comidas indefinidamente.

**7. Higiene**
Lavar manos del bebé antes de comer. Lavar frutas y verduras. Cocinar carnes y huevos completamente.`,
    keyTakeaways: [
      'Trona a 90° con arnés y reposapiés — nunca reclinado',
      'Sin pantallas durante las comidas (recomendación AEP)',
      'Comer en familia siempre que sea posible',
      'Comidas de 20-30 min máximo, sin prisa pero sin alargar',
    ],
  },

  // ==========================================
  // MODULE 5: RESPONSIVE FEEDING
  // ==========================================
  {
    id: 'resp-1',
    moduleId: 'responsive',
    title: 'Alimentación perceptiva: el principio fundamental',
    readTimeMinutes: 4,
    content: `La **alimentación perceptiva** (responsive feeding) es quizás el concepto más importante de toda la alimentación complementaria. Lo defienden la OMS, la AEP y todas las autoridades pediátricas.

**El principio es simple:**

**El adulto decide: QUÉ, CUÁNDO y DÓNDE**
(Qué alimentos ofrecer, en qué horarios y en qué lugar)

**El bebé decide: CUÁNTO**
(La cantidad que come — incluyendo nada)

**¿Por qué es tan importante?**
- Los bebés nacen con una capacidad innata de autorregular su apetito
- Si respetamos esa capacidad, tendrán una relación sana con la comida
- Si la forzamos o anulamos, puede derivar en problemas de alimentación a largo plazo

**¿Qué significa en la práctica?**

**SÍ hacer:**
- Ofrecer comida variada y nutritiva
- Respetar cuando dice "no más" (gira la cabeza, cierra la boca, empuja la cuchara)
- Ofrecer un nuevo alimento rechazado otro día, sin presión
- Confiar en que el bebé sabe cuánto necesita
- Comer juntos, dar ejemplo
- Elogiar el intento de probar ("¡qué bien que lo has probado!")

**NO hacer:**
- Forzar, insistir, presionar ("un poquito más", "por mamá", "por papá")
- Distraer con pantallas, juguetes o canciones para que coma
- Premiar con dulces si come la comida
- Castigar si no come
- Comparar con otros bebés ("tu primo come más")
- Sustituir la comida por leche porque "no ha comido suficiente"

**Dato importante:**
La ingesta de un bebé puede variar ENORMEMENTE de un día a otro, y eso es completamente normal. Pueden comer mucho un día y casi nada al siguiente. Mira la tendencia semanal, no cada comida individual.`,
    keyTakeaways: [
      'El adulto decide QUÉ/CUÁNDO/DÓNDE, el bebé decide CUÁNTO',
      'NUNCA forzar, insistir ni distraer para que coma más',
      'Los bebés tienen capacidad innata de autorregular su apetito',
      'Es normal que la ingesta varíe mucho de un día a otro',
    ],
    quizQuestion: {
      question: 'En la alimentación perceptiva, ¿quién decide la CANTIDAD que come el bebé?',
      options: [
        'El pediatra según las tablas de crecimiento',
        'Los padres según la edad del bebé',
        'El propio bebé — respetando sus señales de hambre y saciedad',
        'La cantidad que quepa en el plato',
      ],
      correctIndex: 2,
      explanation: 'En la alimentación perceptiva, el adulto decide QUÉ ofrecer, CUÁNDO y DÓNDE, pero el BEBÉ decide CUÁNTO come. Respetar sus señales de hambre y saciedad es fundamental.',
    },
  },
  {
    id: 'resp-2',
    moduleId: 'responsive',
    title: 'Las señales de hambre y saciedad',
    readTimeMinutes: 3,
    content: `Aprender a leer las señales del bebé es clave para la alimentación perceptiva. Con el tiempo las conocerás intuitivamente.

**Señales de HAMBRE (quiere comer):**
- Se muestra excitado o contento al ver la comida
- Abre la boca cuando se acerca la cuchara o el alimento
- Se inclina hacia adelante
- Intenta agarrar la comida
- Mira la comida con interés
- Hace sonidos de excitación
- Llora si se retira la comida (señal tardía)

**Señales de SACIEDAD (ya no quiere más):**
- Gira la cabeza
- Cierra la boca firmemente
- Empuja la comida o la cuchara
- Se distrae y pierde interés
- Juega con la comida sin comerla
- Se queja o llora
- Ralentiza el ritmo de comer
- Escupe la comida

**⚠️ Errores comunes al interpretar señales:**

**"No ha comido nada" → No pasa nada**
Los primeros días/semanas el objetivo es explorar, no ingerir grandes cantidades. La leche sigue siendo el alimento principal.

**"Ha comido poco hoy" → Normal**
Los bebés regulan su ingesta a lo largo de DÍAS, no de comidas. Un día de poco apetito suele compensarse naturalmente.

**"Solo quiere un alimento" → Fase normal**
Muchos bebés pasan por fases de preferencia. Sigue ofreciendo variedad sin presionar.

**"Escupe todo" → Está aprendiendo**
Escupir no es rechazar. Es parte del proceso de aprender a manejar texturas en la boca.

**Regla de oro:**
Si después de ofrecer un alimento rechazado 2-3 veces en esa comida, el bebé sigue diciendo que no, RESPETA. Puedes volver a ofrecerlo otro día. Se necesitan hasta 10-15 exposiciones para que un bebé acepte un nuevo sabor.`,
    keyTakeaways: [
      'Hambre: boca abierta, se inclina, agarra comida',
      'Saciedad: gira cabeza, cierra boca, empuja cuchara',
      'La ingesta varía de día a día — mira la tendencia semanal',
      'Pueden hacer falta 10-15 exposiciones para aceptar un sabor nuevo',
    ],
    quizQuestion: {
      question: '¿Cuántas veces puede necesitar probar un alimento nuevo antes de aceptarlo?',
      options: [
        '1-2 veces',
        '3-5 veces',
        '10-15 veces',
        'Si no le gusta la primera vez, nunca le gustará',
      ],
      correctIndex: 2,
      explanation: 'Los estudios muestran que pueden hacer falta de 10 a 15 exposiciones a un alimento nuevo antes de que un bebé lo acepte. ¡Paciencia y persistencia sin presión!',
    },
  },
  {
    id: 'resp-3',
    moduleId: 'responsive',
    title: 'La comida NO es premio ni castigo',
    readTimeMinutes: 3,
    content: `Uno de los pilares de la alimentación perceptiva es no usar la comida como herramienta emocional. Parece obvio, pero es sorprendentemente fácil caer en estas trampas.

**NO usar comida como PREMIO:**
- "Si te comes las verduras, te doy un yogur de postre" → Esto enseña que las verduras son "malas" y el yogur es el "premio"
- "¿Has sido bueno? Toma una galleta" → Asocia comida con comportamiento
- "Muy bien, te has comido todo, ¡premio!" → Enseña a comer más de lo necesario para obtener aprobación

**NO usar comida como CASTIGO:**
- "No has comido, así que no hay postre" → La comida se convierte en moneda de cambio
- "Si no comes esto, no hay más comida hasta la cena" → Crea ansiedad alrededor de la comida
- Retirar comida como castigo por mal comportamiento → Mezcla disciplina con alimentación

**NO usar comida como CONSUELO EMOCIONAL:**
- "¿Te has hecho daño? Toma una galletita" → Enseña a comer cuando está triste
- "¿Estás aburrido? Come algo" → Comer como entretenimiento
- Ofrecer comida para calmar una rabieta → Asocia comida con gestión emocional

**¿Qué hacer en cambio?**
- Ofrece variedad sin etiquetas ("buena/mala comida")
- El postre (fruta, yogur) se ofrece como parte de la comida, no como recompensa
- Si está triste: consuelo, abrazo, juego — no comida
- Si está aburrido: actividad, paseo, juego — no comida
- Las comidas son momentos de conexión familiar, no de negociación

**La relación con la comida se construye desde el primer bocado.** Las dinámicas que establezcas ahora sentarán las bases para toda la infancia y más allá.`,
    keyTakeaways: [
      'No usar comida como premio, castigo ni consuelo emocional',
      'El postre se ofrece como parte de la comida, no como recompensa',
      'Si está triste o aburrido: consuelo y juego, no comida',
      'La relación con la comida se construye desde el primer bocado',
    ],
  },

  // ==========================================
  // MODULE 6: PRACTICAL TIPS
  // ==========================================
  {
    id: 'prac-1',
    moduleId: 'practical',
    title: 'Planificación de comidas para padres ocupados',
    readTimeMinutes: 4,
    content: `La alimentación complementaria no tiene por qué ser complicada. Aquí van estrategias prácticas para el día a día.

**Batch cooking (cocinar en lote):**
Dedica 1-2 horas el fin de semana a preparar bases:
- Cocer un lote de verduras variadas al vapor
- Hacer un guiso de lentejas grande
- Cocinar pollo o ternera para varios días
- Preparar bolitas de quinoa o arroz
- Congelar en porciones individuales (cubitos de hielo para purés)

**Congelación inteligente:**
- Usa bandejas de cubitos de hielo para porciones de puré
- Etiqueta con fecha y contenido
- Los purés congelados duran 1-3 meses
- Descongela en nevera (no a temperatura ambiente)
- Calienta bien y comprueba temperatura antes de servir
- NO recongelar lo ya descongelado

**Comidas rápidas para emergencias:**
- Plátano + mantequilla de cacahuete en tostada (5 min)
- Huevo revuelto con tomate (10 min)
- Lentejas de bote (sin sal añadida) con arroz (15 min)
- Aguacate chafado con tortita de arroz
- Yogur natural con fruta troceada (desde 9 meses)

**Adaptar comidas familiares:**
La mejor estrategia a medio plazo:
1. Cocina lo que cocines para la familia
2. Retira la porción del bebé ANTES de añadir sal
3. Adapta la textura (tritura, chafa o corta en trozos)
4. Añade un chorrito de AOVE
5. ¡Listo! El bebé come lo mismo que vosotros

**Ejemplo de menú semanal (bebé 8+ meses):**
- Lunes: Puré de lentejas + bastones de zanahoria
- Martes: Tortilla de huevo + boniato asado + fruta
- Miércoles: Merluza al vapor + puré de patata + brócoli
- Jueves: Pollo guisado + arroz + pera
- Viernes: Garbanzos con verduras + plátano
- Sábado: Salmón con quinoa + aguacate
- Domingo: Guiso familiar (sin sal) + yogur con fruta`,
    keyTakeaways: [
      'Batch cooking: cocina bases el fin de semana y congela en porciones',
      'Adapta las comidas familiares retirando la porción del bebé antes de salar',
      'Ten siempre opciones rápidas preparadas (plátano, huevo, lenteja de bote)',
      'La congelación es tu aliada: purés en cubitos de hielo',
    ],
    quizQuestion: {
      question: '¿Cuál es la mejor estrategia a largo plazo para las comidas del bebé?',
      options: [
        'Comprar potitos comerciales',
        'Cocinar comidas especiales solo para el bebé',
        'Adaptar las comidas familiares: retirar la porción del bebé antes de salar',
        'Dar solo purés hasta el año',
      ],
      correctIndex: 2,
      explanation: 'La mejor estrategia es adaptar las comidas familiares: cocina lo mismo para todos, retira la porción del bebé antes de añadir sal, y adapta la textura. Así come lo mismo que la familia.',
    },
  },
  {
    id: 'prac-2',
    moduleId: 'practical',
    title: 'Comer fuera de casa con tu bebé',
    readTimeMinutes: 3,
    content: `Comer fuera con un bebé que ha empezado la alimentación complementaria no tiene por qué ser estresante. Aquí van trucos prácticos.

**Kit de comida fuera de casa:**
- Babero de silicona plegable con recogedor
- 1-2 cucharas de silicona
- Recipiente hermético con comida preparada
- Plátano o aguacate (siempre disponibles, no necesitan preparación)
- Bolsas reutilizables para la ropa manchada
- Toallitas

**En restaurantes:**
- Pide verduras al vapor para el bebé (sin sal)
- El pan del restaurante: perfecto en tiras para chupar
- Frutas de postre: plátano, pera madura
- Evita salsas preparadas (suelen tener mucha sal)
- Pide que no salen la porción del bebé
- La trona del restaurante: lleva una funda o toalla por higiene

**De viaje:**
- Frutas resistentes: plátano, pera, mandarina
- Pan o tortitas de arroz
- Bolsitas de puré comerciales (para emergencias, no uso habitual)
- Mantequilla de cacahuete en porciones individuales
- Yogur en nevera portátil (desde 9-10 meses)

**En casa de familiares:**
- Comunica las reglas con amabilidad pero firmeza:
  - "No le damos sal ni azúcar todavía"
  - "Preferimos que no le dé galletas/dulces"
  - "Sí puede probar el guiso si le quitamos la sal antes"
- Lleva comida de reserva por si acaso
- Los abuelos a veces necesitan un recordatorio cariñoso de las nuevas recomendaciones

**Sobre bolsitas/potitos comerciales:**
- Son prácticos para emergencias, pero no como base diaria
- Suelen ser demasiado finos (no progresan texturas)
- Lee etiquetas: muchos tienen azúcar añadido o cantidades altas de fruta dulce
- Nunca sustituyen una comida real preparada en casa`,
    keyTakeaways: [
      'Lleva siempre plátano y/o aguacate como comodín',
      'En restaurantes: pide verduras al vapor sin sal y pan',
      'Comunica las reglas a familiares con amabilidad pero firmeza',
      'Bolsitas/potitos: solo para emergencias, no como dieta habitual',
    ],
  },
  {
    id: 'prac-3',
    moduleId: 'practical',
    title: 'Lidiar con el rechazo de alimentos',
    readTimeMinutes: 3,
    content: `El rechazo de alimentos es absolutamente normal y esperado. No es un fracaso ni significa que algo va mal.

**¿Por qué rechazan alimentos?**
- **Neofobia alimentaria:** miedo innato a lo desconocido — tiene sentido evolutivo
- Tiene un pico entre los 18-24 meses (puede empezar antes)
- Es transitoria en la mayoría de los casos
- No es capricho: es biología

**Estrategias basadas en evidencia:**

**1. Exposición repetida sin presión**
- Ofrece el alimento rechazado otra vez otro día, sin comentarios
- Se necesitan 10-15 exposiciones para aceptar un sabor nuevo
- "No le gusta" no aplica hasta haberlo probado MUCHAS veces

**2. Modelado (dar ejemplo)**
- Come tú lo mismo delante del bebé
- Los bebés imitan: si ven que lo comes con gusto, querrán probarlo
- Comer en familia es la mejor herramienta

**3. Participación**
- Deja que toque, aplaste, juegue con la comida
- El contacto sensorial precede a la aceptación
- Que ayude a "cocinar" (mezclar, tocar ingredientes)

**4. Variación en la presentación**
- Rechaza brócoli al vapor → prueba brócoli en tortilla
- No quiere pera cruda → prueba pera asada con canela
- Cambia la forma de preparación antes de descartar el alimento

**5. No sustituir**
- Si rechaza la comida, no ofrezcas inmediatamente otra cosa
- No prepares una "comida especial" como alternativa
- Ofrece lo que hay; si no quiere, no pasa nada

**Lo que NO funciona (y empeora las cosas):**
- Forzar, presionar, insistir → aumenta el rechazo
- Disfrazar la comida sistemáticamente → no aprende a aceptarla
- Sobornar con dulces → crea relación negativa con el alimento rechazado
- Comparar → genera ansiedad
- Drama → convierte la comida en un campo de batalla`,
    keyTakeaways: [
      'La neofobia alimentaria es normal y biológica, no capricho',
      'Exponer sin presión: 10-15 veces antes de "no le gusta"',
      'El mejor truco: come tú lo mismo delante del bebé',
      'No sustituir, no forzar, no dramatizar',
    ],
    quizQuestion: {
      question: '¿Qué es la neofobia alimentaria?',
      options: [
        'Una alergia a alimentos nuevos',
        'Un miedo innato a alimentos desconocidos — normal y transitorio',
        'Un trastorno alimentario que requiere tratamiento',
        'Un síntoma de que el bebé no está listo para sólidos',
      ],
      correctIndex: 1,
      explanation: 'La neofobia alimentaria es un miedo innato y normal a los alimentos nuevos. Tiene sentido evolutivo y es transitoria. Se maneja con exposición repetida sin presión.',
    },
  },
  {
    id: 'prac-4',
    moduleId: 'practical',
    title: 'Cuándo consultar al pediatra',
    readTimeMinutes: 3,
    content: `Aunque la mayoría de "problemas" con la alimentación son variaciones normales, hay situaciones que sí requieren consulta médica.

**🔴 Consulta URGENTE si:**
- Reacción alérgica severa: hinchazón de labios/cara/lengua, dificultad para respirar, vómitos repetidos, urticaria generalizada → LLAMA AL 112
- Atragantamiento que no se resuelve → LLAMA AL 112
- El bebé deja de comer Y beber durante más de 24 horas
- Sangre en las heces tras introducir un alimento nuevo

**🟡 Consulta al pediatra si:**
- Sospecha de reacción alérgica leve recurrente (erupciones, vómitos, diarrea tras un alimento específico)
- El bebé rechaza consistentemente TODOS los sólidos más allá de los 8 meses
- Pérdida de peso o estancamiento prolongado del crecimiento
- Arcadas o vómitos CADA VEZ que come (no ocasionalmente)
- Dificultad para tragar que no mejora con el tiempo
- No progresa en texturas más allá de los 10 meses
- Estreñimiento severo al introducir sólidos
- Dudas sobre suplementación (hierro, vitamina D)

**🟢 Es NORMAL y NO requiere consulta:**
- Que algunos días coma mucho y otros casi nada
- Arcadas ocasionales (especialmente al inicio y con BLW)
- Que rechace algunos alimentos
- Que ensucié todo al comer
- Cambios en las cacas (color, frecuencia, consistencia) al introducir nuevos alimentos
- Que no le gusten las verduras al principio
- Que prefiera comer con las manos aunque le ofrezcas cuchara
- Que "solo" quiera pecho/biberón algunos días

**Señales de alergia alimentaria (consultar si ocurren):**
- Urticaria (ronchas en la piel) tras comer un alimento
- Hinchazón de labios o boca
- Vómitos repetidos (no una arcada aislada)
- Diarrea persistente
- Eccema que empeora tras ciertos alimentos
- Síntomas respiratorios (tos, sibilancias)

**Recuerda:** Esta app es informativa. Tu pediatra es quien mejor conoce a tu bebé. Ante cualquier duda, consulta. Es mejor preguntar de más que de menos.`,
    keyTakeaways: [
      'Reacciones alérgicas severas o atragantamiento no resuelto → 112',
      'Rechazo total de sólidos más allá de 8 meses → consulta',
      'Variación diaria en cantidad es NORMAL',
      'Ante la duda, siempre consulta al pediatra',
    ],
  },
];

export function getLessonsByModule(moduleId: string): Lesson[] {
  return lessons.filter(l => l.moduleId === moduleId);
}

export function getLesson(lessonId: string): Lesson | undefined {
  return lessons.find(l => l.id === lessonId);
}
