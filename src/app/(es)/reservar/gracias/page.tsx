import Link from "next/link";
import { Logo } from "@/components/logo";

export default function GraciasPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-28">
      <div className="max-w-lg text-center">
        <Logo className="justify-center" tagline="Camino de Santiago" />
        <h1 className="mt-10 font-serif text-4xl leading-tight text-sea-900">
          Hemos recibido su solicitud
        </h1>
        <p className="mt-5 text-[0.95rem] leading-relaxed text-sea-900/70">
          Nuestro equipo la revisará y le contactará en las próximas 24 horas
          para afinar el itinerario y confirmar disponibilidad.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block border-b border-sea-700 pb-1 text-sm text-sea-700 transition hover:border-sea-900 hover:text-sea-900"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
