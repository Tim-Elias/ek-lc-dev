const initialState = {
  selected_import_template: {
    label: "",
    Num: "",
    SendCity: "",
    SendAdress: "",
    SendPerson: "",
    SendEmail: "",
    SendAddInfo: "",
    RecCity: "",
    RecAdress: "",
    RecPerson: "",
    RecPhone: "",
    RecEmail: "",
    RecAddInfo: "",
    InsureValue: "",
    COD: "",
    Total: "",
    Weight: "",
    Volume: "",
    SendCompany: "",
    RecCompany: "",
    SendPhone: "",
    Key: "",
    TransformVolume: "",
    ConsolidateImportTemplate: "",
  },

  selected_default_template: {
    label: "",
    SendCity: "",
    SendAdress: "",
    SendPerson: "",
    SendEmail: "",
    SendAddInfo: "",
    RecCity: "",
    RecAdress: "",
    RecPerson: "",
    RecPhone: "",
    RecEmail: "",
    RecAddInfo: "",
    InsureValue: "",
    COD: "",
    Total: "",
    Weight: "",
    Volume: "",
    SendCompany: "",
    RecCompany: "",
    SendPhone: "",
    DelType: "",
    PayType: "",
    Key: "",
  },

  selected_disp_template: {
    IsNew: true,
    label: "",
    City: {},
    Adress: "",
    Phone: "",
    Person: "",
    Company: "",
    AddInfo: "",
    Terminal: false,
    CurrentTerminal: {},
  },

  disp_template_terminal_list: [],

  original_data_import_template: {},
  original_data_default_template: {},
  original_data_disp_template: {},

  active_import_template: -1,
  active_default_template: -1,
  active_disp_template: -1,
};

export default function dispatch(state = initialState, action) {
  switch (action.type) {
    case "set_active_import_template":
      return { ...state, active_import_template: action.payload };
    case "set_active_default_template":
      return { ...state, active_default_template: action.payload };
    case "set_active_disp_template":
      return { ...state, active_disp_template: action.payload };

    case "set_selected_import_template":
      return {
        ...state,
        selected_import_template: action.payload,
        original_data_import_template: action.payload,
      };
    case "set_selected_default_template":
      return {
        ...state,
        selected_default_template: action.payload,
        original_data_default_template: action.payload,
      };
    case "set_selected_disp_template":
      return {
        ...state,
        selected_disp_template: action.payload,
        original_data_disp_template: action.payload,
      };

    // case 'set_original_data_import_template': return { ...state, original_data_import_template: action.payload }
    // case 'set_original_data_default_template': return { ...state, original_data_default_template: action.payload }
    // case 'set_original_data_disp_template': return { ...state, original_data_disp_template: action.payload }

    case "set_selected_import_template_label":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          label: action.payload,
        },
      };
    case "set_selected_import_template_Num":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          Num: action.payload,
        },
      };
    case "set_selected_import_template_SendCity":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          SendCity: action.payload,
        },
      };
    case "set_selected_import_template_SendAdress":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          SendAdress: action.payload,
        },
      };
    case "set_selected_import_template_SendPerson":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          SendPerson: action.payload,
        },
      };
    case "set_selected_import_template_SendEmail":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          SendEmail: action.payload,
        },
      };
    case "set_selected_import_template_SendAddInfo":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          SendAddInfo: action.payload,
        },
      };
    case "set_selected_import_template_RecCity":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          RecCity: action.payload,
        },
      };
    case "set_selected_import_template_RecAdress":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          RecAdress: action.payload,
        },
      };
    case "set_selected_import_template_RecPerson":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          RecPerson: action.payload,
        },
      };
    case "set_selected_import_template_RecPhone":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          RecPhone: action.payload,
        },
      };
    case "set_selected_import_template_RecEmail":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          RecEmail: action.payload,
        },
      };
    case "set_selected_import_template_RecAddInfo":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          RecAddInfo: action.payload,
        },
      };
    case "set_selected_import_template_InsureValue":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          InsureValue: action.payload,
        },
      };
    case "set_selected_import_template_COD":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          COD: action.payload,
        },
      };
    case "set_selected_import_template_Total":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          Total: action.payload,
        },
      };
    case "set_selected_import_template_Weight":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          Weight: action.payload,
        },
      };
    case "set_selected_import_template_Volume":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          Volume: action.payload,
        },
      };
    case "set_selected_import_template_SendCompany":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          SendCompany: action.payload,
        },
      };
    case "set_selected_import_template_RecCompany":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          RecCompany: action.payload,
        },
      };
    case "set_selected_import_template_SendPhone":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          SendPhone: action.payload,
        },
      };
    case "set_selected_import_template_Key":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          Key: action.payload,
        },
      };
    case "set_selected_import_template_TransformVolume":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          TransformVolume: action.payload,
        },
      };
    case "set_selected_import_template_ConsolidateImportTemplate":
      return {
        ...state,
        selected_import_template: {
          ...state.selected_import_template,
          ConsolidateImportTemplate: action.payload,
        },
      };

    case "set_selected_disp_template_label":
      return {
        ...state,
        selected_disp_template: {
          ...state.selected_disp_template,
          label: action.payload,
        },
      };
    case "set_selected_disp_template_City":
      return {
        ...state,
        selected_disp_template: {
          ...state.selected_disp_template,
          City: action.payload,
        },
      };
    case "set_selected_disp_template_Adress":
      return {
        ...state,
        selected_disp_template: {
          ...state.selected_disp_template,
          Adress: action.payload,
        },
      };
    case "set_selected_disp_template_Phone":
      return {
        ...state,
        selected_disp_template: {
          ...state.selected_disp_template,
          Phone: action.payload,
        },
      };
    case "set_selected_disp_template_Person":
      return {
        ...state,
        selected_disp_template: {
          ...state.selected_disp_template,
          Person: action.payload,
        },
      };
    case "set_selected_disp_template_Company":
      return {
        ...state,
        selected_disp_template: {
          ...state.selected_disp_template,
          Company: action.payload,
        },
      };
    case "set_selected_disp_template_AddInfo":
      return {
        ...state,
        selected_disp_template: {
          ...state.selected_disp_template,
          AddInfo: action.payload,
        },
      };
    case "set_selected_disp_template_Terminal":
      return {
        ...state,
        selected_disp_template: {
          ...state.selected_disp_template,
          Terminal: action.payload,
        },
      };
    case "set_selected_disp_template_CurrentTerminal":
      return {
        ...state,
        selected_disp_template: {
          ...state.selected_disp_template,
          CurrentTerminal: action.payload,
        },
      };

    case "reset_selected_disp_template":
      return {
        ...state,
        disp_template_terminal_list: initialState.disp_template_terminal_list,
        selected_disp_template: initialState.selected_disp_template,
      };
    case "set_disp_template_terminal_list":
      return { ...state, disp_template_terminal_list: action.payload };

    default:
      return state;
  }
}
