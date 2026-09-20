export type Slot = {
  // Qué foto va aquí. Sirve de brief para el fotógrafo y, mientras no haya
  // imagen, se muestra en el hueco para que se vea que está reservado.
  brief: string;
  src?: string;
  alt?: string;
  // Encuadre dominante, para elegir bien el recorte al colocar la foto.
  crop?: "vertical" | "horizontal" | "panorámico";
};

// Registro central de la imagen del sitio. Las fotos van en public/img/ y se
// referencian aquí; el resto de la web las coge sola. Todas deben tener
// licencia de uso comercial: material propio o rodado por encargo.
//
// La web de un producto de mil euros por persona y día se sostiene sobre la
// fotografía: hasta que estos huecos tengan imagen real, el diseño no puede
// competir con el de una agencia de viajes de lujo.
export const MEDIA: Record<string, Slot> = {
  heroUs: {
    brief:
      "Caminante solo al amanecer en una corredoira gallega, niebla entre castaños, luz de contraluz",
    crop: "panorámico",
  },
  crowds: {
    brief: "Sendero vacío entre muros de piedra, sin nadie más a la vista",
    crop: "horizontal",
  },
  credential: {
    brief: "Manos sellando la credencial sobre un mostrador de madera gastada",
    crop: "vertical",
  },
  locals: {
    brief: "Quesero o viticultor gallego en su espacio de trabajo, retrato ambiental",
    crop: "vertical",
  },
  parador: {
    brief:
      "Interior de parador o pazo al atardecer: piedra del XII, luz cálida de lámpara, cama deshecha",
    crop: "horizontal",
  },
  table: {
    brief: "Mesa de marisco de la ría desde arriba, manos sirviendo albariño",
    crop: "horizontal",
  },
  guide: {
    brief: "El guía caminando de espaldas con un cliente, conversación, media distancia",
    crop: "vertical",
  },
  ritual: {
    brief:
      "Piedra dejada en un hito del camino al atardecer, primer plano corto, fondo desenfocado",
    crop: "horizontal",
  },
  cathedral: {
    brief: "Llegada a la plaza del Obradoiro, catedral al fondo, figura pequeña",
    crop: "panorámico",
  },
  routeFrances: {
    brief: "Robledal del interior de Lugo, camino de tierra, luz filtrada",
    crop: "vertical",
  },
  routePortugues: {
    brief: "Puente romano sobre el Miño o viñedo en espaldera cerca de Tui",
    crop: "vertical",
  },
  routeCosta: {
    brief: "Acantilado atlántico con el sendero pegado al borde, mar abierto",
    crop: "vertical",
  },
};
