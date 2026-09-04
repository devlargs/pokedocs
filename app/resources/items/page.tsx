import type { Metadata } from "next";
import Link from "next/link";
import ItemBrowser from "@/components/ItemBrowser";
import { getItemList } from "@/lib/pokeapi";

export const metadata: Metadata = {
  title: "Items",
  description:
    "Search every Pokémon item, from held items and evolution stones to TMs, with the effect text from the games.",
};

export default async function ItemsPage() {
  const items = await getItemList();

  return (
    <section className="container mx-auto px-6 py-12">
      <Link
        href="/resources"
        className="hover:text-brand-600 mb-8 inline-flex items-center gap-1 text-sm text-gray-500 transition"
      >
        <span aria-hidden="true">&larr;</span> Back to resources
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Items
      </h1>
      <p className="mt-3 mb-8 max-w-2xl text-gray-600">
        Held items, evolution stones, TMs and everything else in the bag. Open
        one for its effect, cost and which Pokémon are found holding it.
      </p>

      <ItemBrowser items={items} />
    </section>
  );
}
