import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on how Pokédocs is built and what changed recently.",
};

const POSTS = [
  {
    date: "2026-08-14",
    title: "Rebuilt on the Next.js App Router",
    body: "Pokédocs moved off the pages router and onto React Server Components. Dex pages now fetch on the server and ship almost no JavaScript, so the list renders before the client bundle has finished parsing.",
  },
  {
    date: "2026-07-02",
    title: "Dropping the Wikipedia scrape",
    body: "Detail pages used to pull prose from Wikipedia, which broke whenever an article was renamed. They now use the flavour text PokéAPI already exposes, which is shorter, canonical, and never 404s mid-build.",
  },
  {
    date: "2026-06-21",
    title: "Why every page is cached for a day",
    body: "Pokédex data changes about once a generation. Revalidating every 24 hours keeps PokéAPI happy, keeps pages fast, and still picks up new entries without a redeploy.",
  },
];

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default function BlogPage() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-gray-600">
          Short notes on how this site is put together.
        </p>

        <ol className="mt-10 divide-y divide-gray-200">
          {POSTS.map((post) => (
            <li key={post.title} className="py-8 first:pt-0">
              <time
                dateTime={post.date}
                className="text-sm tracking-wide text-gray-500 uppercase"
              >
                {dateFormatter.format(new Date(post.date))}
              </time>
              <h2 className="mt-1 text-2xl font-medium text-gray-900">
                {post.title}
              </h2>
              <p className="mt-3 leading-relaxed text-gray-600">{post.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
