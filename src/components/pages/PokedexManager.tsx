import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchAndProcessPokemons, ProcessedPokemon } from "../../api/pokeapi";
import PokemonCard from "../layout/PokemonCard";

const Container = styled.div`
  display: flex;
  height: 100%;
  margin-top: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const PokedexManager = () => {
  const [pokemonsData, setPokemonsData] = useState<ProcessedPokemon[] | []>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [skip, setSkip] = useState<number | null>(null);

  const handleLoadMore = () => {
    setSkip(pokemonsData.length);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { pokemons } = await fetchAndProcessPokemons(skip);
        setPokemonsData((prev) => [...prev, ...pokemons]);
        setIsLoading(false);
      } catch (error) {
        debugger;
        console.log(error);
      }
    };
    fetchData();
  }, [skip]);

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={handleLoadMore}>Load More</button>

      {isLoading ? (
        "Loading..."
      ) : (
        <Container>
          {pokemonsData?.map((pokemon: ProcessedPokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </Container>
      )}
    </div>
  );
};

export default PokedexManager;
