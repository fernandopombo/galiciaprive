import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/format";
import {
  CHANNEL_LABELS,
  DIRECTION_LABELS,
  MARKET_LABELS,
  PARTY_LABELS,
  ROUTE_LABELS,
  STATUS_LABELS,
  STATUS_STYLES,
} from "@/lib/labels";
import { StatusForm } from "./status-form";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.12em] text-stone-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-stone-900">{value}</dd>
    </div>
  );
}

export default async function ReservaDetailPage({
  params,
}: PageProps<"/admin/reservas/[id]">) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: {
      customer: true,
      package: true,
      communications: { include: { author: true }, orderBy: { sentAt: "desc" } },
    },
  });

  if (!booking) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/admin/reservas"
            className="text-sm text-stone-500 hover:text-stone-900"
          >
            ← Reservas
          </Link>
          <h1 className="mt-2 text-2xl font-light text-stone-900">
            {booking.customer.firstName} {booking.customer.lastName}
          </h1>
          <p className="mt-1 text-sm text-stone-500">
            Solicitud creada el {formatDateTime(booking.createdAt)}
          </p>
        </div>
        <span
          className={`rounded-full border px-3 py-1.5 text-sm font-medium ${STATUS_STYLES[booking.status]}`}
        >
          {STATUS_LABELS[booking.status]}
        </span>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
          Cambiar estado
        </h2>
        <div className="mt-4">
          <StatusForm bookingId={booking.id} currentStatus={booking.status} />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
            Reserva
          </h2>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            <Field label="Ruta" value={ROUTE_LABELS[booking.package.route]} />
            <Field label="Paquete" value={booking.package.name} />
            <Field
              label="Salida solicitada"
              value={formatDate(booking.requestedStartDate)}
            />
            <Field label="Duración" value={`${booking.package.durationDays} días`} />
            <Field
              label="Formato"
              value={`${PARTY_LABELS[booking.partySize]} · ${booking.pax} pax`}
            />
            <Field
              label="Importe estimado"
              value={formatCurrency(booking.estimatedTotal?.toString())}
            />
          </dl>
          {booking.message ? (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.12em] text-stone-500">
                Mensaje del cliente
              </p>
              <p className="mt-2 rounded-lg bg-stone-50 p-4 text-sm leading-relaxed text-stone-700">
                {booking.message}
              </p>
            </div>
          ) : null}
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
            Cliente
          </h2>
          <dl className="mt-4 grid grid-cols-2 gap-4">
            <Field label="Email" value={booking.customer.email} />
            <Field label="Teléfono" value={booking.customer.phone ?? "—"} />
            <Field label="País" value={booking.customer.country ?? "—"} />
            <Field label="Mercado" value={MARKET_LABELS[booking.customer.market]} />
          </dl>
          <Link
            href={`/admin/clientes/${booking.customer.id}`}
            className="mt-6 inline-block rounded-full border border-stone-900 px-4 py-2 text-sm font-medium text-stone-900 transition hover:bg-stone-900 hover:text-white"
          >
            Ver ficha completa
          </Link>
        </section>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
          Comunicaciones de esta reserva
        </h2>
        {booking.communications.length === 0 ? (
          <p className="mt-4 text-sm text-stone-500">
            Sin comunicaciones registradas.
          </p>
        ) : (
          <ul className="mt-4 space-y-4">
            {booking.communications.map((comm) => (
              <li key={comm.id} className="rounded-lg border border-stone-200 p-4">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>
                    {CHANNEL_LABELS[comm.channel]} ·{" "}
                    {DIRECTION_LABELS[comm.direction]} · {comm.author.name}
                  </span>
                  <span>{formatDateTime(comm.sentAt)}</span>
                </div>
                {comm.subject ? (
                  <p className="mt-2 text-sm font-medium text-stone-900">
                    {comm.subject}
                  </p>
                ) : null}
                <p className="mt-1 whitespace-pre-wrap text-sm text-stone-700">
                  {comm.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
