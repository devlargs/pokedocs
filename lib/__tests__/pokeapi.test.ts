import { afterEach, describe, expect, it, vi } from "vitest";
import { artworkUrl, getPokemon, getPokemonList } from "@/lib/pokeapi";

function mockFetch(status: number, body: unknown) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  });
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("artworkUrl", () => {
  it("points at the official artwork for the id", () => {
    expect(artworkUrl(25)).toContain("/official-artwork/25.png");
  });
});

describe("getPokemonList", () => {
  it("derives an id and artwork url for each entry", async () => {
    mockFetch(200, {
      count: 1,
      results: [
        { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
      ],
    });

    await expect(getPokemonList()).resolves.toEqual([
      { id: 1, name: "bulbasaur", artwork: artworkUrl(1) },
    ]);
  });
});

describe("getPokemon", () => {
  it("returns null for an unknown name rather than throwing", async () => {
    mockFetch(404, null);
    await expect(getPokemon("missingno")).resolves.toBeNull();
  });

  it("throws when the API fails outright", async () => {
    mockFetch(500, null);
    await expect(getPokemon("pikachu")).rejects.toThrow(/responded 500/);
  });

  it("orders types by slot and flattens nested resources", async () => {
    mockFetch(200, {
      id: 1,
      name: "bulbasaur",
      height: 7,
      weight: 69,
      types: [
        { slot: 2, type: { name: "poison", url: "" } },
        { slot: 1, type: { name: "grass", url: "" } },
      ],
      abilities: [
        { is_hidden: false, ability: { name: "overgrow", url: "" } },
        { is_hidden: true, ability: { name: "chlorophyll", url: "" } },
      ],
      stats: [{ base_stat: 45, stat: { name: "hp", url: "" } }],
    });

    const pokemon = await getPokemon("bulbasaur");

    expect(pokemon?.types).toEqual(["grass", "poison"]);
    expect(pokemon?.abilities).toEqual(["overgrow", "chlorophyll"]);
    expect(pokemon?.stats).toEqual([{ name: "hp", value: 45 }]);
  });
});
