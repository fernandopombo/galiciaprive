import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/format";
import { ROUTE_LABELS } from "@/lib/labels";

export default async function PaquetesPage() {
  const packages = await prisma.package.findMany({
    include: { bookings: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-stone-900">Paquetes</h1>
        <p className="mt-1 text-sm text-stone-500">
          Rutas publicadas en la web pública.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {packages.map((pkg) => {
          const active = pkg.bookings.filter(
            (b) => b.status !== "CANCELLED",
          ).length;
          return (
            <article
              key={pkg.id}
              className="rounded-2xl border border-stone-200 bg-white p-6"
            >
              <p className="text-xs uppercase tracking-[0.15em] text-stone-500">
                {ROUTE_LABELS[pkg.route]}
              </p>
              <h2 className="mt-2 text-lg font-medium text-stone-900">
                {pkg.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">
                {pkg.description}
              </p>
              <dl className="mt-5 space-y-1 text-sm text-stone-600">
                <div className="flex justify-between">
                  <dt>Duración</dt>
                  <dd className="font-medium text-stone-900">
                    {pkg.durationDays} días
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Precio base</dt>
                  <dd className="font-medium text-stone-900">
                    {formatCurrency(pkg.basePricePerson.toString())}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>Reservas activas</dt>
                  <dd className="font-medium text-stone-900">{active}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
}
