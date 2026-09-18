"use client";

import { useActionState } from "react";
import {
  addNote,
  updateCustomer,
  type CustomerFormState,
  type NoteFormState,
} from "@/app/actions/customers";
import {
  logCommunication,
  type CommunicationFormState,
} from "@/app/actions/communications";

const inputClass =
  "mt-1 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-stone-900";

const buttonClass =
  "rounded-full bg-stone-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-stone-700 disabled:opacity-50";

type CustomerData = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  country: string | null;
  market: string;
  preferredLanguage: string | null;
  source: string | null;
  tags: string[];
};

export function CustomerEditForm({ customer }: { customer: CustomerData }) {
  const [state, formAction, pending] = useActionState<CustomerFormState, FormData>(
    updateCustomer,
    {},
  );

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="customerId" value={customer.id} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-stone-700">
          Nombre
          <input
            name="firstName"
            defaultValue={customer.firstName}
            required
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Apellidos
          <input
            name="lastName"
            defaultValue={customer.lastName}
            required
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Teléfono
          <input
            name="phone"
            defaultValue={customer.phone ?? ""}
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          País
          <input
            name="country"
            defaultValue={customer.country ?? ""}
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Mercado
          <select
            name="market"
            defaultValue={customer.market}
            className={inputClass}
          >
            <option value="US">Estados Unidos</option>
            <option value="CHINA">China</option>
            <option value="GERMANY">Alemania</option>
            <option value="OTHER">Otro</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Idioma preferido
          <input
            name="preferredLanguage"
            defaultValue={customer.preferredLanguage ?? ""}
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Origen del lead
          <input
            name="source"
            defaultValue={customer.source ?? ""}
            className={inputClass}
          />
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Etiquetas (separadas por comas)
          <input
            name="tags"
            defaultValue={customer.tags.join(", ")}
            className={inputClass}
          />
        </label>
      </div>

      {state.error ? (
        <p className="text-sm text-rose-700">{state.error}</p>
      ) : null}
      {state.success ? (
        <p className="text-sm text-emerald-700">Ficha actualizada.</p>
      ) : null}

      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Guardando…" : "Guardar ficha"}
      </button>
    </form>
  );
}

export function NoteForm({ customerId }: { customerId: string }) {
  const [state, formAction, pending] = useActionState<NoteFormState, FormData>(
    addNote,
    {},
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="customerId" value={customerId} />
      <textarea
        name="body"
        rows={3}
        required
        placeholder="Añadir una nota de seguimiento…"
        className={inputClass}
      />
      {state.error ? <p className="text-sm text-rose-700">{state.error}</p> : null}
      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Guardando…" : "Añadir nota"}
      </button>
    </form>
  );
}

export function CommunicationForm({
  customerId,
  bookings,
}: {
  customerId: string;
  bookings: { id: string; label: string }[];
}) {
  const [state, formAction, pending] = useActionState<
    CommunicationFormState,
    FormData
  >(logCommunication, {});

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="customerId" value={customerId} />
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block text-sm font-medium text-stone-700">
          Canal
          <select name="channel" defaultValue="EMAIL" className={inputClass}>
            <option value="EMAIL">Email</option>
            <option value="PHONE">Teléfono</option>
            <option value="WHATSAPP">WhatsApp</option>
            <option value="OTHER">Otro</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Dirección
          <select name="direction" defaultValue="OUTBOUND" className={inputClass}>
            <option value="OUTBOUND">Enviada</option>
            <option value="INBOUND">Recibida</option>
          </select>
        </label>
        <label className="block text-sm font-medium text-stone-700">
          Reserva asociada
          <select name="bookingId" defaultValue="" className={inputClass}>
            <option value="">Ninguna</option>
            {bookings.map((booking) => (
              <option key={booking.id} value={booking.id}>
                {booking.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium text-stone-700">
        Asunto
        <input name="subject" className={inputClass} />
      </label>

      <label className="block text-sm font-medium text-stone-700">
        Mensaje
        <textarea name="body" rows={5} required className={inputClass} />
      </label>

      <label className="flex items-center gap-2 text-sm text-stone-700">
        <input type="checkbox" name="send" className="h-4 w-4" />
        Enviar por email al cliente (requiere proveedor de email configurado)
      </label>

      {state.error ? <p className="text-sm text-rose-700">{state.error}</p> : null}
      {state.success ? (
        <p className="text-sm text-emerald-700">{state.success}</p>
      ) : null}

      <button type="submit" disabled={pending} className={buttonClass}>
        {pending ? "Guardando…" : "Registrar comunicación"}
      </button>
    </form>
  );
}
