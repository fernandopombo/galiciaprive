import { connection } from "next/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ROUTE_LABELS } from "@/lib/labels";
import { formatCurrency } from "@/lib/format";
import { Logo } from "@/components/logo";

export default async function HomePage() {
  await connection();

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <main className="flex-1">
      <header className="border-b border-sand-200 bg-sand-50/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <Logo tagline="Camino de Santiago" />
          <div className="flex items-center gap-6">
            <Link
              href="/us"
              className="hidden text-xs uppercase tracking-[0.2em] text-sea-700/60 transition hover:text-sea-700 sm:block"
            >
              EN
            </Link>
            <Link
              href="/cn"
              className="hidden text-xs tracking-[0.2em] text-sea-700/60 transition hover:text-sea-700 sm:block"
            >
              中文
            </Link>
            <Link
              href="/reservar"
              className="rounded-full bg-sea-700 px-6 py-2.5 text-sm text-white transition hover:bg-sea-900"
            >
              Solicitar reserva
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden grain">
        <div className="mx-auto max-w-5xl px-6 pt-24 pb-20 sm:pt-32">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-field-700">
            Galicia · Camino de Santiago
          </p>
          <h1 className="mt-7 max-w-3xl font-serif text-[2.75rem] leading-[1.08] text-sea-900 sm:text-6xl">
            El Camino esencial, sin renunciar a nada.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-sea-900/70">
            Peregrinaciones privadas con guía-concierge dedicado, alojamiento en
            paradores y pazos históricos y gastronomía de autor. Grupos reducidos
            o experiencia enteramente privada.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link
              href="/reservar"
              className="rounded-full bg-sea-700 px-8 py-3.5 text-sm text-white transition hover:bg-sea-900"
            >
              Solicitar reserva
            </Link>
            <span className="text-sm text-sea-900/50">
              5 a 7 días · De 2 a 8 caminantes · Un guía que no le deja
            </span>
          </div>
        </div>
      </section>

      <div className="border-y border-sand-200 bg-sand-100">
        <section className="mx-auto max-w-5xl px-6 py-20">
          <p className="text-[0.7rem] uppercase tracking-[0.32em] text-field-700">
            Lo que hacemos
          </p>
          <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.15] text-sea-900 sm:text-4xl">
            Usted camina cada kilómetro. De todo lo demás nos ocupamos nosotros.
          </h2>
          <div className="mt-8 grid gap-10 md:grid-cols-3">
            <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
              Salidas fuera de la hora punta y alojamiento lejos de los núcleos
              saturados. El Camino de siempre, sin la cola de las ocho de la
              mañana en Sarria.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
              Monasterios del siglo XII, pazos gallegos todavía en manos de sus
              familias y paradores. La cena nunca es el menú del peregrino: es
              marisco de la ría, albariño en la bodega y mesa con estrella cuando
              el día lo pide.
            </p>
            <p className="text-[0.95rem] leading-relaxed text-sea-900/70">
              Un guía gallego dedicado a su grupo durante todo el recorrido, con
              vehículo de apoyo para el equipaje y asistencia a cualquier hora.
            </p>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-[0.7rem] uppercase tracking-[0.32em] text-field-700">
          Nuestras rutas
        </p>
        <h2 className="mt-5 max-w-2xl font-serif text-3xl leading-[1.15] text-sea-900 sm:text-4xl">
          Elija sus últimos cien kilómetros.
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="flex flex-col rounded-sm border border-sand-200 bg-white p-7"
            >
              <p className="text-[0.65rem] uppercase tracking-[0.25em] text-field-700">
                {ROUTE_LABELS[pkg.route]}
              </p>
              <h3 className="mt-4 font-serif text-2xl leading-tight text-sea-900">
                {pkg.name}
              </h3>
              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-sea-900/70">
                {pkg.description}
              </p>
              <dl className="mt-7 space-y-2 border-t border-sand-200 pt-5 text-sm text-sea-900/60">
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
                className="mt-7 border-b border-sea-700 pb-1 text-sm text-sea-700 transition hover:border-sea-900 hover:text-sea-900"
              >
                Solicitar esta ruta
              </Link>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-sand-200 bg-sand-100">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-sea-900/50">
          <Logo tagline="Camino de Santiago" />
          <div className="flex gap-6">
            <Link href="/us" className="transition hover:text-sea-700">
              English
            </Link>
            <Link href="/cn" className="transition hover:text-sea-700">
              中文
            </Link>
            <Link href="/admin" className="transition hover:text-sea-700">
              Acceso equipo
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
