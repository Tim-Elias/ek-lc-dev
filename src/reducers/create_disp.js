const initialState = {
  

  CityList: [],
  CargoInfoType: { label: 'Внести информацию о каждом грузе', value: false },
  PayType: { label: 'Безналичная оплата', value: 'Безналичная оплата' },
  DelMethod: 'Дверь - Дверь',
  CustomerEmailInformer: false,

  Number: 0,

  OpenModalSendTemplate: false,
  OpenModalRecTemplate: false,

  FilterModalSendTemplate: "",
  FilterModalRecTemplate: "",
  
  SendTerminalList: [],
  RecTerminalList: [],

  SelectedSendCity: null,
  SelectedRecCity: null,

  SendCity: '',
  SendAdress: '',
  SendCompany: '',
  SendPhone: '',
  SendPerson: '',
  SendAddInfo: '',
  SendEmail: '',
  SendTerminal: false,
  SendSelectTerminal: {},
  SendEmailInformer: false,

  RecCity: '',
  RecAdress: '',
  RecCompany: '',
  RecPhone: '',
  RecPerson: '',
  RecAddInfo: '',
  RecEmail: '',
  RecTerminal: false,
  RecSelectTerminal: {},
  RecEmailInformer: false,

  Cargo: [{

    Weight: 0,
    L: 0,
    W: 0,
    H: 0,

    Q: 1,

    CargoType: 0,
    Comment: ''
  }],
  Total: 0,
  Weight: 0,
  Volume: 0,
  COD: 0,
  InsureValue: 0,


  Termo: '',

  IRR: false,
  Fragile: false,
  DelType: ''

}

export default function dispatch (state = initialState, action) {
  switch (action.type) {

    
    case 'reset_create_disp_data': return  initialState 
    case 'SetDelMethod': return { ...state, DelMethod: action.payload }

    case 'SetCOD': return { ...state, COD: action.payload }
    case 'SetInsureValue': return { ...state, InsureValue: action.payload }

    case 'SetOpenModalRecTemplate': return { ...state, OpenModalRecTemplate: action.payload }
    case 'SetOpenModalSendTemplate': return { ...state, OpenModalSendTemplate: action.payload }
    
    case 'SetFilterModalSendTemplate': return { ...state, FilterModalSendTemplate: action.payload }
    case 'SetFilterModalRecTemplate': return { ...state, FilterModalRecTemplate: action.payload }

    case 'SetSelectedSendCity': return { ...state, SelectedSendCity: action.payload }
    case 'SetSelectedRecCity': return { ...state, SelectedRecCity: action.payload }

    case 'SetPayType': return { ...state, PayType: action.payload }
    case 'SetSendCity': return { ...state, SendCity: action.payload }
    case 'SetSendAdress': return { ...state, SendAdress: action.payload }
    case 'SetSendCompany': return { ...state, SendCompany: action.payload }
    case 'SetSendPhone': return { ...state, SendPhone: action.payload }
    case 'SetSendPerson': return { ...state, SendPerson: action.payload }
    case 'SetSendAddInfo': return { ...state, SendAddInfo: action.payload }
    case 'SetSendEmail': return { ...state, SendEmail: action.payload }
    case 'SetSendTerminal': return { ...state, SendTerminal: action.payload.SendTerminal, DelMethod: action.payload.DelMethod }
    case 'SetSendEmailInformer': return { ...state, SendEmailInformer: action.payload }

    case 'SetRecCity': return { ...state, RecCity: action.payload }
    case 'SetRecAdress': return { ...state, RecAdress: action.payload }
    case 'SetRecCompany': return { ...state, RecCompany: action.payload }
    case 'SetRecPhone': return { ...state, RecPhone: action.payload }
    case 'SetRecPerson': return { ...state, RecPerson: action.payload }
    case 'SetRecAddInfo': return { ...state, RecAddInfo: action.payload }
    case 'SetRecEmail': return { ...state, RecEmail: action.payload }
    case 'SetRecTerminal': return { ...state, RecTerminal: action.payload.RecTerminal, DelMethod: action.payload.DelMethod }
    case 'SetRecEmailInformer': return { ...state, RecEmailInformer: action.payload }

    case 'SetRecTerminalList': if (action.payload.length == 0) {
      return { ...state, RecTerminalList: action.payload }
    } else {
      return { ...state, RecTerminalList: action.payload, RecSelectTerminal: action.payload[0] }
    };

    case 'SetSendTerminalList': if (action.payload.length == 0) {
      return { ...state, SendTerminalList: action.payload }
    } else {
      return { ...state, SendTerminalList: action.payload, SendSelectTerminal: action.payload[0] }
    };

      // cargo

    case 'SetCargoWeight': return {
      ...state,
      Cargo: state.Cargo.map((el, index) => {
        if (index == action.payload.index) {
          return { ...el, Weight: action.payload.value }
        } else {
          return el
        }
      })
    }

    case 'SetCargoW': return {
      ...state,
      Cargo: state.Cargo.map((el, index) => {
        if (index == action.payload.index) {
          return { ...el, W: action.payload.value }
        } else {
          return el
        }
      })
    }

    case 'SetCargoL': return {
      ...state,
      Cargo: state.Cargo.map((el, index) => {
        if (index == action.payload.index) {
          return { ...el, L: action.payload.value }
        } else {
          return el
        }
      })
    }

    case 'SetCargoH': return {
      ...state,
      Cargo: state.Cargo.map((el, index) => {
        if (index == action.payload.index) {
          return { ...el, H: action.payload.value }
        } else {
          return el
        }
      })
    }

    case 'SetCargoQ': return {
      ...state,
      Cargo: state.Cargo.map((el, index) => {
        if (index == action.payload.index) {
          return { ...el, Q: action.payload.value }
        } else {
          return el
        }
      })
    }

    case 'SetCargoComment': return {
      ...state,
      Cargo: state.Cargo.map((el, index) => {
        if (index == action.payload.index) {
          return { ...el, Comment: action.payload.value }
        } else {
          return el
        }
      })
    }

    case 'SetCargoType': return {
      ...state,
      Cargo: state.Cargo.map((el, index) => {
        if (index == action.payload.index) {
          return { ...el, Type: action.payload.value }
        } else {
          return el
        }
      })
    }

    case 'RemoveCargo': return {
      ...state,
      Cargo: state.Cargo.filter((el, index) => {
        return index !== action.payload
      })
    }

    case 'AddCargo':

      state.Cargo.push({

        Weight: 0,
        L: 0,
        W: 0,
        H: 0,

        Q: 1,

        CargoType: 0,
        Comment: ''
      })

      return { ...state, Cargo: state.Cargo }

    case 'SetCargoInfoType': return { ...state, CargoInfoType: action.payload }

    case 'SetTotal': return { ...state, Total: action.payload }
    case 'SetWeight': return { ...state, Weight: action.payload }
    case 'SetVolume': return { ...state, Volume: action.payload }

    case 'SetTermo': return { ...state, PayType: action.payload }
    case 'SetIRR': return { ...state, PayType: action.payload }
    case 'SetFragile': return { ...state, PayType: action.payload }
    case 'SetDelType': return { ...state, PayType: action.payload }

    case 'SetCustomerEmailInformer': return { ...state, CustomerEmailInformer: action.payload }

    case 'SetCityList': return { ...state, CityList: action.payload }
    case 'SetSendSelectTerminal': return { ...state, SendSelectTerminal: action.payload }
    case 'SetRecSelectTerminal': return { ...state, RecSelectTerminal: action.payload }

    case 'set_copy_disp_data': 
    
    const CargoTypeList = [
      {label:"Сейф-пакет", value: "СейфПакет"},
      {label:"Коробка", value: "Коробка"},
      {label:"Контейнер", value: "Контейнер"},
      {label:"Мешок под пломбой", value: "МешокПодПломбой"},
      {label:"Прочее", value: "Прочее"}
    ]
    console.log(action.payload.Cargo)
    return { ...state, 
    
      Number: action.payload.Number,
      SendAdress: action.payload.SendAdress,
      SendCompany: action.payload.SendCompany,
      SendPhone: action.payload.SendPhone,
      SendPerson: action.payload.SendPerson,
      SendAddInfo: action.payload.SendAddInfo,
      SendEmail: action.payload.SendEmail,
      
      SendTerminal: action.payload.SendTerminal,
      // SendSelectTerminal: {},
      
    
      
      RecAdress: action.payload.RecAdress,
      RecCompany: action.payload.RecCompany,
      RecPhone: action.payload.RecPhone,
      RecPerson: action.payload. RecPerson,
      RecAddInfo: action.payload.RecAddInfo,
      RecEmail: action.payload.RecEmail,
      
      RecTerminal: action.payload.RecTerminal,
      // RecSelectTerminal: {},

      CargoInfoType: action.payload.CargoInfoType,

      Volume: action.payload.Volume, 
      Total: action.payload.Total,
      Weight: action.payload.Weight,
      
      Cargo: action.payload.Cargo.map(el=>{
        const cargo_type = el.Type
        const CargoTypeListEl = CargoTypeList.find(el_list => el_list.value === el.Type)
        console.log(cargo_type)
        console.log(CargoTypeListEl)
        return {
        Weight: el.Weight,
        L: el.L,
        W: el.W,
        H: el.H,
        Q: el.Q,
        Type: CargoTypeList.find(el_list => el_list.label === el.Type),
        Comment: el.Comment
      }}),
    }

    default: return state
  }
}
