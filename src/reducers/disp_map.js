const today = new Date()
let mm = today.getMonth() + 1; // getMonth() is zero-based
let dd = today.getDate();

const y = today.getFullYear()
if (mm<10) { mm = '0' + mm }
if (dd<10) {dd = '0' + dd}
        
const date = y+'-'+mm+'-'+dd

const initialState = {

    disp_for_del: [],
    date: date,
    terminal_list: [],
    selected_terminal: {},
    courier_list: [],
    selected_courier: null,
    assignment_mode: false,
    polygon: [],



}

export default function dispatch(state = initialState, action) {
    switch (action.type) {
        case 'set_disp_map_date': return { ...state, date: action.payload }
        case 'set_disp_map_disp_for_del': return { ...state, disp_for_del: action.payload }
        case 'select_disp_map_disp_for_del': 
        if(state.assignment_mode){
            return { ...state, disp_for_del: [...state.disp_for_del.map((el) => { if (el.Num === action.payload) { return { ...el, selected: !el.selected } } else { return el} })] }
        } else {
            return { ...state, disp_for_del: [...state.disp_for_del.map((el) => { if (el.Num === action.payload) { return { ...el, selected: true } } else { return {...el, selected: false}} })] }
        }
        case 'set_disp_map_assignment_mode': return { ...state, assignment_mode: action.payload, disp_for_del: [...state.disp_for_del.map((el) => { return( {...el, selected: false } )})] }
        case 'select_disp_map_courier': return { ...state, selected_courier: action.payload }
        case 'set_courier_list': return { ...state, courier_list: action.payload }
        case 'disp_map_reset_select': return { ...state, disp_for_del: [...state.disp_for_del.map((el) => { return { ...el, selected: false }  })],polygon: [] }
        case 'disp_map_add_polygon_point': return { ...state, polygon: [...state.polygon, action.payload ]}
        case 'select_arr_disp_for_del': return { ...state, disp_for_del: [...state.disp_for_del.map((el) => { 
            //console.log(action.payload)
            //console.log(el.Num)
            const Num = String(el.Num)
            //console.log(Num)
            const find = action.payload.findIndex(element=>{ if (element === Num) {return true}})
            //console.log(find)
            if (
                find !== -1
                ) { return { ...el, selected: true } } else { return {...el, selected: false}} })] 
        }
        
        default: return state
    }
}