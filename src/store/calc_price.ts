interface calc_price_store_interface {
  error_mesage: string;
  calc_price_result: string;

  calc_price_send_city: string;
  calc_price_rec_city: string;

  calc_price_send_terminal_city: boolean;
  calc_price_rec_terminal_city: boolean;

  calc_price_send_terminal: boolean;
  calc_price_rec_terminal: boolean;
  calc_price_weight: string;

  calc_price_h: string;
  calc_price_w: string;
  calc_price_l: string;

  calc_price_send_terminal_list: any[];
  calc_price_rec_terminal_list: any[];

  calc_price_select_send_terminal: any;
  calc_price_select_rec_terminal: any;

  calc_price_cargo_info_type: {
    key: number;
    label: string;
    value: string;
  };
  CargoList: Array<{
    Weight: number;
    L: number;
    W: number;
    H: number;
    Q: number;
  }>;

  thermo: boolean;
  fragile: boolean;
}

const initialState: calc_price_store_interface = {
  error_mesage: "",
  calc_price_result: "",

  calc_price_send_city: "",
  calc_price_rec_city: "",

  calc_price_send_terminal_city: false,
  calc_price_rec_terminal_city: false,

  calc_price_send_terminal: false,
  calc_price_rec_terminal: false,
  calc_price_weight: "",

  calc_price_h: "",
  calc_price_w: "",
  calc_price_l: "",

  calc_price_send_terminal_list: [],
  calc_price_rec_terminal_list: [],

  calc_price_select_send_terminal: {},
  calc_price_select_rec_terminal: {},

  calc_price_cargo_info_type: {
    key: 1,
    label: "Итоговые значения",
    value: "Итоговые значения",
  },
  CargoList: [
    {
      Weight: 0,
      L: 0,
      W: 0,
      H: 0,
      Q: 1,
    },
  ],

  thermo: false,
  fragile: false,
};

export default function dispatch(
  state = initialState,
  action: { type: string; payload: any },
) {
  switch (action.type) {
    case "set_calc_price_cargo_info_type":
      return {
        ...state,
        calc_price_cargo_info_type: action.payload,
        CargoList: [
          {
            Weight: 0,
            L: 0,
            W: 0,
            H: 0,
            Q: 1,
          },
        ],
        calc_price_weight: "",
        calc_price_h: "",
        calc_price_w: "",
        calc_price_l: "",
      };

    case "add_calc_price_cargolist":
      state.CargoList.push({
        Weight: 0,
        L: 0,
        W: 0,
        H: 0,
        Q: 1,
      });

      return { ...state, CargoList: state.CargoList };

    case "set_calc_price_cargo_weight":
      return {
        ...state,
        CargoList: state.CargoList.map((el, index) => {
          if (index === action.payload.index) {
            return { ...el, Weight: action.payload.value };
          } else {
            return el;
          }
        }),
      };

    case "set_calc_price_w":
      return {
        ...state,
        CargoList: state.CargoList.map((el, index) => {
          if (index === action.payload.index) {
            return { ...el, W: action.payload.value };
          } else {
            return el;
          }
        }),
      };

    case "set_calc_price_cargoL":
      return {
        ...state,
        CargoList: state.CargoList.map((el, index) => {
          if (index === action.payload.index) {
            return { ...el, L: action.payload.value };
          } else {
            return el;
          }
        }),
      };

    case "set_calc_price_cargoH":
      return {
        ...state,
        CargoList: state.CargoList.map((el, index) => {
          if (index === action.payload.index) {
            return { ...el, H: action.payload.value };
          } else {
            return el;
          }
        }),
      };

    case "set_calc_price_cargoQ":
      return {
        ...state,
        CargoList: state.CargoList.map((el, index) => {
          if (index === action.payload.index) {
            return { ...el, Q: action.payload.value };
          } else {
            return el;
          }
        }),
      };

    case "remove_calc_price_cargo":
      return {
        ...state,
        CargoList: state.CargoList.filter((el, index) => {
          return index !== action.payload;
        }),
      };

    case "set_calc_price_error_mesage":
      return { ...state, error_mesage: action.payload };
    case "set_calc_price_result":
      return { ...state, calc_price_result: action.payload };

    case "set_calc_price_height":
      return { ...state, calc_price_h: action.payload };
    case "set_calc_price_width":
      return { ...state, calc_price_w: action.payload };
    case "set_calc_price_length":
      return { ...state, calc_price_l: action.payload };

    case "set_focus_calc_price_input_send_city":
      return { ...state, focus_calc_price_input_send_city: action.payload };
    case "set_focus_calc_price_input_rec_city":
      return { ...state, focus_calc_price_input_rec_city: action.payload };
    case "set_calc_price_send_city":
      return { ...state, calc_price_send_city: action.payload };
    case "set_calc_price_rec_city":
      return { ...state, calc_price_rec_city: action.payload };
    case "set_calc_price_weight":
      return { ...state, calc_price_weight: action.payload };

    case "set_calc_price_send_terminal_city":
      return { ...state, calc_price_send_terminal_city: action.payload };
    case "set_calc_price_rec_terminal_city":
      return { ...state, calc_price_rec_terminal_city: action.payload };
    case "set_calc_price_send_terminal":
      return { ...state, calc_price_send_terminal: action.payload };
    case "set_calc_price_rec_terminal":
      return { ...state, calc_price_rec_terminal: action.payload };

    case "set_calc_price_send_terminal_list":
      return { ...state, calc_price_send_terminal_list: action.payload };
    case "set_calc_price_rec_terminal_list":
      return { ...state, calc_price_rec_terminal_list: action.payload };

    case "set_calc_price_select_send_terminal":
      return { ...state, calc_price_select_send_terminal: action.payload };
    case "set_calc_price_select_rec_terminal":
      return { ...state, calc_price_select_rec_terminal: action.payload };

    case "set_calc_price_toggle_thermo":
      return { ...state, thermo: !state.thermo };
    case "set_calc_price_toggle_fragile":
      return { ...state, fragile: !state.fragile };

    case "clean_calc_priсe":
      return {
        error_mesage: "",
        calc_price_result: "",

        calc_price_send_city: "",
        calc_price_rec_city: "",

        calc_price_send_terminal_city: false,
        calc_price_rec_terminal_city: false,

        calc_price_send_terminal: false,
        calc_price_rec_terminal: false,
        calc_price_weight: "",

        calc_price_h: "",
        calc_price_w: "",
        calc_price_l: "",

        calc_price_send_terminal_list: [],
        calc_price_rec_terminal_list: [],

        calc_price_select_send_terminal: {},
        calc_price_select_rec_terminal: {},

        calc_price_cargo_info_type: {
          key: 1,
          label: "Итоговые значения",
          value: "Итоговые значения",
        },
        CargoList: [
          {
            Weight: 0,
            L: 0,
            W: 0,
            H: 0,
            Q: 1,
          },
        ],

        thermo: false,
        fragile: false,
      };

    default:
      return state;
  }
}
