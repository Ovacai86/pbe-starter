"use client";

import { useState } from "react";
import { FeatureForm } from "@/components/FeatureForm";
import { FeatureList } from "@/components/FeatureList";
import type { Feature } from "@/lib/rice";

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([]);

  function handleAddFeature(feature: Feature) {
    setFeatures((prev) => [...prev, feature]);
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 bg-white p-8 dark:bg-zinc-950">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Capturar feature
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Registra una idea con sus datos de priorización RICE. Por ahora los
          datos viven solo en esta sesión, todavía no se guardan.
        </p>
      </div>

      <FeatureForm onAddFeature={handleAddFeature} />

      <div>
        <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Features capturadas ({features.length})
        </h2>
        <FeatureList features={features} />
      </div>
    </main>
  );
}
