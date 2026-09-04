import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container mx-auto flex flex-col items-center px-5 py-24 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/pokeball.png"
        alt=""
        className="mb-10 h-40 w-40 object-contain opacity-80"
      />
      <h1 className="mb-4 text-3xl font-semibold text-gray-900 sm:text-4xl">
        This route ran off into the tall grass
      </h1>
      <p className="mb-8 max-w-xl leading-relaxed text-gray-600">
        We couldn&apos;t find the page you asked for. It may have been renamed,
        or the Pokémon you were looking for isn&apos;t in the National Pokédex.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="bg-brand-600 hover:bg-brand-700 rounded-md px-6 py-3 font-medium text-white transition"
        >
          Back home
        </Link>
        <Link
          href="/pokedex"
          className="rounded-md border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Browse the Pokédex
        </Link>
      </div>
    </section>
  );
}
