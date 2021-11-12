import { inject, observer } from "mobx-react";
import React, { PureComponent } from "react";

@inject("appCenterStore")
@observer
class Home extends PureComponent<any> {
  render() {
    return <div>home</div>;
  }
}

export default Home;
