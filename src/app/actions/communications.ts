"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

const communicationSchema = z.object({
  customerId: z.string().min(1),
  bookingId: z.string().optional(),
  channel: z.enum(["EMAIL", "PHONE", "WHATSAPP", "OTHER"]),
  direction: z.enum(["OUTBOUND", "INBOUND"]),
  subject: z.string().max(200).optional(),
  body: z.string().min(1, "El mensaje no puede estar vacío").max(10000),
  send: z.string().optional(),
});

export type CommunicationFormState = {
  error?: string;
  success?: string;
};

export async function logCommunication(
  _prevState: CommunicationFormState,
  formData: FormData,
): Promise<CommunicationFormState> {
  const session = await auth();
  if (!session?.user) return { error: "No autorizado" };

  const parsed = communicationSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos no válidos" };
  }

  const data = parsed.data;
  const customer = await prisma.customer.findUnique({
    where: { id: data.customerId },
  });
  if (!customer) return { error: "Cliente no encontrado" };

  let notice = "Comunicación registrada.";

  const shouldSend =
    data.send === "on" && data.channel === "EMAIL" && data.direction === "OUTBOUND";

  if (shouldSend) {
    const result = await sendEmail({
      to: customer.email,
      subject: data.subject || "ULTRAVIP",
      body: data.body,
    });
    notice = result.sent
      ? "Email enviado y registrado."
      : `Registrada, pero no enviada: ${result.reason}`;
  }

  await prisma.communication.create({
    data: {
      customerId: data.customerId,
      bookingId: data.bookingId || null,
      authorId: session.user.id,
      channel: data.channel,
      direction: data.direction,
      subject: data.subject || null,
      body: data.body,
    },
  });

  revalidatePath(`/admin/clientes/${data.customerId}`);
  revalidatePath("/admin/comunicaciones");
  if (data.bookingId) revalidatePath(`/admin/reservas/${data.bookingId}`);

  return { success: notice };
}
