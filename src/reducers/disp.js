const today = new Date()
let mm = today.getMonth() + 1; // getMonth() is zero-based
let dd = today.getDate();

const y = today.getFullYear()

if (mm < 10) { mm = '0' + mm }
if (dd < 10) { dd = '0' + dd }

const date = y + '-' + mm + '-' + dd

const initialState = {
  FIO_Customer: '',
  delivery_date: date,
  cash_accepted: '',
  comment: '',
  
  
  is_new: false,
  action: null,
  data: {},
  cargo: [],
  show_history: false,
  history: [],
  history_loading: false,
  show_remove_modal: false,
  text_remove_modal: '',
  remove_modal_loading: false,
  remove_confirm: false,
  lat:'',
  lng:'',
  search_box:'',
  

}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    case 'set_disp_comment': return { ...state, comment: action.payload }
    case 'set_disp_cash': return { ...state, cash_accepted: action.payload }
    case 'set_disp_FIO': return { ...state, FIO_Customer: action.payload }
    case 'set_disp_date': return { ...state, delivery_date: action.payload }

    case 'set_disp_lat_lng': return { ...state, lat: action.payload.lat, lng: action.payload.lng}
    case 'set_disp_search_box': return { ...state, search_box: action.payload}
    case 'set_disp_history_loading': return { ...state, history_loading: action.payload }
    case 'set_disp_history': return { ...state, history: action.payload }
    case 'set_disp_show_history': return { ...state, show_history: action.payload }

    case 'set_disp_remove_modal_loading': return { ...state, remove_modal_loading: action.payload }
    case 'set_disp_text_remove_modal': return { ...state, text_remove_modal: action.payload }
    case 'set_disp_show_remove_modal': return { ...state, show_remove_modal: action.payload }

    case 'set_disp_remove_confirm': return { ...state, remove_confirm: action.payload }

    case 'set_data_disp': return { ...state, data: action.payload[0], cargo: action.payload[1],lat:action.payload[0].Lat, lng:action.payload[0].Lng, search_box: action.payload[0].RecCity + " "+ action.payload[0].RecAdress }
    case 'set_date_to_storage': return { ...state, getdispstatedateto: action.payload }
    case 'set_date_from_storage': return { ...state, getdispstatedatefrom: action.payload }
    case 'set_list_storage': return { ...state, list: action.payload }
    case 'set_active_storage': return { ...state, active: action.payload }
    case 'set_action': return { ...state, action: action.payload }
    default: return state
  }
}
