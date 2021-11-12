import React, { Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

const LazyHome = React.lazy(
  () => import(/* webpackChunkName: "app" */ "@lesscode/home")
);

const routes = (
  <Router>
    <Switch>
      <Route>
        <Suspense fallback={<div />}>
          <LazyHome />
        </Suspense>
      </Route>
    </Switch>
  </Router>
);

export default routes;
