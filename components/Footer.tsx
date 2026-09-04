import { GITHUB_URL, SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-gray-500 sm:flex-row">
        <p>
          {SITE_NAME} is a fan project. Pokémon and all related names are
          trademarks of Nintendo, Game Freak and The Pokémon Company.
        </p>
        <p className="flex gap-4">
          <a
            className="hover:text-brand-600 underline underline-offset-4"
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data by PokéAPI
          </a>
          <a
            className="hover:text-brand-600 underline underline-offset-4"
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </p>
      </div>
    </footer>
  );
}
