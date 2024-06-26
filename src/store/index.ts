import { combineReducers } from "redux";
import login from "./login";
import general from "./general";
import storage from "./storage";
import disp from "./disp";
import get_manifest from "./get_manifest";
import manifest from "./manifest";
import reciept from "./reciept";
import send_manifest from "./send_manifest";
import mutual from "./mutual";
import create_disp from "./create_disp";
import upload_manifest from "./upload_manifest";
import my_disp from "./my_disp";
import order from "./order";
import templates from "./templates";
import disp_map from "./disp_map";
import home_ek from "./home_ek";
import storage_reciept from "./storage_reciept";
import movement from "./movement";
import check from "./check";
import m_create_disp from "./m_create_disp";
import calc_price from "./calc_price";
import home from "./home";

export const rootReducer = combineReducers({
  login,
  general,
  storage,
  disp,
  manifest,
  get_manifest,
  reciept,
  send_manifest,
  mutual,
  create_disp,
  upload_manifest,
  my_disp,
  order,
  templates,
  disp_map,
  home_ek,
  storage_reciept,
  movement,
  check,
  m_create_disp,
  calc_price,
  home,
});

export type IState = ReturnType<typeof rootReducer>;
