const initialState = {
    home_service_selector: 1
  }

  export default function dispatch (state = initialState, action) {
    switch (action.type) {
      case 'set_home_service_selector': return { ...state, home_service_selector: action.payload }
      
      default: return state
    }
  }