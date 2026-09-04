import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TypeBadge from "@/components/TypeBadge";
import { displayName } from "@/lib/format";
import { getBerries } from "@/lib/pokeapi";

export const metadata: Metadata = {
  title: "Berries",
  description:
    "Every Pokémon berry with its growth time, firmness, dominant flavour and Natural Gift type.",
};

export default async function BerriesPage() {
  const berries = await getBerries();

  return (
    <section className="container mx-auto px-6 py-12">
      <Link
        href="/resources"
        className="hover:text-brand-600 mb-8 inline-flex items-center gap-1 text-sm text-gray-500 transition"
      >
        <span aria-hidden="true">&larr;</span> Back to resources
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Berries
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        {berries.length} berries. Growth time is the hours per stage, and a
        berry takes four stages to reach harvest.
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {berries.map((berry) => (
          <li
            key={berry.id}
            className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
          >
            <Image
              src={berry.sprite}
              alt=""
              width={48}
              height={48}
              loading="lazy"
              unoptimized
              className="h-12 w-12 shrink-0 object-contain"
            />
            <div className="min-w-0">
              <h2 className="font-medium text-gray-900">
                {displayName(berry.name)}
              </h2>
              <dl className="mt-1 space-y-0.5 text-sm text-gray-600">
                <div className="flex gap-1">
                  <dt className="text-gray-500">Firmness:</dt>
                  <dd>
                    {berry.firmness ? displayName(berry.firmness) : "Unlisted"}
                  </dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-gray-500">Growth:</dt>
                  <dd>{berry.growthTime} h per stage</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="text-gray-500">Flavour:</dt>
                  <dd>
                    {berry.dominantFlavor
                      ? displayName(berry.dominantFlavor)
                      : "None"}
                  </dd>
                </div>
              </dl>
              {berry.naturalGiftType && (
                <div className="mt-2 flex items-center gap-2">
                  <TypeBadge type={berry.naturalGiftType} />
                  <span className="text-xs text-gray-500">
                    Natural Gift {berry.naturalGiftPower}
                  </span>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
