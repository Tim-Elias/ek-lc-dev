// import './App.css';
import React, { Component } from "react";

import { withCookies } from "react-cookie";
import HomeContainer from "./home_container";

class App extends Component {
  render() {
    if (
      window.location.href === "https://e-kinetika.ru/" ||
      window.location.href === "http://e-kinetika.ru/"
    ) {
      window.location.href = "https://express-kinetika.ru";
    }

    //http://293128-ct90100.tmweb.ru/
    return (
      <div>
        <HomeContainer cookies={this.props.cookies} />
      </div>
    );
  }
}

export default withCookies(App);
