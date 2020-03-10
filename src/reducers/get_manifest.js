const initialState = {
  list: [],
  active: null
}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    case 'set_list_get_manifest': return { ...state, list: action.payload }
    case 'set_active_get_manifest': return { ...state, active: action.payload }
    default: return state
  }
}
