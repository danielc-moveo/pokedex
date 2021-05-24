import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { fetchAndProcessPokemonData } from "../../api/pokeapi";
import { ProcessedPokemonFullData } from "../../types/interface";
import { Card, Sprite } from "../layout/CommonStyles";
import StatsDisplay from "../layout/StatsDisplay";
import { typesDictionary } from "./dictionary";

const PokemonContainer = styled.div`
  display: flex;
  background: #f7f7f9;
  max-width: 800px;
  margin: 40px auto;
  height: 350px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: auto;
    width: auto;
  }
`;

const DetailsContainer = styled.div`
  border-left: 1px solid #d7d7d7;
  margin: 48px 35px;
  padding-left: 35px;
`;

const Title = styled.div`
  font-family: Roboto;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  margin-bottom: 9px;
  color: #373299;
  font-weight: bold;
`;

const Description = styled.span`
  font-size: 18px;
  font-family: Roboto;
  font-weight: 400;
  line-height: 21px;
  color: #020166;
  display: block;
  margin-bottom: 45px;
`;

const Id = styled.span`
  font-size: 18px;
  font-family: Roboto;
  font-weight: 400;
  line-height: 21px;
  color: #373299;
  margin: 10px 0 10px 10px;
`;

const BackButton = styled.button`
  font-size: 20px;
  color: white;
  margin: 20px auto;
  display: block;
  width: 100px;
  height: 35px;
  border-radius: 9px;
  border: 2px solid #373299;
  background-color: #ffce31;
`;

//make sure description is not same like stats - duplicate..
const PokemonDisplay = () => {
  const history = useHistory();
  const [pokemonData, setPokemonData] =
    useState<null | ProcessedPokemonFullData>(null);
  const [error, setError] = useState<string | null>(null);
  const isLoading = !pokemonData && !error;

  const handleBackButton = () => {
    history.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const pokemonName = history.location.pathname.split("/")[1];
        const pokemonData = await fetchAndProcessPokemonData(pokemonName);
        setPokemonData(pokemonData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [history]);
  return (
    <>
      {error}
      {isLoading
        ? "Loading..."
        : pokemonData && (
            <PokemonContainer>
              <Id>{`#${pokemonData.id}`}</Id>

              <Card isSearchResult={false} isPokemonDisplayPage={true}>
                <Sprite
                  isPokemonDisplayPage={true}
                  src={pokemonData.sprite}
                  alt=""
                />
                <span style={{ marginBottom: "10px", fontSize: "32px" }}>
                  {pokemonData.name.charAt(0).toUpperCase() +
                    pokemonData.name.slice(1)}
                </span>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {pokemonData.types.map(({ name }, i) => (
                    <button
                      key={i}
                      style={{
                        fontSize: "20px",
                        color: "white",
                        margin: "15px 5px",
                        width: "100px",
                        height: "35px",
                        borderRadius: "9px",
                        border: "none",
                        backgroundColor: typesDictionary[name],
                      }}
                    >
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </button>
                  ))}
                </div>
              </Card>
              <DetailsContainer>
                <Title>Description</Title>
                <Description>{pokemonData.details}</Description>
                <Title>Stats</Title>
                {<StatsDisplay stats={pokemonData.stats} />}
              </DetailsContainer>
            </PokemonContainer>
          )}
      <BackButton onClick={handleBackButton}>Back</BackButton>
    </>
  );
};

export default PokemonDisplay;
