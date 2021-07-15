import React from "react";
import { Switch, Route } from "react-router-dom";
import routes from "./constants/routes.json";
import MainPage from "./containers/MainPage";

export default function Routes() {
  return (
    <Switch>
      <Route path={routes.MAIN} component={MainPage} />
    </Switch>
  );
}
