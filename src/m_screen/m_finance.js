import React from "react";
import { connect } from "react-redux";
import "./mobile.css";
import { get_data } from "../common/common_modules";
import "./mobile_disp.css";
import "./mobile_finance.css";

class Screen extends React.Component {
  componentDidMount() {
    this.update_balance();
    this.update_profit();
  }

  active_window = (window) => {
    this.props.set_active_window(window);
  };

  update_balance = () => {
    const data = {
      userkey: this.props.store.login.userkey,
    };
    get_data("cash", data).then(
      (result) => {
        this.props.set_balance(result);
      },
      (err) => {
        alert("Ошибка!!!");
        console.log(err);
      },
    );
  };

  update_profit = () => {
    const data = {
      userkey: this.props.store.login.userkey,
    };
    get_data("profit", data).then(
      (result) => {
        this.props.set_profit(result);
      },
      (err) => {
        alert("Ошибка!!!");
        console.log(err);
      },
    );
  };

  render() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      this.active_window("Mmenu");
      window.history.pushState(null, "", window.location.href);
    }.bind(this);

    return (
      <div>
        <div className="mobile_heading">Финансы</div>
        <div className="mobile_container">
          <div className="finance_row">
            <div className="finance_item">Баланс:</div>
            <div className="finance_item">
              {this.props.store.movement.balance} руб.
            </div>
          </div>
          <div className="finance_row">
            <button
              className="mobile_finance_button"
              onClick={this.active_window.bind(this, "m_movement")}
            >
              Движения
            </button>
            <button
              className="mobile_finance_button"
              onClick={this.update_balance.bind(this)}
            >
              Обновить
            </button>
          </div>

          <div className="finance_row">
            <div className="finance_item">Начислено:</div>
            <div className="finance_item">
              {this.props.store.movement.profit} руб.
            </div>
          </div>
          <div className="finance_row">
            <button
              className="mobile_finance_button"
              onClick={this.active_window.bind(this, "m_bounty")}
            >
              Движения
            </button>
            <button
              className="mobile_finance_button"
              onClick={this.update_profit.bind(this)}
            >
              Обновить
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    set_active_window: (param) => {
      dispatch({ type: "set_active_window", payload: param });
    },
    set_balance: (param) => {
      dispatch({ type: "set_balance", payload: param });
    },
    set_profit: (param) => {
      dispatch({ type: "set_profit", payload: param });
    },
  }),
)(Screen);
