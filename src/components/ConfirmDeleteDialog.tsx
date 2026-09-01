"use client";

import { useEffect, useRef, useState } from "react";
import { type Feature } from "@/lib/rice";

export function ConfirmDeleteDialog({
  feature,
  onConfirm,
  onClose,
}: {
  feature: Feature | null;
  onConfirm: (feature: Feature) => Promise<void>;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (feature && !dialog.open) {
      setError(null);
      dialog.showModal();
    } else if (!feature && dialog.open) {
      dialog.close();
    }
  }, [feature]);

  async function handleConfirm() {
    if (!feature) return;
    setIsDeleting(true);
    setError(null);
    try {
      await onConfirm(feature);
    } catch {
      setError("No pudimos eliminar la feature. Intenta de nuevo.");
      setIsDeleting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={onClose}
      className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-0 shadow-xl backdrop:bg-black/40 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="px-6 py-5">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Eliminar feature
        </h2>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          ¿Seguro que querés eliminar{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-50">
            {feature?.title}
          </span>
          ? Esta acción no se puede deshacer.
        </p>

        {error && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </dialog>
  );
}
