import Link from "next/link";

export default function GraciasPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-light text-stone-900">
          Hemos recibido su solicitud
        </h1>
        <p className="mt-4 text-stone-600">
          Nuestro equipo revisará su petición y le contactará en las próximas 24
          horas para afinar el itinerario y confirmar disponibilidad.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full border border-stone-900 px-6 py-3 text-sm font-medium text-stone-900 transition hover:bg-stone-900 hover:text-white"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
