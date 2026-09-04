import type { Metadata } from "next";
import Link from "next/link";
import { GITHUB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Utilities",
  description:
    "Planned Pokédocs tools (items, gym badges and berries), and what is already available today.",
};

const PLANNED = [
  {
    title: "Items",
    body: "Every held item, evolution stone and TM, with the effect text from the games and which Pokémon can use it.",
  },
  {
    title: "Gym badges",
    body: "Badges by region and generation, the leader who awards each one and the level cap it lifts.",
  },
  {
    title: "Berries",
    body: "Growth time, firmness, flavour profile and the stat each berry affects when eaten in battle.",
  },
  {
    title: "Type matchups",
    body: "The full 18-by-18 effectiveness chart, filterable to a single attacking or defending type.",
  },
];

export default function UtilitiesPage() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Utilities
        </h1>
        <p className="mt-4 leading-relaxed text-gray-600">
          Pokédocs currently covers the Pokémon themselves. The reference tables
          below are the next things planned. Each one is a thin layer over an
          endpoint PokéAPI already exposes.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/pokedex"
            className="bg-brand-600 hover:bg-brand-700 rounded-md px-6 py-3 font-medium text-white transition"
          >
            Browse the Pokédex
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Help build these
          </a>
        </div>
      </div>

      <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
        {PLANNED.map((item) => (
          <li
            key={item.title}
            className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6"
          >
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-medium text-gray-900">
                {item.title}
              </h2>
              <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-gray-600 uppercase">
                Planned
              </span>
            </div>
            <p className="mt-2 leading-relaxed text-gray-600">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
