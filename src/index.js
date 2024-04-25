import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  debug: true,
};

const store = createStore(
  persistReducer(persistConfig, reducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <PersistGate loading={null} persistor={persistStore(store)}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById("root")
);

serviceWorker.unregister();
