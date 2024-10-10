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
  type_search: "true",
  search: "",

  ySteps: 3,
  data: [],
  date_from: date,
  date_to: date,
  num_filter: "",
  sender_address: "",
  rec_address: "",
  sender_company: "",
  rec_company: "",
  active_row: -1,
  date_sort_type: false,
  focus_input_send_city: false,
  focus_input_rec_city: false,
  focus_input_del_method: false,
  focus_input_status: false,
  filter_common_string: "",
  send_city_filter: [],
  rec_city_filter: [],
  del_method_filter: [],
  status_filter: [],

  show_skan: false,
  skan_loading: false,
  skan: "",
  show_all: false,

  error_mesage: "",

  //send_city_filter: [{id:0,check:true,name:"Новосибирск"},{id:1,check:false,name:"Томск"},{id:2,check:true,name:"Бийск"}]
};

export default function dispatch(state = initialState, action) {
  switch (action.type) {
    case "set_my_disp_skan_loading":
      return { ...state, skan_loading: action.payload };
    case "set_my_disp_show_skan":
      return { ...state, show_skan: action.payload };
    case "set_my_disp_skan":
      return { ...state, skan: action.payload };
    case "set_my_disp_show_all":
      return { ...state, show_all: action.payload };

    case "set_show_my_disp_history":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.Num === action.payload.Num) {
            return { ...item, showHistory: action.payload.value };
          } else {
            return { ...item };
          }
        }),
      };

    case "set_my_disp_history":
      return {
        ...state,
        data: state.data.map((item) => {
          if (item.Num === action.payload.Num) {
            return {
              ...item,
              showHistory: true,
              history: action.payload.history,
            };
          } else {
            return { ...item };
          }
        }),
      };

    case "set_erroe_mesage":
      return { ...state, error_mesage: action.payload };

    case "set_type_search":
      if (action.payload === "true") {
        const type = true;
        return { ...state, type_search: type, search: "" };
      } else {
        const type = false;
        return { ...state, type_search: type, search: "" };
      }

    case "set_search":
      return { ...state, search: action.payload };

    case "set_my_disp_data": {
      let send_city_filter_data = [];
      let rec_city_filter_data = [];
      let del_method_filter_data = [];
      let status_filter_data = [];

      send_city_filter_data = action.payload
        .map((el) => {
          return el.SendCity;
        })
        .filter((el, index, arr) => arr.indexOf(el) === index)
        .sort()
        .map((el, index) => {
          return { id: index, name: el, check: true };
        });

      rec_city_filter_data = action.payload
        .map((el) => {
          return el.RecCity;
        })
        .filter((el, index, arr) => arr.indexOf(el) === index)
        .sort()
        .map((el, index) => {
          return { id: index, name: el, check: true };
        });

      del_method_filter_data = action.payload
        .map((el) => {
          return el.DelMethod;
        })
        .filter((el, index, arr) => arr.indexOf(el) === index)
        .sort()
        .map((el, index) => {
          return { id: index, name: el, check: true };
        });

      status_filter_data = action.payload
        .map((el) => {
          return el.Status;
        })
        .filter((el, index, arr) => arr.indexOf(el) === index)
        .sort()
        .map((el, index) => {
          return { id: index, name: el, check: true };
        });

      return {
        ...state,
        data: action.payload,
        send_city_filter: send_city_filter_data,
        rec_city_filter: rec_city_filter_data,
        del_method_filter: del_method_filter_data,
        status_filter: status_filter_data,
      };
    }

    case "set_my_disp_active_row":
      return { ...state, active_row: action.payload };
    case "set_my_disp_date_from":
      return { ...state, date_from: action.payload };
    case "set_my_disp_date_to":
      return { ...state, date_to: action.payload };

    //case 'set_my_disp_date_sort': return{ ...state, date_sort_type: !state.date_sort_type }

    //---Произвольный ввод
    case "set_my_disp_num_filter":
      return { ...state, num_filter: action.payload };
    case "set_my_disp_sender_address":
      return { ...state, sender_address: action.payload };
    case "set_my_disp_rec_address":
      return { ...state, rec_address: action.payload };

    case "set_my_disp_rec_company":
      return { ...state, rec_company: action.payload };
    case "set_my_disp_sender_company":
      return { ...state, sender_company: action.payload };

    //---Строгий выбор из списка
    case "set_my_disp_focus_all_default":
      return {
        ...state,
        num_filter: state.num_filter.map((el, index) => {
          return { id: index, name: el, check: true };
        }),
        sender_address: state.sender_address.map((el, index) => {
          return { id: index, name: el, check: true };
        }),
        rec_address: state.rec_address.map((el, index) => {
          return { id: index, name: el, check: true };
        }),
        date_sort_type: false,
        focus_input_send_city: false,
        focus_input_rec_city: false,
        focus_input_del_method: false,
        focus_input_status: false,
      };
    case "set_my_disp_focus_input_send_city":
      return {
        ...state,
        focus_input_send_city: !state.focus_input_send_city,
        focus_input_rec_city: false,
        focus_input_del_method: false,
        focus_input_status: false,
      };
    case "set_my_disp_send_city_filter_default":
      return {
        ...state,
        send_city_filter: state.send_city_filter.map((el) => {
          if (action.payload === "select") {
            return { ...el, check: true };
          } else return { ...el, check: false };
        }),
      };

    case "set_my_disp_focus_input_rec_city":
      return {
        ...state,
        focus_input_rec_city: !state.focus_input_rec_city,
        focus_input_send_city: false,
        focus_input_del_method: false,
        focus_input_status: false,
      };
    case "set_my_disp_rec_city_filter_default":
      return {
        ...state,
        rec_city_filter: state.rec_city_filter.map((el) => {
          if (action.payload === "select") {
            return { ...el, check: true };
          } else return { ...el, check: false };
        }),
      };

    case "set_my_disp_focus_input_del_method":
      return {
        ...state,
        focus_input_del_method: !state.focus_input_del_method,
        focus_input_send_city: false,
        focus_input_rec_city: false,
        focus_input_status: false,
      };
    case "set_my_disp_del_method_filter_default":
      return {
        ...state,
        del_method_filter: state.del_method_filter.map((el) => {
          if (action.payload === "select") {
            return { ...el, check: true };
          } else return { ...el, check: false };
        }),
      };

    case "set_my_disp_focus_input_status":
      return {
        ...state,
        focus_input_status: !state.focus_input_status,
        focus_input_send_city: false,
        focus_input_rec_city: false,
        focus_input_del_method: false,
      };
    case "set_my_disp_status_filter_default":
      return {
        ...state,
        status_filter: state.status_filter.map((el) => {
          if (action.payload === "select") {
            return { ...el, check: true };
          } else return { ...el, check: false };
        }),
      };

    case "set_check_my_disp_send_city":
      return {
        ...state,
        send_city_filter: state.send_city_filter.map((el) => {
          if (el.id === action.payload) {
            return { ...el, check: !el.check };
          } else {
            return el;
          }
        }),
      };

    case "set_check_my_disp_rec_city":
      return {
        ...state,
        rec_city_filter: state.rec_city_filter.map((el) => {
          if (el.id === action.payload) {
            return { ...el, check: !el.check };
          } else {
            return el;
          }
        }),
      };

    case "set_check_my_disp_del_method":
      return {
        ...state,
        del_method_filter: state.del_method_filter.map((el) => {
          if (el.id === action.payload) {
            return { ...el, check: !el.check };
          } else {
            return el;
          }
        }),
      };

    case "set_check_my_disp_status":
      return {
        ...state,
        status_filter: state.status_filter.map((el) => {
          if (el.id === action.payload) {
            return { ...el, check: !el.check };
          } else {
            return el;
          }
        }),
      };

    default:
      return state;
  }
}
