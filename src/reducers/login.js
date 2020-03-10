const initialState = {
  username: '',
  pass: '',
  userkey: null,
  alias: null,
  error: '',
  logged: false,
  client: null,
  agent: null

}

export default function login (state = initialState, action) {
  switch (action.type) {
    case 'AUTH': return { ...state, alias: action.payload.alias, userkey: action.payload.userkey, logged: true, client: action.payload.client, agent: action.payload.agent }
    case 'SET_USERNAME': return { ...state, username: action.payload }
    case 'SET_PASS': return { ...state, pass: action.payload }
    case 'SET_ERROR': return { ...state, error: action.payload }

    case 'LOGIN': return { ...state, userkey: action.payload.userkey, alias: action.payload.username, agent: action.payload.agent, logged: true }
    case 'LOGOUT': return { ...state, userkey: null, alias: null, logged: false, username: '', pass: '' }
    default: return state
  }
}
