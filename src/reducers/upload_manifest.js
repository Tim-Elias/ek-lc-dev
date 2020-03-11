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
  upload_in_one: {label:"Загрузка каждой накладной", value: false },
  consolidate_checkbox_index: 0

}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    case 'reset_upload_manifest_data': return initialState
    case 'set_consolidate_checkbox_index': return { ...state, consolidate_checkbox_index: action.payload }
    case 'set_text_area': return { ...state, text_area: action.payload }
    case 'set_upload_in_one': return { ...state, upload_in_one: action.payload, data: [], disp_data: [] }
    case 'upload_manifest_reset_state': return  initialState 
    case 'set_import_template': return { ...state, import_template: action.payload }
    case 'set_default_template': return { ...state, default_template: action.payload }
    case 'set_disp_data': return { ...state, disp_data: action.payload }

    case 'upload_manifest_check_checkbox': return { ...state, data: state.data.map((el,index)=>{
      
      if (index === action.payload.element_index) {
        return el.map((cell,cell_index)=>{
         
          if(cell_index === action.payload.cell_index) {
           
            return !cell
          } else {
        
            return cell
          }
        })
      } else {
       
        return el
      }
    }) }


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
      let consolidate_checkbox_index = 0
      chars.forEach(element => {
        let el = element.split(String.fromCharCode(9))
        if(state.upload_in_one.value){
          el.push(false)
          consolidate_checkbox_index = el.length - 1
        }
        data.push(
          el
          )
          // data.push(false)
      })

      return { ...state, chars: chars, data: data, consolidate_checkbox_index: consolidate_checkbox_index }

    case 'add_data_upload_manifest':
      state.data.push(action.payload)
      // return { ...state, data: state.data};
    default: return state
  }
}
