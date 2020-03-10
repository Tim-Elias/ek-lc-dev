const initialState = {
  is_new: false,
  action: null,
  data: {},
  cargo: [],
  show_history: false,
  history: [],
  history_loading: false,

}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    case 'set_disp_history_loading': return { ...state, history_loading: action.payload }
    case 'set_disp_history': return { ...state, history: action.payload }
    case 'set_disp_show_history': return { ...state, show_history: action.payload }
    case 'set_data_disp': return { ...state, data: action.payload[0], cargo: action.payload[1] }
    case 'set_date_to_storage': return { ...state, getdispstatedateto: action.payload }
    case 'set_date_from_storage': return { ...state, getdispstatedatefrom: action.payload }
    case 'set_list_storage': return { ...state, list: action.payload }
    case 'set_active_storage': return { ...state, active: action.payload }
    case 'set_action': return { ...state, action: action.payload }
    default: return state
  }
}
