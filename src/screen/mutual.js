import React from "react";
import { connect } from "react-redux";
import "./mutual.css";
import { get_data } from "./../common/common_modules";

class Screen extends React.Component {
  tr_double_click = async (order) => {
    this.props.set_active_window("wait");

    const data = {
      userkey: this.props.store.login.userkey,
      Key: order.Key,
    };

    get_data("order", data).then(
      (result) => {
        console.log(result);
        this.props.set_order_data(result);
        this.props.set_active_window("order");
        this.props.set_last_window("mutual");
      },
      (err) => {
        console.log(err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  tr_click = async (index) => {
    this.props.set_mutual_active_row(index);
  };

  get_mutual = () => {
    this.props.set_active_window("wait");
    const data = {
      userkey: this.props.store.login.userkey,
      mobile: false,
      date_from: this.props.store.mutual.date_from,
      date_to: this.props.store.mutual.date_to,
    };
    console.log(data);
    get_data("mutuallist", data).then(
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
        <div className="my_disp_control_panel">
          <div>Период:</div>
          <div>
            <input
              className="pod_input"
              onChange={(e) => this.props.set_mutual_date_from(e.target.value)}
              value={this.props.store.mutual.date_from}
              type="date"
            ></input>
          </div>
          <div>-</div>
          <div>
            <input
              className="pod_input"
              onChange={(e) => this.props.set_mutual_date_to(e.target.value)}
              value={this.props.store.mutual.date_to}
              type="date"
            ></input>
          </div>
          <div>
            <button
              style={{ marginTop: "-5px" }}
              onClick={this.get_mutual.bind(this)}
              size="mini"
            >
              Получить данные
            </button>
          </div>
        </div>

        {this.props.store.mutual.data.length !== 0 ? (
          <div className="mutual_table">
            <div className="mutual_table_data">
              <table>
                <thead>
                  <tr>
                    <th>Дата</th>
                    <th>Номер</th>
                    <th>Заказчик</th>
                    <th>Исполнитель</th>
                    <th>Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.store.mutual.data.map((el, index) => {
                    let row_className = "";

                    if (index === this.props.store.mutual.active_row) {
                      row_className = "active";
                    }
                    return (
                      <tr
                        className={row_className}
                        key={el.Key}
                        onClick={this.tr_click.bind(this, index)}
                        onDoubleClick={this.tr_double_click.bind(this, el)}
                      >
                        <td>{el.Date}</td>
                        <td>{el.Number}</td>
                        <td>{el.Customer}</td>
                        <td>{el.Executor}</td>
                        <td>{el.Summ}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
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
    set_mutual_active_row: (param) => {
      dispatch({ type: "set_mutual_active_row", payload: param });
    },
    set_mutual_date_from: (param) => {
      dispatch({ type: "set_mutual_date_from", payload: param });
    },
    set_mutual_date_to: (param) => {
      dispatch({ type: "set_mutual_date_to", payload: param });
    },
    set_order_data: (param) => {
      dispatch({ type: "set_order_data", payload: param });
    },
    set_last_window: (param) => {
      dispatch({ type: "set_last_window", payload: param });
    },
  })
)(Screen);
