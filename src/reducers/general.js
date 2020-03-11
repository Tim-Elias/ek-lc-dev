const initialState = {
  last_window: null,
  active_window: 'home',
  hidemenu:false,
  wait: false,
  error_show: false,
  error_text:'',

}

export default function general (state = initialState, action) {
  switch (action.type) {
    case 'set_active_window': return { ...state, active_window: action.payload }
    case 'set_error_show': return { ...state, error_show: action.payload }
    case 'set_error_text': return { ...state, error_text: action.payload }
    case 'set_last_window': return { ...state, last_window: action.payload }
    case 'hidemenu': return { ...state, hidemenu: !state.hidemenu }
    case 'set_wait': return { ...state, wait: action.payload }
    default: return state
  }
}
