import { describe, expect, it } from "vitest";
import { TYPE_ORDER } from "@/lib/pokeapi";
import {
  readableInk,
  relativeLuminance,
  TYPE_COLORS,
  typeColor,
  typeStyle,
} from "@/lib/typeColors";

const WHITE = "#ffffff";
const DARK = "#1f2937";

function contrast(a: string, b: string): number {
  const [dark, light] = [relativeLuminance(a), relativeLuminance(b)].sort(
    (x, y) => x - y,
  ) as [number, number];
  return (light + 0.05) / (dark + 0.05);
}

describe("relativeLuminance", () => {
  it("matches the WCAG endpoints", () => {
    expect(relativeLuminance("#ffffff")).toBeCloseTo(1, 5);
    expect(relativeLuminance("#000000")).toBeCloseTo(0, 5);
  });
});

describe("readableInk", () => {
  it("uses dark text on the light types that white could not carry", () => {
    // These are exactly the badges that were unreadable with hardcoded white.
    expect(readableInk(TYPE_COLORS.electric!)).toBe(DARK);
    expect(readableInk(TYPE_COLORS.ice!)).toBe(DARK);
    expect(readableInk(TYPE_COLORS.steel!)).toBe(DARK);
    expect(readableInk(TYPE_COLORS.ground!)).toBe(DARK);
  });

  it("keeps white on the dark types", () => {
    expect(readableInk(TYPE_COLORS.dragon!)).toBe(WHITE);
    expect(readableInk(TYPE_COLORS.ghost!)).toBe(WHITE);
    expect(readableInk(TYPE_COLORS.dark!)).toBe(WHITE);
  });

  it("never picks the worse of the two options", () => {
    for (const hex of Object.values(TYPE_COLORS)) {
      const chosen = readableInk(hex);
      const other = chosen === WHITE ? DARK : WHITE;
      expect(contrast(hex, chosen)).toBeGreaterThanOrEqual(
        contrast(hex, other),
      );
    }
  });
});

describe("type palette coverage", () => {
  it("defines a colour for every battle type", () => {
    for (const type of TYPE_ORDER) {
      expect(TYPE_COLORS[type], `missing colour for ${type}`).toBeDefined();
    }
  });

  it("uses valid six-digit hex throughout", () => {
    for (const hex of Object.values(TYPE_COLORS)) {
      expect(hex).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("falls back for an unknown type instead of returning undefined", () => {
    expect(typeColor("stellar")).toMatch(/^#[0-9a-f]{6}$/);
    expect(typeStyle("stellar").backgroundColor).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("always pairs a background with a foreground", () => {
    for (const type of TYPE_ORDER) {
      const style = typeStyle(type);
      expect(style.backgroundColor).toBe(TYPE_COLORS[type]);
      expect([WHITE, DARK]).toContain(style.color);
    }
  });

  it("clears 4.5:1 on every type badge", () => {
    for (const [type, hex] of Object.entries(TYPE_COLORS)) {
      const ratio = contrast(hex, readableInk(hex));
      expect(
        ratio,
        `${type} only reaches ${ratio.toFixed(2)}:1`,
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
