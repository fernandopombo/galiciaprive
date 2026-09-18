import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/format";
import {
  CHANNEL_LABELS,
  DIRECTION_LABELS,
  MARKET_LABELS,
  ROUTE_LABELS,
  STATUS_LABELS,
  STATUS_STYLES,
} from "@/lib/labels";
import {
  CommunicationForm,
  CustomerEditForm,
  NoteForm,
} from "./customer-forms";

export default async function ClienteDetailPage({
  params,
}: PageProps<"/admin/clientes/[id]">) {
  const { id } = await params;

  const customer = await prisma.customer.findUnique({
    where: { id },
    include: {
      bookings: { include: { package: true }, orderBy: { createdAt: "desc" } },
      notes: { include: { author: true }, orderBy: { createdAt: "desc" } },
      communications: { include: { author: true }, orderBy: { sentAt: "desc" } },
    },
  });

  if (!customer) notFound();

  const lifetimeValue = customer.bookings
    .filter((b) => b.status !== "CANCELLED")
    .reduce((sum, b) => sum + Number(b.estimatedTotal ?? 0), 0);

  const bookingOptions = customer.bookings.map((booking) => ({
    id: booking.id,
    label: `${ROUTE_LABELS[booking.package.route]} — ${formatDate(booking.requestedStartDate)}`,
  }));

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/clientes"
          className="text-sm text-stone-500 hover:text-stone-900"
        >
          ← Clientes
        </Link>
        <h1 className="mt-2 text-2xl font-light text-stone-900">
          {customer.firstName} {customer.lastName}
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          {customer.email} · {MARKET_LABELS[customer.market]} · Alta{" "}
          {formatDate(customer.createdAt)}
        </p>
        {customer.tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {customer.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-stone-300 px-2.5 py-1 text-xs text-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.15em] text-stone-500">
            Reservas
          </p>
          <p className="mt-2 text-2xl font-medium text-stone-900">
            {customer.bookings.length}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.15em] text-stone-500">
            Valor total
          </p>
          <p className="mt-2 text-2xl font-medium text-stone-900">
            {formatCurrency(lifetimeValue)}
          </p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.15em] text-stone-500">
            Comunicaciones
          </p>
          <p className="mt-2 text-2xl font-medium text-stone-900">
            {customer.communications.length}
          </p>
        </div>
      </div>

      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
          Ficha de cliente
        </h2>
        <div className="mt-4">
          <CustomerEditForm
            customer={{
              id: customer.id,
              firstName: customer.firstName,
              lastName: customer.lastName,
              phone: customer.phone,
              country: customer.country,
              market: customer.market,
              preferredLanguage: customer.preferredLanguage,
              source: customer.source,
              tags: customer.tags,
            }}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
          Historial de compras
        </h2>
        {customer.bookings.length === 0 ? (
          <p className="mt-4 text-sm text-stone-500">Sin reservas.</p>
        ) : (
          <ul className="mt-4 divide-y divide-stone-100">
            {customer.bookings.map((booking) => (
              <li key={booking.id} className="flex items-center justify-between py-3">
                <div>
                  <Link
                    href={`/admin/reservas/${booking.id}`}
                    className="text-sm font-medium text-stone-900 hover:underline"
                  >
                    {ROUTE_LABELS[booking.package.route]}
                  </Link>
                  <p className="text-xs text-stone-500">
                    Salida {formatDate(booking.requestedStartDate)} · {booking.pax} pax ·{" "}
                    {formatCurrency(booking.estimatedTotal?.toString())}
                  </p>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[booking.status]}`}
                >
                  {STATUS_LABELS[booking.status]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
          Lanzar comunicación
        </h2>
        <div className="mt-4">
          <CommunicationForm
            customerId={customer.id}
            bookings={bookingOptions}
          />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
            Notas internas
          </h2>
          <div className="mt-4">
            <NoteForm customerId={customer.id} />
          </div>
          {customer.notes.length > 0 ? (
            <ul className="mt-6 space-y-4">
              {customer.notes.map((note) => (
                <li key={note.id} className="rounded-lg bg-stone-50 p-4">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{note.author.name}</span>
                    <span>{formatDateTime(note.createdAt)}</span>
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-stone-700">
                    {note.body}
                  </p>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="text-sm uppercase tracking-[0.15em] text-stone-500">
            Historial de comunicaciones
          </h2>
          {customer.communications.length === 0 ? (
            <p className="mt-4 text-sm text-stone-500">
              Sin comunicaciones registradas.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {customer.communications.map((comm) => (
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
    </div>
  );
}
