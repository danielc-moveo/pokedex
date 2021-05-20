import axios from "./";

interface AllPokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

interface TypeResponse {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface StatResponse {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonResponsePartialData {
  name: string;
  sprites: unknown[] & { front_default: string };
  stats: StatResponse[];
  types: TypeResponse[];
  order: string;
}

interface ProcessedStat {
  amount: number;
  name: string;
}

interface ProcessedStats {
  values: ProcessedStat[];
  total: number;
}

interface ProcessedType {
  name: string;
}

type PokemonData = unknown & PokemonResponsePartialData;

export interface ProcessedPokemon {
  name: string;
  sprite: string;
  stats: ProcessedStats;
  types: ProcessedType[];
  id: string;
}

interface FetchResponse {
  pokemons: ProcessedPokemon[];
}

export const fetchAndProcessPokemons = async (
  skip: number | null
): Promise<FetchResponse> => {
  const pokemonsResponse = await (
    await axios.get(`/pokemon?offset=${skip}?limit=${48}}`)
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
  //doesnt include description

  return { pokemons: processedPokemons };
};

const getProcessedPokemonsObject = (
  pokemonsData: PokemonData[]
): ProcessedPokemon[] => {
  return pokemonsData.map((pokemon) => {
    const { name, sprites, stats, types, order } = pokemon;
    const sprite = sprites.front_default;
    const processedStats = getProcessStats(stats);
    const processedTypes = getProcessedTypes(types);
    return {
      name,
      sprite,
      stats: processedStats,
      types: processedTypes,
      id: order,
    };
  });
};

const getProcessStats = (stats: StatResponse[]): ProcessedStats => {
  let total = 0;
  let processedStats = {} as ProcessedStats;
  processedStats.values = stats.map(({ base_stat, stat }) => {
    total += base_stat;
    return {
      amount: base_stat,
      name: stat.name,
    };
  });
  processedStats.total = total;
  return processedStats;
};

const getProcessedTypes = (types: TypeResponse[]): { name: string }[] => {
  return types.map(({ type }) => {
    return { name: type.name };
  });
};
