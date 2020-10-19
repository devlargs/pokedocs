import styleDefaults from "constants/styleDefaults";
import PokeApi from "constants/pokeApi";
import PokemonCard from "components/PokemonCard";
import styled from "styled-components";

type PokeDataProps = {
  name: string;
  url: string;
};

const Pokedex = ({ data }: { data: Array<PokeDataProps> }) => {
  return (
    <Root>
      <section className="text-gray-700 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap -m-4 ">
            {data.map((q: PokeDataProps, i: number) => (
              <PokemonCard name={q.name} url={q.url} key={i} />
            ))}
          </div>
        </div>
      </section>
    </Root>
  );
};

Pokedex.getInitialProps = async () => {
  const data = await PokeApi.getPokemonsList({
    limit: 20,
    offset: 1,
  });
  return {
    data: data.results,
  };
};

const Root = styled.div`
  height: calc(100vh - ${styleDefaults.header.size}px);
  background-image: ${styleDefaults.background.svg};
  overflow-y: auto;
  background-color: #ffffff;
`;

export default Pokedex;
