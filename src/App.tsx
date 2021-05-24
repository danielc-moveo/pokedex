import "./App.css";
import PokedexManager from "./components/pages/PokedexManager";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import PokemonDisplay from "./components/pages/PokemonDisplay";
import styled from "styled-components";
import PokadexLogo from "./assets/Logo.svg";

const Logo = styled.img`
  margin-top: 10px;
  display: block;
  margin: 40px auto;
  @media (max-width: 500px) {
    width: 250px;
  }
`;

const App = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Logo src={PokadexLogo} alt="" />
      <Router>
        <Switch>
          <Route exact path="/" component={PokedexManager} />
          <Route exact path="/:pokemon_id" component={PokemonDisplay} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
