import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./Home";
import Pizza from "./Pizza";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/pizza">
            <Pizza />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
