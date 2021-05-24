import { useEffect, useState, useCallback } from "react";
import { fetchAndProcessPokemons } from "../../api/pokeapi";
import { ProcessedPokemon } from "../../types/interface";
import PokemonCard from "../layout/PokemonCard";
import SearchBox from "../layout/SearchBox";
import useSearchResults from "../hooks/useSearchResults";
import CardsDisplay from "../layout/CardsDisplay";

const PokedexManager = () => {
  const [pokemonsData, setPokemonsData] = useState<ProcessedPokemon[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [skip, setSkip] = useState<number | null>(null);
  const [searchField, setSearchField] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);

  const reset = useCallback(() => {
    setPokemonsData([]);
    setSkip(0);
  }, []);

  const { searchResult } = useSearchResults({
    searchField,
    reset,
    setErrors,
  });

  const handleLoadMore = () => {
    setSkip(pokemonsData.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      setErrors([]);
      try {
        if (!searchField) {
          const { pokemons } = await fetchAndProcessPokemons(skip);
          setPokemonsData((prev) => [...prev, ...pokemons]);
          setIsLoading(false);
        }
      } catch (error) {
        setErrors((prev) => [...prev, error]);
      }
    };
    fetchData();
  }, [skip, searchField]);

  return (
    <>
      <SearchBox setSearchField={setSearchField} />
      {errors.map((err, key) => (
        <div key={key}>{err}</div>
      ))}
      {isLoading ? (
        "Spinner..."
      ) : !searchField ? (
        <CardsDisplay handleLoadMore={handleLoadMore} pokemons={pokemonsData} />
      ) : (
        searchResult && (
          <PokemonCard src="searchResult" pokemon={searchResult} />
        )
      )}
    </>
  );
};

export default PokedexManager;
