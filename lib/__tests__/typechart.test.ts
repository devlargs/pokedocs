import { afterEach, describe, expect, it, vi } from "vitest";
import { getTypeChart, multiplierFor, TYPE_ORDER } from "@/lib/pokeapi";
import { BADGE_REGIONS } from "@/lib/badges";

afterEach(() => {
  vi.unstubAllGlobals();
});

/** Serves a damage_relations payload keyed off the type in the request URL. */
function stubTypeApi(
  relations: Record<
    string,
    { double?: string[]; half?: string[]; none?: string[] }
  >,
) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      const name = url.split("/type/")[1] ?? "";
      const entry = relations[name] ?? {};
      return {
        ok: true,
        status: 200,
        json: async () => ({
          damage_relations: {
            double_damage_to: (entry.double ?? []).map((n) => ({
              name: n,
              url: "",
            })),
            half_damage_to: (entry.half ?? []).map((n) => ({
              name: n,
              url: "",
            })),
            no_damage_to: (entry.none ?? []).map((n) => ({ name: n, url: "" })),
          },
        }),
      };
    }),
  );
}

describe("getTypeChart", () => {
  it("maps damage relations onto multipliers and defaults the rest to 1", async () => {
    stubTypeApi({
      fire: { double: ["grass"], half: ["water"] },
      normal: { none: ["ghost"] },
    });

    const chart = await getTypeChart();

    expect(multiplierFor(chart, "fire", "grass")).toBe(2);
    expect(multiplierFor(chart, "fire", "water")).toBe(0.5);
    expect(multiplierFor(chart, "normal", "ghost")).toBe(0);
    expect(multiplierFor(chart, "water", "water")).toBe(1);
  });

  it("builds a complete square chart", async () => {
    stubTypeApi({});
    const chart = await getTypeChart();

    expect(Object.keys(chart)).toHaveLength(TYPE_ORDER.length);
    for (const attacking of TYPE_ORDER) {
      expect(Object.keys(chart[attacking] ?? {})).toHaveLength(
        TYPE_ORDER.length,
      );
    }
  });

  it("falls back to neutral damage for an unknown type", async () => {
    stubTypeApi({});
    const chart = await getTypeChart();

    expect(multiplierFor(chart, "stellar", "fire")).toBe(1);
  });
});

describe("badge data", () => {
  it("gives every region eight badges numbered one to eight", () => {
    for (const region of BADGE_REGIONS) {
      expect(region.badges).toHaveLength(8);
      expect(region.badges.map((badge) => badge.order)).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8,
      ]);
    }
  });

  it("only uses types the stylesheet defines a colour for", () => {
    const known = new Set<string>(TYPE_ORDER);

    for (const region of BADGE_REGIONS) {
      for (const badge of region.badges) {
        expect(known).toContain(badge.type);
      }
    }
  });
});
