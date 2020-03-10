const initialState = {
  data: [],
  total: 0,
  error: ''

}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    case 'set_mutual_error': return { ...state, error: action.payload }
    case 'set_data_mutual': return { ...state, data: action.payload.data, total: action.payload.total }

    default: return state
  }
}
