const initialState = {
    
    active_menu_item: 'main',
    org_type: true,
    oop:  {label:"ООО", value:"ООО"},
    track_number: '',

    calc_send_city:{},
    calc_rec_city:{},
    calc_weight:0,

    calc_result:[]
    
    
  
  }
  
  export default function general (state = initialState, action) {
    switch (action.type) {
      case 'set_active_menu_item': return { ...state, active_menu_item: action.payload }
      case 'set_org_type': return { ...state, org_type: action.payload }
      case 'set_oop': return { ...state, oop: action.payload }
      case 'set_track_number': return { ...state, track_number: action.payload }

      case 'set_calc_send_city': return { ...state, calc_send_city: action.payload }
      case 'set_calc_rec_city': return { ...state, calc_rec_city: action.payload }
      case 'set_calc_weight': return { ...state, calc_weight: action.payload }

      case 'set_calc_result': return { ...state, calc_result: action.payload }


     
      default: return state
    }
  }