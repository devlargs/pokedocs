import Link from "next/link";

const FEATURES = [
  {
    title: "Every Pokémon, one dex",
    body: "The full National Pokédex is loaded straight from PokéAPI, so new generations show up here without anyone editing a list by hand.",
    path: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  },
  {
    title: "Base stats at a glance",
    body: "HP, Attack, Defense, both Special stats and Speed are charted on a shared scale, so you can compare two Pokémon without doing arithmetic.",
    path: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3",
  },
  {
    title: "Types and abilities",
    body: "Each entry lists its typing and every ability it can be found with, including hidden abilities, colour-coded the way the games do it.",
    path: "M13 10V3L4 14h7v7l9-11h-7z",
  },
  {
    title: "Dex entries in full",
    body: "The flavour text from the mainline games, cleaned up from the original line breaks so it actually reads like a sentence.",
    path: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-gray-100 bg-white">
        <div className="container mx-auto grid gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
          <div>
            <p className="text-brand-600 text-sm font-semibold tracking-wide uppercase">
              Fan-made · Open source
            </p>
            <h1 className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Everything about
              <span className="text-brand-600"> Pokémon</span>, in one place
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-600">
              Pokédocs is a fast, no-nonsense reference for the National
              Pokédex. Search by name, open any entry, and get its typing, base
              stats, abilities and dex description, with nothing else in the
              way.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/pokedex"
                className="bg-brand-600 hover:bg-brand-700 rounded-md px-8 py-3 text-base font-medium text-white shadow transition md:py-4 md:text-lg"
              >
                Visit the Pokédex
              </Link>
              <Link
                href="/about"
                className="rounded-md border border-gray-300 px-8 py-3 text-base font-medium text-gray-700 transition hover:bg-gray-50 md:py-4 md:text-lg"
              >
                About this project
              </Link>
            </div>
          </div>

          <div className="dex-backdrop flex items-center justify-center rounded-2xl border border-gray-100 p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/pokeball.png"
              alt=""
              className="h-56 w-56 object-contain drop-shadow-xl sm:h-72 sm:w-72"
            />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-brand-600 text-sm font-semibold tracking-wide uppercase">
              What&apos;s inside
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A reference, not a wiki
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Every page is statically rendered and cached, so looking something
              up mid-battle takes about as long as it takes to read it.
            </p>
          </div>

          <ul className="mt-12 grid gap-10 md:grid-cols-2">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="flex gap-4">
                <div className="bg-brand-500 flex h-12 w-12 shrink-0 items-center justify-center rounded-md text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={feature.path}
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-gray-600">
                    {feature.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
