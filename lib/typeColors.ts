/**
 * The official type palette.
 *
 * These live in TypeScript rather than as `@theme` variables in globals.css on
 * purpose. Tailwind v4 tree-shakes theme variables it cannot see referenced in
 * source, and these are only ever looked up by a runtime type name, so all but
 * one were being stripped from the stylesheet and rendering as no background.
 */
export const TYPE_COLORS: Record<string, string> = {
  normal: "#a8a77a",
  fire: "#ee8130",
  water: "#6390f0",
  electric: "#f7d02c",
  grass: "#7ac74c",
  ice: "#96d9d6",
  fighting: "#c22e28",
  poison: "#a33ea1",
  ground: "#e2bf65",
  flying: "#a98ff3",
  psychic: "#f95587",
  bug: "#a6b91a",
  rock: "#b6a136",
  ghost: "#735797",
  dragon: "#6f35fc",
  dark: "#705746",
  steel: "#b7b7ce",
  fairy: "#d685ad",
};

const FALLBACK_COLOR = "#9ca3af";
const LIGHT_INK = "#ffffff";
const DARK_INK = "#1f2937";

/** WCAG relative luminance for an #rrggbb colour. */
export function relativeLuminance(hex: string): number {
  const channels = [1, 3, 5].map((offset) => {
    const value = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  const [r = 0, g = 0, b = 0] = channels;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(a: number, b: number): number {
  const [dark = 0, light = 0] = [a, b].sort((x, y) => x - y);
  return (light + 0.05) / (dark + 0.05);
}

/**
 * Picks whichever of white or near-black reads better on the given colour.
 * Several types (electric, ice, steel, ground) are far too light for the white
 * text these badges used to hardcode.
 */
export function readableInk(hex: string): string {
  const background = relativeLuminance(hex);
  const onLight = contrastRatio(background, relativeLuminance(LIGHT_INK));
  const onDark = contrastRatio(background, relativeLuminance(DARK_INK));

  return onLight >= onDark ? LIGHT_INK : DARK_INK;
}

export function typeColor(type: string): string {
  return TYPE_COLORS[type] ?? FALLBACK_COLOR;
}

/** Background plus a foreground guaranteed to be legible against it. */
export function typeStyle(type: string): {
  backgroundColor: string;
  color: string;
} {
  const backgroundColor = typeColor(type);
  return { backgroundColor, color: readableInk(backgroundColor) };
}
