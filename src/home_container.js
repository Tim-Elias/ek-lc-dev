import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_data } from './common/common_modules';
import Header from './screen/components/header';
import Footer from './screen/components/footer';
import LeftMenu from './screen/components/leftmenu';
import Content from './screen/content';
import { withCookies } from 'react-cookie';
import MContent from './m_screen/m_content';
import MLogin from './m_screen/m_login';

class Screen extends Component {

    
  render() {

    if(!this.props.store.login.logged){
      let username;
      try {
        username = localStorage.getItem('username');
      } catch (error) {
        username = undefined;
      }
      

        if(username!==undefined){
            const authdata = {
              username: localStorage.getItem('username'),
              pass: localStorage.getItem('passkey')
            };

            get_data('autorization', authdata).then(
                (result) => {
                  this.props.login(result);
                  //this.get_list(result.userkey);
                  localStorage.setItem('userkey', result.userkey);
                },
                (err) => { 
                  console.log(err)
                  localStorage.removeItem('username');
                  localStorage.removeItem('passkey');
                }
            );
        } 
        
    }
    
    // {!this.props.store.login.logged ? (console.log(this.props.cookies.get('username')):(null)}
        // console.log(this.props.cookies.get('username'))
        // console.log(this.props.cookies.get('key'))

    
        // const set_hold_shift_true = () => {this.props.set_hold_shift(true)}
        // const set_hold_shift_false = () => {this.props.set_hold_shift(false)}

        // document.onkeydown = function (event) {
        //   //console.log(event.keyCode)
        //   try {
        //     if (event.keyCode === 16) {
        //       //set_hold_shift_true()
        //       console.log("Нажал")
        //     }
        //   } catch (e) { }
        // };
    
        // document.onkeyup = function (event) {
        //   try {
        //     if (event.keyCode === 16) {
        //       //set_hold_shift_false()
        //       console.log("Отпустил")
        //     }
        //   } catch (e) { }
        // };

    const width = window.screen.width;
    
    return (
      <div>
        {(this.props.store.general.use_width && width < 1000) || this.props.store.general.mobile ? (
        
          <div>
            {!this.props.store.login.logged ? (<MLogin />) : (<MContent />)}
          </div>
          
          ):(<div>

            {this.props.store.general.full_screen ? (<Content />):(
              <div className={this.props.store.login.logged ? ("grid-container") : ("grid-container--login")}>
            
                {this.props.store.login.logged ? (
                  <Header />
                ) : (null)}

                {this.props.store.login.logged ? (<div>
                  {this.props.store.general.hidemenu ?(
                <div className="logged_main_compact">
                <LeftMenu />
                <Content />
                </div>):( <div className="logged_main">
                <LeftMenu />
                <Content />
                </div>)}
                </div>) : ( <div className="not_logged_main">
                  <Content />
                  </div>)}
                <Footer />

              </div>
            )}

          </div>)}

      </div>
      
      
    );
  }
}

export default withCookies(connect(
  (state, ownProps) => ({store: state, cookies: ownProps.cookies}),
  dispatch => ({
    login: (param) => { dispatch({ type: 'LOGIN', payload: param }) },
    logout: () => { dispatch({ type: 'LOGOUT' }) },
    set_login: (param) => { dispatch({ type: 'SET_USERNAME', payload: param }); },
    set_password: (param) => { dispatch({ type: 'SET_PASS', payload: param }); },
    set_active_window: (param) => { dispatch({ type: 'set_active_window', payload: param }); },
    set_list: (param) => { dispatch({ type: 'SET_DISPATCH_LIST', payload: param }) },
    set_hold_shift: (param) => { dispatch({ type: 'set_hold_shift', payload: param }) },
})
  
)(Screen));