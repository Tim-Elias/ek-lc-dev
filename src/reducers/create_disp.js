const today = new Date();
let mm = today.getMonth() + 1;
let dd = today.getDate();

const y = today.getFullYear();

if (mm < 10) { mm = '0' + mm }
if (dd < 10) { dd = '0' + dd }

// const hours = today.getUTCHours() + 7;

// const date = y + '-' + mm + '-' + dd;

const initialState = {

  warningAlert: false,
  warningMessage: "",

  Price: '0',

  CityList: [],
  CargoInfoType: { label: 'Внести информацию о каждом грузе', value: false },
  PayType: { label: 'Безналичная оплата', value: 'Безналичная оплата' },
  PayerSelect: {},
  PayerList: [],
  Payer: {name:'', id:''},
  DelMethod: 'Дверь - Дверь',
  CustomerEmailInformer: false,

  Number: 0,
  customNumber: false,
  customNumberLoader: false,
  availableNumber: null,
  cyrillic: false,

  isNew: true,

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

  Termo: false,
  TMax: 0,
  TMin: 0,

  IRR: false,
  Fragile: false,
  DelType: '',
  DispDate: '',

  CurrentDate: '',
  CurrentTime: '',
  TimeError: false,
}

export default function dispatch (state = initialState, action) {
  switch (action.type) {
    
    case 'reset_create_disp_data': return  initialState 

    case 'SetTimeError': return { ...state, TimeError: action.payload }
    case 'SetCurrentDate': return { ...state, CurrentDate: action.payload }
    case 'SetCurrentTime': return { ...state, CurrentTime: action.payload }

    case 'SetWarningAlert': return { ...state, warningAlert: action.payload }
    
    case 'SetTermo': return { ...state, Termo: action.payload, TMax: action.payload ? state.TMax : 0, TMin: action.payload ? state.TMin : 0}
    case 'SetTMax': return { ...state, TMax: action.payload }
    case 'SetTMin': return { ...state, TMin: action.payload }

    case 'SetCyrillic': return { ...state, cyrillic: action.payload }

    case 'SetWarningMessage': return { ...state, warningMessage: action.payload }

    case 'SetPayerSelect': return { ...state, PayerSelect: action.payload }

    case 'SetIsNew': return { ...state, isNew: action.payload }

    case 'SetNumber': return { ...state, Number: action.payload }
    case 'SetCustomNumber': return { ...state, customNumber: action.payload }
    case 'SetAvailableNumber': return { ...state, availableNumber: action.payload }
    case 'SetCustomNumberLoader': return { ...state, customNumberLoader: action.payload }

    case 'SetPrice': return { ...state, Price: action.payload }

    case 'SetDelMethod': return { ...state, DelMethod: action.payload }

    case 'SetPayerList': return { ...state, PayerList: action.payload }

    case 'SetPayer': return { ...state, Payer: action.payload }

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
    case 'SetDispDate': 
      if (state.DelMethod === 'Дверь - Дверь' || state.DelMethod === 'Дверь - Склад') {
        if (state.CurrentDate === action.payload) {

          if (state.CurrentTime >= 14) {
            const today = new Date(state.CurrentDate);
            today.setDate(today.getDate() + 1);

            let mm = today.getMonth()+1;
            let dd = today.getDate();
            const y = today.getFullYear();

            if (mm < 10) { mm = '0' + mm }
            if (dd < 10) { dd = '0' + dd }

            const newdate = y + '-' + mm + '-' + dd;

            return { ...state, DispDate: newdate }
          } else {
            return { ...state, DispDate: action.payload }
          }
        } else if(state.CurrentDate > action.payload) {
          return { ...state, DispDate: state.CurrentDate }
        } else {
          return { ...state, DispDate: action.payload }
        }
      } else {
        return { ...state, DispDate: action.payload }
      }

    case 'SetTotal': return { ...state, Total: action.payload }
    case 'SetWeight': return { ...state, Weight: action.payload }
    case 'SetVolume': return { ...state, Volume: action.payload }

    case 'SetTermo': return { ...state, PayType: action.payload }
    case 'SetIRR': return { ...state, PayType: action.payload }
    case 'SetFragile': return { ...state, Fragile: action.payload }
    case 'SetDelType': return { ...state, DelType: action.payload.value }

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


    return { ...state, 
      PayerSelect: action.payload.PayerSelect,
      Number: action.payload.Number,
      PayType: action.payload.PayType,
      SendAdress: action.payload.SendAdress,
      SendCompany: action.payload.SendCompany,
      SendPhone: action.payload.SendPhone,
      SendPerson: action.payload.SendPerson,
      SendAddInfo: action.payload.SendAddInfo,
      SendEmail: action.payload.SendEmail,
      
      SendTerminal: action.payload.SendTerminal,
      // SendSelectTerminal: {},
      
      InsureValue: action.payload.InsureValue,
      COD: action.payload.COD,
      RecAdress: action.payload.RecAdress,
      RecCompany: action.payload.RecCompany,
      RecPhone: action.payload.RecPhone,
      RecPerson: action.payload. RecPerson,
      RecAddInfo: action.payload.RecAddInfo,
      RecEmail: action.payload.RecEmail,
      
      RecTerminal: action.payload.RecTerminal,
      // RecSelectTerminal: {},
      Fragile: action.payload.Fragile,
      TMax: action.payload.TMax,
      TMin: action.payload.TMin,

      CargoInfoType: action.payload.CargoInfoType,

      Volume: action.payload.Volume, 
      Total: action.payload.Total,
      Weight: action.payload.Weight,
      
      Cargo: action.payload.Cargo.map(el=>{
        const cargo_type = el.Type
        const CargoTypeListEl = CargoTypeList.find(el_list => el_list.value === el.Type)
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
