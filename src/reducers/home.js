const initialState = {
    
    active_menu_item: 'main',
    
  
  }
  
  export default function general (state = initialState, action) {
    switch (action.type) {
      case 'set_active_menu_item': return { ...state, active_menu_item: action.payload }
     
      default: return state
    }
  }