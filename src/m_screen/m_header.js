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
    const menuMap = {
      m_disp: {
        onClick: this.menu_active_arrow.bind(this, "m_storage"),
      },

      m_delivered: {
        onClick: this.menu_active_arrow.bind(this, "m_disp"),
      },

      m_not_delivered: {
        onClick: this.menu_active_arrow.bind(this, "m_disp"),
      },

      m_movement: {
        onClick: this.menu_active_arrow.bind(this, "m_finance"),
      },

      m_bounty: {
        onClick: this.menu_active_arrow.bind(this, "m_finance"),
      },

      m_manifest: {
        onClick: this.menu_active_arrow.bind(this, "m_get_manifest"),
      },

      m_receiv_from_sender: {
        onClick: this.menu_active_arrow.bind(this, "m_disp"),
      },

      m_check_print: {
        onClick: this.menu_active_arrow.bind(this, "m_bounty"),
      },
    };

    const active_window = this.props.store.general.active_window;

    const menuItem = menuMap[active_window];

    return (
      <header className="header_mobile">
        <div className="mobile_container">
          {active_window !== "Mmenu" &&
            (menuItem ? (
              <i
                className={"ek-arrow-left menu_icon"}
                onClick={menuItem.onClick}
              />
            ) : (
              <i
                className={"ek-menu menu_icon"}
                onClick={this.menu_active.bind(this)}
              />
            ))}

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
