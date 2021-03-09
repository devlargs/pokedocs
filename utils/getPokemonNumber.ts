import removeFalsy from "utils/object/removeFalsy";

const getPokemonNumber = (str: string) => {
  const split = removeFalsy(str.split("/"));
  const temp = split[split.length - 1];

  if (temp.length === 1) {
    return `00${temp}`;
  }

  if (temp.length === 2) {
    return `0${temp}`;
  }

  return temp;
};

export default getPokemonNumber