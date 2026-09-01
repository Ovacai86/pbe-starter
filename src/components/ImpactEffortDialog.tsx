"use client";

import { useEffect, useMemo, useRef } from "react";
import { type Feature } from "@/lib/rice";

const IMPACT_DOMAIN_MAX = 3.3;
const IMPACT_THRESHOLD = 1;

function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];
}

function clampPercent(value: number, min = 15, max = 85): number {
  return Math.min(max, Math.max(min, value));
}

export function ImpactEffortDialog({
  features,
  open,
  onClose,
}: {
  features: Feature[];
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const effortDomainMax = useMemo(() => {
    const maxEffort = features.reduce(
      (max, feature) => Math.max(max, feature.effort),
      1,
    );
    return maxEffort * 1.2;
  }, [features]);

  const effortThreshold = useMemo(
    () => median(features.map((feature) => feature.effort)),
    [features],
  );

  const effortLinePercent = clampPercent(
    (effortThreshold / effortDomainMax) * 100,
  );
  const impactLinePercent = clampPercent(
    (IMPACT_THRESHOLD / IMPACT_DOMAIN_MAX) * 100,
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      className="w-full max-w-3xl rounded-xl border border-zinc-200 bg-white p-0 shadow-xl backdrop:bg-black/40 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Matriz Impacto vs. Esfuerzo
          </h2>
          <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
            Ubica cada feature según su impacto y el esfuerzo que requiere.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg px-2 py-1 text-sm text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>

      <div className="px-6 py-5">
        {features.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Todavía no hay features para ubicar en la matriz.
          </p>
        ) : (
          <>
            <div className="flex gap-2">
              <span className="flex items-center text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                Impacto
              </span>
              <div className="relative aspect-[4/3] w-full rounded-lg border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/20">
                <span className="pointer-events-none absolute left-3 top-3 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  Quick Wins
                </span>
                <span className="pointer-events-none absolute right-3 top-3 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  Big Bets
                </span>
                <span className="pointer-events-none absolute bottom-3 left-3 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  Fill-ins
                </span>
                <span className="pointer-events-none absolute bottom-3 right-3 text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
                  Time Sinks
                </span>

                <div
                  className="pointer-events-none absolute inset-y-0 border-l border-dashed border-zinc-300 dark:border-zinc-700"
                  style={{ left: `${effortLinePercent}%` }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 border-t border-dashed border-zinc-300 dark:border-zinc-700"
                  style={{ bottom: `${impactLinePercent}%` }}
                />

                {features.map((feature) => {
                  const xPercent = Math.min(
                    100,
                    (feature.effort / effortDomainMax) * 100,
                  );
                  const yPercent = Math.min(
                    100,
                    (feature.impact / IMPACT_DOMAIN_MAX) * 100,
                  );
                  return (
                    <div
                      key={feature.id}
                      className="group absolute -translate-x-1/2 translate-y-1/2"
                      style={{ left: `${xPercent}%`, bottom: `${yPercent}%` }}
                    >
                      <button
                        type="button"
                        className="flex h-6 w-6 items-center justify-center"
                        aria-label={`${feature.title}: impacto ${feature.impact}, esfuerzo ${feature.effort} persona-meses, score RICE ${feature.riceScore.toFixed(2)}`}
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-[#2a78d6] ring-2 ring-white transition group-hover:scale-125 group-focus-within:scale-125 dark:bg-[#3987e5] dark:ring-zinc-950" />
                      </button>
                      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 w-max max-w-[220px] -translate-x-1/2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-within:opacity-100 dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="font-medium text-zinc-900 dark:text-zinc-50">
                          {feature.title}
                        </p>
                        <p className="text-zinc-500 dark:text-zinc-400">
                          Impacto {feature.impact} · Esfuerzo {feature.effort}
                        </p>
                        <p className="font-mono text-zinc-500 dark:text-zinc-400">
                          RICE {feature.riceScore.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <p className="mt-2 text-center text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
              Esfuerzo
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}
