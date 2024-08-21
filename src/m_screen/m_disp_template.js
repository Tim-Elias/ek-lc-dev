import React from "react";
import { connect } from "react-redux";
import { get_data } from "../common/common_modules";
import Wait from "../screen/wait";
import "./mobile_disp_template.css";

class Screen extends React.Component {
  componentDidMount() {
    const data = {
      userkey: this.props.store.login.userkey,
    };
    this.props.set_active_loader(true);
    get_data("template", data).then(
      (result) => {
        this.props.set_template_list(result);
      },
      (err) => {
        console.log(err);
      },
    );

    get_data("citylist").then(
      (result) => {
        this.props.set_active_loader(false);
        this.props.SetCityList(result);
      },
      (err) => {
        console.log(err);
      },
    );
  }

  componentWillUnmount() {
    this.props.set_last_window("m_disp_template");
  }

  defult_disp = () => {
    this.props.set_active_window("m_create_disp");
  };

  select_template = (item) => {
    const send_city = this.props.store.m_create_disp.CityList.filter(
      (el) => el.value === item.send_city,
    )[0];
    const rec_city = this.props.store.m_create_disp.CityList.filter(
      (el) => el.value === item.rec_city,
    )[0];

    const s_city = {
      city: item.send_city,
    };
    const r_city = {
      city: item.rec_city,
    };

    get_data("terminallist", {
      city: s_city.city,
      userkey: this.props.store.login.userkey,
    }).then(
      (result) => {
        const data = {
          result: result,
          terminal: null,
        };

        this.props.SetSendTerminalListMobile(data);
      },
      (err) => {
        console.log(err);
      },
    );

    get_data("terminallist", {
      city: r_city.city,
      userkey: this.props.store.login.userkey,
    }).then(
      (result) => {
        const data = {
          result: result,
          terminal: null,
        };
        this.props.SetRecTerminalListMobile(data);
      },
      (err) => {
        console.log(err);
      },
    );

    let data = {
      data: item,
      send_city: send_city,
      rec_city: rec_city,
    };
    this.props.set_select_template(data);
    this.props.set_active_window("m_create_disp");
  };

  render() {
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      this.props.set_active_window("Mmenu");
      window.history.pushState(null, "", window.location.href);
    }.bind(this);

    return (
      <div>
        {this.props.store.general.active_loader ? (
          <Wait />
        ) : (
          <div>
            <div className="mobile_heading">Выбрать шаблон</div>
            <div className="mobile_container">
              <div className="m_disp_tempalate_container">
                {this.props.store.m_create_disp.template_list.map(
                  (item, index) => (
                    <button
                      key={index}
                      className="m_disp_tempalate_item"
                      onClick={this.select_template.bind(this, item)}
                    >
                      {item.name}
                    </button>
                  ),
                )}
                <button
                  className="m_disp_tempalate_item m_disp_tempalate_item--defult"
                  onClick={this.defult_disp.bind(this)}
                >
                  Заполнить самому
                </button>
              </div>
            </div>
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
    set_last_window: (param) => {
      dispatch({ type: "set_last_window", payload: param });
    },
    SetCityList: (param) => {
      dispatch({ type: "SetCityListMobile", payload: param });
    },
    set_active_window: (param) => {
      dispatch({ type: "set_active_window", payload: param });
    },
    set_active_loader: (param) => {
      dispatch({ type: "set_active_loader", payload: param });
    },
    set_template_list: (param) => {
      dispatch({ type: "set_template_list", payload: param });
    },
    set_select_template: (param) => {
      dispatch({ type: "set_select_template", payload: param });
    },
    SetSendTerminalListMobile: (param) => {
      dispatch({ type: "SetSendTerminalListMobile", payload: param });
    },
    SetRecTerminalListMobile: (param) => {
      dispatch({ type: "SetRecTerminalListMobile", payload: param });
    },
  }),
)(Screen);
