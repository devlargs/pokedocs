import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CountUp from "@/components/CountUp";
import { GITHUB_URL, SITE_NAME } from "@/lib/site";
import { typeColor } from "@/lib/typeColors";

export const metadata: Metadata = {
  title: "About",
  description: `Who builds ${SITE_NAME}, where its data comes from, and how to contribute.`,
};

/**
 * Real figures, checked against PokéAPI. If one of these ever needs a caveat,
 * change the number; do not soften it into a "+".
 */
const FIGURES = [
  {
    value: 1351,
    label: "Pokémon",
    note: "the full National Dex",
    type: "dragon",
  },
  {
    value: 2223,
    label: "Items",
    note: "balls, berries, TMs, held items",
    type: "electric",
  },
  {
    value: 68,
    label: "Berries",
    note: "with flavour and growth data",
    type: "grass",
  },
  { value: 18, label: "Types", note: "and all 324 matchups", type: "psychic" },
];

const TEAM = [
  {
    name: "Ralph Largo",
    role: "Front End Developer",
    image: "/images/ralph.png",
    bio: "Started Pokédocs as a Tailwind playground and kept going. Handles the UI, the dex layout and most of the styling.",
    type: "fire",
  },
  {
    name: "Nemuel Lim",
    role: "Senior Software Engineer",
    image: "/images/nemuel.png",
    bio: "Reviews the architecture and keeps the data layer honest: caching, typing and the PokéAPI integration.",
    type: "water",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-14 lg:py-20">
      {/* The letter. Left-aligned, narrow measure, no buttons in the fold. */}
      <section
        className="max-w-2xl rounded-[var(--hm-radius-card)] px-6 py-10 sm:px-10 sm:py-12"
        style={{ background: "var(--hm-paper-warm)" }}
      >
        <h1 className="text-3xl font-extrabold tracking-tight [overflow-wrap:anywhere] text-gray-900 sm:text-4xl">
          Hey, I&apos;m Ralph.
        </h1>

        <div className="mt-6 max-w-[58ch] space-y-5 text-[1.0625rem] leading-relaxed text-gray-700">
          <p>
            Pokédocs started as somewhere to practise Tailwind and turned into
            the Pokédex I actually wanted: quick, readable, no ads, no sign-up,
            and no ten-paragraph preamble sitting between you and the base
            stats.
          </p>
          <p>
            Everything here comes from{" "}
            <a
              href="https://pokeapi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 font-medium underline underline-offset-4"
            >
              PokéAPI
            </a>
            . Pages are rendered ahead of the request and cached for a day at a
            time, so looking something up mid-battle takes about as long as
            reading it. Exactly one table is typed by hand: the gym badges,
            because PokéAPI has no badge endpoint.{" "}
            <Link
              href="/resources/badges"
              className="text-brand-600 font-medium underline underline-offset-4"
            >
              That page says so at the top
            </Link>
            .
          </p>
          <p>
            It isn&apos;t affiliated with Nintendo, Game Freak or The Pokémon
            Company, and it never will be. It&apos;s a fan project, MIT
            licensed, and the whole thing is open if you want to poke at it.
          </p>
        </div>

        <p className="hm-signoff mt-8 flex items-center gap-3 text-gray-900">
          <span aria-hidden="true" className="hm-mark shrink-0" />
          <span className="font-semibold">
            Ralph Largo
            <span className="block text-sm font-normal text-gray-500">
              front end, and most of the CSS
            </span>
          </span>
        </p>
      </section>

      {/* Proof, in real numbers. */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          What&apos;s actually in it
        </h2>
        <p className="mt-2 max-w-[52ch] text-gray-600">
          Counts come straight from PokéAPI, so they grow when a new generation
          lands. Nothing here is rounded up.
        </p>

        <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {FIGURES.map((figure) => (
            <li
              key={figure.label}
              className="hm-card p-5"
              style={{ ["--tint" as string]: typeColor(figure.type) }}
            >
              <p className="text-4xl font-extrabold tracking-tight text-gray-900">
                <CountUp to={figure.value} />
              </p>
              <p className="mt-1 font-semibold text-gray-900">{figure.label}</p>
              <p className="mt-1 text-sm text-gray-600">{figure.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* The people. */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Who builds it
        </h2>

        <ul className="mt-8 grid gap-5 md:grid-cols-2">
          {TEAM.map((member) => (
            <li
              key={member.name}
              className="hm-card flex flex-col items-start gap-5 p-6 sm:flex-row"
              style={{ ["--tint" as string]: typeColor(member.type) }}
            >
              <Image
                src={member.image}
                alt=""
                width={192}
                height={192}
                className="h-24 w-24 shrink-0 rounded-2xl object-cover"
              />
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-brand-600 mb-2 text-sm font-medium">
                  {member.role}
                </p>
                <p className="leading-relaxed text-gray-700">{member.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* The one action the page is for. */}
      <section
        className="mt-16 rounded-[var(--hm-radius-card)] px-6 py-10 sm:px-10"
        style={{ background: "var(--hm-paper-warm-2)" }}
      >
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Help out
        </h2>
        <p className="mt-3 max-w-[56ch] leading-relaxed text-gray-700">
          The badge table is the honest weak spot: it&apos;s transcribed from
          the games by hand, and the Sword/Shield version splits are the most
          likely place for a mistake. If you spot one, a pull request is very
          welcome, and so is an issue that just tells me what&apos;s wrong.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hm-btn"
          >
            Open the repo
            <span aria-hidden="true" className="hm-btn__arrow">
              &rarr;
            </span>
          </a>
          <Link
            href="/pokedex"
            className="hover:text-brand-600 font-medium text-gray-600 underline underline-offset-4"
          >
            Or just go look at Pokémon
          </Link>
        </div>
      </section>
    </div>
  );
}
