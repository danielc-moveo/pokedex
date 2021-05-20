import "./App.css";
import PokedexManager from "./components/pages/PokedexManager";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import PokemonDisplay from "./components/pages/PokemonDisplay";

const App = () => {
  return (
    <div style={{border:'3px solid black', height:'100%'}}>
      --Logo-
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
