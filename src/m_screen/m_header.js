import React from "react";
import { connect } from "react-redux";
import logo from "./../logo.svg";
import "./mobile_header.css";

class Screen extends React.Component {
  menu_active = () => {
    this.props.set_mobile_menu("Mmenu");
  };

  menu_active_arrow = (window) => {
    this.props.set_mobile_menu(window);
  };

  render() {
    return (
      <header className="header_mobile">
        <div className="mobile_container">
          {this.props.store.general.active_window === "m_delivered" ||
            (this.props.store.general.active_window === "m_not_delivered" && (
              <i
                className={"ek-arrow-left"}
                onClick={this.menu_active_arrow.bind(this, "m_disp")}
              />
            ))}

          {this.props.store.general.active_window === "m_disp" && (
            <i
              className={"ek-arrow-left"}
              onClick={this.menu_active_arrow.bind(this, "m_storage")}
            />
          )}
          {!(
            this.props.store.general.active_window === "Mmenu" ||
            this.props.store.general.active_window === "m_disp" ||
            this.props.store.general.active_window === "m_delivered" ||
            this.props.store.general.active_window === "m_not_delivered" ||
            this.props.store.general.active_window === "m_movement" ||
            this.props.store.general.active_window === "m_bounty" ||
            this.props.store.general.active_window === "m_manifest" ||
            this.props.store.general.active_window === "m_receiv_from_sender" ||
            this.props.store.general.active_window === "m_check_print"
          ) && (
            <i className={"ek-menu"} onClick={this.menu_active.bind(this)} />
          )}
          {this.props.store.general.active_window === "m_movement" && (
            <i
              className={"ek-arrow-left"}
              onClick={this.menu_active_arrow.bind(this, "m_finance")}
            />
          )}
          {this.props.store.general.active_window === "m_check_print" && (
            <i
              className={"ek-arrow-left"}
              onClick={this.menu_active_arrow.bind(this, "m_bounty")}
            />
          )}

          {this.props.store.general.active_window === "m_bounty" && (
            <i
              className={"ek-arrow-left"}
              onClick={this.menu_active_arrow.bind(this, "m_finance")}
            />
          )}
          {this.props.store.general.active_window === "m_manifest" && (
            <i
              className={"ek-arrow-left"}
              onClick={this.menu_active_arrow.bind(this, "m_get_manifest")}
            />
          )}

          {this.props.store.general.active_window ===
            "m_receiv_from_sender" && (
            <i
              className={"ek-arrow-left"}
              onClick={this.menu_active_arrow.bind(this, "m_disp")}
            />
          )}
          <img className="header_mobile_logo" src={logo} alt="" />
        </div>
      </header>
    );
  }
}

export default connect(
  (state) => ({ store: state }),
  (dispatch) => ({
    set_mobile_menu: (param) => {
      dispatch({ type: "set_mobile_menu", payload: param });
    },
  })
)(Screen);
