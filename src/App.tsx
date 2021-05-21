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

const Logo = styled.div`
  text-align: center;
  margin-top: 10px;
`;
const App = () => {
  
 
  return (
    <div style={{ height: "100%" }}>
      <Logo>--Logo-</Logo>
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
