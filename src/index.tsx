import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/appStore";

ReactDOM.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById("root"),
);

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("/serviceWorker.js").then((event) => {
//     console.log("Service worker registered", event);
//   });
// }

serviceWorker.unregister();
