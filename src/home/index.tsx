import { Provider } from "mobx-react";
import React from "react";
import IHome from "./components";
import { appCenterStore } from "./stores";

function Home() {
  return (
    <Provider appCenterStore={appCenterStore}>
      <IHome />
    </Provider>
  );
}

export default Home;
