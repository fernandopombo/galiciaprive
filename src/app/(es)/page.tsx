import { connection } from "next/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ROUTE_LABELS } from "@/lib/labels";
import { formatCurrency } from "@/lib/format";
import { Logo } from "@/components/logo";
import { VideoHero } from "@/components/video-hero";
import { SiteNav } from "@/components/site-nav";
import { Reveal } from "@/components/motion";
import { Cta, Eyebrow, Panel } from "@/components/ui";

export default async function HomePage() {
  await connection();

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <main className="flex-1">
      <div className="grain-overlay" aria-hidden="true" />

      <VideoHero>
        <SiteNav
          tagline="Camino de Santiago"
          links={[
            { href: "#rutas", label: "Rutas" },
            { href: "/camino", label: "El Camino" },
            { href: "/us", label: "EN" },
            { href: "/cn", label: "中文" },
          ]}
          cta={{ href: "/reservar", label: "Solicitar reserva" }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-end px-4 pb-24 sm:px-6 sm:pb-28">
          <Reveal>
            <Eyebrow tone="light">Galicia · Camino de Santiago</Eyebrow>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 max-w-3xl font-serif text-[2.6rem] leading-[1.04] text-sand-50 sm:text-[4.5rem]">
              El Camino esencial, sin renunciar a nada.
            </h1>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-sand-50/80">
              Peregrinaciones privadas con guía-concierge dedicado, alojamiento
              en paradores y pazos históricos y gastronomía de autor. Grupos
              reducidos o experiencia enteramente privada.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-11 flex flex-wrap items-center gap-6">
              <Cta href="/reservar" tone="light">
                Solicitar reserva
              </Cta>
              <span className="text-sm text-sand-50/60">
                5 a 7 días · De 2 a 8 caminantes · Un guía que no le deja
              </span>
            </div>
          </Reveal>
        </div>
      </VideoHero>

      <section className="border-b border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <Reveal>
              <Eyebrow>Lo que hacemos</Eyebrow>
              <h2 className="mt-7 font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
                Usted camina cada kilómetro. De todo lo demás nos ocupamos
                nosotros.
              </h2>
            </Reveal>
            <div className="grid gap-8 sm:grid-cols-2">
              {[
                "Salidas fuera de la hora punta y alojamiento lejos de los núcleos saturados. El Camino de siempre, sin la cola de las ocho de la mañana en Sarria.",
                "Monasterios del siglo XII, pazos gallegos todavía en manos de sus familias y paradores. La cena nunca es el menú del peregrino: es marisco de la ría, albariño en la bodega y mesa con estrella cuando el día lo pide.",
                "Un guía gallego dedicado a su grupo durante todo el recorrido, con vehículo de apoyo para el equipaje y asistencia a cualquier hora.",
              ].map((paragraph, index) => (
                <Reveal key={index} delay={index * 90}>
                  <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="rutas" className="mx-auto max-w-6xl px-4 py-28 sm:px-6 sm:py-36">
        <Reveal>
          <Eyebrow>Nuestras rutas</Eyebrow>
          <h2 className="mt-7 max-w-3xl font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
            Elija sus últimos cien kilómetros.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.id} delay={index * 90}>
              <Panel className="h-full" as="article">
                <Eyebrow>{ROUTE_LABELS[pkg.route]}</Eyebrow>
                <h3 className="mt-5 font-serif text-2xl leading-tight text-sea-900">
                  {pkg.name}
                </h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-sea-900/70">
                  {pkg.description}
                </p>
                <dl className="mt-8 space-y-2 border-t border-sand-200 pt-5 text-sm text-sea-900/60">
                  <div className="flex justify-between">
                    <dt>Duración</dt>
                    <dd className="text-sea-900">{pkg.durationDays} días</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Desde</dt>
                    <dd className="text-sea-900">
                      {formatCurrency(pkg.basePricePerson.toString())} / persona
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/reservar?paquete=${pkg.id}`}
                  className="mt-7 w-fit border-b border-sea-700/40 pb-1 text-sm text-sea-700 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-sea-900 hover:text-sea-900"
                >
                  Solicitar esta ruta
                </Link>
              </Panel>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-sand-200 bg-sand-100">
        <div className="mx-auto max-w-6xl px-4 py-32 sm:px-6 sm:py-40">
          <Reveal>
            <h2 className="max-w-2xl font-serif text-[2.1rem] leading-[1.12] text-sea-900 sm:text-[2.9rem]">
              Cuéntenos qué ruta y qué fechas tiene en mente.
            </h2>
            <p className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-sea-900/70">
              Diseñaremos una propuesta a medida y le contactaremos
              personalmente en menos de 24 horas.
            </p>
            <div className="mt-10">
              <Cta href="/reservar">Solicitar reserva</Cta>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-sand-200 bg-sand-50">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-10 text-sm text-sea-900/50 sm:px-6">
          <Logo tagline="Camino de Santiago" size="sm" />
          <div className="flex gap-7">
            <Link
              href="/camino"
              className="transition-colors duration-500 hover:text-sea-700"
            >
              El Camino
            </Link>
            <Link
              href="/us"
              className="transition-colors duration-500 hover:text-sea-700"
            >
              English
            </Link>
            <Link
              href="/cn"
              className="transition-colors duration-500 hover:text-sea-700"
            >
              中文
            </Link>
            <Link
              href="/admin"
              className="transition-colors duration-500 hover:text-sea-700"
            >
              Acceso equipo
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
