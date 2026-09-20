// Datos de los Caminos oficiales a su paso por Galicia. Cifras contrastadas con
// la web oficial de la Xunta (caminodesantiago.gal) y guías de referencia; los
// kilometrajes varían ligeramente entre fuentes según variantes y alojamientos.

export type Stage = {
  from: string;
  to: string;
  km: number;
  // Cota máxima aproximada de la etapa, en metros, para el perfil.
  peak: number;
  hard?: boolean;
  note?: string;
};

export type Camino = {
  id: string;
  name: string;
  nameEn: string;
  nameCn: string;
  entry: string;
  kmInGalicia: number;
  stagesCount: number;
  // Trazado en el mapa, proyectado desde coordenadas reales sobre un lienzo
  // de 0 a 100. El primer punto es el lugar por el que la ruta entra.
  path: string;
  operated?: boolean;
};

// Trazados generados proyectando las coordenadas de las localidades de cada
// ruta (Mercator simple, longitudes corregidas por el coseno de la latitud)
// sobre el lienzo del mapa. Santiago cae en (32.6, 46.5).
export const SANTIAGO: [number, number] = [32.6, 46.5];

// Contorno de Galicia por sus puntos costeros y fronterizos reales.
export const GALICIA_OUTLINE =
  "M 80.9 17.6 C 79.9 14.4, 75.6 17.3, 73.8 16.3 C 72.0 15.4, 71.7 12.6, 69.9 11.9 C 68.1 11.2, 64.9 13.2, 63.2 12.3 C 61.6 11.4, 61.5 7.2, 60 6.6 C 58.5 6.0, 56.2 7.9, 54.2 8.8 C 52.2 9.8, 50.0 10.5, 48.1 12.3 C 46.2 14.1, 44.4 17.7, 42.6 19.8 C 40.8 21.9, 40.2 23.8, 37.1 25 C 34.0 26.2, 28.2 25.1, 24 26.8 C 19.8 28.6, 14.6 32.4, 12.1 35.5 C 9.6 38.6, 8.6 42.6, 9.2 45.2 C 9.8 47.8, 14.4 48.7, 15.9 51.3 C 17.4 53.9, 17.2 58.9, 18.2 61 C 19.2 63.1, 21.0 62.9, 22 64 C 23.0 65.1, 23.2 65.7, 24 67.5 C 24.8 69.3, 27.1 73.0, 26.9 75 C 26.7 77.0, 23.5 77.4, 22.7 79.8 C 21.9 82.2, 20.9 88.9, 22 89.4 C 23.1 89.9, 27.4 84.4, 29.4 82.9 C 31.4 81.5, 31.6 79.8, 34.2 80.7 C 36.8 81.6, 41.1 86.9, 45.2 88.1 C 49.3 89.3, 53.6 89.0, 59 88.1 C 64.4 87.1, 73.6 86.0, 77.6 82.4 C 81.6 78.8, 82.3 71.3, 82.8 66.6 C 83.3 61.8, 80.9 57.4, 80.9 53.9 C 80.9 50.4, 83.0 48.7, 82.8 45.6 C 82.6 42.5, 80.2 40.2, 79.9 35.5 C 79.6 30.8, 81.9 20.8, 80.9 17.6 Z";

export const CAMINOS: Camino[] = [
  {
    id: "frances",
    name: "Camino Francés",
    nameEn: "The French Way",
    nameCn: "法国之路",
    entry: "O Cebreiro (Lugo)",
    kmInGalicia: 155,
    stagesCount: 7,
    path: "M 80.9 53.9 C 78.9 53.4, 72.1 51.6, 69 50.9 C 65.9 50.2, 64.7 50.3, 62.2 49.6 C 59.7 48.9, 57.1 47.8, 54.2 46.9 C 51.3 46.0, 47.5 44.6, 44.9 44.3 C 42.3 44.0, 40.4 44.8, 38.4 45.2 C 36.4 45.6, 33.6 46.3, 32.6 46.5",
    operated: true,
  },
  {
    id: "portugues",
    name: "Camino Portugués",
    nameEn: "The Portuguese Way",
    nameCn: "葡萄牙之路",
    entry: "Tui (Pontevedra)",
    kmInGalicia: 120,
    stagesCount: 6,
    path: "M 29.4 82.9 C 29.6 81.2, 30.4 75.6, 30.4 72.8 C 30.4 70.0, 29.6 68.6, 29.4 66.2 C 29.2 63.8, 29.5 60.6, 29.4 58.3 C 29.3 56.0, 28.3 54.6, 28.8 52.6 C 29.3 50.6, 32.0 47.5, 32.6 46.5",
    operated: true,
  },
  {
    id: "portugues-costa",
    name: "Camino Portugués da Costa",
    nameEn: "The Portuguese Coastal Way",
    nameCn: "葡萄牙海岸之路",
    entry: "A Guarda (Pontevedra)",
    kmInGalicia: 170,
    stagesCount: 8,
    path: "M 22 89.4 C 22.1 87.8, 21.9 82.2, 22.7 79.8 C 23.5 77.4, 25.6 76.2, 26.9 75 C 28.2 73.8, 30.0 74.3, 30.4 72.8 C 30.8 71.3, 29.6 68.6, 29.4 66.2 C 29.2 63.8, 29.5 60.6, 29.4 58.3 C 29.3 56.0, 28.3 54.6, 28.8 52.6 C 29.3 50.6, 32.0 47.5, 32.6 46.5",
    operated: true,
  },
  {
    id: "ingles",
    name: "Camino Inglés",
    nameEn: "The English Way",
    nameCn: "英国之路",
    entry: "Ferrol o A Coruña",
    kmInGalicia: 120,
    stagesCount: 5,
    path: "M 42.6 19.8 C 42.9 20.4, 44.4 21.8, 44.5 23.3 C 44.6 24.8, 44.1 26.9, 43.2 29 C 42.3 31.1, 40.3 33.7, 39.1 36 C 37.9 38.3, 37.0 40.9, 35.9 42.6 C 34.8 44.4, 33.1 45.9, 32.6 46.5",
  },
  {
    id: "primitivo",
    name: "Camino Primitivo",
    nameEn: "The Original Way",
    nameCn: "原始之路",
    entry: "A Fonsagrada (Lugo)",
    kmInGalicia: 155,
    stagesCount: 7,
    path: "M 79.9 35.5 C 77.3 36.4, 69.2 39.2, 64.1 40.8 C 59.0 42.4, 52.6 44.6, 49.4 45.2 C 46.2 45.8, 47.7 44.1, 44.9 44.3 C 42.1 44.5, 34.6 46.1, 32.6 46.5",
  },
  {
    id: "norte",
    name: "Camino do Norte",
    nameEn: "The Northern Way",
    nameCn: "北方之路",
    entry: "Ribadeo (Lugo)",
    kmInGalicia: 190,
    stagesCount: 8,
    path: "M 80.9 17.6 C 79.2 18.4, 74.0 20.6, 70.6 22.4 C 67.2 24.1, 63.9 25.3, 60.3 28.1 C 56.7 31.0, 51.6 36.8, 49 39.5 C 46.4 42.2, 47.6 43.1, 44.9 44.3 C 42.2 45.5, 34.6 46.1, 32.6 46.5",
  },
  {
    id: "prata",
    name: "Vía da Prata",
    nameEn: "The Silver Route",
    nameCn: "银之路",
    entry: "A Gudiña (Ourense)",
    kmInGalicia: 240,
    stagesCount: 10,
    path: "M 77.6 82.4 C 75.9 82.4, 71.3 84.4, 67.4 82.4 C 63.6 80.4, 57.9 73.3, 54.5 70.2 C 51.1 67.1, 48.1 66.3, 46.8 64 C 45.5 61.6, 47.3 57.7, 46.5 56.1 C 45.8 54.5, 44.6 56.0, 42.3 54.4 C 40.0 52.8, 34.2 47.8, 32.6 46.5",
  },
  {
    id: "inverno",
    name: "Camiño de Inverno",
    nameEn: "The Winter Way",
    nameCn: "冬之路",
    entry: "O Barco de Valdeorras (Ourense)",
    kmInGalicia: 263,
    stagesCount: 10,
    path: "M 82.8 66.6 C 81.3 66.2, 76.3 64.7, 73.5 64 C 70.7 63.3, 68.5 63.3, 65.8 62.3 C 63.1 61.3, 60.6 59.3, 57.4 58.3 C 54.2 57.3, 49.0 56.8, 46.5 56.1 C 44.0 55.5, 44.6 56.0, 42.3 54.4 C 40.0 52.8, 34.2 47.8, 32.6 46.5",
  },
  {
    id: "fisterra",
    name: "Camiño de Fisterra e Muxía",
    nameEn: "The Finisterre Way",
    nameCn: "菲尼斯特雷之路",
    entry: "Sale de Santiago",
    kmInGalicia: 119,
    stagesCount: 5,
    path: "M 32.6 46.5 C 31.5 46.4, 28.8 46.0, 26.2 45.6 C 23.6 45.2, 19.3 44.3, 16.9 43.9 C 14.5 43.5, 13.0 43.2, 11.7 43.4 C 10.4 43.6, 9.6 44.9, 9.2 45.2",
  },
  {
    id: "arousa",
    name: "Ruta do Mar de Arousa e Ulla",
    nameEn: "The Sea Route of Arousa",
    nameCn: "阿罗萨海之路",
    entry: "Ría de Arousa (marítima)",
    kmInGalicia: 60,
    stagesCount: 2,
    path: "M 18.2 61 C 19.4 60.6, 23.4 60.0, 25.2 58.8 C 27.0 57.5, 28.5 54.5, 29.1 53.5 C 29.7 52.5, 28.2 53.8, 28.8 52.6 C 29.4 51.4, 32.0 47.5, 32.6 46.5",
  },
];

// Etapas detalladas de los tres Caminos que operamos.
export const STAGES: Record<string, Stage[]> = {
  frances: [
    { from: "Sarria", to: "Portomarín", km: 22, peak: 660, note: "Robledales y aldeas de piedra" },
    { from: "Portomarín", to: "Palas de Rei", km: 25, peak: 720 },
    { from: "Palas de Rei", to: "Arzúa", km: 29, peak: 515, hard: true, note: "La más exigente: sube y baja los últimos 8 km" },
    { from: "Arzúa", to: "O Pedrouzo", km: 19, peak: 400 },
    { from: "O Pedrouzo", to: "Santiago", km: 19, peak: 370, note: "Entrada por el Monte do Gozo" },
  ],
  portugues: [
    { from: "Tui", to: "O Porriño", km: 18, peak: 100 },
    { from: "O Porriño", to: "Redondela", km: 16, peak: 270, hard: true, note: "Sube a Inxertado y baja largo hasta la ría" },
    { from: "Redondela", to: "Pontevedra", km: 19, peak: 160 },
    { from: "Pontevedra", to: "Caldas de Reis", km: 23, peak: 130 },
    { from: "Caldas de Reis", to: "Padrón", km: 19, peak: 160 },
    { from: "Padrón", to: "Santiago", km: 24, peak: 260 },
  ],
  "portugues-costa": [
    { from: "A Guarda", to: "Oia", km: 16, peak: 90, note: "Acantilado y mar abierto todo el día" },
    { from: "Oia", to: "Baiona", km: 18, peak: 130 },
    { from: "Baiona", to: "Vigo", km: 25, peak: 180, hard: true },
    { from: "Vigo", to: "Redondela", km: 16, peak: 150, note: "Aquí se une al Camino Portugués central" },
    { from: "Redondela", to: "Pontevedra", km: 19, peak: 160 },
    { from: "Pontevedra", to: "Caldas de Reis", km: 23, peak: 130 },
    { from: "Caldas de Reis", to: "Padrón", km: 19, peak: 160 },
    { from: "Padrón", to: "Santiago", km: 24, peak: 260 },
  ],
};
