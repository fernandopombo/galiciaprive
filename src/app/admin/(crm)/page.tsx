import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  MARKET_LABELS,
  ROUTE_LABELS,
  STATUS_LABELS,
  STATUS_STYLES,
} from "@/lib/labels";
import { BookingsByMonthChart, DistributionChart } from "./dashboard-charts";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.15em] text-stone-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-medium text-stone-900">{value}</p>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const [bookings, customersCount] = await Promise.all([
    prisma.booking.findMany({
      include: { customer: true, package: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.customer.count(),
  ]);

  const confirmed = bookings.filter(
    (b) => b.status === "CONFIRMED" || b.status === "COMPLETED",
  );
  const pipelineValue = bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + Number(b.estimatedTotal ?? 0), 0);
  const confirmedValue = confirmed.reduce(
    (sum, b) => sum + Number(b.estimatedTotal ?? 0),
    0,
  );
  const conversion =
    bookings.length > 0
      ? Math.round((confirmed.length / bookings.length) * 100)
      : 0;

  const monthFormatter = new Intl.DateTimeFormat("es-ES", {
    month: "short",
    year: "2-digit",
  });
  const byMonthMap = new Map<string, number>();
  for (const booking of bookings) {
    const key = monthFormatter.format(booking.createdAt);
    byMonthMap.set(key, (byMonthMap.get(key) ?? 0) + 1);
  }
  const byMonth = Array.from(byMonthMap.entries())
    .map(([month, reservas]) => ({ month, reservas }))
    .reverse();

  const byRouteMap = new Map<string, number>();
  for (const booking of bookings) {
    const key = ROUTE_LABELS[booking.package.route] ?? booking.package.route;
    byRouteMap.set(key, (byRouteMap.get(key) ?? 0) + 1);
  }
  const byRoute = Array.from(byRouteMap.entries()).map(([name, value]) => ({
    name,
    value,
  }));

  const byMarketMap = new Map<string, number>();
  for (const booking of bookings) {
    const key = MARKET_LABELS[booking.customer.market] ?? booking.customer.market;
    byMarketMap.set(key, (byMarketMap.get(key) ?? 0) + 1);
  }
  const byMarket = Array.from(byMarketMap.entries()).map(([name, value]) => ({
    name,
    value,
  }));

  const recent = bookings.slice(0, 8);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-light text-stone-900">Panel</h1>
        <p className="mt-1 text-sm text-stone-500">
          Estado del negocio en tiempo real.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Reservas totales" value={String(bookings.length)} />
        <StatCard label="Clientes" value={String(customersCount)} />
        <StatCard label="Confirmadas" value={String(confirmed.length)} />
        <StatCard label="Conversión" value={`${conversion}%`} />
        <StatCard label="Valor confirmado" value={formatCurrency(confirmedValue)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
            Reservas por mes
          </h2>
          <div className="mt-4">
            {byMonth.length > 0 ? (
              <BookingsByMonthChart data={byMonth} />
            ) : (
              <p className="flex h-[260px] items-center justify-center text-sm text-stone-500">
                Sin datos todavía
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
            Por ruta
          </h2>
          <div className="mt-4">
            <DistributionChart data={byRoute} />
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
            Por mercado
          </h2>
          <div className="mt-4">
            <DistributionChart data={byMarket} />
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
            Pipeline abierto
          </h2>
          <p className="mt-4 text-3xl font-light text-stone-900">
            {formatCurrency(pipelineValue)}
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Valor estimado de todas las reservas no canceladas.
          </p>
        </section>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
          <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
            Últimas reservas
          </h2>
          <Link href="/admin/reservas" className="text-sm text-stone-600 hover:text-stone-900">
            Ver todas
          </Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-6 py-8 text-sm text-stone-500">
            Todavía no hay reservas.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-[0.1em] text-stone-500">
              <tr className="border-b border-stone-200">
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Ruta</th>
                <th className="px-6 py-3 font-medium">Salida</th>
                <th className="px-6 py-3 font-medium">Pax</th>
                <th className="px-6 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((booking) => (
                <tr key={booking.id} className="border-b border-stone-100 last:border-0">
                  <td className="px-6 py-3">
                    <Link
                      href={`/admin/reservas/${booking.id}`}
                      className="font-medium text-stone-900 hover:underline"
                    >
                      {booking.customer.firstName} {booking.customer.lastName}
                    </Link>
                  </td>
                  <td className="px-6 py-3 text-stone-600">
                    {ROUTE_LABELS[booking.package.route]}
                  </td>
                  <td className="px-6 py-3 text-stone-600">
                    {formatDate(booking.requestedStartDate)}
                  </td>
                  <td className="px-6 py-3 text-stone-600">{booking.pax}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[booking.status]}`}
                    >
                      {STATUS_LABELS[booking.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
