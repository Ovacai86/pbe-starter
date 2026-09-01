"use client";

import { useEffect, useMemo, useState } from "react";
import { FeatureForm } from "@/components/FeatureForm";
import { FeatureList } from "@/components/FeatureList";
import { RiceRankingDialog } from "@/components/RiceRankingDialog";
import { ImpactEffortDialog } from "@/components/ImpactEffortDialog";
import { supabase } from "@/lib/supabase";
import type { Feature, NewFeatureInput } from "@/lib/rice";

interface FeatureRow {
  id: string;
  title: string;
  description: string;
  category: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  rice_score: number;
  created_at: string;
}

type SortOrder = "oldest" | "newest";

function toFeature(row: FeatureRow): Feature {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    reach: row.reach,
    impact: row.impact,
    confidence: row.confidence,
    effort: row.effort,
    riceScore: row.rice_score,
    createdAt: row.created_at,
  };
}

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("oldest");
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isMatrixOpen, setIsMatrixOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadFeatures() {
      const { data, error } = await supabase
        .from("features")
        .select("*")
        .order("created_at", { ascending: true });

      if (!isMounted) return;

      if (error) {
        setLoadError(
          "No pudimos cargar las features. Intenta recargar la página.",
        );
      } else {
        setFeatures((data as FeatureRow[]).map(toFeature));
      }
      setIsLoading(false);
    }

    loadFeatures();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleAddFeature(input: NewFeatureInput) {
    const { data, error } = await supabase
      .from("features")
      .insert(input)
      .select()
      .single();

    if (error) {
      throw error;
    }

    setFeatures((prev) => [...prev, toFeature(data as FeatureRow)]);
  }

  const sortedFeatures = useMemo(() => {
    const sorted = [...features].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
    return sortOrder === "oldest" ? sorted : sorted.reverse();
  }, [features, sortOrder]);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 bg-white p-8 dark:bg-zinc-950">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Capturar feature
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Registra una idea con sus datos de priorización RICE.
        </p>
      </div>

      <FeatureForm onAddFeature={handleAddFeature} />

      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Features capturadas ({features.length})
          </h2>
          <div className="flex items-center gap-2">
            <label htmlFor="sortOrder" className="sr-only">
              Ordenar por
            </label>
            <select
              id="sortOrder"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-700"
            >
              <option value="oldest">Más antigua primero</option>
              <option value="newest">Más nueva primero</option>
            </select>
            <button
              type="button"
              onClick={() => setIsRankingOpen(true)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Ver ranking RICE
            </button>
            <button
              type="button"
              onClick={() => setIsMatrixOpen(true)}
              className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Ver matriz Impacto/Esfuerzo
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Cargando features...
            </p>
          </div>
        ) : loadError ? (
          <div className="rounded-xl border border-dashed border-red-300 p-10 text-center dark:border-red-800">
            <p className="text-sm text-red-600 dark:text-red-400">
              {loadError}
            </p>
          </div>
        ) : (
          <FeatureList features={sortedFeatures} />
        )}
      </div>

      <RiceRankingDialog
        features={features}
        open={isRankingOpen}
        onClose={() => setIsRankingOpen(false)}
      />

      <ImpactEffortDialog
        features={features}
        open={isMatrixOpen}
        onClose={() => setIsMatrixOpen(false)}
      />
    </main>
  );
}
