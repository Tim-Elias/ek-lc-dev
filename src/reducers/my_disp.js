const initialState = {
    data: [],
    date_from: new Date,
    date_to: new Date
    
  
  }
  
  export default function dispatch (state = initialState, action) {
    switch (action.type) {
      case 'set_my_disp_date_from': return { ...state, date_from: action.payload }
      case 'set_my_disp_date_to': return { ...state, date_to: action.payload }
      case 'set_my_disp_data': return { ...state, data: action.payload }
  
      default: return state
    }
  }
  