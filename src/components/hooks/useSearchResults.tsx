import { useState, useEffect } from "react";
import { fetchPokemonBySearchField } from "../../api/pokeapi";
import { ProcessedPokemon } from "../../types/interface";

interface UseSearchProps {
  searchField: string;
  reset: () => void;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}
const useSearchResults = ({
  searchField,
  reset,
  setErrors,
}: UseSearchProps) => {
  const [searchResult, setSearchResults] =
    useState<null | ProcessedPokemon>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchField) setSearchResults(null);
      else {
        reset();
        try {
          const { id, sprite, name } = await fetchPokemonBySearchField(
            searchField
          );
          setSearchResults({ id, sprite, name });
        } catch (error) {
          if (error.response.status === 404) {
            setSearchResults(null);
            setErrors((prev) => [
              ...prev,
              `No Results for ${searchField}... try a different name or id`,
            ]);
          }
        }
      }
    };

    fetchData();
  }, [searchField, reset, setErrors]);

  return { searchResult };
};

export default useSearchResults;
