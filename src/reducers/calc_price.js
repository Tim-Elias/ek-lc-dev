const initialState = {
    error_mesage: "",
    calc_price_result: "",

    // focus_calc_price_input_send_city: false,
    // focus_calc_price_input_rec_city: false,
    calc_price_send_city: "",
    calc_price_rec_city: "",

    calc_price_send_terminal_city: false,
    calc_price_rec_terminal_city: false,

    calc_price_send_terminal: false,
    calc_price_rec_terminal: false,
    calc_price_weight: "",

    calc_price_h: "",
    calc_price_w: "",
    calc_price_l: "",

    calc_price_send_terminal_list: [],
    calc_price_rec_terminal_list: [],

    calc_price_select_send_terminal: {},
    calc_price_select_rec_terminal: {},
}

export default function dispatch(state = initialState, action) {
    switch (action.type) {
        case 'set_calc_price_error_mesage': return { ...state, error_mesage: action.payload }
        case 'set_calc_price_result': return { ...state, calc_price_result: action.payload }

        case 'set_calc_price_height': return { ...state, calc_price_h: action.payload }
        case 'set_calc_price_width': return { ...state, calc_price_w: action.payload }
        case 'set_calc_price_length': return { ...state, calc_price_l: action.payload }

        case 'set_focus_calc_price_input_send_city': return { ...state, focus_calc_price_input_send_city: action.payload }
        case 'set_focus_calc_price_input_rec_city': return { ...state, focus_calc_price_input_rec_city: action.payload }
        case 'set_calc_price_send_city': return { ...state, calc_price_send_city: action.payload }
        case 'set_calc_price_rec_city': return { ...state, calc_price_rec_city: action.payload }
        case 'set_calc_price_weight': return { ...state, calc_price_weight: action.payload }

        case 'set_calc_price_send_terminal_city': return { ...state, calc_price_send_terminal_city: action.payload }
        case 'set_calc_price_rec_terminal_city': return { ...state, calc_price_rec_terminal_city: action.payload }
        case 'set_calc_price_send_terminal': return { ...state, calc_price_send_terminal: action.payload }
        case 'set_calc_price_rec_terminal': return { ...state, calc_price_rec_terminal: action.payload }

        case 'set_calc_price_send_terminal_list': return { ...state, calc_price_send_terminal_list: action.payload }
        case 'set_calc_price_rec_terminal_list': return { ...state, calc_price_rec_terminal_list: action.payload }

        case 'set_calc_price_select_send_terminal': return { ...state, calc_price_select_send_terminal: action.payload }
        case 'set_calc_price_select_rec_terminal': return { ...state, calc_price_select_rec_terminal: action.payload }

        case 'clean_calc_priсe': return {
            ...state,
            error_mesage: "",
            calc_price_result: "",

            calc_price_send_city: "",
            calc_price_rec_city: "",

            calc_price_send_terminal_city: false,
            calc_price_rec_terminal_city: false,

            calc_price_send_terminal: false,
            calc_price_rec_terminal: false,
            calc_price_weight: "",

            calc_price_h: "",
            calc_price_w: "",
            calc_price_l: "",

            calc_price_send_terminal_list: [],
            calc_price_rec_terminal_list: [],

            calc_price_select_send_terminal: {},
            calc_price_select_rec_terminal: {},
        }

        default: return state
    }
}