const today = new Date();
let mm = today.getMonth() + 1; // getMonth() is zero-based
let dd = today.getDate();

const y = today.getFullYear();

if (mm < 10) {
  mm = "0" + mm;
}
if (dd < 10) {
  dd = "0" + dd;
}

const date = y + "-" + mm + "-" + dd;

const initialState = {
  date_start: date,
  date_end: date,

  balance: "",
  balance_start: "",
  balance_end: "",

  disp_list: [],
  select_print_disp: "",

  profit: "",
  profit_for_period: "",
};

export default function dispatch(state = initialState, action) {
  switch (action.type) {
    case "set_select_print_disp":
      return { ...state, select_print_disp: action.payload };
    case "set_date_start":
      return { ...state, date_start: action.payload };
    case "set_date_end":
      return { ...state, date_end: action.payload };
    case "set_balance":
      return { ...state, balance: action.payload };
    case "set_balance_start":
      return { ...state, balance_start: action.payload };
    case "set_balance_end":
      return { ...state, balance_end: action.payload };
    case "set_profit":
      return { ...state, profit: action.payload };
    case "set_profit_for_period":
      return { ...state, profit_for_period: action.payload };
    case "set_disp_list":
      return { ...state, disp_list: action.payload };

    default:
      return state;
  }
}
