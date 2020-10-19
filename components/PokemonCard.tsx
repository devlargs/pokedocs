import getPokemonNumber from "utils/getPokemonNumber";
import Link from "next/link";

type Props = {
  name: string;
  url: string;
};

const PokemonCard = ({ name, url }: Props) => (
  <Link href="/pokedex/a">
    <div className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer ">
      <div className="bg-gray-100 p-6 rounded-lg ">
        <img
          className="h-45 rounded w-full object-cover object-center"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${getPokemonNumber(
            url
          )}.png`}
          alt="content"
        />
        <h3 className="tracking-widest text-red-500 text-xs font-medium title-font">
          #{getPokemonNumber(url)}
        </h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4 capitalize">
          {name}
        </h2>
        {/* // TODO - these commented codes are tags that maybe enhancedas components for pokemon types */}
        {/* <div className="mr-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full">
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
    </div> */}
      </div>
    </div>
  </Link>
);

export default PokemonCard;
