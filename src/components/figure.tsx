import { MEDIA } from "@/lib/media";

// Punto de luz estable por hueco, derivado del propio nombre.
function placement(slot: string) {
  let hash = 0;
  for (const char of slot) hash = (hash * 31 + char.charCodeAt(0)) % 997;
  return { x: 15 + (hash % 70), y: 8 + ((hash >> 3) % 60) };
}

// Hueco fotográfico. Con imagen, la sirve a sangre; sin ella, deja una
// superficie tonal con el brief escrito, de modo que la página se lea como
// pendiente de fotografía y no como rota.
export function Figure({
  slot,
  className = "",
  ratio = "4 / 5",
  priority = false,
}: {
  slot: keyof typeof MEDIA;
  className?: string;
  ratio?: string;
  priority?: boolean;
}) {
  const media = MEDIA[slot];

  return (
    <figure
      className={`group relative isolate overflow-hidden bg-sea-900 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {media.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.src}
          alt={media.alt ?? ""}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0" aria-hidden="true">
          {/* Cada hueco recibe un origen de luz distinto para que la página no
              parezca el mismo bloque repetido mientras falta la fotografía. */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(130% 110% at ${placement(slot).x}% ${placement(slot).y}%, #17697A 0%, #0E4C5E 42%, #08313D 100%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(75% 85% at ${100 - placement(slot).x}% ${100 - placement(slot).y}%, rgba(47,107,76,0.55) 0%, transparent 70%)`,
            }}
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sea-900/80 to-transparent p-5 pt-14">
            <p className="text-[0.58rem] uppercase tracking-[0.28em] text-field-500">
              Fotografía pendiente
            </p>
            <p className="mt-2 max-w-sm text-[0.82rem] leading-relaxed text-sand-50/85">
              {media.brief}
            </p>
          </div>
        </div>
      )}
    </figure>
  );
}
