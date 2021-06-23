import React from 'react'
import { connect } from 'react-redux'
import Home from './home'
import MyDisp from './my_disp'
import CreateDisp from './create_disp'
import Mutual from './mutual'
import Storage from './storage'
import Reciept from './reciept'
import SendManifest from './send_manifest'
import GetManifest from './get_manifest'
import Disp from './disp'
import Manifest from './manifest'
import Wait from './wait'
import UploadMainfest from './upload_manifest'
import Setting from './setting'
import Order from './order'
import ImportTemplateList from './import_template_list'
import DefaultTemplateList from './default_template_list'
import DispTemplateList from './disp_template_list'
import ImportTemplate from './import_template'
import DefaultTemplate from './default_template'
import DispTemplate from './disp_template'
import DispMap from './disp_map'
import StorageReciept from './storage_reciept'
import CalcPrice from './calc_price'
import DispNumber from './disp_number'

import HomeEk from './home_ek'
import Test from './test'



class Screen extends React.Component {

  back = () => {
    const last_window = this.props.store.general.last_window[this.props.store.general.last_window.length -1]
    this.props.pop_last_window();
    this.props.set_active_window(last_window);
}

  render () {

    

    const modules = {
      set_modal_show: this.props.set_modal_show,
      set_active_window: this.props.set_active_window,
      set_modal_text: this.props.set_modal_text,
      set_modal_header: this.props.set_modal_header,
      set_last_window: this.props.set_last_window,
      back: this.back,

    }
    let className = 'content_window'
    if(this.props.store.general.active_window === 'home'){
      className = 'content_window_home'
    }
    
    return (

      <div className={className}>

        {this.props.store.general.active_window === 'home' && !this.props.store.login.logged ? (<HomeEk modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'my_disp' ? (<MyDisp modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'create_disp' ? (<CreateDisp modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'mutual' ? (<Mutual modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'storage' ? (<Storage modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'reciept' ? (<Reciept modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'send_manifest' ? (<SendManifest modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'get_manifest' ? (<GetManifest modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'disp' ? (<Disp modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'manifest' ? (<Manifest modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'wait' ? (<Wait modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'upload_manifest' ? (<UploadMainfest modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'setting' ? (<Setting modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'order' ? (<Order modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'import_template_list' ? (<ImportTemplateList modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'default_template_list' ? (<DefaultTemplateList modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'disp_template_list' ? (<DispTemplateList modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'import_template' ? (<ImportTemplate modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'default_template' ? (<DefaultTemplate modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'disp_template' ? (<DispTemplate modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'disp_map' ? (<DispMap modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'test' ? (<Test modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'storage_reciept' ? (<StorageReciept modules={modules}/>) : (null)}
        {this.props.store.general.active_window === 'calc_price' ? (<CalcPrice modules={modules} />) : (null)}
        {this.props.store.general.active_window === 'disp_number' ? (<DispNumber modules={modules} />) : (null)}
   

      </div>

    )
  }
};

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }) },
    set_modal_show: (param) => { dispatch({ type: 'set_modal_show', payload: param }) },
    set_modal_text: (param) => { dispatch({ type: 'set_modal_text', payload: param }) },
    set_modal_header: (param) => { dispatch({ type: 'set_modal_header', payload: param }) },
    set_last_window: (param) => { dispatch({ type: 'set_last_window', payload: param }) },
    pop_last_window: () => { dispatch({ type: 'pop_last_window'}) },
    
    
  })
)(Screen)
