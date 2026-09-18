import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/format";
import { CHANNEL_LABELS, DIRECTION_LABELS } from "@/lib/labels";

export default async function ComunicacionesPage() {
  const communications = await prisma.communication.findMany({
    include: { customer: true, author: true },
    orderBy: { sentAt: "desc" },
    take: 100,
  });

  const emailConfigured = Boolean(process.env.RESEND_API_KEY);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-stone-900">Comunicaciones</h1>
        <p className="mt-1 text-sm text-stone-500">
          Registro de todo el contacto con clientes. Se lanzan desde la ficha de
          cada cliente.
        </p>
      </div>

      {!emailConfigured ? (
        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
          El envío real de emails está desactivado. Configura{" "}
          <code className="font-mono">RESEND_API_KEY</code> y{" "}
          <code className="font-mono">EMAIL_FROM</code> en el entorno para enviar
          desde el CRM. Mientras tanto, las comunicaciones se registran pero no
          se envían.
        </p>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {communications.length === 0 ? (
          <p className="px-6 py-8 text-sm text-stone-500">
            Todavía no hay comunicaciones.
          </p>
        ) : (
          <ul className="divide-y divide-stone-100">
            {communications.map((comm) => (
              <li key={comm.id} className="px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                  <span>
                    <Link
                      href={`/admin/clientes/${comm.customerId}`}
                      className="font-medium text-stone-900 hover:underline"
                    >
                      {comm.customer.firstName} {comm.customer.lastName}
                    </Link>{" "}
                    · {CHANNEL_LABELS[comm.channel]} ·{" "}
                    {DIRECTION_LABELS[comm.direction]} · {comm.author.name}
                  </span>
                  <span>{formatDateTime(comm.sentAt)}</span>
                </div>
                {comm.subject ? (
                  <p className="mt-2 text-sm font-medium text-stone-900">
                    {comm.subject}
                  </p>
                ) : null}
                <p className="mt-1 line-clamp-3 whitespace-pre-wrap text-sm text-stone-600">
                  {comm.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
