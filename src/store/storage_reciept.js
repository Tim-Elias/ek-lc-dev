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
  barcode: "",
  task_type: "",
  task_date: "",
  task_value: "",
  customer: "",
  zone_list: [],
  selected_zone: "",
  storage: {
    name: "",
    id: "",
  },
  rec_city: "",
  rec_name: "",
  rec_adress: "",
  rec_district: "",
  status_type: null,
  status_message: "",
  target_date: date,
  num: "",
  done_sound: undefined,
  err_sound: undefined,
  funk_sound: undefined,

  sound: false,
  qr: false,
  inputMode: "none",

  disp_list: [],
};

export default function dispatch(state = initialState, action) {
  switch (action.type) {
    case "storage_reciept_add_disp_list":
      try {
        action.payload.task_date = action.payload.task_date.substr(0, 10);
      } catch (error) {
        console.log(error);
      }
      return { ...state, disp_list: [...state.disp_list, action.payload] };

    case "storage_reciept_delete_list_item":
      return {
        ...state,
        disp_list: state.disp_list.filter(
          (item, index) => index !== action.payload,
        ),
      };

    case "storage_reciept_clear_list":
      return { ...state, disp_list: [] };

    case "storage_reciept_sound":
      return { ...state, sound: action.payload };

    case "storage_reciept_inputMode":
      if (state.inputMode === "none") {
        return { ...state, inputMode: "text" };
      } else {
        return { ...state, inputMode: "none" };
      }

    case "storage_reciept_qr":
      return { ...state, qr: action.payload };

    case "storage_reciept_set_barcode":
      return {
        ...state,
        barcode: action.payload,
        done_sound: undefined,
        err_sound: undefined,
        funk_sound: undefined,
      };
    case "storage_reciept_set_task_type":
      return { ...state, task_type: action.payload };
    case "storage_reciept_set_task_date":
      return { ...state, task_date: action.payload };
    case "storage_reciept_set_task_value":
      return { ...state, task_value: action.payload };
    case "storage_reciept_set_zone_list":
      return { ...state, zone_list: action.payload };
    case "storage_reciept_set_selected_zone":
      return { ...state, selected_zone: action.payload };
    case "storage_reciept_set_storage":
      return { ...state, storage: action.payload };
    case "storage_reciept_set_rec_city":
      return { ...state, rec_city: action.payload };

    case "storage_reciept_set_rec_name":
      return { ...state, rec_name: action.payload };
    case "storage_reciept_set_rec_adress":
      return { ...state, rec_adress: action.payload };
    case "storage_reciept_set_rec_district":
      return { ...state, rec_district: action.payload };
    case "storage_reciept_set_status_type":
      return { ...state, status_type: action.payload };
    case "storage_reciept_set_status_message":
      return { ...state, status_message: action.payload };

    case "storage_reciept_set_result":
      return {
        ...state,
        task_type: action.payload.task_type,
        task_date: action.payload.task_date,
        task_value: action.payload.task_value,
        rec_city: action.payload.rec_city,
        rec_name: action.payload.rec_name,
        rec_adress: action.payload.rec_adress,
        rec_district: action.payload.rec_district,
        customer: action.payload.customer,
        status_type: action.payload.status_type,
        status_message: action.payload.status_message,
        num: action.payload.num,
      };
    case "storage_reciept_set_err_sound":
      return { ...state, err_sound: action.payload };
    case "storage_reciept_set_done_sound":
      return { ...state, done_sound: action.payload };
    case "storage_reciept_set_funk_sound":
      return { ...state, funk_sound: action.payload };
    case "storage_reciept_sound_off":
      return {
        ...state,
        done_sound: undefined,
        err_sound: undefined,
        funk_sound: undefined,
      };

    default:
      return state;
  }
}
