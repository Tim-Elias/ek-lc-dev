import { AppAction } from "./appStore";

interface general_store_interface {
  mobile: boolean;
  use_width: boolean;
  last_window: string[];
  active_window: string;
  hidemenu: boolean;
  wait: boolean;
  modal_show: boolean;
  modal_text: string;
  modal_header: string;
  full_screen: boolean;
  hold_shift: boolean;
  active_loader: boolean;
}

const initialState: general_store_interface = {
  mobile: false,
  use_width: true,
  last_window: [],
  active_window: "home",
  hidemenu: false,
  wait: false,
  modal_show: false,
  modal_text: "",
  modal_header: "",
  full_screen: false,
  hold_shift: false,

  active_loader: false,
};

export default function general(state = initialState, action: AppAction) {
  switch (action.type) {
    case "set_active_loader":
      return { ...state, active_loader: action.payload };
    case "M_ACTIVE":
      return { ...state, mobile: action.payload };
    case "set_mobile_menu":
      return { ...state, active_window: action.payload };
    case "set_use_width":
      return { ...state, use_width: action.payload };
    case "set_active_window":
      return { ...state, active_window: action.payload };
    case "set_hold_shift":
      return { ...state, hold_shift: action.payload };
    case "set_modal_show":
      return { ...state, modal_show: action.payload };
    case "set_modal_text":
      return { ...state, modal_text: action.payload };
    case "set_modal_header":
      return { ...state, modal_header: action.payload };
    case "set_last_window":
      return { ...state, last_window: [...state.last_window, action.payload] };
    case "pop_last_window":
      const windows = [...state.last_window];
      windows.pop();
      return { ...state, last_window: windows };
    case "hidemenu":
      return { ...state, hidemenu: !state.hidemenu };
    case "set_wait":
      return { ...state, wait: action.payload };
    case "set_full_screen":
      return { ...state, full_screen: !state.full_screen };
    default:
      return state;
  }
}
