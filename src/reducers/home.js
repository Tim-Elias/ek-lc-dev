const initialState = {
    
    active_menu_item: 'main',
    org_type: true,
    oop:  {label:"ООО", value:"ООО"},
    track_number: '',

    calc_send_city:{},
    calc_rec_city:{},
    calc_weight:0,

    calc_result:[],
    position: {x:0,y:-50,z:-80},
    rotation:{x:0,y:2,z:0},	
    
    map: {
      center: {
        lat: 54.02,
        lng: 82.56
      },
      zoom: 5,
    },

    
    directions:null,
      
    
    
  
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


      case 'set_rotation': return { ...state, rotation: action.payload }
      case 'set_directions': return { ...state, directions: action.payload }

      case 'rotate': return { ...state, rotation: {...state.rotation, y:state.rotation.y+0.005} }

     
      default: return state
    }
  }