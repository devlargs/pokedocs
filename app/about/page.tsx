import type { Metadata } from "next";
import Image from "next/image";
import { GITHUB_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Who builds ${SITE_NAME}, where its data comes from, and how to contribute.`,
};

const TEAM = [
  {
    name: "Ralph Largo",
    role: "Front End Developer",
    image: "/images/ralph.png",
    bio: "Started Pokédocs as a Tailwind playground and kept going. Handles the UI, the dex layout and most of the styling.",
  },
  {
    name: "Nemuel Lim",
    role: "Senior Software Engineer",
    image: "/images/nemuel.png",
    bio: "Reviews the architecture and keeps the data layer honest: caching, typing and the PokéAPI integration.",
  },
];

export default function AboutPage() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          About {SITE_NAME}
        </h1>
        <p className="mt-4 leading-relaxed text-gray-600">
          Pokédocs is an open-source fan project: a fast, readable reference for
          the National Pokédex with no ads and no sign-up. Every entry is built
          from{" "}
          <a
            href="https://pokeapi.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline underline-offset-4"
          >
            PokéAPI
          </a>
          , cached for a day at a time, and rendered ahead of the request.
        </p>
        <p className="mt-4 leading-relaxed text-gray-600">
          It is not affiliated with Nintendo, Game Freak or The Pokémon Company.
          Bug reports and pull requests are welcome on{" "}
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-600 underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>

      <h2 className="mt-16 text-center text-sm font-semibold tracking-widest text-gray-500 uppercase">
        The team
      </h2>
      <ul className="mx-auto mt-8 grid max-w-4xl gap-8 md:grid-cols-2">
        {TEAM.map((member) => (
          <li
            key={member.name}
            className="flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left"
          >
            <Image
              src={member.image}
              alt=""
              width={192}
              height={192}
              className="h-32 w-32 shrink-0 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {member.name}
              </h3>
              <p className="text-brand-600 mb-2 text-sm">{member.role}</p>
              <p className="leading-relaxed text-gray-600">{member.bio}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
