const initialState = {

    
    list: [],
    check_data: {},

}

export default function dispatch(state = initialState, action) {
    switch (action.type) {
        case 'set_check_list': return { ...state, list: action.payload }
        case 'set_check_data': return { ...state, check_data: action.payload }
        default: return state
    }
}