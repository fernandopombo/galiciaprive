import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/format";
import { MARKET_LABELS } from "@/lib/labels";

export default async function ClientesPage() {
  const customers = await prisma.customer.findMany({
    include: { bookings: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-light text-stone-900">Clientes</h1>
        <p className="mt-1 text-sm text-stone-500">
          {customers.length} {customers.length === 1 ? "ficha" : "fichas"}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {customers.length === 0 ? (
          <p className="px-6 py-8 text-sm text-stone-500">
            Todavía no hay clientes.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-[0.1em] text-stone-500">
              <tr className="border-b border-stone-200">
                <th className="px-6 py-3 font-medium">Cliente</th>
                <th className="px-6 py-3 font-medium">Origen</th>
                <th className="px-6 py-3 font-medium">Mercado</th>
                <th className="px-6 py-3 font-medium">País</th>
                <th className="px-6 py-3 font-medium">Reservas</th>
                <th className="px-6 py-3 font-medium">Valor total</th>
                <th className="px-6 py-3 font-medium">Alta</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => {
                const value = customer.bookings
                  .filter((b) => b.status !== "CANCELLED")
                  .reduce((sum, b) => sum + Number(b.estimatedTotal ?? 0), 0);
                return (
                  <tr
                    key={customer.id}
                    className="border-b border-stone-100 last:border-0"
                  >
                    <td className="px-6 py-3">
                      <Link
                        href={`/admin/clientes/${customer.id}`}
                        className="font-medium text-stone-900 hover:underline"
                      >
                        {customer.firstName} {customer.lastName}
                      </Link>
                      <p className="text-xs text-stone-500">{customer.email}</p>
                    </td>
                    <td className="px-6 py-3">
                      {customer.source ? (
                        <span className="rounded-full border border-stone-300 px-2.5 py-1 font-mono text-xs text-stone-600">
                          {customer.source}
                        </span>
                      ) : (
                        <span className="text-stone-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {MARKET_LABELS[customer.market]}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {customer.country ?? "—"}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {customer.bookings.length}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {formatCurrency(value)}
                    </td>
                    <td className="px-6 py-3 text-stone-600">
                      {formatDate(customer.createdAt)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
