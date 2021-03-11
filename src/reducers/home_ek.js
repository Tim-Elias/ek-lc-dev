const initialState = {
    home_service_selector: 1,
    error_mesage:"",
    focus_calc_input_send_city: false,
    focus_calc_input_rec_city:false,
    calc_send_city: "",
    calc_rec_city:"",
    calc_weight: "",

    h: "",
    w: "",
    l: "",
  }

  export default function dispatch (state = initialState, action) {
    switch (action.type) {
      case 'set_height': return { ...state, h: action.payload }
      case 'set_width': return { ...state, w: action.payload }
      case 'set_length': return { ...state, l: action.payload }

      case 'set_home_service_selector': return { ...state, home_service_selector: action.payload, error_mesage:"", focus_calc_input_send_city: false, focus_calc_input_rec_city:false}
      case 'set_home_error_mesage': return { ...state, error_mesage: action.payload }
      case 'set_focus_calc_input_send_city': return { ...state, focus_calc_input_send_city: action.payload }
      case 'set_focus_calc_input_rec_city': return { ...state, focus_calc_input_rec_city: action.payload }
      case 'set_calc_send_city': return { ...state, calc_send_city: action.payload }
      case 'set_calc_rec_city': return { ...state, calc_rec_city: action.payload }
      case 'set_calc_weight': return { ...state, calc_weight: action.payload }
      default: return state
    }
  }