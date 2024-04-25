import React from "react";
import { connect } from "react-redux";
import { get_data } from "./../common/common_modules";
import Wait from "../screen/wait";

class Screen extends React.Component {
  update = () => {
    this.props.set_active_loader(true);
    const list_data = { userkey: this.props.store.login.userkey };

    get_data("enroute", list_data).then(
      (result) => {
        this.props.set_list_get_manifest(result);
        this.props.set_active_loader(false);
      },
      (err) => {
        console.log(err);
        alert(err);
      }
    );
  };

  tr_click(num) {
    this.props.set_active_get_manifest(num);
  }

  tr_double_click = (num) => {
    this.props.set_active_window("wait");
    const data = {
      userkey: this.props.store.login.userkey,
      num: num,
    };

    get_data("manifestenroute", data).then(
      (result) => {
        this.props.set_data_manifest(result);
        this.props.set_active_window("m_manifest");
        this.props.set_action_manifest("get");
      },
      (err) => {
        console.log(err);
        alert(err);
      }
    );
  };

  componentDidMount() {
    this.update();
  }

  render() {
    document.onkeydown = function (event) {};

    return (
      <div>
        <div className="mobile_heading">Входящие манифесты</div>
        {this.props.store.general.active_loader ? (
          <Wait />
        ) : (
          <div className="mobile_container">
            <button className="send_pod" onClick={this.update.bind(this)}>
              Обновить данные
            </button>

            {this.props.store.get_manifest.list.length !== 0 ? (
              <div>
                {this.props.store.get_manifest.list.map((disp, index) => (
                  <div
                    key={index}
                    onClick={this.tr_double_click.bind(this, disp.num)}
                  >
                    <div className="disp_address_data_header">
                      Манифест № {disp.num}
                    </div>
                    <div className="disp_address_data_el">
                      <div className="mobile_disp_data_label">
                        Дата отправления:
                      </div>
                      <div className="mobile_disp_data_el">{disp.date}</div>
                      <div className="mobile_disp_data_label">
                        Склад отправления:
                      </div>
                      <div className="mobile_disp_data_el">{disp.sender}</div>
                      <div className="mobile_disp_data_label">Перевозчик:</div>
                      <div className="mobile_disp_data_el">{disp.carrier}</div>
                      <div className="mobile_disp_data_label">
                        Количество накладных:
                      </div>
                      <div className="mobile_disp_data_el">
                        {disp.totaldisp}
                      </div>
                      <div className="mobile_disp_data_label">
                        Общее количество мест:
                      </div>
                      <div className="mobile_disp_data_el">{disp.total}</div>
                      <div className="mobile_disp_data_label">Общий вес:</div>
                      <div className="mobile_disp_data_el">
                        {disp.totalweight}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              "Нет ожидаемых входящих манифестов"
            )}
          </div>
        )}
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
    set_list_get_manifest: (param) => {
      dispatch({ type: "set_list_get_manifest", payload: param });
    },
    set_active_get_manifest: (param) => {
      dispatch({ type: "set_active_get_manifest", payload: param });
    },

    set_action_manifest: (param) => {
      dispatch({ type: "set_action_manifest", payload: param });
    },
    set_data_manifest: (param) => {
      dispatch({ type: "set_data_manifest", payload: param });
    },
    set_active_loader: (param) => {
      dispatch({ type: "set_active_loader", payload: param });
    },
  })
)(Screen);
