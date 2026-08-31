export interface Feature {
  id: string;
  title: string;
  description: string;
  category: string;
  reach: number;
  impact: number;
  confidence: number;
  effort: number;
  riceScore: number;
}

export type NewFeatureInput = Omit<Feature, "id" | "riceScore">;

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

