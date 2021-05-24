import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import styled from "styled-components";
import { ProcessedPokemon } from "../../types/interface";
import PokemonCard from "./PokemonCard";

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

interface CardsDisplayProps {
  handleLoadMore: () => void;
  pokemons: ProcessedPokemon[];
}
//hasmore should be toggled by the response 'next' comming from the api

const CardsDisplay = ({ handleLoadMore, pokemons }: CardsDisplayProps) => {
  return (
    <InfiniteScroll
      loadMore={handleLoadMore}
      hasMore={true}
      initialLoad={false}
    >
      <CardsContainer>
        {pokemons?.map((pokemon: ProcessedPokemon) => (
          <PokemonCard src={'/'} key={pokemon.id} pokemon={pokemon} />
        ))}
      </CardsContainer>
    </InfiniteScroll>
  );
};

export default CardsDisplay;
