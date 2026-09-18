type Tone = "color" | "light";

// La marca principal es tipográfica: el nombre, sin símbolo. El azul y el
// verde viven en el resto de la identidad.
export function Logo({
  className = "",
  tagline,
  tone = "color",
  size = "md",
}: {
  className?: string;
  tagline?: string;
  tone?: Tone;
  size?: "sm" | "md";
}) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`font-serif uppercase ${
          size === "sm"
            ? "text-[0.9rem] tracking-[0.24em]"
            : "text-[1.15rem] tracking-[0.26em]"
        } ${tone === "light" ? "text-sand-50" : "text-sea-700"}`}
      >
        Galicia Privé
      </span>
      {tagline ? (
        <span
          className={`mt-2 text-[0.6rem] tracking-[0.34em] uppercase ${
            tone === "light" ? "text-field-500" : "text-field-700"
          }`}
        >
          {tagline}
        </span>
      ) : null}
    </span>
  );
}

// Solo para usos reducidos donde no cabe el nombre: favicon, avatar, sello.
export function LogoMark({
  className = "h-9 w-9",
  tone = "color",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-md font-serif text-[0.7rem] tracking-[0.05em] ${
        tone === "light"
          ? "bg-sand-50 text-sea-700"
          : "bg-sea-700 text-sand-50"
      } ${className}`}
      role="img"
      aria-label="Galicia Privé"
    >
      GP
    </span>
  );
}
