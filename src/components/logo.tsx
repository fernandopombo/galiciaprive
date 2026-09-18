type LogoProps = {
  className?: string;
  wordmark?: string;
  tagline?: string;
  tone?: "color" | "light";
};

// Monograma GP: la G en el verde del campo gallego y la P en el azul del
// Atlántico, compartiendo el asta vertical.
export function LogoMark({
  className = "h-9 w-9",
  tone = "color",
}: {
  className?: string;
  tone?: "color" | "light";
}) {
  const green = tone === "light" ? "#7FA98C" : "#2F6B4C";
  const blue = tone === "light" ? "#9FC7D1" : "#0E4C5E";

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label="Galicia Privé"
    >
      <path
        d="M29 16.2A11.4 11.4 0 1 0 29 31.8V24.4h-6.4"
        stroke={green}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29 39.5V10.5h5.6a6.6 6.6 0 0 1 0 13.2H29"
        stroke={blue}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  wordmark = "Galicia Privé",
  tagline,
  tone = "color",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3.5 ${className}`}>
      <LogoMark className="h-9 w-9 shrink-0" tone={tone} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[1rem] tracking-[0.2em] uppercase ${
            tone === "light" ? "text-sand-50" : "text-sea-700"
          }`}
        >
          {wordmark}
        </span>
        {tagline ? (
          <span
            className={`mt-1.5 text-[0.6rem] tracking-[0.3em] uppercase ${
              tone === "light" ? "text-field-500" : "text-field-700"
            }`}
          >
            {tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
