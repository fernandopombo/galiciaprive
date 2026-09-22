export type HeroClip = {
  // Ruta sin extensión: se sirven el .webm y el .mp4 del mismo nombre.
  src: string;
  // Etapa del Camino que muestra el clip, para saber qué se está sustituyendo.
  stage: string;
};

// Clips del hero a pantalla completa, en orden de reproducción. Los ficheros
// viven en public/video/. Mientras la lista esté vacía el hero cae en un fondo
// degradado que no parece roto.
//
// De cada clip se publican dos ficheros, camino-XX.webm y camino-XX.mp4, que
// genera ffmpeg a partir del original.
//
// Requisitos de cada clip: MP4 (H.264) y WebM, 1920x1080 o superior, 8-15 s,
// sin audio, y por debajo de 4 MB para que el hero cargue rápido. Deben tener
// licencia de uso comercial: material propio, o rodado por encargo. Si se tira
// de banco de imágenes, sirven Pexels, Coverr, Mixkit o Pixabay (licencia libre
// comercial); Getty e iStock exigen licencia de pago.
export const HERO_CLIPS: HeroClip[] = [
  { src: "/video/camino-01", stage: "Camino entre prados, con mojón" },
];

// Imagen de respaldo mientras carga el vídeo y para quien navega con el ahorro
// de datos o la reducción de movimiento activada.
export const HERO_POSTER: string | null = "/video/hero-poster.jpg";
