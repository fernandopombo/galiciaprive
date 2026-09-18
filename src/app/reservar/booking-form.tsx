"use client";

import { useActionState } from "react";
import { createBookingRequest, type BookingFormState } from "@/app/actions/bookings";
import { ROUTE_LABELS } from "@/lib/labels";

type PackageOption = {
  id: string;
  name: string;
  route: string;
  durationDays: number;
};

const inputClass =
  "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-900";

export function BookingForm({
  packages,
  defaultPackageId,
}: {
  packages: PackageOption[];
  defaultPackageId?: string;
}) {
  const [state, formAction, pending] = useActionState<BookingFormState, FormData>(
    createBookingRequest,
    {},
  );

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-stone-700">
          Nombre
          <input name="firstName" required className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Apellidos
          <input name="lastName" required className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Email
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Teléfono
          <input name="phone" className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          País de residencia
          <input name="country" className={inputClass} />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Mercado
          <select name="market" defaultValue="US" className={inputClass}>
            <option value="US">Estados Unidos</option>
            <option value="CHINA">China</option>
            <option value="GERMANY">Alemania</option>
            <option value="OTHER">Otro</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium text-stone-700">
        Ruta
        <select
          name="packageId"
          required
          defaultValue={defaultPackageId ?? packages[0]?.id}
          className={inputClass}
        >
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {ROUTE_LABELS[pkg.route]} — {pkg.name} ({pkg.durationDays} días)
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm font-medium text-stone-700">
          Fecha de salida deseada
          <input
            name="requestedStartDate"
            type="date"
            required
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Formato
          <select name="partySize" defaultValue="PAREJA" className={inputClass}>
            <option value="SOLO">Individual</option>
            <option value="PAREJA">Pareja</option>
            <option value="GRUPO">Grupo</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Nº de personas
          <input
            name="pax"
            type="number"
            min={1}
            max={20}
            defaultValue={2}
            required
            className={inputClass}
          />
        </label>
      </div>

      <label className="block text-sm font-medium text-stone-700">
        ¿Qué busca en este viaje?
        <textarea name="message" rows={4} className={inputClass} />
      </label>

      {state.error ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-50"
      >
        {pending ? "Enviando…" : "Enviar solicitud"}
      </button>
      <p className="text-xs text-stone-500">
        Su solicitud no genera ningún cargo. Nuestro equipo le contactará para
        confirmar disponibilidad y detalles antes de formalizar la reserva.
      </p>
    </form>
  );
}
