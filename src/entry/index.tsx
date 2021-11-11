import React, { Suspense } from "react";
import ReactDOM from "react-dom";

const LazyHome = React.lazy(
  () => import(/* webpackChunkName: "app" */ "@transquant/home")
);

const home = (
  <Suspense fallback={<div />}>
    <LazyHome />
  </Suspense>
);

ReactDOM.render(home, document.getElementById("root"));
