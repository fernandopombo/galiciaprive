import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";
import {
  MARKET_LABELS,
  PARTY_LABELS,
  ROUTE_LABELS,
  STATUS_LABELS,
  STATUS_STYLES,
} from "@/lib/labels";

const STATUS_FILTERS = [
  { value: "", label: "Todas" },
  { value: "PENDING", label: "Pendientes" },
  { value: "CONTACTED", label: "Contactadas" },
  { value: "CONFIRMED", label: "Confirmadas" },
  { value: "COMPLETED", label: "Completadas" },
  { value: "CANCELLED", label: "Canceladas" },
];

const VALID_STATUSES = new Set([
  "PENDING",
  "CONTACTED",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
]);

export default async function ReservasPage({
  searchParams,
}: PageProps<"/admin/reservas">) {
  const params = await searchParams;
  const statusParam = typeof params.estado === "string" ? params.estado : "";
  const status = VALID_STATUSES.has(statusParam) ? statusParam : undefined;

  const bookings = await prisma.booking.findMany({
    where: status
      ? {
          status: status as
            | "PENDING"
            | "CONTACTED"
            | "CONFIRMED"
            | "CANCELLED"
            | "COMPLETED",
        }
      : undefined,
    include: { customer: true, package: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-stone-900">Reservas</h1>
        <p className="mt-1 text-sm text-stone-500">
          {bookings.length} {bookings.length === 1 ? "reserva" : "reservas"}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {STATUS_FILTERS.map((filter) => {
          const active = (statusParam || "") === filter.value;
          return (
            <Link
              key={filter.value || "all"}
              href={filter.value ? `/admin/reservas?estado=${filter.value}` : "/admin/reservas"}
              className={`rounded-full border px-3 py-1.5 text-sm transition ${
                active
                  ? "border-stone-900 bg-stone-900 text-white"
                  : "border-stone-300 text-stone-600 hover:border-stone-900"
              }`}
            >
              {filter.label}
            </Link>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {bookings.length === 0 ? (
          <p className="px-6 py-8 text-sm text-stone-500">
            No hay reservas con este filtro.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-[0.1em] text-stone-500">
              <tr className="border-b border-stone-200">
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Mercado</th>
                <th className="px-6 py-3 font-medium">Ruta</th>
                <th className="px-6 py-3 font-medium">Salida</th>
                <th className="px-6 py-3 font-medium">Formato</th>
                <th className="px-6 py-3 font-medium">Importe est.</th>
                <th className="px-6 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-b border-stone-100 last:border-0">
                  <td className="px-6 py-3">
                    <Link
                      href={`/admin/reservas/${booking.id}`}
                      className="font-medium text-stone-900 hover:underline"
                    >
                      {booking.customer.firstName} {booking.customer.lastName}
                    </Link>
                    <p className="text-xs text-stone-500">{booking.customer.email}</p>
                  </td>
                  <td className="px-6 py-3 text-stone-600">
                    {MARKET_LABELS[booking.customer.market]}
                  </td>
                  <td className="px-6 py-3 text-stone-600">
                    {ROUTE_LABELS[booking.package.route]}
                  </td>
                  <td className="px-6 py-3 text-stone-600">
                    {formatDate(booking.requestedStartDate)}
                  </td>
                  <td className="px-6 py-3 text-stone-600">
                    {PARTY_LABELS[booking.partySize]} · {booking.pax} pax
                  </td>
                  <td className="px-6 py-3 text-stone-600">
                    {formatCurrency(booking.estimatedTotal?.toString())}
                  </td>
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
      </div>
    </div>
  );
}
