import React from "react";
import { connect } from "react-redux";
import { get_data } from "./../common/common_modules";
import { withCookies } from "react-cookie";

import { Header, Modal } from "semantic-ui-react";
import md5 from "md5";
import logo from "./../logo.svg";
import "./login.css";

class Screen extends React.Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.login();
    }
  };

  login = () => {
    if (
      this.props.store.login.username !== "" ||
      this.props.store.login.pass !== ""
    ) {
      const authdata = {
        username: this.props.store.login.username,
        pass: md5(this.props.store.login.pass),
      };

      get_data("autorization", authdata).then(
        (result) => {
          this.props.login(result);

          this.get_list(result.userkey);

          this.props.cookies.set("username", this.props.store.login.username, {
            maxAge: 1000000000000,
          });
          this.props.cookies.set("userkey", result.userkey, {
            maxAge: 1000000000000,
          });
          this.props.cookies.set("passkey", md5(this.props.store.login.pass), {
            maxAge: 1000000000000,
          });
        },
        (err) => {
          if (err === undefined || err === "") {
            this.props.set_modal_text("Ошибка авторизации!");
          } else {
            this.props.set_modal_text(err);
          }
          this.props.set_modal_show(true);
          this.props.set_modal_header("Ошибка");

          console.log(err);
        }
      );
    } else {
      this.props.set_modal_show(true);
      this.props.set_modal_header("Ошибка");
      this.props.set_modal_text("Необходимо ввести Имя пользователя и Пароль.");
    }
  };

  get_list = (userkey) => {
    get_data("list", { userkey: userkey }).then(
      (result) => {
        this.props.set_list(result);
      },
      (err) => {
        console.log(err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  close_modal_portal = () => {
    this.props.set_modal_show(false);
  };

  render() {
    return (
      <div className="login__container">
        <Modal
          closeIcon
          open={this.props.store.general.modal_show}
          onClose={this.close_modal_portal.bind(this)}
        >
          <Header>{this.props.store.general.modal_header}</Header>
          <Modal.Content>
            <p>{this.props.store.general.modal_text}</p>
          </Modal.Content>
        </Modal>

        <div className="login__row">
          <img src={logo} className="login__logo" alt="" />
        </div>

        <div className="login__row">
          <button
            className="login__button_back"
            onClick={() => (document.location = "https://express-kinetika.ru/")}
          >
            Перейти на сайт
          </button>
        </div>

        <div className="login__row">
          <p className="login__label">Вход в личный кабинет</p>
          <input
            className="login__input"
            value={this.props.store.login.login}
            onChange={(e) => this.props.set_login(e.target.value)}
            type="text"
            placeholder="Логин"
          />
          <input
            className="login__input"
            value={this.props.store.login.password}
            onChange={(e) => this.props.set_password(e.target.value)}
            type="password"
            placeholder="Пароль"
          />
          <button className="login__button" onClick={this.login.bind(this)}>
            Вход
          </button>
        </div>
      </div>
    );
  }
}

export default withCookies(
  connect(
    (state, ownProps) => ({ store: state, cookies: ownProps.cookies }),
    (dispatch) => ({
      login: (param) => {
        dispatch({ type: "LOGIN", payload: param });
      },
      set_login: (param) => {
        dispatch({ type: "SET_USERNAME", payload: param });
      },
      set_password: (param) => {
        dispatch({ type: "SET_PASS", payload: param });
      },
      set_active_window: (param) => {
        dispatch({ type: "set_active_window", payload: param });
      },
      set_list: (param) => {
        dispatch({ type: "SET_DISPATCH_LIST", payload: param });
      },
      set_error: (param) => {
        dispatch({ type: "SET_ERROR", payload: param });
      },
      set_modal_show: (param) => {
        dispatch({ type: "set_modal_show", payload: param });
      },
      set_modal_text: (param) => {
        dispatch({ type: "set_modal_text", payload: param });
      },
      set_modal_header: (param) => {
        dispatch({ type: "set_modal_header", payload: param });
      },
    })
  )(Screen)
);
