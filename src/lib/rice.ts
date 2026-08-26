export type FeatureStatus =
  | "idea"
  | "en_evaluacion"
  | "priorizada"
  | "en_desarrollo"
  | "lanzada";

export interface Feature {
  id: string;
  title: string;
  description: string;
  category: string;
  status: FeatureStatus;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  riceScore: number;
}

export const STATUS_OPTIONS: { value: FeatureStatus; label: string }[] = [
  { value: "idea", label: "Idea" },
  { value: "en_evaluacion", label: "En evaluación" },
  { value: "priorizada", label: "Priorizada" },
  { value: "en_desarrollo", label: "En desarrollo" },
  { value: "lanzada", label: "Lanzada" },
];

export const IMPACT_OPTIONS: { value: number; label: string }[] = [
  { value: 0.25, label: "Mínimo (0.25)" },
  { value: 0.5, label: "Bajo (0.5)" },
  { value: 1, label: "Medio (1)" },
  { value: 2, label: "Alto (2)" },
  { value: 3, label: "Masivo (3)" },
];

export const CONFIDENCE_OPTIONS: { value: number; label: string }[] = [
  { value: 0.5, label: "Baja (0.5)" },
  { value: 0.8, label: "Media (0.8)" },
  { value: 1.0, label: "Alta (1.0)" },
];

export const CATEGORY_SUGGESTIONS = [
  "Onboarding",
  "Checkout",
  "Activación",
  "Retención",
  "Notificaciones",
  "Performance",
];

export function calculateRiceScore(
  reach: number,
  impact: number,
  confidence: number,
  effort: number,
): number {
  return (reach * impact * confidence) / effort;
}

export function statusLabel(status: FeatureStatus): string {
  return STATUS_OPTIONS.find((option) => option.value === status)?.label ?? status;
}
