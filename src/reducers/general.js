const initialState = {
  last_window: null,
  active_window: 'home',
  hidemenu:false,
  wait: false

}

export default function general (state = initialState, action) {
  switch (action.type) {
    case 'set_active_window': return { ...state, active_window: action.payload }
    case 'set_last_window': return { ...state, last_window: action.payload }
    case 'hidemenu': return { ...state, hidemenu: !state.hidemenu }
    case 'set_wait': return { ...state, wait: action.payload }
    default: return state
  }
}
