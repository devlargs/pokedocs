import PokeApi from "pokedex-promise-v2";

const options = {
  protocol: "https",
  hostName: "pokeapi.co:443",
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000,
  timeout: 5 * 1000,
};

const P = new PokeApi(options);

export default P;
