/* The following line can be included in your src/index.js or App.js file*/
import "bootstrap/dist/css/bootstrap.min.css";
// Import sass file
import "./sass/main.scss";
// Import Route
import { Route, Switch, Redirect } from "react-router-dom";
// Import Layout
import Layout from './Components/Layout';
// Import Pages
import HomePage from "./Pages/HomePage";
import CountryPage from './Pages/CountryPage';

export default function App() {
  return (
    <div className="App">
      <Layout />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/country-list" >
          <CountryPage /> 
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </div>
  );
}
