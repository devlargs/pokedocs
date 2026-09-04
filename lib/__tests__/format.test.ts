import { describe, expect, it } from "vitest";
import {
  displayName,
  formatDexNumber,
  formatHeight,
  formatWeight,
  idFromResourceUrl,
} from "@/lib/format";

describe("formatDexNumber", () => {
  it("pads short numbers to three digits", () => {
    expect(formatDexNumber(1)).toBe("001");
    expect(formatDexNumber(25)).toBe("025");
    expect(formatDexNumber(151)).toBe("151");
  });

  it("leaves four-digit numbers intact", () => {
    expect(formatDexNumber(1025)).toBe("1025");
  });
});

describe("idFromResourceUrl", () => {
  it("reads the id from a trailing-slash resource url", () => {
    expect(idFromResourceUrl("https://pokeapi.co/api/v2/pokemon/25/")).toBe(25);
  });

  it("reads the id when there is no trailing slash", () => {
    expect(idFromResourceUrl("https://pokeapi.co/api/v2/pokemon/906")).toBe(
      906,
    );
  });

  it("throws when the url has no numeric id", () => {
    expect(() =>
      idFromResourceUrl("https://pokeapi.co/api/v2/pokemon/"),
    ).toThrow(/Could not parse a resource id/);
  });
});

describe("displayName", () => {
  it("title-cases a single-word slug", () => {
    expect(displayName("pikachu")).toBe("Pikachu");
  });

  it("splits hyphenated forms", () => {
    expect(displayName("deoxys-attack")).toBe("Deoxys Attack");
  });

  it("ignores empty segments", () => {
    expect(displayName("ho--oh")).toBe("Ho Oh");
  });
});

describe("unit formatting", () => {
  it("converts decimetres to metres", () => {
    expect(formatHeight(7)).toBe("0.7 m");
    expect(formatHeight(100)).toBe("10.0 m");
  });

  it("converts hectograms to kilograms", () => {
    expect(formatWeight(60)).toBe("6.0 kg");
    expect(formatWeight(4)).toBe("0.4 kg");
  });
});
