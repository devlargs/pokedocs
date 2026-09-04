import type { Metadata } from "next";
import Link from "next/link";
import { displayName } from "@/lib/format";
import { getTypeChart, multiplierFor, TYPE_ORDER } from "@/lib/pokeapi";
import { typeStyle } from "@/lib/typeColors";

export const metadata: Metadata = {
  title: "Type matchups",
  description:
    "The full 18-by-18 Pokémon type effectiveness chart, showing every attacking and defending combination.",
};

const CELL_STYLES: Record<string, string> = {
  "2": "bg-emerald-100 text-emerald-800 font-semibold",
  "0.5": "bg-rose-100 text-rose-800 font-semibold",
  "0": "bg-gray-800 text-white font-semibold",
};

function cellLabel(multiplier: number): string {
  if (multiplier === 2) return "2";
  if (multiplier === 0.5) return "½";
  if (multiplier === 0) return "0";
  return "";
}

export default async function TypeChartPage() {
  const chart = await getTypeChart();

  return (
    <section className="container mx-auto px-6 py-12">
      <Link
        href="/resources"
        className="hover:text-brand-600 mb-8 inline-flex items-center gap-1 text-sm text-gray-500 transition"
      >
        <span aria-hidden="true">&larr;</span> Back to resources
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Type matchups
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        Rows are the attacking type, columns are the defending type. Blank cells
        deal normal damage.
      </p>

      <ul className="mt-6 flex flex-wrap gap-4 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <span className="inline-block h-4 w-6 rounded bg-emerald-100 ring-1 ring-emerald-200" />
          Super effective (2&times;)
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-4 w-6 rounded bg-rose-100 ring-1 ring-rose-200" />
          Not very effective (&frac12;&times;)
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-4 w-6 rounded bg-gray-800" />
          No effect (0&times;)
        </li>
      </ul>

      <div className="mt-8 overflow-x-auto">
        <table className="border-separate border-spacing-0 text-xs">
          <caption className="sr-only">
            Pokémon type effectiveness chart. Rows are attacking types, columns
            are defending types.
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky left-0 z-10 bg-white p-2 text-left"
              >
                <span className="sr-only">Attacking type</span>
                <span aria-hidden="true" className="text-gray-400">
                  ATK \ DEF
                </span>
              </th>
              {TYPE_ORDER.map((defending) => (
                <th key={defending} scope="col" className="p-1">
                  <span
                    className="block w-9 rounded px-1 py-1.5 text-center font-semibold uppercase"
                    style={typeStyle(defending)}
                    title={displayName(defending)}
                  >
                    {defending.slice(0, 3)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TYPE_ORDER.map((attacking) => (
              <tr key={attacking}>
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-white p-1 text-left"
                >
                  <span
                    className="block rounded px-2 py-1.5 font-semibold uppercase"
                    style={typeStyle(attacking)}
                  >
                    {displayName(attacking)}
                  </span>
                </th>
                {TYPE_ORDER.map((defending) => {
                  const multiplier = multiplierFor(chart, attacking, defending);
                  const label = cellLabel(multiplier);

                  return (
                    <td
                      key={defending}
                      className={`border border-white p-0 text-center ${
                        CELL_STYLES[String(multiplier)] ?? "bg-gray-50"
                      }`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center">
                        <span className="sr-only">
                          {displayName(attacking)} against{" "}
                          {displayName(defending)}:{" "}
                        </span>
                        {label || (
                          <span aria-hidden="true" className="text-gray-400">
                            &middot;
                          </span>
                        )}
                        <span className="sr-only">
                          {multiplier} times damage
                        </span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
