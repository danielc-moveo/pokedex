export interface ProcessedPokemonResult {
  name: string;
  sprite: string;
  id: string;
}

export interface AllPokemonsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface TypeResponse {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface StatResponse {
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
  id: string;
}

export interface ProcessedStats {
  [key: string]: number;
}

interface ProcessedType {
  name: string;
}

export type PokemonData = unknown & PokemonResponsePartialData;

export interface ProcessedPokemon {
  name: string;
  sprite: string;
  id: string;
}

export interface ProcessedPokemonFullData {
  name: string;
  sprite: string;
  stats: ProcessedStats;
  types: ProcessedType[];
  id: string;
  details: string;
}

export interface FetchResponse {
  pokemons: ProcessedPokemon[];
}

export interface ProcessedPokemonResult {
  name: string;
  sprite: string;
  id: string;
}
