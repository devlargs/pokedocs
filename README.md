# Pokédocs

A fan-made reference for the National Pokédex: typing, base stats, abilities
and dex entries for every Pokémon, built on data from
[PokéAPI](https://pokeapi.co).

## Stack

- [Next.js 15](https://nextjs.org) (App Router, React Server Components)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com) (CSS-first config in `app/globals.css`)
- TypeScript 5 in `strict` mode
- [Vitest](https://vitest.dev) for unit tests

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The dev server runs on <http://localhost:3331>.

## Scripts

| Script                 | What it does                      |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the dev server on port 3331 |
| `npm run build`        | Production build                  |
| `npm start`            | Serve the production build        |
| `npm test`             | Run the unit tests once           |
| `npm run test:watch`   | Run the unit tests in watch mode  |
| `npm run lint`         | ESLint                            |
| `npm run typecheck`    | `tsc --noEmit`                    |
| `npm run format`       | Rewrite files with Prettier       |
| `npm run format:check` | Fail if anything is unformatted   |

## Layout

```
app/            Routes. `layout.tsx` is the shell; each folder is a page.
components/     Shared UI. Client components are marked "use client".
lib/            PokéAPI client, formatting helpers and their tests.
public/         Static assets.
```

## Data and caching

`lib/pokeapi.ts` is the only place that talks to PokéAPI. Responses are cached
for 24 hours via Next's `revalidate`, so pages stay fast and new generations
appear without a redeploy.

`app/pokedex/[name]` prerenders the first 151 Pokémon at build time; the rest
render on first request and are then cached. That keeps `next build` short
instead of making 1,300+ API calls up front.

## Licence

MIT. Pokémon and all related names are trademarks of Nintendo, Game Freak and
The Pokémon Company. This project is not affiliated with any of them.
