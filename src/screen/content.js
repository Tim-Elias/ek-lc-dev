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

class Screen extends React.Component {
  render () {
    return (

      <div className='content_window'>

        {this.props.store.general.active_window === 'home' ? (<Home />) : (null)}
        {this.props.store.general.active_window === 'my_disp' ? (<MyDisp />) : (null)}
        {this.props.store.general.active_window === 'create_disp' ? (<CreateDisp />) : (null)}
        {this.props.store.general.active_window === 'mutual' ? (<Mutual />) : (null)}
        {this.props.store.general.active_window === 'storage' ? (<Storage />) : (null)}
        {this.props.store.general.active_window === 'reciept' ? (<Reciept />) : (null)}
        {this.props.store.general.active_window === 'send_manifest' ? (<SendManifest />) : (null)}
        {this.props.store.general.active_window === 'get_manifest' ? (<GetManifest />) : (null)}
        {this.props.store.general.active_window === 'disp' ? (<Disp />) : (null)}
        {this.props.store.general.active_window === 'manifest' ? (<Manifest />) : (null)}
        {this.props.store.general.active_window === 'wait' ? (<Wait />) : (null)}
        {this.props.store.general.active_window === 'upload_manifest' ? (<UploadMainfest />) : (null)}
        {this.props.store.general.active_window === 'setting' ? (<Setting />) : (null)}
        {this.props.store.general.active_window === 'order' ? (<Order />) : (null)}

      </div>

    )
  }
};

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({})
)(Screen)
