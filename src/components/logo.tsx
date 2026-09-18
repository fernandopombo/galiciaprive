type LogoProps = {
  className?: string;
  wordmark?: string;
  tagline?: string;
  tone?: "color" | "light";
};

// Vieira del Camino: las varillas abren del verde del campo gallego al azul
// del Atlántico, de dentro hacia la costa.
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      role="img"
      aria-label="Galicia Privé"
    >
      <defs>
        <linearGradient id="gp-shell" x1="4" y1="40" x2="44" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2F6B4C" />
          <stop offset="0.55" stopColor="#1C6068" />
          <stop offset="1" stopColor="#0E4C5E" />
        </linearGradient>
      </defs>
      <path
        d="M24 43.5c-9.2 0-17-5.6-19.4-13.3a1.6 1.6 0 0 1 .9-1.9l4.6-2a1.5 1.5 0 0 0 .8-1.9l-1.6-4.6a1.6 1.6 0 0 1 .7-1.9l4.4-2.4a1.5 1.5 0 0 0 .7-1.8l-1.2-3.8a1.6 1.6 0 0 1 1-2C18.1 6.3 21 5.6 24 5.6s5.9.7 9.1 2.3a1.6 1.6 0 0 1 1 2l-1.2 3.8a1.5 1.5 0 0 0 .7 1.8l4.4 2.4c.7.4 1 1.2.7 1.9l-1.6 4.6a1.5 1.5 0 0 0 .8 1.9l4.6 2c.7.3 1.1 1.1.9 1.9C41 37.9 33.2 43.5 24 43.5Z"
        stroke="url(#gp-shell)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M24 6.5v36M16.4 8.8 12.6 40M31.6 8.8 35.4 40M9.6 13.2 7.4 33.6M38.4 13.2l2.2 20.4"
        stroke="url(#gp-shell)"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
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
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`text-[0.95rem] font-medium tracking-[0.22em] uppercase ${
            tone === "light" ? "text-white" : "text-[#0E4C5E]"
          }`}
        >
          {wordmark}
        </span>
        {tagline ? (
          <span
            className={`mt-1.5 text-[0.6rem] tracking-[0.3em] uppercase ${
              tone === "light" ? "text-white/60" : "text-[#2F6B4C]"
            }`}
          >
            {tagline}
          </span>
        ) : null}
      </span>
    </span>
  );
}
