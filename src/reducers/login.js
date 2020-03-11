const initialState = {
  username: '',
  pass: '',
  userkey: null,
  alias: null,
  error: '',
  logged: false,
  client: null,
  agent: null,
  create_disp: false,
  edit_disp: false,
  full_list_disp: false,
  mutual: false,
  edit_template: false,
  setting: false,
  upload_manifest: false,
  full_list_template: false,
  total_only: false,
  consolidate_upload_manifest: false,
  print_ticket: false,
  Q_only: false,
  default_send: '0',
  default_rec: '0',
  default_cargo: '0'


}

export default function login (state = initialState, action) {
  switch (action.type) {
    case 'AUTH': return { ...state, alias: action.payload.alias, 
      userkey: action.payload.userkey, 
      logged: true, 
      client: action.payload.client, 
      agent: action.payload.agent, 
      create_disp: action.payload.create_disp,
      edit_disp: action.payload.edit_disp,
      full_list_disp: action.payload.full_list_disp,
      mutual: action.payload.mutual,
      edit_template: action.payload.edit_template,
      setting: action.payload.setting,
      upload_manifest: action.payload.upload_manifest,
      full_list_template: action.payload.full_list_template,
      total_only: action.payload.total_only,
      consolidate_upload_manifest: action.payload.consolidate_upload_manifest
  }
    case 'SET_USERNAME': return { ...state, username: action.payload }
    case 'SET_PASS': return { ...state, pass: action.payload }
    case 'SET_ERROR': return { ...state, error: action.payload }

    case 'LOGIN': return { ...state, userkey: action.payload.userkey, 
      alias: action.payload.username, 
      agent: action.payload.agent, 
      logged: true, 
      create_disp: action.payload.create_disp,
      edit_disp: action.payload.edit_disp,
      full_list_disp: action.payload.full_list_disp,
      mutual: action.payload.mutual,
      edit_template: action.payload.edit_template,
      setting: action.payload.setting,
      upload_manifest: action.payload.upload_manifest,
      full_list_template: action.payload.full_list_template,
      total_only: action.payload.total_only,
      consolidate_upload_manifest: action.payload.consolidate_upload_manifest,
      print_ticket: action.payload.print_ticket,
      Q_only: action.payload.Q_only,
      default_send: action.payload.default_send,
      default_rec: action.payload.default_rec,
      default_cargo: action.payload.default_cargo
    }
    case 'LOGOUT': return { ...state, userkey: null, alias: null, logged: false, username: '', pass: '' }
    default: return state
  }
}
