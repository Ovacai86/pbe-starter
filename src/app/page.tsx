"use client";

import { useEffect, useState } from "react";
import { FeatureForm } from "@/components/FeatureForm";
import { FeatureList } from "@/components/FeatureList";
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
}

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
  };
}

export default function Home() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadFeatures() {
      const { data, error } = await supabase
        .from("features")
        .select("*")
        .order("created_at", { ascending: false });

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

    setFeatures((prev) => [toFeature(data as FeatureRow), ...prev]);
  }

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
        <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Features capturadas ({features.length})
        </h2>
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
          <FeatureList features={features} />
        )}
      </div>
    </main>
  );
}
