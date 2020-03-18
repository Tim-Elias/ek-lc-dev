import { combineReducers } from 'redux'

import login from './login'
import general from './general'
import storage from './storage'
import disp from './disp'
import get_manifest from './get_manifest'
import manifest from './manifest'
import reciept from './reciept'
import send_manifest from './send_manifest'
import mutual from './mutual'
import create_disp from './create_disp'
import upload_manifest from './upload_manifest'
import my_disp from './my_disp'
import order from './order'

export default combineReducers({

  login,
  general,
  storage,
  disp,
  manifest,
  get_manifest,
  reciept,
  send_manifest,
  mutual,
  create_disp,
  upload_manifest,
  my_disp,
  order
  
})
