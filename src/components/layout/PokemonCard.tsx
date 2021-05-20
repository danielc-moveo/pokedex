import React from "react";
import { ProcessedPokemon } from "../../api/pokeapi";
import styled from "styled-components";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  border: 1px solid black;
  margin: 5px;
  flex-basis: 21%;
`;

const Sprite = styled.img`
  width: 80px;
  height: 80px;
  margin: auto;
`;
interface PokemonCardProps {
  pokemon: ProcessedPokemon;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { name, id, sprite } = pokemon;
  return (
    <Card>
      <span style={{ textAlign: "start" }}>{`#${id}`}</span>
      <Sprite src={sprite} alt="" />
      <span style={{ marginBottom: "10px" }}>{name}</span>
    </Card>
  );
};
export default PokemonCard;
