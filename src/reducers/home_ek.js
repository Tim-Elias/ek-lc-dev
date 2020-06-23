const initialState = {
    home_service_selector: 1,
    error_mesage:""
  }

  export default function dispatch (state = initialState, action) {
    switch (action.type) {
      case 'set_home_service_selector': return { ...state, home_service_selector: action.payload, error_mesage:"" }
      case 'set_home_error_mesage': return { ...state, error_mesage: action.payload }
      default: return state
    }
  }