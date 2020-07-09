const initialState = {

    list:[],
    barcode: '',

}

export default function dispatch(state = initialState, action) {
    switch (action.type) {
        case 'test_list_add_item': return { ...state, list: [...state.list, action.payload] }
        case 'set_test_barcode': return { ...state, barcode: action.payload }
        default: return state
    }
}