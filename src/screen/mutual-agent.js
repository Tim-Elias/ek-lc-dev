import React from "react";
import { connect } from "react-redux";
import "./mutual.css";

import { get_data } from "./../common/common_modules";

class Screen extends React.Component {
  get_mutual = () => {
    this.props.set_active_window("wait");
    const data = {
      userkey: this.props.store.login.userkey,
      mobile: false,
      date_from: document.getElementById("date_from").value,
      date_to: document.getElementById("date_to").value,
    };

    get_data("mutual", data).then(
      (result) => {
        console.log(result);
        this.props.set_data_mutual(result);
        this.props.set_active_window("mutual");
      },
      (err) => {
        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);

        this.props.set_active_window("mutual");
        console.log(err);
        // this.props.set_mutual_error(err)
      }
    );
  };

  render() {
    document.onkeydown = function (event) {};
    return (
      <div>
        <div className="mutual_int">
          <div className="mutual_int_label">Период с </div>
          <div className="mutual_int_input_area">
            <input
              id="date_from"
              className="mutual_int_input"
              type="date"
            ></input>
          </div>
          <div className="mutual_int_label">по</div>
          <div className="mutual_int_input_area">
            <input
              id="date_to"
              className="mutual_int_input"
              type="date"
            ></input>
          </div>
          <div>
            <button
              id="get_mutual_button"
              onClick={this.get_mutual.bind(this)}
              className="get_mutual_button"
            >
              Получить данные
            </button>
          </div>
        </div>
        <div>{this.props.store.mutual.error}</div>

        {this.props.store.mutual.data.length !== 0 ? (
          <div className="mutual_table">
            <div className="mutual_int_label">Начисления за период:</div>
            <div className="mutual_table_data">
              <table>
                <thead>
                  <tr>
                    <tr>
                      <th>Дата</th>
                      <th>Накладная</th>
                      <th>Заказчик</th>
                      <th>Действие</th>
                      <th>Город</th>
                      <th>Адрес</th>
                      <th>Вес</th>
                      <th>Сумма</th>
                    </tr>
                  </tr>
                </thead>
                <tbody>
                  {this.props.store.mutual.data.map((disp, index) => (
                    <tr key={index}>
                      <td>{disp.date}</td>
                      <td>{disp.disp}</td>
                      <td>{disp.customer}</td>
                      <td>{disp.doc}</td>
                      <td>{disp.city}</td>
                      <td>{disp.address}</td>
                      <td>{disp.weight}</td>
                      <td>{disp.summ}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mutual_int_label">
              Итого насчислено за период: {this.props.store.mutual.total} руб.
            </div>
          </div>
        ) : null}
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
    set_data_mutual: (param) => {
      dispatch({ type: "set_data_mutual", payload: param });
    },
    set_mutual_error: (param) => {
      dispatch({ type: "set_mutual_error", payload: param });
    },
  })
)(Screen);
