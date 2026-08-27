"use client";

import { useId, useState } from "react";
import {
  CATEGORY_SUGGESTIONS,
  CONFIDENCE_OPTIONS,
  IMPACT_OPTIONS,
  calculateRiceScore,
  type Feature,
} from "@/lib/rice";

interface FormState {
  title: string;
  description: string;
  category: string;
  reach: string;
  impact: string;
  confidence: string;
  effort: string;
}

const initialState: FormState = {
  title: "",
  description: "",
  category: "",
  reach: "",
  impact: "",
  confidence: "",
  effort: "",
};

type FormErrors = Partial<Record<keyof FormState, string>>;

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};

  if (!form.title.trim()) {
    errors.title = "El título es obligatorio.";
  }

  if (!form.description.trim()) {
    errors.description = "La descripción es obligatoria.";
  }

  if (!form.category.trim()) {
    errors.category = "La categoría es obligatoria.";
  }

  const reach = Number(form.reach);
  if (!form.reach.trim() || Number.isNaN(reach) || reach <= 0) {
    errors.reach = "Ingresa un alcance mayor a 0.";
  }

  if (!form.impact) {
    errors.impact = "Selecciona un nivel de impacto.";
  }

  if (!form.confidence) {
    errors.confidence = "Selecciona un nivel de confianza.";
  }

  const effort = Number(form.effort);
  if (!form.effort.trim() || Number.isNaN(effort) || effort <= 0) {
    errors.effort = "Ingresa un esfuerzo mayor a 0.";
  }

  return errors;
}

const inputClasses =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-700";

const labelClasses =
  "block text-sm font-medium text-zinc-700 dark:text-zinc-300";

const errorClasses = "mt-1 text-sm text-red-600 dark:text-red-400";

export function FeatureForm({
  onAddFeature,
}: {
  onAddFeature: (feature: Feature) => void;
}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const categoryListId = useId();

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const reach = Number(form.reach);
    const impact = Number(form.impact);
    const confidence = Number(form.confidence);
    const effort = Number(form.effort);

    const feature: Feature = {
      id: crypto.randomUUID(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category.trim(),
      reach,
      impact,
      confidence,
      effort,
      riceScore: calculateRiceScore(reach, impact, confidence, effort),
    };

    onAddFeature(feature);
    setForm(initialState);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <div>
        <label htmlFor="title" className={labelClasses}>
          Título
        </label>
        <input
          id="title"
          type="text"
          className={inputClasses}
          value={form.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Ej: Checkout con un solo clic"
        />
        {errors.title && <p className={errorClasses}>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Descripción
        </label>
        <textarea
          id="description"
          rows={3}
          className={inputClasses}
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Describe brevemente la feature y el problema que resuelve"
        />
        {errors.description && (
          <p className={errorClasses}>{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className={labelClasses}>
          Categoría
        </label>
        <input
          id="category"
          type="text"
          list={categoryListId}
          className={inputClasses}
          value={form.category}
          onChange={(e) => updateField("category", e.target.value)}
          placeholder="Ej: onboarding"
        />
        <datalist id={categoryListId}>
          {CATEGORY_SUGGESTIONS.map((suggestion) => (
            <option key={suggestion} value={suggestion} />
          ))}
        </datalist>
        {errors.category && <p className={errorClasses}>{errors.category}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reach" className={labelClasses}>
            Reach (personas / trimestre)
          </label>
          <input
            id="reach"
            type="number"
            min={1}
            className={inputClasses}
            value={form.reach}
            onChange={(e) => updateField("reach", e.target.value)}
            placeholder="Ej: 1500"
          />
          {errors.reach && <p className={errorClasses}>{errors.reach}</p>}
        </div>

        <div>
          <label htmlFor="effort" className={labelClasses}>
            Effort (persona-meses)
          </label>
          <input
            id="effort"
            type="number"
            min={0.1}
            step={0.1}
            className={inputClasses}
            value={form.effort}
            onChange={(e) => updateField("effort", e.target.value)}
            placeholder="Ej: 2"
          />
          {errors.effort && <p className={errorClasses}>{errors.effort}</p>}
        </div>

        <div>
          <label htmlFor="impact" className={labelClasses}>
            Impact
          </label>
          <select
            id="impact"
            className={inputClasses}
            value={form.impact}
            onChange={(e) => updateField("impact", e.target.value)}
          >
            <option value="">Selecciona un nivel...</option>
            {IMPACT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.impact && <p className={errorClasses}>{errors.impact}</p>}
        </div>

        <div>
          <label htmlFor="confidence" className={labelClasses}>
            Confidence
          </label>
          <select
            id="confidence"
            className={inputClasses}
            value={form.confidence}
            onChange={(e) => updateField("confidence", e.target.value)}
          >
            <option value="">Selecciona un nivel...</option>
            {CONFIDENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.confidence && (
            <p className={errorClasses}>{errors.confidence}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="self-start rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Agregar feature
      </button>
    </form>
  );
}
