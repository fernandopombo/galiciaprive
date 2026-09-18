import Link from "next/link";

type Tone = "dark" | "light";

// Etiqueta microscópica que precede a los titulares.
export function Eyebrow({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.24em] ${
        tone === "light"
          ? "bg-sand-50/10 text-sand-50/80 ring-1 ring-sand-50/20"
          : "bg-field-700/[0.07] text-field-700 ring-1 ring-field-700/15"
      }`}
    >
      {children}
    </span>
  );
}

// El icono nunca va suelto junto al texto: vive en su propio círculo, a ras del
// borde interior del botón, y se desplaza con el hover.
export function Cta({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const base =
    tone === "light"
      ? "bg-sand-50 text-sea-900 hover:bg-white"
      : "bg-sea-700 text-sand-50 hover:bg-sea-900";
  const circle = tone === "light" ? "bg-sea-900/[0.08]" : "bg-sand-50/15";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 rounded-full py-2 pl-7 pr-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] ${base} ${className}`}
    >
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1 group-hover:-translate-y-[1px] group-hover:scale-105 ${circle}`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
          <path
            d="M4.5 11.5 11.5 4.5M11.5 4.5H6M11.5 4.5V10"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

// Doble bisel: una carcasa exterior con filete y, dentro, el núcleo con su
// propio fondo y un radio concéntrico. Evita que las tarjetas floten planas.
export function Panel({
  children,
  className = "",
  as: Shell = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article";
}) {
  return (
    <Shell
      className={`rounded-[2rem] bg-sea-900/[0.035] p-1.5 ring-1 ring-sea-900/[0.06] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-sea-900/[0.06] ${className}`}
    >
      <div className="flex h-full flex-col rounded-[calc(2rem-0.375rem)] bg-sand-50 p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)] sm:p-8">
        {children}
      </div>
    </Shell>
  );
}
