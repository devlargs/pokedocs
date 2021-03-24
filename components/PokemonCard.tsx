import { useState } from "react";
import getPokemonNumber from "utils/getPokemonNumber";
import Link from "next/link";
import { POKEMON_IMAGE_LINK } from "constants/links";

type Props = {
  name: string;
  url: string;
};

function checkImage(imageSrc, good, bad) {
  var img = new Image();
  img.onload = good;
  img.onerror = bad;
  img.src = imageSrc;
}

const PokemonCard = ({ name, url }: Props) => {
  const [img, setImage] = useState(
    `${POKEMON_IMAGE_LINK}${getPokemonNumber(url)}.png`
  );

  return (
    <Link href="/pokedex/a">
      <div className="xl:w-1/4 md:w-1/2 p-4 cursor-pointer ">
        <div className="bg-gray-100 p-6 rounded-lg ">
          <img
            onError={() => setImage("/images/pokeball.png")}
            className="h-45 rounded w-full object-cover object-center"
            src={img}
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
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
};

export default PokemonCard;
