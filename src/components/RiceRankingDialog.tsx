"use client";

import { useEffect, useRef } from "react";
import { type Feature } from "@/lib/rice";

export function RiceRankingDialog({
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

  const ranked = [...features].sort((a, b) => b.riceScore - a.riceScore);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      className="w-full max-w-2xl rounded-xl border border-zinc-200 bg-white p-0 shadow-xl backdrop:bg-black/40 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Ranking por score RICE
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-2 py-1 text-sm text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          aria-label="Cerrar"
        >
          ✕
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto px-6 py-4">
        {ranked.length === 0 ? (
          <p className="py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Todavía no hay features para mostrar en el ranking.
          </p>
        ) : (
          <ol className="flex flex-col gap-3">
            {ranked.map((feature, index) => (
              <li
                key={feature.id}
                className="flex items-center gap-4 rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800"
              >
                <span className="w-6 shrink-0 text-center font-mono text-sm text-zinc-400 dark:text-zinc-500">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-zinc-900 dark:text-zinc-50">
                    {feature.title}
                  </p>
                  <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                    {feature.category}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                  {feature.riceScore.toFixed(2)}
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </dialog>
  );
}
