import { statusLabel, type Feature } from "@/lib/rice";

export function FeatureList({ features }: { features: Feature[] }) {
  if (features.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 p-10 text-center dark:border-zinc-700">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Todavía no capturaste ninguna feature. Completa el formulario para
          agregar la primera.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-900/40 dark:text-zinc-400">
          <tr>
            <th className="px-4 py-3 font-medium">Título</th>
            <th className="px-4 py-3 font-medium">Categoría</th>
            <th className="px-4 py-3 font-medium">Estado</th>
            <th className="px-4 py-3 font-medium text-right">Score RICE</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {features.map((feature) => (
            <tr key={feature.id}>
              <td className="px-4 py-3">
                <p className="font-medium text-zinc-900 dark:text-zinc-50">
                  {feature.title}
                </p>
                <p className="max-w-md truncate text-zinc-500 dark:text-zinc-400">
                  {feature.description}
                </p>
              </td>
              <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                {feature.category}
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {statusLabel(feature.status)}
                </span>
              </td>
              <td className="px-4 py-3 text-right font-mono font-medium text-zinc-900 dark:text-zinc-50">
                {feature.riceScore.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
