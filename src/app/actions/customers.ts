"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

const customerUpdateSchema = z.object({
  customerId: z.string().min(1),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  phone: z.string().max(40).optional(),
  country: z.string().max(80).optional(),
  market: z.enum(["US", "CHINA", "GERMANY", "OTHER"]),
  preferredLanguage: z.string().max(40).optional(),
  source: z.string().max(80).optional(),
  tags: z.string().max(300).optional(),
});

export type CustomerFormState = { error?: string; success?: boolean };

export async function updateCustomer(
  _prevState: CustomerFormState,
  formData: FormData,
): Promise<CustomerFormState> {
  const session = await auth();
  if (!session?.user) return { error: "No autorizado" };

  const parsed = customerUpdateSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos no válidos" };
  }

  const { customerId, tags, ...data } = parsed.data;

  await prisma.customer.update({
    where: { id: customerId },
    data: {
      ...data,
      phone: data.phone || null,
      country: data.country || null,
      preferredLanguage: data.preferredLanguage || null,
      source: data.source || null,
      tags: tags
        ? tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    },
  });

  revalidatePath(`/admin/clientes/${customerId}`);
  revalidatePath("/admin/clientes");
  return { success: true };
}

const noteSchema = z.object({
  customerId: z.string().min(1),
  body: z.string().min(1, "La nota no puede estar vacía").max(5000),
});

export type NoteFormState = { error?: string; success?: boolean };

export async function addNote(
  _prevState: NoteFormState,
  formData: FormData,
): Promise<NoteFormState> {
  const session = await auth();
  if (!session?.user) return { error: "No autorizado" };

  const parsed = noteSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Datos no válidos" };
  }

  await prisma.note.create({
    data: {
      customerId: parsed.data.customerId,
      authorId: session.user.id,
      body: parsed.data.body,
    },
  });

  revalidatePath(`/admin/clientes/${parsed.data.customerId}`);
  return { success: true };
}
