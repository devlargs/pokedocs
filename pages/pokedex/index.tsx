import Link from "next/link";
import PokeApi from "pokedex-promise-v2";
import { useEffect } from "react";
import getPokemonNumber from "utils/getPokemonNumber";

const options = {
  protocol: "https",
  hostName: "pokeapi.co:443",
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000, // 5s
};

const P = new PokeApi(options);

type PokeDataProps = {
  name: string;
  url: string;
};

const Pokedex = ({ data }: { data: Array<PokeDataProps> }) => {
  return (
    <>
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4 ">
            {data.map((q: PokeDataProps, i: number) => (
              <Link href="/pokedex/a">
                <div className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer ">
                  <div className="bg-gray-100 p-6 rounded-lg ">
                    <img
                      className="h-45 rounded w-full object-cover object-center"
                      src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getPokemonNumber(
                        q.url
                      )}.png`}
                      alt="content"
                    />
                    <h3 className="tracking-widest text-red-500 text-xs font-medium title-font">
                      #{getPokemonNumber(q.url)}
                    </h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4 capitalize">
                      {q.name}
                    </h2>

                    <div className="mr-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="feather feather-archive mr-2"
                      >
                        <polyline points="21 8 21 21 3 21 3 8"></polyline>
                        <rect x="1" y="3" width="22" height="5"></rect>
                        <line x1="10" y1="12" x2="14" y2="12"></line>
                      </svg>
                      Poison
                    </div>

                    <div className="mr-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="feather feather-archive mr-2"
                      >
                        <polyline points="21 8 21 21 3 21 3 8"></polyline>
                        <rect x="1" y="3" width="22" height="5"></rect>
                        <line x1="10" y1="12" x2="14" y2="12"></line>
                      </svg>
                      Grass
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

Pokedex.getInitialProps = async () => {
  const data = await P.getPokemonsList({
    limit: 20,
    offset: 1,
  });
  return {
    data: data.results,
  };
};

export default Pokedex;
