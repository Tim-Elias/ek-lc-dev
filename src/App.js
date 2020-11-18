
// import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { get_data } from './common/common_modules'
// import Header from './screen/components/header'
// import Footer from './screen/components/footer'
// import LeftMenu from './screen/components/leftmenu'
// import Content from './screen/content'
import { withCookies } from 'react-cookie';
import HomeContainer from './home_container'

class App extends Component {

  



  render() {
    
    if (window.location.href = 'https://e-kinetika.ru') window.location.href = 'https://express-kinetika.ru'
    return (
      
      <div><HomeContainer cookies={this.props.cookies}/></div>
    );
  }
}

export default withCookies(App);
