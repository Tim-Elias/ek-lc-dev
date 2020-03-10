import React from 'react'
import { connect } from 'react-redux'
import logo from './../logo.svg'

// import { get_data } from './../common/common_modules'

class Screen extends React.Component {
  render () {
    return (

      <div className='home'>

        <div className='logo-block' id='logo'>
          <div>
            <img className='logo' src={logo} />
          121212
          </div>

        </div>

        {/* <div className="home-block">
          <div className="home-block-content">Экспресс Доставка "Из рук в руки" </div>
          </div>
        <div className="home-block">
          <div className="home-block-content">Магистральные перевозки по Сибири </div>
          <div className="map"><img className="map" src={map} /></div>
        </div> */}

      </div>

    )
  }
};

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    set_active_window: (param) => { dispatch({ type: 'SET_ACTIVE_WINDOW', payload: param }) }
  })
)(Screen)
