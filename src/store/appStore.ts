import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from ".";

const persistConfig = {
  key: "root",
  storage,
  debug: true,
  blacklist: [
    "general",
    "storage",
    "disp",
    "manifest",
    "get_manifest",
    "reciept",
    "send_manifest",
    "mutual",
    "create_disp",
    "upload_manifest",
    "my_disp",
    "order",
    "disp_map",
    "home_ek",
    "storage_reciept",
    "movement",
    "check",
    "m_create_disp",
    "calc_price",
    "home",
  ],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type AppAction = { type: string; payload: any };
