import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";
import Admin from "./pages/Admin";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";

const App = () => {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Home />
      </Route>

      <Route exact={true} path="/room/:id?">
        <Room />
      </Route>

      <Route exact={true} path="/admin/:id">
        <Admin />
      </Route>

      <Route>
        <div>This is 404</div>
      </Route>
    </Switch>
  );
};

export default App;
