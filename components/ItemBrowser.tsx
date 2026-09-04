"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { displayName } from "@/lib/format";
import { itemSpriteUrl } from "@/lib/pokeapi";

const PAGE_SIZE = 60;
const FALLBACK_SPRITE = "/images/pokeball.png";

export type ItemEntry = { id: number; name: string };

export default function ItemBrowser({ items }: { items: ItemEntry[] }) {
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase().replace(/\s+/g, "-");
    return needle ? items.filter((item) => item.name.includes(needle)) : items;
  }, [items, query]);

  const shown = matches.slice(0, visible);

  return (
    <div>
      <div className="mx-auto max-w-md">
        <label htmlFor="item-search" className="sr-only">
          Search items by name
        </label>
        <input
          id="item-search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setVisible(PAGE_SIZE);
          }}
          placeholder="Search items…"
          className="focus:border-brand-500 focus:ring-brand-500 w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-gray-900 shadow-sm focus:ring-1 focus:outline-none"
        />
        <p
          className="mt-2 text-center text-sm text-gray-500"
          aria-live="polite"
        >
          {matches.length} of {items.length} items
        </p>
      </div>

      {matches.length === 0 ? (
        <p className="mt-16 text-center text-gray-500">
          No item matches that name.
        </p>
      ) : (
        <>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {shown.map((item) => (
              <li key={item.id}>
                <ItemTile name={item.name} />
              </li>
            ))}
          </ul>

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

function ItemTile({ name }: { name: string }) {
  // Plenty of items have no sprite in the PokeAPI set; fall back rather than 404.
  const [src, setSrc] = useState(itemSpriteUrl(name));

  return (
    <Link
      href={`/resources/items/${name}`}
      className="hover:border-brand-500 focus-visible:outline-brand-600 flex h-full items-center gap-3 rounded-lg border border-gray-200 bg-white p-3 transition hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <Image
        src={src}
        onError={() => setSrc(FALLBACK_SPRITE)}
        alt=""
        width={32}
        height={32}
        loading="lazy"
        unoptimized
        className="h-8 w-8 shrink-0 object-contain"
      />
      <span className="truncate text-sm text-gray-900">
        {displayName(name)}
      </span>
    </Link>
  );
}
