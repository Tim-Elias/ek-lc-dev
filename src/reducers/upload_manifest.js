const initialState = {
  text_area: '',
  text_length: 0,
  data: [],
  import_template: [],
  default_template: [],
  import_template_list: [],
  default_template_list: [],
  disp_template_list: [],
  disp_data:[],
  upload_in_one: {label:"Загрузка каждой накладной", value: false }

}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    case 'set_text_area': return { ...state, text_area: action.payload }
    case 'set_upload_in_one': return { ...state, upload_in_one: action.payload }
    case 'upload_manifest_reset_state': return  initialState 
    case 'set_import_template': return { ...state, import_template: action.payload }
    case 'set_default_template': return { ...state, default_template: action.payload }
    case 'set_disp_data': return { ...state, disp_data: action.payload }

    case 'set_disp_status': return { ...state, disp_data: state.disp_data.map((el,index)=>{
      if (el.Key === action.payload.Key){
        return {...el, Status: action.payload.Status, Num: action.payload.Num, print_data: {data:action.payload.print_data[0], cargo:action.payload.print_data[1]}}
      } else {
        return el
      }
    })}

    case 'set_disp_template_list': return { ...state, disp_template_list: action.payload }

    case 'set_import_template_list':
      if (action.payload.length === 0) {
        return { ...state, import_template_list: action.payload }
      } else {
        return { ...state, import_template_list: action.payload, import_template: action.payload[0] }
      }

    case 'set_default_template_list':
      if (action.payload.length === 0) {
        return { ...state, default_template_list: action.payload }
      } else {
        return { ...state, default_template_list: action.payload, default_template: action.payload[0] }
      }

    case 'set_data_upload_manifest':
      const chars = state.text_area.split(String.fromCharCode(10))
      const data = []
      chars.forEach(element => {
        data.push(element.split(String.fromCharCode(9)))
      })

      return { ...state, chars: chars, data: data }

    case 'add_data_upload_manifest':
      state.data.push(action.payload)
      // return { ...state, data: state.data};
    default: return state
  }
}
