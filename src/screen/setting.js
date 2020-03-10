import React from 'react';
import { connect } from 'react-redux';
//import { get_data } from './../common/common_modules'
import { withCookies } from 'react-cookie';



class Screen extends React.Component {

  
  render() {

      
    return (
      
      <div>
       Код пользователя: {this.props.store.login.userkey}
      </div>


      
    );
  }
};

export default withCookies(connect(
  (state, ownProps) => ({store: state, cookies: ownProps.cookies}),
  dispatch => ({
    set_active_window: (param) => { dispatch({ type: 'SET_ACTIVE_WINDOW', payload: param }) },
  })
)(Screen));