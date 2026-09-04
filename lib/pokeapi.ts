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

const ITEM_SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items";

/** The 18 battle types, in the order the official effectiveness chart uses. */
export const TYPE_ORDER = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export type BattleType = (typeof TYPE_ORDER)[number];

/** `multipliers[attacking][defending]` is the damage multiplier. */
export type TypeChart = Record<string, Record<string, number>>;

type TypeResponse = {
  damage_relations: {
    double_damage_to: NamedResource[];
    half_damage_to: NamedResource[];
    no_damage_to: NamedResource[];
  };
};

export function multiplierFor(
  chart: TypeChart,
  attacking: string,
  defending: string,
): number {
  return chart[attacking]?.[defending] ?? 1;
}

/**
 * Builds the full 18x18 chart from each attacking type's damage relations.
 * Anything the API does not call out explicitly deals neutral damage.
 */
export async function getTypeChart(): Promise<TypeChart> {
  const rows = await Promise.all(
    TYPE_ORDER.map(async (attacking) => {
      const row: Record<string, number> = {};
      for (const defending of TYPE_ORDER) {
        row[defending] = 1;
      }

      const data = await getJson<TypeResponse>(`/type/${attacking}`);

      if (data) {
        for (const entry of data.damage_relations.double_damage_to) {
          row[entry.name] = 2;
        }
        for (const entry of data.damage_relations.half_damage_to) {
          row[entry.name] = 0.5;
        }
        for (const entry of data.damage_relations.no_damage_to) {
          row[entry.name] = 0;
        }
      }

      return [attacking, row] as const;
    }),
  );

  return Object.fromEntries(rows);
}

export type Berry = {
  id: number;
  name: string;
  growthTime: number;
  size: number;
  smoothness: number;
  firmness: string | null;
  naturalGiftType: string | null;
  naturalGiftPower: number;
  dominantFlavor: string | null;
  sprite: string;
};

type BerryResponse = {
  id: number;
  name: string;
  growth_time: number;
  size: number;
  smoothness: number;
  // A few berries (kee, maranga, hopo, roseli) leave these unset in the API.
  firmness: NamedResource | null;
  natural_gift_power: number;
  natural_gift_type: NamedResource | null;
  flavors: { potency: number; flavor: NamedResource }[];
  item: NamedResource;
};

export async function getBerries(): Promise<Berry[]> {
  const list = await getJson<ListResponse>("/berry?limit=200");

  if (!list) {
    return [];
  }

  const berries = await Promise.all(
    list.results.map((result) =>
      getJson<BerryResponse>(`/berry/${result.name}`),
    ),
  );

  return berries
    .filter((berry) => berry !== null)
    .map((berry) => {
      // A berry's strongest flavour is what determines which nature dislikes it.
      const strongest = berry.flavors
        .filter((entry) => entry.potency > 0)
        .sort((a, b) => b.potency - a.potency)[0];

      return {
        id: berry.id,
        name: berry.name,
        growthTime: berry.growth_time,
        size: berry.size,
        smoothness: berry.smoothness,
        firmness: berry.firmness ? berry.firmness.name : null,
        naturalGiftType: berry.natural_gift_type
          ? berry.natural_gift_type.name
          : null,
        naturalGiftPower: berry.natural_gift_power,
        dominantFlavor: strongest ? strongest.flavor.name : null,
        sprite: `${ITEM_SPRITE_BASE}/${berry.item.name}.png`,
      };
    });
}

export type ItemSummary = { id: number; name: string };

export type ItemDetail = {
  id: number;
  name: string;
  cost: number;
  flingPower: number | null;
  category: string;
  effect: string | null;
  attributes: string[];
  heldBy: string[];
  sprite: string;
};

type ItemResponse = {
  id: number;
  name: string;
  cost: number;
  fling_power: number | null;
  category: NamedResource;
  attributes: NamedResource[];
  effect_entries: {
    effect: string;
    short_effect: string;
    language: NamedResource;
  }[];
  held_by_pokemon: { pokemon: NamedResource }[];
};

export function itemSpriteUrl(name: string): string {
  return `${ITEM_SPRITE_BASE}/${name}.png`;
}

export async function getItemList(): Promise<ItemSummary[]> {
  const data = await getJson<ListResponse>("/item?limit=20000&offset=0");

  if (!data) {
    return [];
  }

  return data.results.map((result) => ({
    id: idFromResourceUrl(result.url),
    name: result.name,
  }));
}

export async function getItem(name: string): Promise<ItemDetail | null> {
  const data = await getJson<ItemResponse>(`/item/${encodeURIComponent(name)}`);

  if (!data) {
    return null;
  }

  const english = data.effect_entries.find(
    (entry) => entry.language.name === "en",
  );

  return {
    id: data.id,
    name: data.name,
    cost: data.cost,
    flingPower: data.fling_power,
    category: data.category.name,
    effect: english ? english.short_effect || english.effect : null,
    attributes: data.attributes.map((entry) => entry.name),
    heldBy: data.held_by_pokemon.map((entry) => entry.pokemon.name),
    sprite: itemSpriteUrl(data.name),
  };
}
