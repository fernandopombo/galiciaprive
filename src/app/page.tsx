import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ROUTE_LABELS } from "@/lib/labels";
import { formatCurrency } from "@/lib/format";

export default async function HomePage() {
  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
  });

  return (
    <main className="flex-1">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-[0.2em] text-stone-900">
            ULTRAVIP
          </span>
          <Link
            href="/reservar"
            className="rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
          >
            Solicitar reserva
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
          Camino de Santiago
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-light leading-tight text-stone-900 sm:text-5xl">
          El Camino esencial, sin renunciar a nada.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-stone-600">
          Peregrinaciones privadas con guía-concierge dedicado, alojamiento en
          paradores y pazos históricos, y gastronomía de autor. Grupos reducidos
          o experiencia completamente privada.
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="text-sm uppercase tracking-[0.2em] text-stone-500">
          Nuestras rutas
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-stone-500">
                {ROUTE_LABELS[pkg.route]}
              </p>
              <h3 className="mt-3 text-xl font-medium text-stone-900">
                {pkg.name}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">
                {pkg.description}
              </p>
              <dl className="mt-6 space-y-1 text-sm text-stone-600">
                <div className="flex justify-between">
                  <dt>Duración</dt>
                  <dd className="font-medium text-stone-900">
                    {pkg.durationDays} días
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Desde</dt>
                  <dd className="font-medium text-stone-900">
                    {formatCurrency(pkg.basePricePerson.toString())} / persona
                  </dd>
                </div>
              </dl>
              <Link
                href={`/reservar?paquete=${pkg.id}`}
                className="mt-6 rounded-full border border-stone-900 px-4 py-2 text-center text-sm font-medium text-stone-900 transition hover:bg-stone-900 hover:text-white"
              >
                Solicitar esta ruta
              </Link>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 text-sm text-stone-500">
          <span>ULTRAVIP — Camino de Santiago</span>
          <Link href="/admin" className="hover:text-stone-900">
            Acceso equipo
          </Link>
        </div>
      </footer>
    </main>
  );
}
