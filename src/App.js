import React, { Component } from "react";

import { withCookies } from "react-cookie";
import HomeContainer from "./home_container";

class App extends Component {
  

  render() {
    console.log(process.env)
    console.log(process.env.REACT_APP_API_URL)

    if (
      window.location.href === "https://e-kinetika.ru/" ||
      window.location.href === "http://e-kinetika.ru/"
    ) {
      window.location.href = "https://express-kinetika.ru";
    }

    return (
      <div>
        <HomeContainer cookies={this.props.cookies} />
      </div>
    );
  }
}

export default withCookies(App);
