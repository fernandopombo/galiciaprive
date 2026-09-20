import { STAGES } from "@/lib/caminos";

// Perfil de etapas: cada barra dice a la vez cuánto se camina (ancho) y cuánto
// se sube (alto), que son las dos preguntas que hace todo el mundo.
export function StageProfile({
  caminoId,
  labels,
}: {
  caminoId: keyof typeof STAGES;
  labels: { km: string; peak: string; hardest: string };
}) {
  const stages = STAGES[caminoId];
  const totalKm = stages.reduce((sum, stage) => sum + stage.km, 0);
  const maxPeak = Math.max(...stages.map((stage) => stage.peak));

  // Altura en píxeles y no en porcentaje: las columnas crecen con su contenido,
  // así que un porcentaje se resolvería contra una altura automática y la barra
  // se quedaría en cero.
  const BAR_MAX = 168;
  const BAR_MIN = 38;
  const barHeight = (peak: number) =>
    Math.round(BAR_MIN + (BAR_MAX - BAR_MIN) * (peak / maxPeak));

  return (
    <div>
      <div className="flex items-end gap-[5px]">
        {stages.map((stage) => (
          <div
            key={`${stage.from}-${stage.to}`}
            className="group relative flex flex-col justify-end"
            style={{ flexGrow: stage.km, flexBasis: 0 }}
          >
            <span className="mb-1.5 text-center font-mono text-[0.65rem] tabular-nums text-sea-900/45">
              {stage.peak}
            </span>
            <div
              className={`rounded-t-[4px] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                stage.hard
                  ? "bg-field-700 group-hover:bg-field-500"
                  : "bg-sea-700/80 group-hover:bg-sea-700"
              }`}
              style={{ height: barHeight(stage.peak) }}
            />
          </div>
        ))}
      </div>

      <div className="mt-2 flex gap-[5px] border-t border-sand-200 pt-3">
        {stages.map((stage) => (
          <div
            key={`label-${stage.from}`}
            className="min-w-0"
            style={{ flexGrow: stage.km, flexBasis: 0 }}
          >
            <p className="truncate text-[0.7rem] leading-tight text-sea-900" title={stage.to}>
              {stage.to}
            </p>
            <p className="mt-0.5 font-mono text-[0.68rem] tabular-nums text-sea-900/45">
              {stage.km}
            </p>
          </div>
        ))}
      </div>

      <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-3 text-sm">
        <div>
          <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-sea-900/45">
            {labels.km}
          </dt>
          <dd className="mt-1 font-mono text-lg tabular-nums text-sea-900">
            {totalKm}
          </dd>
        </div>
        <div>
          <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-sea-900/45">
            {labels.peak}
          </dt>
          <dd className="mt-1 font-mono text-lg tabular-nums text-sea-900">
            {maxPeak} m
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-sea-900/45">
            {labels.hardest}
          </dt>
          <dd className="mt-1 text-[0.95rem] text-sea-900">
            {(() => {
              const hardest = stages.find((s) => s.hard) ?? stages[0];
              return `${hardest.from} — ${hardest.to}`;
            })()}
          </dd>
        </div>
      </dl>
    </div>
  );
}
