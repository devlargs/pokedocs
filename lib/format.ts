/** Pokédex numbers are conventionally written zero-padded to at least three digits. */
export function formatDexNumber(id: number): string {
  return String(id).padStart(3, "0");
}

/**
 * PokeAPI list endpoints identify a resource only by its URL, e.g.
 * `https://pokeapi.co/api/v2/pokemon/25/`. The trailing path segment is the id.
 */
export function idFromResourceUrl(url: string): number {
  const segments = url.split("/").filter(Boolean);
  const last = segments[segments.length - 1];
  const id = Number(last);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`Could not parse a resource id from URL: ${url}`);
  }

  return id;
}

/** `deoxys-attack` -> `Deoxys Attack`, for display in headings and titles. */
export function displayName(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

/** PokeAPI reports height in decimetres and weight in hectograms. */
export function formatHeight(decimetres: number): string {
  return `${(decimetres / 10).toFixed(1)} m`;
}

export function formatWeight(hectograms: number): string {
  return `${(hectograms / 10).toFixed(1)} kg`;
}
