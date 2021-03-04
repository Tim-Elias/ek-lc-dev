const initialState = {

    
    list: [],
    check_data: {
        qr: "",
    },

}

export default function dispatch(state = initialState, action) {
    switch (action.type) {
        case 'set_check_list': return { ...state, list: action.payload }
        case 'reset_check_list': return initialState
        case 'set_check_data': return {
            ...state, check_data: {
                ...action.payload, 
                inn: '5407478336',
                organization: 'ООО "Абсолют-Экспресс"',
                adress: "630007, г. Новосибирск, ул. Коммунистическая. д. 7",}  }
        
        default: return state
    }
}