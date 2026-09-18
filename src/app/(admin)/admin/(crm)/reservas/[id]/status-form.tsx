"use client";

import { useTransition } from "react";
import { updateBookingStatus } from "@/app/actions/bookings";
import { STATUS_LABELS } from "@/lib/labels";

const STATUSES = ["PENDING", "CONTACTED", "CONFIRMED", "COMPLETED", "CANCELLED"];

export function StatusForm({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((status) => (
        <button
          key={status}
          type="button"
          disabled={pending || status === currentStatus}
          onClick={() =>
            startTransition(() => {
              void updateBookingStatus(bookingId, status);
            })
          }
          className={`rounded-full border px-3 py-1.5 text-sm transition disabled:cursor-default ${
            status === currentStatus
              ? "border-stone-900 bg-stone-900 text-white"
              : "border-stone-300 text-stone-600 hover:border-stone-900 disabled:opacity-50"
          }`}
        >
          {STATUS_LABELS[status]}
        </button>
      ))}
    </div>
  );
}
