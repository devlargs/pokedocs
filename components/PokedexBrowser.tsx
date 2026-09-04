"use client";

import { useMemo, useState } from "react";
import PokemonCard from "@/components/PokemonCard";
import { displayName } from "@/lib/format";

const PAGE_SIZE = 60;

export type DexEntry = { id: number; name: string };

export default function PokedexBrowser({ entries }: { entries: DexEntry[] }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (!needle) {
      return entries;
    }

    return entries.filter(
      (entry) =>
        entry.name.includes(needle) || String(entry.id).startsWith(needle),
    );
  }, [entries, query]);

  const shown = matches.slice(0, visible);

  return (
    <div>
      <div className="mx-auto max-w-md">
        <label htmlFor="dex-search" className="sr-only">
          Search the Pokédex by name or number
        </label>
        <input
          id="dex-search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisible(PAGE_SIZE);
          }}
          placeholder="Search by name or dex number…"
          className="focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm focus:ring-1 focus:outline-none"
        />
        <p
          className="mt-2 text-center text-sm text-gray-500"
          aria-live="polite"
        >
          {matches.length} of {entries.length} Pokémon
        </p>
      </div>

      {matches.length === 0 ? (
        <p className="mt-16 text-center text-gray-500">
          Nothing in the dex matches “{displayName(query.trim())}”.
        </p>
      ) : (
        <>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {shown.map((entry) => (
              <PokemonCard key={entry.id} id={entry.id} name={entry.name} />
            ))}
          </div>

          {visible < matches.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((count) => count + PAGE_SIZE)}
                className="hover:border-brand-500 hover:text-brand-600 rounded-md border border-gray-300 bg-white px-8 py-3 font-medium text-gray-700 shadow-sm transition"
              >
                Load more ({matches.length - visible} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
