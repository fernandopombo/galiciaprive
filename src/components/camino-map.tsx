"use client";

import { useState } from "react";
import { CAMINOS, GALICIA_OUTLINE, SANTIAGO } from "@/lib/caminos";

type Labels = {
  entry: string;
  stages: string;
  weOperate: string;
  hint: string;
};

// El punto por el que entra cada ruta es el primer vértice de su trazado.
function entryPoint(path: string) {
  const [, x, y] = path.match(/^M\s+([\d.]+)\s+([\d.]+)/) ?? [];
  return { x: Number(x), y: Number(y) };
}

// Mapa de Galicia con las diez rutas oficiales convergiendo en Santiago.
// El contorno y los trazados salen de coordenadas reales, así que se reconoce
// de un vistazo por dónde entra cada Camino y cuál recorremos nosotros.
export function CaminoMap({
  labels,
  nameKey = "name",
}: {
  labels: Labels;
  nameKey?: "name" | "nameEn" | "nameCn";
}) {
  const [active, setActive] = useState<string | null>(null);
  const current = CAMINOS.find((c) => c.id === active) ?? null;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <div className="relative">
        <svg
          viewBox="6 3 80 90"
          className="w-full"
          role="img"
          aria-label="Mapa de los Caminos de Santiago a su paso por Galicia"
        >
          {/* Contorno de Galicia. */}
          <path
            d={GALICIA_OUTLINE}
            fill="#0E4C5E"
            fillOpacity="0.07"
            stroke="#0E4C5E"
            strokeOpacity="0.35"
            strokeWidth="0.6"
            strokeLinejoin="round"
          />

          {CAMINOS.map((camino) => {
            const dim = active !== null && active !== camino.id;
            return (
              <path
                key={camino.id}
                d={camino.path}
                fill="none"
                stroke={camino.operated ? "#0E4C5E" : "#2F6B4C"}
                strokeWidth={active === camino.id ? 1.8 : camino.operated ? 1.2 : 0.9}
                strokeOpacity={dim ? 0.2 : camino.operated ? 1 : 0.7}
                strokeLinecap="round"
                strokeDasharray={camino.operated ? undefined : "2.5 2"}
                className="cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                onMouseEnter={() => setActive(camino.id)}
                onMouseLeave={() => setActive(null)}
              />
            );
          })}

          {/* Por dónde entra cada ruta. */}
          {CAMINOS.filter((c) => c.id !== "fisterra").map((camino) => {
            const { x, y } = entryPoint(camino.path);
            const on = active === camino.id;
            return (
              <circle
                key={`entry-${camino.id}`}
                cx={x}
                cy={y}
                r={on ? 1.5 : 0.9}
                fill={camino.operated ? "#0E4C5E" : "#2F6B4C"}
                fillOpacity={active !== null && !on ? 0.2 : 1}
                className="transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              />
            );
          })}

          {/* Santiago, punto de convergencia. */}
          <circle cx={SANTIAGO[0]} cy={SANTIAGO[1]} r="3" fill="#FDFBF7" />
          <circle cx={SANTIAGO[0]} cy={SANTIAGO[1]} r="1.9" fill="#0E4C5E" />
          <text
            x={SANTIAGO[0] - 1.2}
            y={SANTIAGO[1] - 3.4}
            textAnchor="end"
            className="fill-sea-900 font-serif"
            style={{ fontSize: "3.4px", letterSpacing: "0.1px" }}
          >
            Santiago
          </text>

          {/* El nombre del punto de entrada, sólo con la ruta activa. */}
          {current && current.id !== "fisterra"
            ? (() => {
                const { x, y } = entryPoint(current.path);
                const toLeft = x > 50;
                return (
                  <text
                    x={toLeft ? x - 2.4 : x + 2.4}
                    y={y + 1}
                    textAnchor={toLeft ? "end" : "start"}
                    className="fill-sea-900/70"
                    style={{ fontSize: "2.9px" }}
                  >
                    {current.entry}
                  </text>
                );
              })()
            : null}

        </svg>
        <p className="mt-4 text-[0.72rem] text-sea-900/45">{labels.hint}</p>
      </div>

      <ul className="flex flex-col justify-center gap-0 self-center">
        {CAMINOS.map((camino) => {
          const on = active === camino.id;
          return (
            <li key={camino.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(camino.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(camino.id)}
                onBlur={() => setActive(null)}
                className={`flex w-full items-baseline justify-between gap-4 border-b border-sand-200 py-3 text-left transition-colors duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  on ? "text-sea-900" : "text-sea-900/55"
                }`}
              >
                <span className="flex items-baseline gap-2.5">
                  <span
                    aria-hidden="true"
                    className={`inline-block h-[3px] w-5 shrink-0 rounded-full transition-colors duration-400 ${
                      camino.operated ? "bg-sea-700" : "bg-field-700/50"
                    }`}
                  />
                  <span className="font-serif text-[1.05rem] leading-tight">
                    {camino[nameKey]}
                  </span>
                  {camino.operated ? (
                    <span className="shrink-0 rounded-full bg-field-700/10 px-2 py-0.5 text-[0.58rem] uppercase tracking-[0.18em] text-field-700">
                      {labels.weOperate}
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 font-mono text-[0.78rem] tabular-nums">
                  {camino.kmInGalicia} km
                </span>
              </button>
            </li>
          );
        })}

        <li
          className="mt-6 min-h-[4.5rem] text-[0.85rem] leading-relaxed text-sea-900/70"
          aria-live="polite"
        >
          {current ? (
            <>
              <span className="text-sea-900/45">{labels.entry}: </span>
              {current.entry}
              <span className="mx-2 text-sea-900/25">·</span>
              <span className="text-sea-900/45">{labels.stages}: </span>
              {current.stagesCount}
            </>
          ) : null}
        </li>
      </ul>
    </div>
  );
}
