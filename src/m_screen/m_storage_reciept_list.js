import React from "react";
import { connect } from "react-redux";
import { get_data } from "./../common/common_modules";
import QrReader from "react-qr-reader";
import "./mobile.css";
import "./mobile_storage_reciept.css";
import Wait from "../screen/wait";
import done_sound from "./../common/ping.mp3";
import err_sound from "./../common/err.mp3";
import funk_sound from "./../common/funk.mp3";
import abakan from "./../common/sound/Абакан.wav";
import as from "./../common/sound/Анжеро-Судженск.wav";
import achinsk from "./../common/sound/Ачинск.wav";
import barabinsk from "./../common/sound/Барабинск.wav";
import barnayl from "./../common/sound/Барнаул.wav";
import belovo from "./../common/sound/Белово.wav";
import berdsk from "./../common/sound/Бердск.wav";
import bisk from "./../common/sound/Бийск.wav";
import bogotol from "./../common/sound/Боготол.wav";
import ga from "./../common/sound/Горно-Алтайск.wav";
import ekaterenburg from "./../common/sound/Екатеренбург.wav";
import jeleznogorsk from "./../common/sound/Железногорск.wav";
import zelenogorsk from "./../common/sound/Зеленогорск.wav";
import irkytsk from "./../common/sound/Иркутск.wav";
import kemerovo from "./../common/sound/Кемерово.wav";
import kiselev from "./../common/sound/Киселевск.wav";
import krasnoiarsk from "./../common/sound/Красноярск.wav";
import kyibishev from "./../common/sound/Куйбышев.wav";
import lk from "./../common/sound/Ленинск-Кузнецкий.wav";
import mariinsk from "./../common/sound/Мариинск.wav";
import mejdyrechinsk from "./../common/sound/Междуреченск.wav";
import novokyzneck from "./../common/sound/Новокузнецк.wav";
import novosibirsk from "./../common/sound/Новосибирск.wav";
import omsk from "./../common/sound/Омск.wav";
import osiniki from "./../common/sound/Осинники.wav";
import polisaevo from "./../common/sound/Полысаево.wav";
import prokopevsk from "./../common/sound/Прокопьевск.wav";
import sp from "./../common/sound/Санкт-Петербург.wav";
import tomsk from "./../common/sound/Томск.wav";
import habarovsk from "./../common/sound/Хабаровск.wav";
import chita from "./../common/sound/Чита.wav";
import sklad from "./../common/sound/Склад.wav";
import dver from "./../common/sound/Дверь.wav";
import neznaugorod from "./../common/sound/НеЗнаюГород.wav";

class Screen extends React.Component {
  componentDidMount() {
    this.props.storage_reciept_clear_list();
    this.props.storage_reciept_set_barcode("");
    this.props.storage_reciept_sound(false);
    this.props.storage_reciept_qr(false);

    document.addEventListener("keydown", this.enter);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.enter);
  }

  enter = (e) => {
    if (e.keyCode === 13) {
      this.add_disp(this.props.store.storage_reciept.barcode);
    }
  };

  city_sound = (city) => {
    let sound;
    switch (city) {
      case "Абакан":
        sound = abakan;
        break;
      case "Анжеро-Судженск":
        sound = as;
        break;
      case "Ачинск":
        sound = achinsk;
        break;
      case "Барабинск":
        sound = barabinsk;
        break;
      case "Барнаул":
        sound = barnayl;
        break;
      case "Белово":
        sound = belovo;
        break;
      case "Бердск":
        sound = berdsk;
        break;
      case "Бийск":
        sound = bisk;
        break;
      case "Боготол":
        sound = bogotol;
        break;
      case "Горно-Алтайск":
        sound = ga;
        break;
      case "Екатеренбург":
        sound = ekaterenburg;
        break;
      case "Железногорск":
        sound = jeleznogorsk;
        break;
      case "Зеленогорск":
        sound = zelenogorsk;
        break;
      case "Иркутск":
        sound = irkytsk;
        break;
      case "Кемерово":
        sound = kemerovo;
        break;
      case "Киселевск":
        sound = kiselev;
        break;
      case "Красноярск":
        sound = krasnoiarsk;
        break;
      case "Куйбышев":
        sound = kyibishev;
        break;
      case "Ленинск-Кузнецкий":
        sound = lk;
        break;
      case "Мариинск":
        sound = mariinsk;
        break;
      case "Междуреченск":
        sound = mejdyrechinsk;
        break;
      case "Новокузнецк":
        sound = novokyzneck;
        break;
      case "Новосибирск":
        sound = novosibirsk;
        break;
      case "Омск":
        sound = omsk;
        break;
      case "Осинники":
        sound = osiniki;
        break;
      case "Полысаево":
        sound = polisaevo;
        break;
      case "Прокопьевск":
        sound = prokopevsk;
        break;
      case "Санкт-Петербург":
        sound = sp;
        break;
      case "Томск":
        sound = tomsk;
        break;
      case "Хабаровск":
        sound = habarovsk;
        break;
      case "Чита":
        sound = chita;
        break;

      default:
        sound = neznaugorod;
        break;
    }
    return sound;
  };

  focus_input = () => {
    if (!this.props.store.storage_reciept.qr) {
      document.getElementById("storage_reciept_input").focus();
    }
  };

  add_disp = (disp) => {
    if (this.props.store.storage_reciept.barcode !== "") {
      get_data("storage_chek", {
        userkey: this.props.store.login.userkey,
        disp: disp,
      }).then(
        (result) => {
          if (
            this.props.store.storage_reciept.disp_list.find(
              (item) => item.num === result.num
            ) === undefined
          ) {
            if (result !== "status finish") {
              this.props.storage_reciept_add_disp_list(result);

              this.props.storage_reciept_set_barcode("");

              if (this.props.store.storage_reciept.sound) {
                let sound = this.city_sound(result.rec_city);
                const audioCity = new Audio(sound);
                audioCity.type = "audio/ogg";
                audioCity.addEventListener("ended", function storageSound() {
                  if (
                    result.del_method === "Дверь-Дверь" ||
                    result.del_method === "Склад-Дверь"
                  ) {
                    const audio = new Audio(dver);
                    audio.type = "audio/ogg";
                  } else if (
                    result.del_method === "Склад-Склад" ||
                    result.del_method === "Дверь-Склад"
                  ) {
                    const audio = new Audio(sklad);
                    audio.type = "audio/ogg";
                  }
                  audioCity.removeEventListener("ended", storageSound);
                });
                audioCity.play();
              }
            } else {
              const audio = new Audio(err_sound);
              audio.type = "audio/ogg";
              this.props.set_popup_message(
                "Накладная не может быть принята на склад т.к. находится в завершенном статусе"
              );
              this.props.storage_reciept_set_barcode("");
            }
          } else {
            if (this.props.store.storage_reciept.sound) {
              const audio = new Audio(err_sound);
              audio.type = "audio/ogg";
            }
            this.props.set_popup_message("Накладная уже добавлена!");
          }
        },
        (err) => {
          this.props.set_popup_message("Накладной не существует!");
          console.log(err);
        }
      );
    }
    this.focus_input();
  };

  send_req = () => {
    let disp_list = this.props.store.storage_reciept.disp_list.map(
      (item) => (item = item.num)
    );
    const data = {
      userkey: this.props.store.login.userkey,
      storage: this.props.store.storage_reciept.storage.id,
      disp_list: disp_list,
    };

    this.props.set_active_loader(true);

    get_data("storagereciept_list", data).then(
      (result) => {
        this.props.set_popup_message("Накладные успешно приняты!");
        this.props.storage_reciept_clear_list();

        this.props.set_active_loader(false);
      },
      (err) => {
        this.props.set_active_loader(false);
        this.props.set_popup_message(err);
        console.log(err);
      }
    );
  };

  handleScan = (data) => {
    if (data && this.props.store.storage_reciept.barcode !== data) {
      this.props.storage_reciept_set_barcode(data);
      this.add_disp(data);
    }
  };

  handleError = (err) => {
    console.error(err);
  };

  sound = () => {
    this.props.storage_reciept_sound(!this.props.store.storage_reciept.sound);
    this.focus_input();

    if (this.props.store.storage_reciept.sound) {
      const audio = new Audio(funk_sound);
      audio.type = "audio/ogg";
    } else {
      const audio = new Audio(done_sound);
      audio.type = "audio/ogg";
    }
  };

  render() {
    return (
      <div>
        <div className="mobile_heading">Приемка на склад несколько</div>
        {this.props.store.general.active_loader ? (
          <Wait />
        ) : (
          <div className="storage_reciept_container">
            <div className="storage_reciept_item">
              Текущий склад: {this.props.store.storage_reciept.storage.name}
            </div>
            {/* <div className="storage_reciept_item">
                            Зона хранения: {this.props.store.storage_reciept.selected_zone}
                        </div> */}
            <div
              className="storage_reciept_item"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div style={{ display: "flex" }}>
                Звук:
                <label className="switch">
                  <input
                    type="checkbox"
                    value={this.props.store.storage_reciept.Sound}
                    onChange={() => this.sound()}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              <div style={{ display: "flex" }}>
                Ввод:
                <label className="switch">
                  <input
                    type="checkbox"
                    value={this.props.store.storage_reciept.inputMode}
                    onChange={() => this.props.storage_reciept_inputMode()}
                  />
                  <span className="slider round"></span>
                </label>
              </div>

              {/* <div style={{ display: "flex" }}>
                                QR:
                                <label className="switch">
                                    <input type="checkbox" value={this.props.store.storage_reciept.qr} onChange={() => this.props.storage_reciept_qr(!this.props.store.storage_reciept.qr)} />
                                    <span className="slider round"></span>
                                </label>
                            </div> */}
            </div>
            <input
              inputMode={this.props.store.storage_reciept.inputMode}
              className="storage_reciept_input"
              id="storage_reciept_input"
              autoFocus
              value={this.props.store.storage_reciept.barcode}
              onChange={(e) => {
                this.props.storage_reciept_set_barcode(e.target.value);
              }}
            />
            <button
              className="storage_reciept_button_m"
              onClick={() =>
                this.add_disp(this.props.store.storage_reciept.barcode)
              }
            >
              Добавить
            </button>
            {this.props.store.storage_reciept.qr ? (
              <QrReader
                delay={100}
                onError={this.handleError}
                onScan={this.handleScan}
                style={{ width: "100%", margin: " 10px 0 0 0" }}
              />
            ) : null}
            <button
              className="storage_reciept_button_m storage_reciept_button_m--fw"
              onClick={() => this.send_req()}
            >
              Получить
            </button>

            <div className="storage_reciept_list">
              {this.props.store.storage_reciept.disp_list.map((item, index) => (
                <div className="storage_reciept_list_item" key={index}>
                  <div className="storage_reciept_list_row">
                    <div className="storage_reciept_list_label">Накладная:</div>
                    <div className="storage_reciept_list_value">{item.num}</div>
                  </div>
                  <div className="storage_reciept_list_row">
                    <div className="storage_reciept_list_label">
                      Вид доставки:
                    </div>
                    <div className="storage_reciept_list_value">
                      {item.del_method}
                    </div>
                  </div>
                  <div className="storage_reciept_list_row">
                    <div className="storage_reciept_list_label">Дата:</div>
                    <div className="storage_reciept_list_value">
                      {item.task_date}
                    </div>
                  </div>
                  <div className="storage_reciept_list_row">
                    <div className="storage_reciept_list_label">Город:</div>
                    <div className="storage_reciept_list_value">
                      {item.rec_city}
                    </div>
                  </div>
                  <div className="storage_reciept_list_row">
                    <div className="storage_reciept_list_label">Адрес:</div>
                    <div className="storage_reciept_list_value">
                      {item.rec_adress}
                    </div>
                  </div>
                  <button
                    className="storage_reciept_button_delete"
                    onClick={() => {
                      this.props.storage_reciept_delete_list_item(index);
                      this.focus_input();
                    }}
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>

            {this.props.store.storage_reciept.status_type === "err" ? (
              <div>{this.props.store.storage_reciept.status_message}</div>
            ) : null}
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
    storage_reciept_add_disp_list: (param) => {
      dispatch({ type: "storage_reciept_add_disp_list", payload: param });
    },

    storage_reciept_inputMode: (param) => {
      dispatch({ type: "storage_reciept_inputMode", payload: param });
    },

    storage_reciept_qr: (param) => {
      dispatch({ type: "storage_reciept_qr", payload: param });
    },
    storage_reciept_sound: (param) => {
      dispatch({ type: "storage_reciept_sound", payload: param });
    },
    storage_reciept_clear_list: (param) => {
      dispatch({ type: "storage_reciept_clear_list", payload: param });
    },

    storage_reciept_delete_list_item: (param) => {
      dispatch({ type: "storage_reciept_delete_list_item", payload: param });
    },

    storage_reciept_set_barcode: (param) => {
      dispatch({ type: "storage_reciept_set_barcode", payload: param });
    },
    storage_reciept_set_result: (param) => {
      dispatch({ type: "storage_reciept_set_result", payload: param });
    },
    storage_reciept_set_selected_zone: (param) => {
      dispatch({ type: "storage_reciept_set_selected_zone", payload: param });
    },

    storage_reciept_set_done_sound: (param) => {
      dispatch({ type: "storage_reciept_set_done_sound", payload: param });
    },
    storage_reciept_set_err_sound: (param) => {
      dispatch({ type: "storage_reciept_set_err_sound", payload: param });
    },
    storage_reciept_set_funk_sound: (param) => {
      dispatch({ type: "storage_reciept_set_funk_sound", payload: param });
    },
    storage_reciept_set_status_message: (param) => {
      dispatch({ type: "storage_reciept_set_status_message", payload: param });
    },
    storage_reciept_set_status_type: (param) => {
      dispatch({ type: "storage_reciept_set_status_type", payload: param });
    },

    set_active_window: (param) => {
      dispatch({ type: "set_active_window", payload: param });
    },
    set_popup_message: (param) => {
      dispatch({ type: "set_popup_message", payload: param });
    },

    set_active_loader: (param) => {
      dispatch({ type: "set_active_loader", payload: param });
    },
  })
)(Screen);
