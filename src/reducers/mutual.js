const today = new Date
  let mm = today.getMonth() + 1; // getMonth() is zero-based
  let dd = today.getDate();

  const y = today.getFullYear()

  if (mm<10) { mm = '0' + mm }
  if (dd<10) {dd = '0' + dd}
        
  const date = y+'-'+mm+'-'+dd

const initialState = {
  data: [],
  total: 0,
  error: '',
  active_row: -1,
  date_from: date,
  date_to: date,
}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    case 'set_mutual_error': return { ...state, error: action.payload }
    case 'set_mutual_active_row': return { ...state, active_row: action.payload }
    case 'set_data_mutual_agent': return { ...state, data: action.payload.data, total: action.payload.total }
    case 'set_data_mutual': return { ...state, data: action.payload }
    case 'set_mutual_date_to': return { ...state, date_to: action.payload }
    case 'set_mutual_date_from': return { ...state, date_from: action.payload }
    default: return state
  }
}
