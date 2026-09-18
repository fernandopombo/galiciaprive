"use client";

import { useEffect, useRef, useState } from "react";
import { HERO_CLIPS, HERO_POSTER } from "@/lib/hero-media";

// Hero a pantalla completa: los clips se encadenan con un fundido para recorrer
// distintas etapas del Camino. Sin clips configurados cae en un fondo tratado.
export function VideoHero({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    videoRefs.current[active]?.play().catch(() => {
      // Si el navegador bloquea la reproducción automática se queda el póster.
    });
  }, [active, reducedMotion]);

  const showVideo = HERO_CLIPS.length > 0 && !reducedMotion;

  return (
    <section className="relative isolate flex min-h-[92svh] flex-col">
      <div className="absolute inset-0 -z-10 overflow-hidden bg-sea-900">
        {showVideo
          ? HERO_CLIPS.map((clip, index) => (
              <video
                key={clip.src}
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ${
                  index === active ? "opacity-100" : "opacity-0"
                }`}
                src={clip.src}
                poster={HERO_POSTER ?? undefined}
                muted
                playsInline
                preload={index === 0 ? "auto" : "none"}
                aria-hidden="true"
                onEnded={() => setActive((current) => (current + 1) % HERO_CLIPS.length)}
              />
            ))
          : null}

        {!showVideo && HERO_POSTER ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={HERO_POSTER}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : null}

        {!showVideo && !HERO_POSTER ? (
          <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_15%,#14606F_0%,#0E4C5E_45%,#08313D_100%)]">
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(80%_100%_at_30%_100%,rgba(47,107,76,0.55)_0%,transparent_70%)]" />
          </div>
        ) : null}

        {/* Degradados que garantizan la legibilidad del texto sobre el vídeo. */}
        <div className="absolute inset-0 bg-gradient-to-b from-sea-900/70 via-sea-900/25 to-sea-900/85" />
      </div>

      {children}
    </section>
  );
}
