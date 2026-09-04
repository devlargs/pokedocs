import type { Metadata } from "next";
import PokedexBrowser from "@/components/PokedexBrowser";
import { getPokemonList } from "@/lib/pokeapi";

export const metadata: Metadata = {
  title: "Pokédex",
  description:
    "Browse and search the full National Pokédex: every Pokémon by name or dex number.",
};

export default async function PokedexPage() {
  const pokemon = await getPokemonList();
  // Artwork URLs are derived from the id on the client, so they stay out of the payload.
  const entries = pokemon.map(({ id, name }) => ({ id, name }));

  return (
    <section className="dex-backdrop min-h-full">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          National Pokédex
        </h1>
        <p className="mx-auto mt-3 mb-8 max-w-xl text-center text-gray-600">
          Every Pokémon PokéAPI knows about. Start typing to narrow it down.
        </p>
        <PokedexBrowser entries={entries} />
      </div>
    </section>
  );
}
