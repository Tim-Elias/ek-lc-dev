import React from "react";
import { connect } from "react-redux";
import { get_data } from "./../common/common_modules";
import Select from "react-select";
import "./home_ek.css";
import { calcPriceStyle } from "./../common/calc_price_style";

class Screen extends React.Component {
  componentDidMount() {
    get_data("citylist").then(
      (result) => {
        this.props.SetCityList(result);
      },
      (err) => {
        console.log(err);
        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  }

  componentWillUnmount() {
    this.props.clean_calc_priсe();
  }

  SelectSendCity = (value) => {
    this.props.set_calc_price_send_terminal_city(false);
    this.props.set_calc_price_send_terminal(false);
    this.props.set_calc_price_send_city(value);

    const city = value.label;

    get_data("terminallist", {
      city: city,
      userkey: this.props.store.login.userkey,
    }).then(
      (result) => {
        this.props.set_calc_price_send_terminal_list(result);
        if (result.length === 0) {
          this.props.set_calc_price_send_terminal_city(false);
          this.props.set_calc_price_send_terminal(false);
        } else {
          this.props.set_calc_price_send_terminal_city(true);
          this.props.set_calc_price_select_send_terminal(result[0]);
        }
      },
      (err) => {
        console.log("err", err);
        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  SelectRecCity = (value) => {
    this.props.set_calc_price_rec_terminal_city(false);
    this.props.set_calc_price_rec_terminal(false);
    this.props.set_calc_price_rec_city(value);

    const city = value.label;

    get_data("terminallist", {
      city: city,
      userkey: this.props.store.login.userkey,
    }).then(
      (result) => {
        this.props.set_calc_price_rec_terminal_list(result);
        if (result.length === 0) {
          this.props.set_calc_price_rec_terminal_city(false);
          this.props.set_calc_price_rec_terminal(false);
        } else {
          this.props.set_calc_price_rec_terminal_city(true);
          this.props.set_calc_price_select_rec_terminal(result[0]);
        }
      },
      (err) => {
        console.log("err", err);
        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  CalcPrice = () => {
    if (
      this.props.store.calc_price.calc_price_send_city === "" ||
      this.props.store.calc_price.calc_price_rec_city === ""
    ) {
      this.props.set_calc_price_result("Не удалось рассчитать");
      this.props.modules.set_modal_show(true);
      this.props.modules.set_modal_header("Ошибка");
      this.props.modules.set_modal_text(
        "Не указан город отправления или город получения!"
      );
    } else {
      let Volume =
        this.props.store.calc_price.calc_price_cargo_info_type.key === 1
          ? (this.props.store.calc_price.calc_price_l *
              this.props.store.calc_price.calc_price_w *
              this.props.store.calc_price.calc_price_h) /
            5000
          : Math.ceil(
              this.props.store.calc_price.CargoList.reduce(
                (accumulator, Cargo) =>
                  accumulator + Math.ceil(Cargo.Weight * Cargo.Q * 1000) / 1000,
                0
              ) * 1000
            ) / 1000;
      let Weight =
        this.props.store.calc_price.calc_price_cargo_info_type.key === 1
          ? this.props.store.calc_price.calc_price_weight === ""
            ? 0
            : this.props.store.calc_price.calc_price_weight
          : Math.ceil(
              this.props.store.calc_price.CargoList.reduce(
                (accumulator, Cargo) =>
                  accumulator +
                  Math.ceil((Cargo.L * Cargo.W * Cargo.H * Cargo.Q) / 5) / 1000,
                0
              ) * 1000
            ) / 1000;

      const calcPriceData = {
        userkey: this.props.store.login.userkey,
        SendCity: this.props.store.calc_price.calc_price_send_city.label,
        SendTerminal: this.props.store.calc_price.calc_price_send_terminal,
        RecCity: this.props.store.calc_price.calc_price_rec_city.label,
        RecTerminal: this.props.store.calc_price.calc_price_rec_terminal,
        Volume: Volume,
        Weight: Weight,
      };

      get_data("customercalc", calcPriceData).then(
        (result) => {
          this.props.set_calc_price_result(result);
        },
        (err) => {
          this.props.set_calc_price_result("Не удалось рассчитать");
          this.props.modules.set_modal_show(true);
          this.props.modules.set_modal_header("Ошибка");

          console.log(err);
          this.props.modules.set_modal_text(err);
        }
      );
    }
  };

  SetCargoWeight = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.set_calc_price_cargo_weight(data);
  };

  SetCargoW = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.set_calc_price_w(data);
  };

  SetCargoL = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.set_calc_price_cargoL(data);
  };

  SetCargoH = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.set_calc_price_cargoH(data);
  };

  SetCargoQ = (value, index) => {
    const data = {
      value: value,
      index: index,
    };
    this.props.set_calc_price_cargoQ(data);
  };

  RemoveCargo = (index) => {
    this.props.remove_calc_price_cargo(index);
  };

  render() {
    let total_weight =
      Math.ceil(
        this.props.store.calc_price.CargoList.reduce(
          (accumulator, Cargo) =>
            accumulator + Math.ceil(Cargo.Weight * Cargo.Q * 1000) / 1000,
          0
        ) * 1000
      ) / 1000;
    let total_volume =
      Math.ceil(
        this.props.store.calc_price.CargoList.reduce(
          (accumulator, Cargo) =>
            accumulator +
            Math.ceil((Cargo.L * Cargo.W * Cargo.H * Cargo.Q) / 5) / 1000,
          0
        ) * 1000
      ) / 1000;

    return (
      <div>
        <div className="calc_price_container">
          <div className="calc_price_row">
            <div className="calc_price_label">Город отправления:</div>

            <Select
              value={this.props.store.calc_price.calc_price_send_city}
              options={this.props.store.create_disp.CityList}
              styles={calcPriceStyle}
              onChange={(values) => this.SelectSendCity(values)}
              placeholder=" "
            />
          </div>

          <div className="calc_price_row">
            <div className="calc_price_label">Отправка со склада:</div>

            <input
              type="radio"
              className="calc_price_input calc_price_input--checkbox"
              checked={this.props.store.calc_price.calc_price_send_terminal}
              onChange={() => this.props.set_calc_price_send_terminal(true)}
              disabled={
                !this.props.store.calc_price.calc_price_send_terminal_city
              }
            />
          </div>

          <div className="calc_price_row">
            <div className="calc_price_label">Отправка с адреса:</div>

            <input
              type="radio"
              className="calc_price_input calc_price_input--checkbox"
              checked={!this.props.store.calc_price.calc_price_send_terminal}
              onChange={() => this.props.set_calc_price_send_terminal(false)}
              disabled={
                !this.props.store.calc_price.calc_price_send_terminal_city
              }
            />
          </div>

          {this.props.store.calc_price.calc_price_send_terminal ? (
            <div className="calc_price_row">
              <div className="calc_price_label">Адрес склада:</div>

              <input
                type="text"
                className="calc_price_input calc_price_input"
                value={
                  this.props.store.calc_price.calc_price_send_terminal_list[0]
                    .label
                }
                disabled
              />
            </div>
          ) : null}

          <div className="calc_price_row">
            <div className="calc_price_label">Город назначения:</div>

            <Select
              value={this.props.store.calc_price.calc_price_rec_city}
              options={this.props.store.create_disp.CityList}
              styles={calcPriceStyle}
              onChange={(values) => this.SelectRecCity(values)}
              placeholder=" "
            />
          </div>

          <div className="calc_price_row">
            <div className="calc_price_label">Получение на складе:</div>

            <input
              type="radio"
              className="calc_price_input calc_price_input--checkbox"
              checked={this.props.store.calc_price.calc_price_rec_terminal}
              onChange={() => this.props.set_calc_price_rec_terminal(true)}
              disabled={
                !this.props.store.calc_price.calc_price_rec_terminal_city
              }
            />
          </div>

          <div className="calc_price_row">
            <div className="calc_price_label">Получение с адреса:</div>

            <input
              type="radio"
              className="calc_price_input calc_price_input--checkbox"
              checked={!this.props.store.calc_price.calc_price_rec_terminal}
              onChange={() => this.props.set_calc_price_rec_terminal(false)}
              disabled={
                !this.props.store.calc_price.calc_price_rec_terminal_city
              }
            />
          </div>

          {this.props.store.calc_price.calc_price_rec_terminal ? (
            <div className="calc_price_row">
              <div className="calc_price_label">Адрес склада:</div>

              <input
                type="text"
                className="calc_price_input calc_price_input"
                value={
                  this.props.store.calc_price.calc_price_rec_terminal_list[0]
                    .label
                }
                disabled
              />
            </div>
          ) : null}

          <div className="calc_price_row">
            <div className="calc_price_label">Информация о грузе:</div>

            <Select
              value={this.props.store.calc_price.calc_price_cargo_info_type}
              options={[
                {
                  key: 1,
                  label: "Итоговые значения",
                  value: "Итоговые значения",
                },
                {
                  key: 2,
                  label: "Информация о каждом грузе",
                  value: "Информация о каждом грузе",
                },
              ]}
              styles={calcPriceStyle}
              onChange={(values) =>
                this.props.set_calc_price_cargo_info_type(values)
              }
              placeholder=" "
            />
          </div>

          {this.props.store.calc_price.calc_price_cargo_info_type.key === 2 ? (
            <div className="disp_cargo_table_data">
              <table>
                <thead><tr>
                  <th>Вес (кг)</th>
                  <th>Длина (см)</th>
                  <th>Ширина (см)</th>
                  <th>Высота (см)</th>
                  <th>Об. вес</th>
                  <th>Количество</th>
                  <th>Итоговый вес</th>
                  <th>Итог. об. вес</th>
                  {this.props.store.calc_price.CargoList.length === 1 ? null : (
                    <th></th>
                  )}
                </tr></thead>
                <tbody>
                  {this.props.store.calc_price.CargoList.map((Cargo, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          className="create_disp_td_input"
                          value={Cargo.Weight}
                          onChange={(e) =>
                            this.SetCargoWeight(e.target.value, index)
                          }
                          type="number"
                        />
                      </td>
                      <td>
                        <input
                          className="create_disp_td_input"
                          value={Cargo.L}
                          onChange={(e) =>
                            this.SetCargoL(e.target.value, index)
                          }
                          type="number"
                        />
                      </td>
                      <td>
                        <input
                          className="create_disp_td_input"
                          value={Cargo.H}
                          onChange={(e) =>
                            this.SetCargoH(e.target.value, index)
                          }
                          type="number"
                        />
                      </td>
                      <td>
                        <input
                          className="create_disp_td_input"
                          value={Cargo.W}
                          onChange={(e) =>
                            this.SetCargoW(e.target.value, index)
                          }
                          type="number"
                        />
                      </td>
                      <td>
                        {Math.ceil((Cargo.L * Cargo.W * Cargo.H) / 5) / 1000}
                      </td>
                      <td>
                        <input
                          className="create_disp_td_input"
                          value={Cargo.Q}
                          onChange={(e) =>
                            this.SetCargoQ(e.target.value, index)
                          }
                          type="number"
                        />
                      </td>
                      <td>{Math.ceil(Cargo.Weight * Cargo.Q * 1000) / 1000}</td>
                      <td>
                        {Math.ceil(
                          (Cargo.L * Cargo.W * Cargo.H * Cargo.Q) / 5
                        ) / 1000}
                      </td>

                      {this.props.store.calc_price.CargoList.length ===
                      1 ? null : (
                        <td>
                          {" "}
                          <button
                            onClick={this.RemoveCargo.bind(this, index)}
                            className="IconButton"
                          >
                            <i className="ek-bin" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={this.props.add_calc_price_cargolist.bind(this)}>
                Добавить место
              </button>
            </div>
          ) : null}

          <div className="calc_price_row">
            <div className="calc_price_label">Общий вес:</div>

            {this.props.store.calc_price.calc_price_cargo_info_type.key ===
            1 ? (
              <input
                type="number"
                placeholder="кг"
                className="calc_price_input"
                value={this.props.store.calc_price.calc_price_weight}
                onChange={(e) => {
                  this.props.set_calc_price_weight(e.target.value);
                }}
              />
            ) : (
              <div className="calc_price_input">{total_weight} кг.</div>
            )}
          </div>

          {this.props.store.calc_price.calc_price_cargo_info_type.key === 1 ? (
            <div className="calc_price_row">
              <div className="calc_price_label">Габариты:</div>

              <input
                type="number"
                placeholder="Длина"
                className="calc_price_dimensions"
                value={this.props.store.calc_price.calc_price_l}
                onChange={(e) => {
                  this.props.set_calc_price_length(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Ширина"
                className="calc_price_dimensions"
                value={this.props.store.calc_price.calc_price_w}
                onChange={(e) => {
                  this.props.set_calc_price_width(e.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Высота"
                className="calc_price_dimensions"
                value={this.props.store.calc_price.calc_price_h}
                onChange={(e) => {
                  this.props.set_calc_price_height(e.target.value);
                }}
              />
            </div>
          ) : null}
        </div>

        <div className="calc_price_row">
          <div className="calc_price_label">Общий объемный вес:</div>

          {this.props.store.calc_price.calc_price_cargo_info_type.key === 1 ? (
            <div className="calc_price_input">
              {(this.props.store.calc_price.calc_price_l *
                this.props.store.calc_price.calc_price_w *
                this.props.store.calc_price.calc_price_h) /
                5000}{" "}
              кг.
            </div>
          ) : (
            <div className="calc_price_input">{total_volume} кг.</div>
          )}
        </div>

        <div className="calc_price_row" style={{ marginTop: "10px" }}>
          <button
            onClick={this.CalcPrice.bind(this)}
            className="calc_price_button"
          >
            Рассчитать
          </button>

          {this.props.store.calc_price.calc_price_result === "" ? (
            <input
              type="text"
              className="calc_price_input"
              value={"Результат"}
              disabled
            />
          ) : (
            <input
              type="text"
              className="calc_price_input"
              value={
                this.props.store.calc_price.calc_price_result > -1
                  ? this.props.store.calc_price.calc_price_result + " руб."
                  : this.props.store.calc_price.calc_price_result
              }
              disabled
            />
          )}
        </div>

        {this.props.store.calc_price.error_mesage !== "" ? (
          <div className="service_info_window_wrapper shadow font_16">
            {this.props.store.calc_price.error_mesage}
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
    set_calc_price_send_city: (param) => {
      dispatch({ type: "set_calc_price_send_city", payload: param });
    },
    set_calc_price_rec_city: (param) => {
      dispatch({ type: "set_calc_price_rec_city", payload: param });
    },

    set_calc_price_height: (param) => {
      dispatch({ type: "set_calc_price_height", payload: param });
    },
    set_calc_price_width: (param) => {
      dispatch({ type: "set_calc_price_width", payload: param });
    },
    set_calc_price_length: (param) => {
      dispatch({ type: "set_calc_price_length", payload: param });
    },
    set_calc_price_weight: (param) => {
      dispatch({ type: "set_calc_price_weight", payload: param });
    },
    set_calc_price_send_terminal: (param) => {
      dispatch({ type: "set_calc_price_send_terminal", payload: param });
    },
    set_calc_price_rec_terminal: (param) => {
      dispatch({ type: "set_calc_price_rec_terminal", payload: param });
    },
    set_calc_price_send_terminal_city: (param) => {
      dispatch({ type: "set_calc_price_send_terminal_city", payload: param });
    },
    set_calc_price_rec_terminal_city: (param) => {
      dispatch({ type: "set_calc_price_rec_terminal_city", payload: param });
    },

    set_calc_price_result: (param) => {
      dispatch({ type: "set_calc_price_result", payload: param });
    },
    set_calc_price_error_mesage: (param) => {
      dispatch({ type: "set_calc_price_error_mesage", payload: param });
    },
    clean_calc_priсe: (param) => {
      dispatch({ type: "clean_calc_priсe", payload: param });
    },

    set_calc_price_send_terminal_list: (param) => {
      dispatch({ type: "set_calc_price_send_terminal_list", payload: param });
    },
    set_calc_price_rec_terminal_list: (param) => {
      dispatch({ type: "set_calc_price_rec_terminal_list", payload: param });
    },

    set_calc_price_select_send_terminal: (param) => {
      dispatch({ type: "set_calc_price_select_send_terminal", payload: param });
    },
    set_calc_price_select_rec_terminal: (param) => {
      dispatch({ type: "set_calc_price_select_rec_terminal", payload: param });
    },

    SetCityList: (param) => {
      dispatch({ type: "SetCityList", payload: param });
    },

    set_calc_price_cargo_info_type: (param) => {
      dispatch({ type: "set_calc_price_cargo_info_type", payload: param });
    },
    add_calc_price_cargolist: (param) => {
      dispatch({ type: "add_calc_price_cargolist", payload: param });
    },
    set_calc_price_cargo_weight: (param) => {
      dispatch({ type: "set_calc_price_cargo_weight", payload: param });
    },
    set_calc_price_w: (param) => {
      dispatch({ type: "set_calc_price_w", payload: param });
    },
    set_calc_price_cargoL: (param) => {
      dispatch({ type: "set_calc_price_cargoL", payload: param });
    },
    set_calc_price_cargoH: (param) => {
      dispatch({ type: "set_calc_price_cargoH", payload: param });
    },
    set_calc_price_cargoQ: (param) => {
      dispatch({ type: "set_calc_price_cargoQ", payload: param });
    },
    remove_calc_price_cargo: (param) => {
      dispatch({ type: "remove_calc_price_cargo", payload: param });
    },
  })
)(Screen);
