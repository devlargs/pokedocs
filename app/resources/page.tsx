import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Reference tables for Pokémon items, gym badges, berries and type matchups.",
};

const RESOURCES = [
  {
    href: "/resources/types",
    title: "Type matchups",
    body: "The full 18-by-18 effectiveness chart, with every attacking and defending combination.",
    path: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    href: "/resources/items",
    title: "Items",
    body: "Every held item, evolution stone and TM, with the effect text from the games and which Pokémon carry it.",
    path: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4",
  },
  {
    href: "/resources/berries",
    title: "Berries",
    body: "Growth time, firmness, flavour profile and the Natural Gift type each berry provides.",
    path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    href: "/resources/badges",
    title: "Gym badges",
    body: "Badges by region and generation, the leader who awards each one and the town you find them in.",
    path: "M22 12h-4l-3 9L9 3l-3 9H2",
  },
];

export default function ResourcesPage() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Resources
        </h1>
        <p className="mt-4 leading-relaxed text-gray-600">
          Reference tables that sit alongside the Pokédex. Everything except the
          badge list is pulled from PokéAPI and cached for a day at a time.
        </p>
      </div>

      <ul className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2">
        {RESOURCES.map((resource) => (
          <li key={resource.href}>
            <Link
              href={resource.href}
              className="hover:border-brand-500 focus-visible:outline-brand-600 block h-full rounded-lg border border-gray-200 bg-white p-6 transition hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <div className="flex items-center gap-3">
                <span className="bg-brand-500 flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-white">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d={resource.path} />
                  </svg>
                </span>
                <h2 className="text-lg font-medium text-gray-900">
                  {resource.title}
                </h2>
              </div>
              <p className="mt-3 leading-relaxed text-gray-600">
                {resource.body}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
