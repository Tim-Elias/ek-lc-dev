const initialState = {
    PayType: "БезналичнаяОплата",
    CargoInfoType: false,
    CityList: [],
    DelMethod: 'Дверь - Дверь',
    Price: 0,

    SendCity: '',
    SendAdress: '',
    SendCompany: '',
    SendPhone: '',
    SendPerson: '',
    SendAddInfo: '',
    SendTerminal: false,
    SendSelectTerminal: {},
    SendTerminalList: [],

    RecCity: '',
    RecAdress: '',
    RecCompany: '',
    RecPhone: '',
    RecPerson: '',
    RecAddInfo: '',
    RecTerminal: false,
    RecSelectTerminal: {},
    RecTerminalList: [],

    Cargo: [{
        Weight: 0,
        L: "",
        W: "",
        H: "",
        Q: 1,
        Type: "",
        Comment: "",
    }],

    Total: "0",
    Weight: "0",
    Volume: "0",
    COD: "0",
    InsureValue: "0",

    popup: false,
    popupType: "",
}

export default function dispatch(state = initialState, action) {
    switch (action.type) {

        case 'set_popup': return { ...state, popup: action.payload }
        case 'set_popup_type': return { ...state, popupType: action.payload }

        case 'SetRecAdressMobile': return { ...state, RecAdress: action.payload }
        case 'SetRecCompanyMobile': return { ...state, RecCompany: action.payload }
        case 'SetRecPhoneMobile': return { ...state, RecPhone: action.payload }
        case 'SetRecPersonMobile': return { ...state, RecPerson: action.payload }
        case 'SetRecAddInfoMobile': return { ...state, RecAddInfo: action.payload }

        case 'SetSendAdressMobile': return { ...state, SendAdress: action.payload }
        case 'SetSendCompanyMobile': return { ...state, SendCompany: action.payload }
        case 'SetSendPhoneMobile': return { ...state, SendPhone: action.payload }
        case 'SetSendPersonMobile': return { ...state, SendPerson: action.payload }
        case 'SetSendAddInfoMobile': return { ...state, SendAddInfo: action.payload }
    
        case 'SetPriceMobile': return { ...state, Price: action.payload }

        case 'SetTotalMobile': return { ...state, Total: action.payload }
        case 'SetWeightMobile': return { ...state, Weight: action.payload }
        case 'SetVolumeMobile': return { ...state, Volume: action.payload }
        case 'SetCODMobile': return { ...state, COD: action.payload }
        case 'SetInsureValueMobile': return { ...state, InsureValue: action.payload }

        case 'SetCargoWeightMobile': return {
            ...state,
            Cargo: state.Cargo.map((el, index) => {
                if (index == action.payload.index) {
                    return { ...el, Weight: action.payload.value }
                } else {
                    return el
                }
            })
        }
        case 'SetCargoLMobile': return {
            ...state,
            Cargo: state.Cargo.map((el, index) => {
                if (index == action.payload.index) {
                    return { ...el, L: action.payload.value }
                } else {
                    return el
                }
            })
        }
        case 'SetCargoWMobile': return {
            ...state,
            Cargo: state.Cargo.map((el, index) => {
                if (index == action.payload.index) {
                    return { ...el, W: action.payload.value }
                } else {
                    return el
                }
            })
        }
        case 'SetCargoHMobile': return {
            ...state,
            Cargo: state.Cargo.map((el, index) => {
                if (index == action.payload.index) {
                    return { ...el, H: action.payload.value }
                } else {
                    return el
                }
            })
        }
        case 'SetCargoTypeMobile': return {
            ...state,
            Cargo: state.Cargo.map((el, index) => {
                if (index == action.payload.index) {
                    return { ...el, Type: action.payload.value }
                } else {
                    return el
                }
            })
        }
        case 'SetCargoCommMobile': return {
            ...state,
            Cargo: state.Cargo.map((el, index) => {
                if (index == action.payload.index) {
                    return { ...el, Comment: action.payload.value }
                } else {
                    return el
                }
            })
        }
        case 'AddCargoMobile':

            state.Cargo.push({

                Weight: "",
                L: "",
                W: "",
                H: "",

                Q: 1,

                Type: "",
                Comment: "",
            })

            return { ...state, Cargo: state.Cargo }
        case 'RemoveCargoMobile': return {
            ...state,
            Cargo: state.Cargo.filter((el, index) => {
                return index !== action.payload
            })
        }

        case 'SetSendCityMobile': return { ...state, SendCity: action.payload }

        case 'SetRecCityMobile': return { ...state, RecCity: action.payload }

        case 'SetPayTypeMobile': return { ...state, PayType: action.payload }

        case 'SetCargoInfoTypeMobile': if (action.payload === "true") {
            return { ...state, CargoInfoType: true }
        } else {
            return { ...state, CargoInfoType: false }
        }

        case 'SetCityListMobile': return { ...state, CityList: action.payload }

        case 'SetSendTerminalMobile': return { ...state, SendTerminal: action.payload.SendTerminal, DelMethod: action.payload.DelMethod }
        case 'SetSendTerminalListMobile': if (action.payload.result.length == 0 ) {
            return { ...state, SendTerminalList: action.payload.result }
        } else if ( action.payload.terminal ) {
            return { ...state, SendTerminalList: action.payload.result, SendSelectTerminal: action.payload.terminal[0] }
        } else {
            return { ...state, SendTerminalList: action.payload.result, SendSelectTerminal: action.payload.result[0] }
        };
        case 'SetSendSelectTerminalMobile': return { ...state, SendSelectTerminal: action.payload }

        case 'SetRecTerminalMobile': return { ...state, RecTerminal: action.payload.RecTerminal, DelMethod: action.payload.DelMethod }
        case 'SetRecTerminalListMobile': if (action.payload.result.length == 0) {
            return { ...state, RecTerminalList: action.payload.result }
        } else if (action.payload.terminal) {
            return { ...state, RecTerminalList: action.payload.result, RecSelectTerminal: action.payload.terminal[0] }
        } else {
            return { ...state, RecTerminalList: action.payload.result, RecSelectTerminal: action.payload.result[0] }
        };
        case 'SetRecSelectTerminalMobile': return { ...state, RecSelectTerminal: action.payload }

        case 'DischargeData': return { ...state, 
            PayType: "БезналичнаяОплата",
            CargoInfoType: false,
            CityList: [],
            DelMethod: 'Дверь - Дверь',
            Price: 0,

            SendCity: '',
            SendAdress: '',
            SendCompany: '',
            SendPhone: '',
            SendPerson: '',
            SendAddInfo: '',
            SendTerminal: false,
            SendSelectTerminal: {},
            SendTerminalList: [],

            RecCity: '',
            RecAdress: '',
            RecCompany: '',
            RecPhone: '',
            RecPerson: '',
            RecAddInfo: '',
            RecTerminal: false,
            RecSelectTerminal: {},
            RecTerminalList: [],

            Cargo: [{
                Weight: 0,
                L: "",
                W: "",
                H: "",
                Q: 1,
                Type: "",
                Comment: "",
            }],

            Total: "0",
            Weight: "0",
            Volume: "0",
            COD: "0",
            InsureValue: "0",

            popup: false,
            popupType: "",
        }

        default: return state
    }
}
