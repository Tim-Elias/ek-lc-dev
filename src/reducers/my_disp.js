
  const today = new Date
  let mm = today.getMonth() + 1; // getMonth() is zero-based
  let dd = today.getDate();

  const y = today.getFullYear()

  if (mm<10) { mm = '0' + mm }
  if (dd<10) {dd = '0' + dd}
        
  const date = y+'-'+mm+'-'+dd


const initialState = {
    data: [],
    date_from: date,
    date_to: date,
    active_row: -1
  
  }
  
  export default function dispatch (state = initialState, action) {
    switch (action.type) {
      case 'set_my_disp_active_row': return { ...state, active_row: action.payload }
      case 'set_my_disp_date_from': return { ...state, date_from: action.payload }
      case 'set_my_disp_date_to': return { ...state, date_to: action.payload }
      case 'set_my_disp_data': return { ...state, data: action.payload }
  
      default: return state
    }
  }
  