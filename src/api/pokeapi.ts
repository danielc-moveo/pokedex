import {
  AllPokemonsResponse,
  FetchResponse,
  PokemonData,
  ProcessedPokemon,
  ProcessedPokemonFullData,
  ProcessedPokemonResult,
  ProcessedStats,
  StatResponse,
  TypeResponse,
} from "../types/interface";
import axios from "./";

export const fetchAndProcessPokemons = async (
  skip: number | null
): Promise<FetchResponse> => {
  const pokemonsResponse = (
    await axios.get(`/pokemon?offset=${skip}?limit=${20}}`)
  ).data;
  const processedPokemons = await processAllPokemonsResponse(pokemonsResponse);
  return processedPokemons;
};

const processAllPokemonsResponse = async (
  pokemonsResponse: AllPokemonsResponse
): Promise<FetchResponse> => {
  const pokemonsData: PokemonData[] = await Promise.all(
    pokemonsResponse.results.map(
      ({ url }: { url: string }) =>
        axios.get(url).then((res) => res.data) as unknown as PokemonData
    )
  );
  const processedPokemons = getProcessedPokemonsObject(pokemonsData);
  return { pokemons: processedPokemons };
};

const getProcessedPokemonsObject = (
  pokemonsData: PokemonData[]
): ProcessedPokemon[] => {
  return pokemonsData.map((pokemon) => {
    const { name, sprites, id } = pokemon;
    const sprite = sprites.front_default;

    return {
      name,
      sprite,
      id,
    };
  });
};

export const fetchPokemonBySearchField = async (
  searchField: string
): Promise<ProcessedPokemonResult> => {
  const pokemonResponse = (await axios.get(`/pokemon/${searchField}`)).data;
  const { name, sprites, id } = pokemonResponse;
  const sprite = sprites.front_default;
  return {
    name,
    sprite,
    id,
  };
};

export const fetchAndProcessPokemonData = async (
  pokemonName: string
): Promise<ProcessedPokemonFullData> => {
  const pokemonDataPromise = axios.get(`/pokemon/${pokemonName}`);
  const pokemonSpeciesPromise = axios.get(`/pokemon-species/${pokemonName}`);

  const [pokemonDataResponse, pokemonSpeciesResponse] = await Promise.all([
    pokemonDataPromise,
    pokemonSpeciesPromise,
  ]);

  const { name, sprites, stats, types, id } = pokemonDataResponse.data;

  const { flavor_text } = pokemonSpeciesResponse.data.flavor_text_entries[0];
  const sprite = sprites.front_default;
  const processedStats = getProcessStats(stats);
  const processedTypes = getProcessedTypes(types);
  return {
    name,
    sprite,
    stats: processedStats,
    types: processedTypes,
    id,
    details: flavor_text,
  };
};

const getProcessStats = (stats: StatResponse[]): ProcessedStats => {
  let total = 0;
  let processedStats = {} as { [key: string]: number };
  stats.forEach(({ base_stat, stat }) => {
    total += base_stat;
    const { name } = stat;
    let processedNameArr = [];
    let processedNameStr = "";

    if (name.includes("-")) {
      processedNameArr = name.split("-");
      processedNameStr = `${
        processedNameArr[0] +
        processedNameArr[1].charAt(0).toUpperCase() +
        processedNameArr[1].slice(1)
      }`;
    }
    processedStats[processedNameStr || name] = base_stat;
  });

  processedStats.total = total;
  return processedStats;
};

const getProcessedTypes = (types: TypeResponse[]): { name: string }[] => {
  return types.map(({ type }) => {
    return { name: type.name };
  });
};
