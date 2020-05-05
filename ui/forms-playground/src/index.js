import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "cap-react/src/store/configureStore";
import Grommet from "grommet/components/Grommet";

import "grommet/scss/hpinc/index.scss";
import "cap-react/src/styles/styles.scss";

import Playground from "./App";

ReactDOM.render(
  <Provider store={store}>
    <Grommet>
      <Playground />
    </Grommet>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
