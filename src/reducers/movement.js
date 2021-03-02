const initialState = {
    date_start: '',
    date_end: '',
    balance_start: '0.00',
    balance_end: '1000',

    cash_for_period: '1000',
}

export default function dispatch(state = initialState, action) {
    switch (action.type) {
        case 'set_date_start': return { ...state, date_start: action.payload }
        case 'set_date_end': return { ...state, date_end: action.payload }

        default: return state
    }
}
