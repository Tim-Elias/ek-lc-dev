const initialState = {

    list:[],
    barcode: '',
    column: {
        id: 'column-1',
        numberIds: ['four', 'one', 'five', 'three', 'two'],
    },
    numbers: {
        'five': { id: 'five', content: '5' },
        'four': { id: 'four', content: '4' },
        'one': { id: 'one', content: '1' },
        'three': { id: 'three', content: '3' },
        'two': { id: 'two', content: '2' },
    }
}

export default function dispatch(state = initialState, action) {
    switch (action.type) {
        case 'test_list_add_item': return { ...state, list: [...state.list, action.payload] }
        case 'set_test_barcode': return { ...state, barcode: action.payload }
        default: return state
    }
}