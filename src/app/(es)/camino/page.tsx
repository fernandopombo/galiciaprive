import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/motion";
import { Figure } from "@/components/figure";
import { CaminoMap } from "@/components/camino-map";
import { StageProfile } from "@/components/stage-profile";
import { Cta, Eyebrow } from "@/components/ui";
import { CAMINOS, STAGES } from "@/lib/caminos";

export const metadata: Metadata = {
  title: "Los Caminos de Santiago — Galicia Privé",
  description:
    "Las diez rutas jacobeas oficiales a su paso por Galicia: por dónde entra cada una, cuántos kilómetros recorre, en cuántas etapas se divide y qué hace falta para obtener la Compostela.",
};

const PROFILE_LABELS = {
  km: "Total",
  peak: "Cota máxima",
  hardest: "Etapa más exigente",
};

const MAP_LABELS = {
  entry: "Entra por",
  stages: "Etapas",
  weOperate: "La operamos",
  hint: "Pase el cursor sobre una ruta para destacarla.",
};

const OPERATED = [
  {
    id: "frances" as const,
    title: "Camino Francés",
    from: "Desde Sarria",
    body: "La ruta más transitada del mundo jacobeo y la que más peregrinos lleva a Santiago. Sarria es el punto de partida más popular del planeta precisamente porque está poco más de cien kilómetros de la catedral, el mínimo para obtener la Compostela.",
  },
  {
    id: "portugues" as const,
    title: "Camino Portugués",
    from: "Desde Tui",
    body: "Entra en Galicia cruzando el Miño por el puente internacional de Tui. Terreno más llano que el Francés y bastante menos concurrido, entre viñedos en espaldera, puentes romanos y las villas de las Rías Baixas.",
  },
  {
    id: "portugues-costa" as const,
    title: "Camino Portugués da Costa",
    from: "Desde A Guarda",
    body: "La variante atlántica: acantilado, mar abierto y pueblos marineros hasta Redondela, donde se funde con el Portugués central. Es la ruta de los atardeceres sobre el océano.",
  },
];

export default function CaminoPage() {
  // Formateo manual: el servidor no tiene por qué compartir la configuración
  // regional del navegador y el millar acabaría sin separar.
  const totalKm = CAMINOS.reduce((sum, c) => sum + c.kmInGalicia, 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <main className="flex-1">
      <div className="grain-overlay" aria-hidden="true" />

      {/* Portada del apartado informativo: sobria, no compite con la de venta. */}
      <section className="relative isolate flex min-h-[72svh] flex-col bg-sea-900">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(110%_80%_at_20%_10%,#17697A_0%,#0E4C5E_45%,#08313D_100%)]"
          aria-hidden="true"
        />
        <SiteNav
          tagline="Camino de Santiago"
          links={[
            { href: "/", label: "Inicio" },
            { href: "/us", label: "EN" },
            { href: "/cn", label: "中文" },
          ]}
          cta={{ href: "/reservar", label: "Solicitar reserva" }}
        />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-4 pb-20 sm:px-6">
          <Reveal>
            <Eyebrow tone="light">Guía · Información práctica</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 max-w-3xl font-serif text-[2.4rem] leading-[1.06] text-sand-50 sm:text-[4rem]">
              No hay un Camino. Hay diez, y todos terminan en el mismo sitio.
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-sand-50/75">
              Galicia reconoce diez rutas jacobeas oficiales: nueve por tierra y
              una marítima. Entre todas suman más de {totalKm} kilómetros
              señalizados dentro de la comunidad.
            </p>
          </Reveal>
        </div>
      </section>

      {/* El mapa: el elemento visual central del apartado. */}
      <section className="border-b border-sand-200 bg-sand-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <Eyebrow>Las diez rutas oficiales</Eyebrow>
            <h2 className="mt-7 max-w-3xl font-serif text-[2rem] leading-[1.12] text-sea-900 sm:text-[2.8rem]">
              Todos los caminos entran por un sitio distinto y convergen en el
              Obradoiro.
            </h2>
          </Reveal>
          <Reveal delay={140} className="mt-14">
            <CaminoMap labels={MAP_LABELS} />
          </Reveal>
        </div>
      </section>

      {/* Las tres que operamos, con su perfil de etapas. */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <Eyebrow>Etapa a etapa</Eyebrow>
          <h2 className="mt-7 max-w-3xl font-serif text-[2rem] leading-[1.12] text-sea-900 sm:text-[2.8rem]">
            Las tres rutas que caminamos, día por día.
          </h2>
          <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-sea-900/70">
            El ancho de cada barra es la distancia de la etapa; la altura, la
            cota máxima que se alcanza. En verde, la jornada más exigente.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20">
          {OPERATED.map((route, index) => (
            <Reveal key={route.id} delay={index * 80}>
              <article className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-field-700">
                    {route.from}
                  </p>
                  <h3 className="mt-4 font-serif text-2xl leading-tight text-sea-900 sm:text-3xl">
                    {route.title}
                  </h3>
                  <p className="mt-5 text-[0.95rem] leading-relaxed text-sea-900/70">
                    {route.body}
                  </p>
                  <ul className="mt-7 space-y-2.5 text-[0.9rem] text-sea-900/70">
                    {STAGES[route.id].map((stage) => (
                      <li
                        key={`${stage.from}-${stage.to}`}
                        className="flex items-baseline justify-between gap-4 border-b border-sand-200 pb-2.5"
                      >
                        <span className={stage.hard ? "text-field-700" : ""}>
                          {stage.from} — {stage.to}
                          {stage.note ? (
                            <span className="mt-0.5 block text-[0.8rem] text-sea-900/45">
                              {stage.note}
                            </span>
                          ) : null}
                        </span>
                        <span className="shrink-0 font-mono text-[0.82rem] tabular-nums">
                          {stage.km} km
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:pt-12">
                  <StageProfile caminoId={route.id} labels={PROFILE_LABELS} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* La credencial y la Compostela, explicadas. */}
      <section className="relative isolate">
        <Figure slot="credential" ratio="21 / 9" className="min-h-[60svh] w-full" />
        <div className="pointer-events-none absolute inset-0 bg-sea-900/75" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
            <Reveal>
              <Eyebrow tone="light">La credencial y la Compostela</Eyebrow>
              <h2 className="mt-7 max-w-2xl font-serif text-[2rem] leading-[1.12] text-sand-50 sm:text-[2.9rem]">
                Cien kilómetros a pie. Dos sellos al día. Un certificado en
                latín con su nombre.
              </h2>
            </Reveal>
            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {[
                {
                  n: "100",
                  unit: "km a pie",
                  body: "Es la distancia mínima para obtener la Compostela. En bicicleta o a caballo son 200. Por eso Sarria y Tui son los puntos de partida más frecuentados: están justo por encima de ese umbral.",
                },
                {
                  n: "2",
                  unit: "sellos diarios",
                  body: "Dentro de Galicia hay que sellar la credencial dos veces al día. Sellan iglesias, albergues, bares, ayuntamientos y hasta oficinas de correos.",
                },
                {
                  n: "1",
                  unit: "oficina del peregrino",
                  body: "En la rúa das Carretas, junto a la catedral. Allí se comprueba la credencial y se expide el certificado, gratuito; por tres euros lo emiten con la distancia recorrida.",
                },
              ].map((item, index) => (
                <Reveal key={item.unit} delay={index * 90}>
                  <p className="font-serif text-5xl text-sand-50">{item.n}</p>
                  <p className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-field-500">
                    {item.unit}
                  </p>
                  <p className="mt-4 text-[0.9rem] leading-relaxed text-sand-50/70">
                    {item.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Las otras rutas, en listado compacto. */}
      <section className="border-y border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <Eyebrow>Las demás</Eyebrow>
            <h2 className="mt-7 max-w-3xl font-serif text-[2rem] leading-[1.12] text-sea-900 sm:text-[2.8rem]">
              Siete rutas más, para quien vuelve.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {CAMINOS.filter((c) => !c.operated).map((camino, index) => (
              <Reveal key={camino.id} delay={index * 70}>
                <article className="border-t border-sand-200 pt-5">
                  <h3 className="font-serif text-xl text-sea-900">
                    {camino.name}
                  </h3>
                  <p className="mt-2 text-[0.88rem] text-sea-900/60">
                    {camino.entry}
                  </p>
                  <p className="mt-4 font-mono text-[0.82rem] tabular-nums text-sea-900/70">
                    {camino.kmInGalicia} km · {camino.stagesCount} etapas
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <p className="mt-14 max-w-2xl text-[0.9rem] leading-relaxed text-sea-900/55">
              Datos de los Caminos a su paso por Galicia según la información
              oficial de la Xunta de Galicia. Los kilometrajes varían
              ligeramente entre fuentes según las variantes y los alojamientos
              de cada etapa.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36">
        <Reveal>
          <h2 className="max-w-2xl font-serif text-[2rem] leading-[1.12] text-sea-900 sm:text-[2.8rem]">
            ¿Cuál de ellos quiere caminar?
          </h2>
          <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-sea-900/70">
            Le decimos con franqueza cuál encaja con sus fechas, su forma física
            y lo que busca. Aunque no sea ninguno de los tres que operamos.
          </p>
          <div className="mt-10">
            <Cta href="/reservar">Solicitar reserva</Cta>
          </div>
        </Reveal>
      </section>

      <footer className="border-t border-sand-200 bg-sand-100">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 py-10 text-sm text-sea-900/50 sm:px-6">
          <Logo tagline="Camino de Santiago" size="sm" />
          <div className="flex gap-7">
            <Link href="/" className="transition-colors duration-500 hover:text-sea-700">
              Inicio
            </Link>
            <Link href="/us" className="transition-colors duration-500 hover:text-sea-700">
              English
            </Link>
            <Link href="/cn" className="transition-colors duration-500 hover:text-sea-700">
              中文
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
