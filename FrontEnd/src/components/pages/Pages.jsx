import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Home } from "../home/Home";
import { Recipes } from "../recipes/Recipes";
import { Inventory } from "../inventory/Inventory";

export const Pages = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/recipes">
            <Recipes />
          </Route>
          <Route exact path="/inventory">
            <Inventory />
          </Route>
        </Switch>
      </Router>
    </>
  );
};
