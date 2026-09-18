"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const bookingRequestSchema = z.object({
  firstName: z.string().min(1, "El nombre es obligatorio").max(80),
  lastName: z.string().min(1, "Los apellidos son obligatorios").max(80),
  email: z.email("Email no válido"),
  phone: z.string().max(40).optional(),
  country: z.string().max(80).optional(),
  market: z.enum(["US", "CHINA", "GERMANY", "OTHER"]),
  packageId: z.string().min(1, "Selecciona un paquete"),
  requestedStartDate: z.string().min(1, "Indica una fecha de salida"),
  partySize: z.enum(["SOLO", "PAREJA", "GRUPO"]),
  pax: z.coerce.number().int().min(1).max(20),
  message: z.string().max(2000).optional(),
});

export type BookingFormState = { error?: string };

export async function createBookingRequest(
  _prevState: BookingFormState,
  formData: FormData,
): Promise<BookingFormState> {
  const parsed = bookingRequestSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos no válidos" };
  }

  const data = parsed.data;

  const pkg = await prisma.package.findUnique({ where: { id: data.packageId } });
  if (!pkg || !pkg.active) {
    return { error: "El paquete seleccionado no está disponible" };
  }

  const customer = await prisma.customer.upsert({
    where: { email: data.email },
    update: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone || undefined,
      country: data.country || undefined,
      market: data.market,
    },
    create: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || undefined,
      country: data.country || undefined,
      market: data.market,
      source: "Web",
    },
  });

  await prisma.booking.create({
    data: {
      customerId: customer.id,
      packageId: pkg.id,
      requestedStartDate: new Date(data.requestedStartDate),
      partySize: data.partySize,
      pax: data.pax,
      estimatedTotal: Number(pkg.basePricePerson) * data.pax,
      message: data.message || undefined,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/reservas");
  redirect("/reservar/gracias");
}

export async function updateBookingStatus(bookingId: string, status: string) {
  const session = await auth();
  if (!session?.user) throw new Error("No autorizado");

  const parsedStatus = z
    .enum(["PENDING", "CONTACTED", "CONFIRMED", "CANCELLED", "COMPLETED"])
    .parse(status);

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: parsedStatus },
  });

  revalidatePath("/admin");
  revalidatePath("/admin/reservas");
  revalidatePath(`/admin/reservas/${bookingId}`);
}
