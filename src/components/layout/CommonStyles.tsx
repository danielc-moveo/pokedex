import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 150px;
  width:250px;
  cursor: ${({ isPokemonDisplayPage }: { isPokemonDisplayPage: boolean }) =>
    isPokemonDisplayPage ? "unset" : "pointer"};
  border: ${({ isPokemonDisplayPage }: { isPokemonDisplayPage: boolean }) =>
    isPokemonDisplayPage ? "" : "1px solid black"};
  font-family-Roboto;
  flex-basis: 21%;
  text-align: center;
  font-size:22px;
  line-height:25px;
  font-weight:400;
  color:#373299;
  margin: ${({
    isSearchResult,
  }: {
    isPokemonDisplayPage: boolean;
    isSearchResult: boolean;
  }) => (isSearchResult ? "auto" : "5px")};
`;

export const Sprite = styled.img`
  width: ${({ isPokemonDisplayPage }: { isPokemonDisplayPage: boolean }) =>
    isPokemonDisplayPage ? "200px" : "80px"};
  height: ${({ isPokemonDisplayPage }: { isPokemonDisplayPage: boolean }) =>
    isPokemonDisplayPage ? "200px" : "80px"};
  margin: auto;
`;
