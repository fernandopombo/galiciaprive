import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { BookingForm, type BookingCopy } from "@/components/booking-form";
import { Logo } from "@/components/logo";
import { ROUTE_LABELS } from "@/lib/labels";

const copy: BookingCopy = {
  firstName: "Nombre",
  lastName: "Apellidos",
  email: "Email",
  phone: "Teléfono",
  country: "País de residencia",
  market: "Mercado",
  marketOptions: {
    us: "Estados Unidos",
    china: "China",
    germany: "Alemania",
    other: "Otro",
  },
  route: "Ruta",
  date: "Fecha de salida deseada",
  format: "Formato",
  formatOptions: {
    solo: "Individual",
    couple: "Pareja",
    group: "Grupo",
  },
  pax: "Nº de personas",
  message: "¿Qué busca en este viaje?",
  submit: "Enviar solicitud",
  submitting: "Enviando…",
  disclaimer:
    "Su solicitud no genera ningún cargo. Nuestro equipo le contactará para confirmar disponibilidad y detalles antes de formalizar la reserva.",
  routeLabels: ROUTE_LABELS,
  days: "días",
};

export default async function ReservarPage({
  searchParams,
}: PageProps<"/reservar">) {
  const params = await searchParams;
  const preselected =
    typeof params.paquete === "string" ? params.paquete : undefined;

  const packages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { name: "asc" },
    select: { id: true, name: true, route: true, durationDays: true },
  });

  return (
    <main className="flex-1">
      <header className="border-b border-sand-200 bg-sand-50">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
          <Link href="/">
            <Logo tagline="Camino de Santiago" />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-serif text-4xl leading-tight text-sea-900">
          Solicitud de reserva
        </h1>
        <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-sea-900/70">
          Cuéntenos qué ruta y qué fechas tiene en mente. Diseñaremos una
          propuesta a medida y le contactaremos personalmente.
        </p>

        <div className="mt-12 border-t border-sand-200 pt-10">
          <BookingForm
            packages={packages}
            defaultPackageId={preselected}
            locale="es"
            copy={copy}
          />
        </div>
      </section>
    </main>
  );
}
