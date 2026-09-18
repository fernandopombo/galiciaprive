import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BookingForm } from "./booking-form";

export default async function ReservarPage({
  searchParams,
}: PageProps<"/reservar">) {
  const params = await searchParams;
  const preselected = typeof params.paquete === "string" ? params.paquete : undefined;

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, route: true, durationDays: true },
  });

  return (
    <main className="flex-1">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link
            href="/"
            className="text-lg font-semibold tracking-[0.2em] text-stone-900"
          >
            ULTRAVIP
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-14">
        <h1 className="text-3xl font-light text-stone-900">
          Solicitud de reserva
        </h1>
        <p className="mt-3 text-stone-600">
          Cuéntenos qué ruta y qué fechas tiene en mente. Diseñaremos una
          propuesta a medida y le contactaremos personalmente.
        </p>

        <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-8">
          <BookingForm packages={packages} defaultPackageId={preselected} />
        </div>
      </section>
    </main>
  );
}
