#!/bin/bash
cd "$(dirname "$0")/assets"

VOICE="Mónica"
RATE=170

# Scene 1 - Hook
say -v "$VOICE" -r $RATE -o narr1.aiff "¿Tu bebé tiene cerca de seis meses y no sabes si ya puede empezar a comer? Te explico las señales clave en dos minutos."

# Scene 2 - 6 months rule
say -v "$VOICE" -r $RATE -o narr2.aiff "La Organización Mundial de la Salud y la Asociación Española de Pediatría recomiendan lactancia exclusiva hasta los seis meses. Pero ojo: la edad es solo una guía. Lo importante son las señales de madurez."

# Scene 3 - Signal 1
say -v "$VOICE" -r $RATE -o narr3.aiff "Primera señal: tu bebé sostiene la cabeza bien erguida y se mantiene sentado con algo de apoyo. Esto es fundamental para tragar de forma segura."

# Scene 4 - Signal 2
say -v "$VOICE" -r $RATE -o narr4.aiff "Segunda señal: tu bebé te mira comer con curiosidad, abre la boca cuando ve comida, o intenta agarrar lo que hay en tu plato. ¡Está listo para explorar!"

# Scene 5 - Signal 3
say -v "$VOICE" -r $RATE -o narr5.aiff "Tercera señal: ha desaparecido el reflejo de extrusión. Es decir, cuando le acercas una cucharita, ya no empuja la comida fuera con la lengua. Si aún lo hace, mejor espera unos días más."

# Scene 6 - Signal 4
say -v "$VOICE" -r $RATE -o narr6.aiff "Y cuarta señal: coordina la mano con la boca. Se lleva juguetes, la mano, todo a la boca. Esta coordinación es clave, especialmente si vas a hacer Baby Led Weaning."

# Scene 7 - CTA
say -v "$VOICE" -r $RATE -o narr7.aiff "Si tu bebé cumple estas cuatro señales, ¡está listo! En introalimentar punto com tienes un plan semanal gratuito, paso a paso, para empezar con confianza. El enlace está en la bio."

# Convert all to mp3
for i in 1 2 3 4 5 6 7; do
  ffmpeg -y -i narr${i}.aiff -acodec libmp3lame -ab 192k narr${i}.mp3 2>/dev/null
  rm narr${i}.aiff
  echo "Generated narr${i}.mp3"
done

echo "All narration audio generated!"
