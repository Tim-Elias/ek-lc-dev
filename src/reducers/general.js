const initialState = {
  last_window: [],
  active_window: 'home',
  hidemenu:false,
  wait: false,
  modal_show: false,
  modal_text:'',
  modal_header:'',
  full_screen: false,

}

export default function general (state = initialState, action) {
  switch (action.type) {
    case 'set_active_window': return { ...state, active_window: action.payload }
    case 'set_modal_show': return { ...state, modal_show: action.payload }
    case 'set_modal_text': return { ...state, modal_text: action.payload }
    case 'set_modal_header': return { ...state, modal_header: action.payload }
    case 'set_last_window': 
      state.last_window.push(action.payload)
      return { ...state, last_window: state.last_window}
    case 'pop_last_window': 
      state.last_window.pop()
      return { ...state, last_window: state.last_window} 
    case 'hidemenu': return { ...state, hidemenu: !state.hidemenu }
    case 'set_wait': return { ...state, wait: action.payload }
    case 'set_full_screen': return { ...state, full_screen: !state.full_screen }
    default: return state
  }
}
