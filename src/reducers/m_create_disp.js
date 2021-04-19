const initialState = {
    Number: "",

    PayType: "БезналичнаяОплата",
    CargoInfoType: false,
    CityList: [],
    DelMethod: 'Дверь - Дверь',
    Customer: "",
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

    Cargo: [],

    Total: "0",
    Weight: "0",
    Volume: "0",
    COD: "0",
    InsureValue: "0",

    popup: false,
    popupType: "",

    template_list: [],

    Cargo_list: [],
}

export default function dispatch(state = initialState, action) {
    switch (action.type) {

        case 'set_Customer': return { ...state, Customer: action.payload }

        case 'set_Cargo_list_quantity': return {
            ...state,
            Cargo_list: state.Cargo_list.map((item, index) => {
                if (action.payload.name == item.name) {
                    return { ...item, quantity: action.payload.quantity }
                } else {
                    return item
                }
            })
        }
        
        case 'set_Cargo_list': return { ...state, Cargo_list: action.payload }
        case 'set_Number': return { ...state, Number: action.payload }

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

                Weight: action.payload.Weight,
                L: action.payload.L,
                W: action.payload.W,
                H: action.payload.H,

                Q: 1,

                Type: action.payload.Type,
                Comment: action.payload.Comment,
                Template: action.payload.Template,
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
            return {
                ...state, CargoInfoType: true, Cargo: [], Total: "0", Weight: "0", Volume: "0", COD: "0", InsureValue: "0" }
        } else {
            return { ...state, CargoInfoType: false, Total: "0", Weight: "0", Volume: "0", COD: "0", InsureValue: "0" }
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
            Number: "",
            PayType: "БезналичнаяОплата",
            CargoInfoType: false,
            CityList: [],
            DelMethod: 'Дверь - Дверь',
            Price: 0,
            Customer: "",

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

            Cargo: [],

            Total: "0",
            Weight: "0",
            Volume: "0",
            COD: "0",
            InsureValue: "0",

            popup: false,
            popupType: "",

            Cargo_list: [],
        }

        case 'set_template_list': return { ...state, template_list: action.payload }
        case 'set_select_template':

            const CargoTypeList = [
                { label: "Сейф-пакет", value: "СейфПакет" },
                { label: "Коробка", value: "Коробка" },
                { label: "Контейнер", value: "Контейнер" },
                { label: "Мешок под пломбой", value: "МешокПодПломбой" },
                { label: "Прочее", value: "Прочее" }
            ]

            let delivery_method = action.payload.data.del_method.split("-");
            let send_teminal, rec_terminal;
            if (delivery_method[0] == "Склад") {
                send_teminal = true;
            } else {
                send_teminal = false;
            }

            if(delivery_method[1] == "Склад") {
                rec_terminal = true;
            } else {
                rec_terminal = false;
            }



            return {
                ...state,
                DelMethod: action.payload.data.del_method,
                PayType: action.payload.data.pay_type,
                Customer: action.payload.data.customer,

                SendCity: action.payload.send_city,
                // Number: action.payload.Number,
                SendAdress: action.payload.data.send_address,
                SendCompany: action.payload.data.send_company,
                SendPhone: action.payload.data.send_phone,
                SendPerson: action.payload.data.send_person,
                SendAddInfo: action.payload.data.send_addinfo,
                // SendEmail: action.payload.SendEmail,
                
                SendTerminal: send_teminal,

                RecCity: action.payload.rec_city,
                RecAdress: action.payload.data.rec_address,
                RecCompany: action.payload.data.rec_company,
                RecPhone: action.payload.data.rec_phone,
                RecPerson: action.payload.data.rec_person,
                RecAddInfo: action.payload.data.rec_addinfo,
                // RecEmail: action.payload.RecEmail,

                RecTerminal: rec_terminal,
            }

        default: return state
    }
}
