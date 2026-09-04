import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TypeBadge from "@/components/TypeBadge";
import {
  displayName,
  formatDexNumber,
  formatHeight,
  formatWeight,
} from "@/lib/format";
import { getPokemon, getPokemonList, getPokemonSpecies } from "@/lib/pokeapi";

/** The highest base stat in the games, used as the shared scale for the bars. */
const MAX_BASE_STAT = 255;

const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Attack",
  "special-defense": "Sp. Defense",
  speed: "Speed",
};

type PageProps = { params: Promise<{ name: string }> };

/**
 * Prerender the first generation at build time; everything else is rendered on
 * first request and then cached, which keeps `next build` to a few seconds
 * instead of a thousand-plus API round trips.
 */
export async function generateStaticParams() {
  const pokemon = await getPokemonList();
  return pokemon.slice(0, 151).map((entry) => ({ name: entry.name }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  if (!pokemon) {
    return { title: "Not found" };
  }

  const species = await getPokemonSpecies(name);

  return {
    title: `${displayName(pokemon.name)} #${formatDexNumber(pokemon.id)}`,
    description:
      species?.flavorText ??
      `Base stats, typing and abilities for ${displayName(pokemon.name)}.`,
  };
}

export default async function PokemonPage({ params }: PageProps) {
  const { name } = await params;
  const pokemon = await getPokemon(name);

  if (!pokemon) {
    notFound();
  }

  // Alternate forms have no species record of their own; the page works without it.
  const species = await getPokemonSpecies(name);
  const total = pokemon.stats.reduce((sum, stat) => sum + stat.value, 0);

  return (
    <div className="container mx-auto px-6 py-10 lg:py-16">
      <Link
        href="/pokedex"
        className="hover:text-brand-600 mb-8 inline-flex items-center gap-1 text-sm text-gray-500 transition"
      >
        <span aria-hidden="true">&larr;</span> Back to the Pokédex
      </Link>

      <div className="grid gap-10 lg:grid-cols-3">
        <aside className="lg:col-span-1">
          <div className="dex-backdrop flex flex-col items-center rounded-2xl border border-gray-100 p-8">
            <Image
              src={pokemon.artwork}
              alt={displayName(pokemon.name)}
              width={320}
              height={320}
              priority
              className="h-56 w-56 object-contain drop-shadow-lg"
            />
            <p className="text-brand-500 mt-4 text-sm font-medium tracking-widest">
              #{formatDexNumber(pokemon.id)}
            </p>
            <h1 className="text-3xl font-bold text-gray-900">
              {displayName(pokemon.name)}
            </h1>
            {species?.genus && (
              <p className="mt-1 text-gray-500">{species.genus}</p>
            )}

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {pokemon.types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>

            {(species?.isLegendary || species?.isMythical) && (
              <p className="mt-4 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold tracking-wide text-amber-800 uppercase">
                {species.isMythical ? "Mythical" : "Legendary"}
              </p>
            )}
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-center">
            <Fact label="Height" value={formatHeight(pokemon.height)} />
            <Fact label="Weight" value={formatWeight(pokemon.weight)} />
          </dl>
        </aside>

        <div className="space-y-10 lg:col-span-2">
          <section>
            <h2 className="text-lg font-semibold text-gray-900">
              Pokédex entry
            </h2>
            <p className="mt-2 leading-relaxed text-gray-600">
              {species?.flavorText ??
                "No Pokédex entry is recorded for this form."}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">Abilities</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {pokemon.abilities.map((ability) => (
                <li
                  key={ability}
                  className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-700"
                >
                  {displayName(ability)}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Base stats
              </h2>
              <p className="text-sm text-gray-500">Total {total}</p>
            </div>
            <dl className="mt-4 space-y-3">
              {pokemon.stats.map((stat) => (
                <div
                  key={stat.name}
                  className="grid grid-cols-[7rem_3rem_1fr] items-center gap-3"
                >
                  <dt className="text-sm text-gray-600">
                    {STAT_LABELS[stat.name] ?? displayName(stat.name)}
                  </dt>
                  <dd className="text-right text-sm font-semibold text-gray-900 tabular-nums">
                    {stat.value}
                  </dd>
                  <dd
                    className="h-2.5 overflow-hidden rounded-full bg-gray-100"
                    role="img"
                    aria-label={`${stat.value} out of ${MAX_BASE_STAT}`}
                  >
                    <div
                      className="bg-brand-500 h-full rounded-full"
                      style={{
                        width: `${(stat.value / MAX_BASE_STAT) * 100}%`,
                      }}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 px-4 py-3">
      <dt className="text-xs tracking-wide text-gray-500 uppercase">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-gray-900">{value}</dd>
    </div>
  );
}
