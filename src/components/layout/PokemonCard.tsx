import { ProcessedPokemon } from "../../types/interface";
import { useHistory, withRouter, RouteComponentProps } from "react-router";
import { Card, Sprite } from "./CommonStyles";

type PokemonCardProps = {
  pokemon: ProcessedPokemon;
  src: string;
};

const PokemonCard = ({
  pokemon,
  src,
}: RouteComponentProps & PokemonCardProps) => {
  const { name, id, sprite } = pokemon;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/${name}`);
  };

  const parsedName = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Card
      isSearchResult={src === "searchResult"}
      isPokemonDisplayPage={false}
      onClick={handleClick}
    >
      <span
        style={{ textAlign: "start", margin: "10px 0 0 10px" }}
      >{`#${id}`}</span>
      <Sprite isPokemonDisplayPage={false} src={sprite} alt="" />
      <span style={{ marginBottom: "10px" }}>{parsedName}</span>
    </Card>
  );
};
export default withRouter(PokemonCard);
