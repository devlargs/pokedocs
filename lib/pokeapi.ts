import { idFromResourceUrl } from "@/lib/format";

const API_BASE = "https://pokeapi.co/api/v2";
const ARTWORK_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

/** PokeAPI data is effectively immutable, so cache aggressively and refresh daily. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

export type NamedResource = { name: string; url: string };

export type PokemonSummary = {
  id: number;
  name: string;
  artwork: string;
};

export type PokemonStat = {
  name: string;
  value: number;
};

export type PokemonDetail = {
  id: number;
  name: string;
  artwork: string;
  types: string[];
  abilities: string[];
  stats: PokemonStat[];
  height: number;
  weight: number;
};

export type PokemonSpecies = {
  flavorText: string | null;
  genus: string | null;
  habitat: string | null;
  isLegendary: boolean;
  isMythical: boolean;
};

type ListResponse = { count: number; results: NamedResource[] };

type PokemonResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: NamedResource }[];
  abilities: { is_hidden: boolean; ability: NamedResource }[];
  stats: { base_stat: number; stat: NamedResource }[];
};

type SpeciesResponse = {
  is_legendary: boolean;
  is_mythical: boolean;
  habitat: NamedResource | null;
  genera: { genus: string; language: NamedResource }[];
  flavor_text_entries: {
    flavor_text: string;
    language: NamedResource;
  }[];
};

export function artworkUrl(id: number): string {
  return `${ARTWORK_BASE}/${id}.png`;
}

async function getJson<T>(path: string): Promise<T | null> {
  const response = await fetch(`${API_BASE}${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `PokeAPI request failed: ${path} responded ${response.status}`,
    );
  }

  return (await response.json()) as T;
}

/**
 * The national dex in one request. `limit` is intentionally larger than the
 * current species count so new generations appear without a code change.
 */
export async function getPokemonList(): Promise<PokemonSummary[]> {
  const data = await getJson<ListResponse>("/pokemon?limit=20000&offset=0");

  if (!data) {
    return [];
  }

  return data.results.map((result) => {
    const id = idFromResourceUrl(result.url);
    return { id, name: result.name, artwork: artworkUrl(id) };
  });
}

export async function getPokemon(name: string): Promise<PokemonDetail | null> {
  const data = await getJson<PokemonResponse>(
    `/pokemon/${encodeURIComponent(name)}`,
  );

  if (!data) {
    return null;
  }

  return {
    id: data.id,
    name: data.name,
    artwork: artworkUrl(data.id),
    height: data.height,
    weight: data.weight,
    types: data.types
      .slice()
      .sort((a, b) => a.slot - b.slot)
      .map((entry) => entry.type.name),
    abilities: data.abilities.map((entry) => entry.ability.name),
    stats: data.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  };
}

/**
 * Species data carries the Pokédex blurb. Forms such as `deoxys-attack` have no
 * species of their own, so a miss here is expected and non-fatal.
 */
export async function getPokemonSpecies(
  name: string,
): Promise<PokemonSpecies | null> {
  const data = await getJson<SpeciesResponse>(
    `/pokemon-species/${encodeURIComponent(name)}`,
  );

  if (!data) {
    return null;
  }

  const flavor = data.flavor_text_entries.find(
    (entry) => entry.language.name === "en",
  );
  const genus = data.genera.find((entry) => entry.language.name === "en");

  return {
    // Flavor text is stored with hard line breaks and form feeds from the games.
    flavorText: flavor ? flavor.flavor_text.replace(/[\n\f\r]+/g, " ") : null,
    genus: genus ? genus.genus : null,
    habitat: data.habitat ? data.habitat.name : null,
    isLegendary: data.is_legendary,
    isMythical: data.is_mythical,
  };
}
