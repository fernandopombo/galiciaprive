# Brief de vídeo para el hero

Cuatro clips para el vídeo a pantalla completa de la portada. Los ficheros se
dejan en `public/video/` y se declaran en `src/lib/hero-media.ts`.

## Requisitos técnicos

| | |
|---|---|
| Resolución | 1920×1080 mínimo; 4K si el generador lo permite |
| Formato | 16:9 apaisado |
| Duración | 8-15 segundos por clip |
| Audio | Ninguno (se elimina al procesar) |
| Entrega | El original sin comprimir; de la compresión, el WebM y el póster me encargo yo |

## Criterio de contenido

Sale de la investigación de los dos mercados, y conviene no saltárselo:

- **Una mujer sola, o dos caminando juntas.** Nunca un grupo. El informe
  estadounidense concluye que el hueco está en vender privacidad y control del
  propio ritmo, y que a la clienta de 55-70 años «harás amigas nuevas» puede
  sonarle a amenaza, no a promesa.
- **Sin mochila grande ni bastones de trekking.** El equipaje lo lleva el coche:
  eso forma parte de lo que se vende. Una mochila pequeña, como mucho.
- **Camino vacío.** La web americana promete que apenas verá a nadie. El informe
  chino avisa de que cualquier señal de masificación repele a ese segmento.
- **Luz de primera hora o de atardecer.** Nunca mediodía plano.
- **Más paisaje y detalle que cara.** Los primeros planos de rostro son donde se
  nota que el vídeo está generado.
- **Cámara lenta y estable.** Nada de vuelos de dron dando vueltas.

## Preámbulo común

Va delante de cada prompt:

```
Cinematic film still in motion, shot on 35mm anamorphic, shallow depth of field,
natural golden-hour light, slow steady camera movement, muted earthy color grade
with deep greens and Atlantic blues, no text, no logos, no on-screen graphics,
photorealistic, 4K, 16:9.
```

## Los cuatro prompts

### 1 · Camino Portugués — viñedos y piedra cerca de Tui

```
A single woman in her fifties walks alone along a narrow stone-walled path
between vineyards trained on granite pergolas in rural Galicia, Spain. She wears
simple elegant linen clothing and carries only a small leather day bag. Early
morning, low sun raking through the vine leaves, mist still sitting in the
valley. The path ahead is completely empty. Camera tracks slowly behind her at
walking pace, never showing her face.
```

### 2 · Camino Portugués da Costa — acantilado atlántico

```
Two women walk side by side along a coastal footpath on a cliff above the
Atlantic, southern Galicia, Spain. Open ocean to their right, low granite
outcrops and wind-bent pines around them. Late afternoon, warm low sun, sea
spray haze in the air. No other people anywhere. Slow lateral tracking shot from
a distance, the figures small in the frame against the sea.
```

### 3 · Camino Inglés — bosque de eucaliptos hacia Betanzos

```
A woman walks alone through a tall eucalyptus forest on an old stone path in
northern Galicia, Spain. Shafts of early morning light cut between the trunks,
damp ground, moss on the stones. She is unhurried. The path is empty ahead and
behind. Slow forward dolly at walking pace, low angle, the canopy towering
overhead.
```

### 4 · Llegada a Santiago — plaza del Obradoiro

```
Wide shot of the baroque facade of Santiago de Compostela cathedral at dawn,
Obradoiro square almost empty, wet granite reflecting the first light. A single
woman stands still in the middle of the square, seen from behind and far away,
looking up at the towers. Very slow push-in. Soft grey Atlantic sky.
```

## Qué pedir que NO salga

Si el generador admite prompt negativo:

```
crowds, groups of hikers, large backpacks, trekking poles, scallop shell
symbols, yellow arrows, hiking boots close-up, bright midday sun, tourists,
smiling faces to camera, drone orbit, text overlays, watermarks
```

## Detalles gallegos que dan verdad

Merece la pena colarlos: eucaliptos, hórreos de granito, muros de piedra seca
cubiertos de musgo, viña en emparrado sobre postes de granito, bruma atlántica,
tojo y retama en flor, cruceiros de piedra.

Lo que conviene evitar por manido: la concha de vieira, la flecha amarilla y el
mojón con el kilometraje. Los usa todo el sector.
