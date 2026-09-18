"use client";

import { useActionState } from "react";
import {
  createBookingRequest,
  type BookingFormState,
} from "@/app/actions/bookings";

export type BookingCopy = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  market: string;
  marketOptions: { us: string; china: string; germany: string; other: string };
  route: string;
  date: string;
  format: string;
  formatOptions: { solo: string; couple: string; group: string };
  pax: string;
  message: string;
  submit: string;
  submitting: string;
  disclaimer: string;
  routeLabels: Record<string, string>;
  days: string;
};

type PackageOption = {
  id: string;
  name: string;
  route: string;
  durationDays: number;
};

const inputClass =
  "mt-1.5 w-full rounded-sm border border-sand-200 bg-white px-3.5 py-2.5 text-sm text-sea-900 outline-none transition focus:border-sea-700";

const labelClass = "block text-sm text-sea-900/70";

export function BookingForm({
  packages,
  defaultPackageId,
  locale,
  fixedMarket,
  copy,
}: {
  packages: PackageOption[];
  defaultPackageId?: string;
  locale: "es" | "us" | "cn";
  fixedMarket?: "US" | "CHINA";
  copy: BookingCopy;
}) {
  const [state, formAction, pending] = useActionState<BookingFormState, FormData>(
    createBookingRequest,
    {},
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="locale" value={locale} />
      {fixedMarket ? (
        <input type="hidden" name="market" value={fixedMarket} />
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          {copy.firstName}
          <input name="firstName" required className={inputClass} />
        </label>
        <label className={labelClass}>
          {copy.lastName}
          <input name="lastName" required className={inputClass} />
        </label>
        <label className={labelClass}>
          {copy.email}
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className={labelClass}>
          {copy.phone}
          <input name="phone" className={inputClass} />
        </label>
        <label className={labelClass}>
          {copy.country}
          <input name="country" className={inputClass} />
        </label>
        {fixedMarket ? null : (
          <label className={labelClass}>
            {copy.market}
            <select name="market" defaultValue="US" className={inputClass}>
              <option value="US">{copy.marketOptions.us}</option>
              <option value="CHINA">{copy.marketOptions.china}</option>
              <option value="GERMANY">{copy.marketOptions.germany}</option>
              <option value="OTHER">{copy.marketOptions.other}</option>
            </select>
          </label>
        )}
      </div>

      <label className={labelClass}>
        {copy.route}
        <select
          name="packageId"
          required
          defaultValue={defaultPackageId ?? packages[0]?.id}
          className={inputClass}
        >
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {copy.routeLabels[pkg.route] ?? pkg.name} · {pkg.durationDays}{" "}
              {copy.days}
            </option>
          ))}
        </select>
      </label>

      <div className="grid gap-5 sm:grid-cols-3">
        <label className={labelClass}>
          {copy.date}
          <input
            name="requestedStartDate"
            type="date"
            required
            className={inputClass}
          />
        </label>
        <label className={labelClass}>
          {copy.format}
          <select name="partySize" defaultValue="PAREJA" className={inputClass}>
            <option value="SOLO">{copy.formatOptions.solo}</option>
            <option value="PAREJA">{copy.formatOptions.couple}</option>
            <option value="GRUPO">{copy.formatOptions.group}</option>
          </select>
        </label>
        <label className={labelClass}>
          {copy.pax}
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

      <label className={labelClass}>
        {copy.message}
        <textarea name="message" rows={5} className={inputClass} />
      </label>

      {state.error ? (
        <p className="rounded-sm border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-sea-700 px-8 py-3.5 text-sm text-white transition hover:bg-sea-900 disabled:opacity-50"
      >
        {pending ? copy.submitting : copy.submit}
      </button>
      <p className="text-xs leading-relaxed text-sea-900/50">{copy.disclaimer}</p>
    </form>
  );
}
