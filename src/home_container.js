import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_data } from './common/common_modules'
import Header from './screen/components/header'
import Footer from './screen/components/footer'
import LeftMenu from './screen/components/leftmenu'
import Content from './screen/content'
import { withCookies } from 'react-cookie';

class Screen extends Component {

    



  render() {
    
    if(!this.props.store.login.logged){
       const username = this.props.cookies.get('username') 
        if(username!==undefined){
            //console.log('un')
            const authdata = {
                username: this.props.cookies.get('username'),
                pass: this.props.cookies.get('passkey') 
            };

            //console.log(authdata)
            get_data('autorization', authdata).then(
                (result) => {
                  //console.log(result)
                    this.props.login(result);
                    //this.get_list(result.userkey);
                    this.props.cookies.set('userkey',result.userkey)
                    
    
                },
                (err) => { 
                    console.log(err)
                    this.props.cookies.remove('username')
                    this.props.cookies.remove('passkey')
                 }
            );
        } 
        
    }
    

    // {!this.props.store.login.logged ? (console.log(this.props.cookies.get('username')):(null)}
        // console.log(this.props.cookies.get('username'))
        // console.log(this.props.cookies.get('key'))

    
    return (
      
      <div className="grid-container">
         
       <Header />
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
    set_list: (param) => { dispatch({ type: 'SET_DISPATCH_LIST', payload: param }) }
})
  
)(Screen));