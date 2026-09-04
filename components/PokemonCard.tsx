"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { artworkUrl } from "@/lib/pokeapi";
import { displayName, formatDexNumber } from "@/lib/format";

const FALLBACK_IMAGE = "/images/pokeball.png";

export default function PokemonCard({
  id,
  name,
}: {
  id: number;
  name: string;
}) {
  // A handful of alternate forms have no official artwork; show a pokéball instead.
  const [src, setSrc] = useState(artworkUrl(id));

  return (
    <Link
      href={`/pokedex/${name}`}
      className="focus-visible:outline-brand-600 group rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <article className="flex h-full flex-col items-center rounded-lg bg-gray-100 p-5 transition group-hover:bg-white group-hover:shadow-lg">
        <Image
          src={src}
          onError={() => setSrc(FALLBACK_IMAGE)}
          alt=""
          width={160}
          height={160}
          loading="lazy"
          className="h-32 w-32 object-contain transition group-hover:scale-105"
        />
        <p className="text-brand-500 mt-3 text-xs font-medium tracking-widest">
          #{formatDexNumber(id)}
        </p>
        <h2 className="text-center text-lg font-medium text-gray-900">
          {displayName(name)}
        </h2>
      </article>
    </Link>
  );
}
