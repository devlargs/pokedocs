import type { Metadata } from "next";
import Link from "next/link";
import TypeBadge from "@/components/TypeBadge";
import { BADGE_REGIONS } from "@/lib/badges";

export const metadata: Metadata = {
  title: "Gym badges",
  description:
    "Gym badges by region and generation, with the leader who awards each one, their speciality type and the town you find them in.",
};

export default function BadgesPage() {
  return (
    <section className="container mx-auto px-6 py-12">
      <Link
        href="/resources"
        className="hover:text-brand-600 mb-8 inline-flex items-center gap-1 text-sm text-gray-500 transition"
      >
        <span aria-hidden="true">&larr;</span> Back to resources
      </Link>

      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Gym badges
      </h1>
      <p className="mt-3 max-w-2xl text-gray-600">
        Every badge from the mainline games, in the order you normally earn
        them.
      </p>

      <p className="mt-4 max-w-2xl rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <strong className="font-semibold">Note:</strong> unlike the rest of this
        site, this table is not from PokéAPI. There is no badge endpoint, so
        these are transcribed from the games by hand. Corrections are welcome.
      </p>

      <div className="mt-12 space-y-14">
        {BADGE_REGIONS.map((region) => (
          <section key={region.region}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {region.region}
              </h2>
              <p className="text-sm text-gray-500">
                {region.generation} &middot; {region.games}
              </p>
            </div>

            {region.note && (
              <p className="mt-2 text-sm text-gray-500">{region.note}</p>
            )}

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-2xl border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-xs tracking-wide text-gray-500 uppercase">
                    <th scope="col" className="py-2 pr-4 font-medium">
                      #
                    </th>
                    <th scope="col" className="py-2 pr-4 font-medium">
                      Badge
                    </th>
                    <th scope="col" className="py-2 pr-4 font-medium">
                      Leader
                    </th>
                    <th scope="col" className="py-2 pr-4 font-medium">
                      Type
                    </th>
                    <th scope="col" className="py-2 font-medium">
                      Town
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {region.badges.map((badge) => (
                    <tr
                      key={badge.name}
                      className="border-b border-gray-100 align-top"
                    >
                      <td className="py-3 pr-4 text-gray-400 tabular-nums">
                        {badge.order}
                      </td>
                      <td className="py-3 pr-4 font-medium text-gray-900">
                        {badge.name}
                      </td>
                      <td className="py-3 pr-4 text-gray-700">
                        {badge.leader}
                        {badge.note && (
                          <span className="mt-0.5 block text-xs text-gray-500">
                            {badge.note}
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        <TypeBadge type={badge.type} />
                      </td>
                      <td className="py-3 text-gray-700">{badge.town}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
