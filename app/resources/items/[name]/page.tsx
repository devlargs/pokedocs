import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { displayName } from "@/lib/format";
import { getItem } from "@/lib/pokeapi";

type PageProps = { params: Promise<{ name: string }> };

/**
 * There are over two thousand items, so none are prerendered. Each is rendered
 * on first request and then cached, the same way the tail of the dex works.
 */
export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { name } = await params;
  const item = await getItem(name);

  if (!item) {
    return { title: "Not found" };
  }

  return {
    title: displayName(item.name),
    description:
      item.effect ?? `Details for the item ${displayName(item.name)}.`,
  };
}

export default async function ItemPage({ params }: PageProps) {
  const { name } = await params;
  const item = await getItem(name);

  if (!item) {
    notFound();
  }

  return (
    <section className="container mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/resources/items"
        className="hover:text-brand-600 mb-8 inline-flex items-center gap-1 text-sm text-gray-500 transition"
      >
        <span aria-hidden="true">&larr;</span> Back to items
      </Link>

      <div className="flex items-center gap-5">
        <Image
          src={item.sprite}
          alt=""
          width={64}
          height={64}
          unoptimized
          className="h-16 w-16 object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {displayName(item.name)}
          </h1>
          <p className="text-gray-500">{displayName(item.category)}</p>
        </div>
      </div>

      <p className="mt-8 leading-relaxed text-gray-700">
        {item.effect ?? "No effect text is recorded for this item."}
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Fact
          label="Cost"
          value={
            item.cost > 0 ? `₽${item.cost.toLocaleString("en")}` : "Not sold"
          }
        />
        <Fact
          label="Fling power"
          value={
            item.flingPower === null ? "Cannot fling" : String(item.flingPower)
          }
        />
        <Fact label="Attributes" value={String(item.attributes.length)} />
      </dl>

      {item.attributes.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">Attributes</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.attributes.map((attribute) => (
              <li
                key={attribute}
                className="rounded-full bg-gray-100 px-4 py-1.5 text-sm text-gray-700"
              >
                {displayName(attribute)}
              </li>
            ))}
          </ul>
        </section>
      )}

      {item.heldBy.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Held in the wild by
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {item.heldBy.map((pokemon) => (
              <li key={pokemon}>
                <Link
                  href={`/pokedex/${pokemon}`}
                  className="hover:border-brand-500 hover:text-brand-600 inline-block rounded-full border border-gray-200 px-4 py-1.5 text-sm text-gray-700 transition"
                >
                  {displayName(pokemon)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 px-4 py-3">
      <dt className="text-xs tracking-wide text-gray-500 uppercase">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-gray-900">{value}</dd>
    </div>
  );
}
