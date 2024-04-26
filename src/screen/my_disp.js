import React from "react";
import { connect } from "react-redux";
import { get_data } from "./../common/common_modules";

import "./disp_map.css";
import "./my_disp.css";
import "./disp.css";
import Dimmer from "../ui-components/dimmer/dimmer";
import Modal from "../ui-components/modal/modal";

class Screen extends React.Component {
  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.get_my_disp_data();
    }
  };

  get_my_disp_data = () => {
    this.props.set_active_window("wait");

    const data = {
      userkey: this.props.store.login.userkey,
      date_from: this.props.store.my_disp.date_from,
      date_to: this.props.store.my_disp.date_to,
      searchNum: this.props.store.my_disp.search,
    };
    get_data("mydisplist", data).then(
      (result) => {
        this.props.set_active_window("my_disp");
        this.props.set_my_disp_data(result);
      },
      (err) => {
        console.log(err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  tr_double_click = async (disp) => {
    this.props.set_active_window("wait");

    const data = {
      userkey: this.props.store.login.userkey,
      status: "Накладная",
      num: disp.Num,
    };

    get_data("dispatch", data).then(
      (result) => {
        result[0].Termo =
          result[0].TMax !== 0 || result[0].TMin !== 0 ? true : false;

        this.props.set_data_disp(result);
        this.props.set_active_window("disp");
        this.props.set_last_window("my_disp");
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
    this.props.set_my_disp_active_row(index);
  };

  click_up = () => {
    //console.log("click_up")
    if (this.props.store.my_disp.active_row > 0) {
      this.props.set_my_disp_active_row(
        this.props.store.my_disp.active_row - 1
      );
    }
  };

  click_down = () => {
    const max_index = this.props.store.my_disp.data.length - 1;
    if (this.props.store.my_disp.active_row < max_index) {
      this.props.set_my_disp_active_row(
        this.props.store.my_disp.active_row + 1
      );
    }
  };

  click_enter = () => {
    const disp = this.props.store.my_disp.data.filter(
      (el, index) => index === this.props.store.my_disp.active_row
    )[0];
    if (disp) {
      this.tr_double_click(disp);
    }
  };

  show_history = (Number) => {
    const dispatch = this.props.store.my_disp.data.find(
      (disp) => disp.Num === Number
    );

    if (dispatch.history) {
      if (dispatch.showHistory) {
        this.props.set_show_my_disp_history({ Num: Number, value: false });
      } else {
        this.props.set_show_my_disp_history({ Num: Number, value: true });
      }
    } else {
      get_data("history", { Number: Number }).then(
        (result) => {
          this.props.set_my_disp_history({ Num: Number, history: result });
        },
        (err) => {
          console.log(err);
          this.props.modules.set_modal_show(true);
          this.props.modules.set_modal_header("Ошибка");
          this.props.modules.set_modal_text(err);
        }
      );
    }
  };

  open_skan = (DocNumber, dispNumber) => {
    this.props.set_my_disp_skan_loading(true);
    const data = {
      num: dispNumber,
      userkey: this.props.store.login.userkey,
      DocNumber: DocNumber,
    };
    get_data("getskan", data).then(
      (result) => {
        this.props.set_my_disp_skan("data:image/jpg;base64," + result);
        this.props.set_my_disp_skan_loading(false);
      },
      (err) => {
        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);

        console.log(err);
        this.props.set_my_disp_skan_loading(false);
      }
    );
  };

  close_skan = () => {
    this.props.set_my_disp_show_skan(false);
    this.props.set_my_disp_skan("");
  };

  show_all = () => {
    if (this.props.store.my_disp.show_all) {
      this.props.store.my_disp.data.map((item) =>
        this.props.set_show_my_disp_history({ Num: item.Num, value: false })
      );
      this.props.set_my_disp_show_all(false);
    } else {
      const data = this.props.store.my_disp.data.map(
        (item) => (item = item.Num)
      );

      get_data("historymass", { data: data }).then(
        (result) => {
          result.map((item) =>
            this.props.set_my_disp_history({
              Num: item.Disp,
              history: item.Data,
            })
          );

          this.props.set_my_disp_show_all(true);
        },
        (err) => {
          this.props.modules.set_modal_show(true);
          this.props.modules.set_modal_header("Ошибка");
          this.props.modules.set_modal_text(err);

          console.log(err);
          this.props.set_my_disp_skan_loading(false);
        }
      );
    }
  };

  render() {
    const status_filter_check_lenght =
      this.props.store.my_disp.status_filter.filter((el) => el.check).length;
    const status_filter_length = this.props.store.my_disp.status_filter.length;
    const send_city_filter_check_lenght =
      this.props.store.my_disp.send_city_filter.filter((el) => el.check).length;
    const send_city_filter_length =
      this.props.store.my_disp.send_city_filter.length;
    const rec_city_filter_check_lenght =
      this.props.store.my_disp.rec_city_filter.filter((el) => el.check).length;
    const rec_city_filter_length =
      this.props.store.my_disp.rec_city_filter.length;
    const del_method_filter_check_lenght =
      this.props.store.my_disp.del_method_filter.filter(
        (el) => el.check
      ).length;
    const del_method_filter_length =
      this.props.store.my_disp.del_method_filter.length;

    const click_up = () => {
      this.click_up();
    };
    const click_down = () => {
      this.click_down();
    };
    const click_enter = () => {
      this.click_enter();
    };

    document.onkeydown = function (event) {
      try {
        if (event.keyCode === 38) {
          event.preventDefault();
          //console.log("Вверх")
          click_up();
        }
        if (event.keyCode === 40) {
          event.preventDefault();
          click_down();
        }
        if (event.keyCode === 13) {
          click_enter();
        }
      } catch (error) {
        console.log(error);
      }
    };

    return (
      <div>
        <div
          onKeyDown={this.handleKeyDown.bind(this)}
          className={
            this.props.store.my_disp.type_search
              ? "my_disp_control_panel"
              : "my_disp_control_panel my_disp_control_panel--small"
          }
        >
          <select
            defaultValue={this.props.store.my_disp.type_search}
            onChange={(e) => this.props.set_type_search(e.target.value)}
            className="my_disp_select"
          >
            <option value={true}>Период: </option>
            <option value={false}>По номеру: </option>
          </select>
          {this.props.store.my_disp.type_search ? (
            <div>
              <input
                onChange={(e) =>
                  this.props.set_my_disp_date_from(e.target.value)
                }
                value={this.props.store.my_disp.date_from}
                className="pod_input"
                type="date"
              ></input>
            </div>
          ) : (
            <input
              className="pod_input"
              value={this.props.store.my_disp.search}
              onChange={(e) => this.props.set_search(e.target.value)}
            ></input>
          )}
          {this.props.store.my_disp.type_search ? <div>-</div> : null}
          {this.props.store.my_disp.type_search ? (
            <div>
              <input
                onChange={(e) => this.props.set_my_disp_date_to(e.target.value)}
                value={this.props.store.my_disp.date_to}
                className="pod_input"
                type="date"
              ></input>
            </div>
          ) : null}
          <button
            style={{ marginTop: "-5px" }}
            size="mini"
            onClick={this.get_my_disp_data.bind(this)}
          >
            Получить данные
          </button>
        </div>

        <div className="my_disp_table">
          {this.props.store.my_disp.data.length === 0 ? null : (
            <table>
              <thead>
                <th>
                  <div className="small_table_data">Дата</div>
                </th>

                <th>
                  <div className="small_table_data">
                    Номер
                    <div className="my_disp_div_filter on_bottom">
                      <input
                        className="my_disp_div_filter_input"
                        type="text"
                        value={this.props.store.my_disp.num_filter}
                        onChange={(e) =>
                          this.props.set_my_disp_num_filter(e.target.value)
                        }
                      ></input>
                      <button
                        className="my_disp_button"
                        onClick={() => this.props.set_my_disp_num_filter("")}
                      >
                        Сброс
                      </button>
                    </div>
                  </div>
                </th>

                <th>
                  <div className="small_table_data">
                    Город отправителя
                    <button
                      className="my_disp_button"
                      type="text"
                      onClick={() =>
                        this.props.set_my_disp_focus_input_send_city()
                      }
                    >
                      Фильтр
                    </button>
                  </div>
                  {this.props.store.my_disp.focus_input_send_city ? (
                    <div id="myDropdownSendCity" className="dropdown-content">
                      <div className="my_disp_dropdown_head">
                        <button
                          className="margin_right my_disp_button"
                          onClick={() => {
                            this.props.set_my_disp_send_city_filter_default(
                              "select"
                            );
                          }}
                        >
                          Выбрать все
                        </button>
                        <button
                          className="my_disp_button"
                          onClick={() => {
                            this.props.set_my_disp_send_city_filter_default();
                          }}
                        >
                          Отменить все
                        </button>
                      </div>
                      <table>
                        <tbody>
                          {this.props.store.my_disp.send_city_filter.map(
                            (el, index) => {
                              return (
                                <tr
                                  className="dropdown-content-row"
                                  key={index}
                                  onClick={() =>
                                    this.props.set_check_my_disp_send_city(
                                      el.id
                                    )
                                  }
                                >
                                  <td>
                                    {el.name === "" ? "(Пустые)" : el.name}
                                  </td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      className="input-checkbox"
                                      checked={el.check}
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                      <button
                        className="my_disp_button"
                        onClick={() =>
                          this.props.set_my_disp_focus_input_send_city()
                        }
                      >
                        {" "}
                        Ок
                      </button>
                      <div className="my_disp_filter_selected_text">
                        &nbsp; Выбрано &nbsp;
                        {send_city_filter_check_lenght}
                        &nbsp; из &nbsp;
                        {send_city_filter_length}
                      </div>{" "}
                    </div>
                  ) : send_city_filter_check_lenght !==
                    send_city_filter_length ? (
                    <div className="my_disp_filter_selected_text">
                      &nbsp;
                      {send_city_filter_check_lenght} &nbsp; из &nbsp;
                      {send_city_filter_length}
                    </div>
                  ) : null}
                </th>

                <th>
                  <div className="small_table_data">
                    Адрес отправителя
                    <div className="my_disp_div_filter">
                      <input
                        className="my_disp_div_filter_input"
                        value={this.props.store.my_disp.sender_address}
                        onChange={(e) =>
                          this.props.set_my_disp_sender_address(e.target.value)
                        }
                      ></input>
                      <button
                        className="my_disp_button"
                        onClick={() => {
                          this.props.set_my_disp_sender_address("");
                        }}
                      >
                        Сброс
                      </button>
                    </div>
                  </div>
                </th>

                <th>
                  <div className="small_table_data">Компания отправителя</div>
                </th>

                <th>
                  <div className="small_table_data">
                    Город получателя
                    <button
                      className="my_disp_button"
                      type="text"
                      onClick={() =>
                        this.props.set_my_disp_focus_input_rec_city()
                      }
                    >
                      Фильтр
                    </button>
                    {!this.props.store.my_disp.focus_input_rec_city ? (
                      <div className="my_disp_filter_selected_text">
                        {this.props.store.my_disp.filter_rec_city_string}
                      </div>
                    ) : null}
                  </div>
                  {this.props.store.my_disp.focus_input_rec_city ? (
                    <div id="myDropdownRecCity" className="dropdown-content">
                      <button
                        className="my_disp_button"
                        onClick={() => {
                          this.props.set_my_disp_rec_city_filter_default(
                            "select"
                          );
                        }}
                      >
                        Выбрать все
                      </button>
                      <button
                        className="my_disp_button"
                        onClick={() => {
                          this.props.set_my_disp_rec_city_filter_default();
                        }}
                      >
                        Отменить все
                      </button>
                      <table>
                        <tbody>
                          {this.props.store.my_disp.rec_city_filter.map(
                            (el, index) => {
                              return (
                                <tr
                                  className="dropdown-content-row"
                                  key={index}
                                  onClick={() =>
                                    this.props.set_check_my_disp_rec_city(el.id)
                                  }
                                >
                                  <td>
                                    {" "}
                                    {el.name === "" ? "(Пустые)" : el.name}
                                  </td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      className="input-checkbox"
                                      checked={el.check}
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                      <button
                        className="my_disp_button"
                        onClick={() => {
                          this.props.set_my_disp_focus_input_rec_city();
                          this.props.filter_common_string(
                            this.props.store.my_disp.rec_city_filter
                          );
                        }}
                      >
                        Ок
                      </button>
                      <div className="my_disp_filter_selected_text">
                        &nbsp; Выбрано &nbsp;
                        {rec_city_filter_check_lenght}
                        &nbsp; из &nbsp;
                        {rec_city_filter_length}
                      </div>{" "}
                    </div>
                  ) : rec_city_filter_check_lenght !==
                    rec_city_filter_length ? (
                    <div className="my_disp_filter_selected_text">
                      &nbsp;
                      {rec_city_filter_check_lenght}
                      &nbsp; из &nbsp;
                      {rec_city_filter_length}
                    </div>
                  ) : null}
                </th>

                <th>
                  <div className="small_table_data">
                    Адрес получателя
                    <div className="my_disp_div_filter">
                      <input
                        className="my_disp_div_filter_input"
                        value={this.props.store.my_disp.rec_address}
                        onChange={(e) =>
                          this.props.set_my_disp_rec_address(e.target.value)
                        }
                      ></input>
                      <button
                        className="my_disp_button"
                        onClick={() => {
                          this.props.set_my_disp_rec_address("");
                        }}
                      >
                        Сброс
                      </button>
                    </div>
                  </div>
                </th>

                <th>
                  <div className="small_table_data">Компания получателя</div>
                </th>

                <th>
                  <div className="small_table_data">Мест</div>
                </th>
                <th>
                  <div className="small_table_data">Вес</div>
                </th>
                <th>
                  <div className="small_table_data">V Вес</div>
                </th>

                <th>
                  <div className="small_table_data">
                    Вид доставки
                    <button
                      className="my_disp_button"
                      type="text"
                      onClick={() =>
                        this.props.set_my_disp_focus_input_del_method()
                      }
                    >
                      Фильтр
                    </button>
                  </div>
                  {this.props.store.my_disp.focus_input_del_method ? (
                    <div id="myDropdownDelMethod" className="dropdown-content">
                      <button
                        className="my_disp_button"
                        onClick={() =>
                          this.props.set_my_disp_del_method_filter_default(
                            "select"
                          )
                        }
                      >
                        Выбрать все
                      </button>
                      <button
                        className="my_disp_button"
                        onClick={() => {
                          this.props.set_my_disp_del_method_filter_default();
                        }}
                      >
                        Отменить все
                      </button>
                      <table>
                        <tbody>
                          {this.props.store.my_disp.del_method_filter.map(
                            (el, index) => {
                              return (
                                <tr
                                  className="dropdown-content-row"
                                  key={index}
                                  onClick={() =>
                                    this.props.set_check_my_disp_del_method(
                                      el.id
                                    )
                                  }
                                >
                                  <td>
                                    {" "}
                                    {el.name === "" ? "(Пустые)" : el.name}
                                  </td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      className="input-checkbox"
                                      checked={el.check}
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                      <button
                        className="my_disp_button"
                        onClick={() =>
                          this.props.set_my_disp_focus_input_del_method()
                        }
                      >
                        Ок
                      </button>
                      <div className="my_disp_filter_selected_text">
                        &nbsp; Выбрано &nbsp;
                        {del_method_filter_check_lenght}
                        &nbsp; из &nbsp;
                        {del_method_filter_length}
                      </div>
                    </div>
                  ) : del_method_filter_check_lenght !==
                    del_method_filter_length ? (
                    <div className="my_disp_filter_selected_text">
                      &nbsp;
                      {del_method_filter_check_lenght}
                      &nbsp; из &nbsp;
                      {del_method_filter_length}
                    </div>
                  ) : null}
                </th>

                <th>
                  <div className="small_table_data">Цена </div>
                </th>

                <th>
                  <div className="small_table_data">
                    Статус
                    <button
                      className="my_disp_button"
                      type="text"
                      onClick={() =>
                        this.props.set_my_disp_focus_input_status()
                      }
                    >
                      Фильтр
                    </button>
                    <button
                      className="my_disp_button"
                      type="text"
                      onClick={() => this.show_all()}
                    >
                      {this.props.store.my_disp.show_all
                        ? "Скрыть"
                        : "Показать у всех"}
                    </button>
                  </div>
                  {this.props.store.my_disp.focus_input_status ? (
                    <div id="myDropdownStatus" className="dropdown-content">
                      <button
                        className="my_disp_button"
                        onClick={() => {
                          this.props.set_my_disp_status_filter_default(
                            "select"
                          );
                        }}
                      >
                        Выбрать все
                      </button>
                      <button
                        className="my_disp_button"
                        onClick={() => {
                          this.props.set_my_disp_status_filter_default();
                        }}
                      >
                        Отменить все
                      </button>
                      <table>
                        <tbody>
                          {this.props.store.my_disp.status_filter.map(
                            (el, index) => {
                              return (
                                <tr
                                  style={{ cursor: "pointer" }}
                                  key={index}
                                  onClick={() =>
                                    this.props.set_check_my_disp_status(el.id)
                                  }
                                >
                                  <td>
                                    {" "}
                                    {el.name === "" ? "(Пустые)" : el.name}
                                  </td>
                                  <td>
                                    <input
                                      type="checkbox"
                                      className="input-checkbox"
                                      checked={el.check}
                                    />
                                  </td>
                                </tr>
                              );
                            }
                          )}
                        </tbody>
                      </table>
                      <button
                        className="my_disp_button"
                        onClick={() =>
                          this.props.set_my_disp_focus_input_status()
                        }
                      >
                        Ок
                      </button>
                      <div className="my_disp_filter_selected_text">
                        &nbsp; Выбрано &nbsp;
                        {status_filter_check_lenght}
                        &nbsp; из &nbsp;
                        {status_filter_length}
                      </div>
                    </div>
                  ) : status_filter_check_lenght !== status_filter_length ? (
                    <div className="my_disp_filter_selected_text">
                      &nbsp;
                      {status_filter_check_lenght}
                      &nbsp; из &nbsp;
                      {status_filter_length}
                    </div>
                  ) : null}
                </th>

                <th>
                  <div className="small_table_data">Получатель</div>
                </th>
                <th>
                  <div className="small_table_data">Вручено</div>
                </th>
              </thead>
              <tbody>
                {this.props.store.my_disp.data
                  .filter((el) => {
                    return (
                      el.Num.indexOf(this.props.store.my_disp.num_filter) >
                        -1 || this.props.store.my_disp.num_filter === ""
                    );
                  })
                  .filter((el) => {
                    const filter_sender_address =
                      this.props.store.my_disp.sender_address.toUpperCase();
                    const sender_address = el.SendAdress.toUpperCase();
                    return (
                      sender_address.indexOf(filter_sender_address) > -1 ||
                      this.props.store.my_disp.sender_address === ""
                    );
                  })
                  .filter((el) => {
                    const filter_rec_address =
                      this.props.store.my_disp.rec_address.toUpperCase();
                    const rec_address = el.RecAdress.toUpperCase();
                    return (
                      rec_address.indexOf(filter_rec_address) > -1 ||
                      this.props.store.my_disp.rec_address === ""
                    );
                  })
                  .filter((el) => {
                    const selectedRecCities =
                      this.props.store.my_disp.rec_city_filter.filter((el1) => {
                        return el1.check;
                      });
                    const FindRecCityRes = selectedRecCities.find((el2) => {
                      return el2.name === el.RecCity;
                    });
                    return FindRecCityRes !== undefined;
                  })
                  .filter((el) => {
                    const selectedSendCities =
                      this.props.store.my_disp.send_city_filter.filter(
                        (el1) => {
                          return el1.check;
                        }
                      );
                    const FindSendCityRes = selectedSendCities.find((el2) => {
                      return el2.name === el.SendCity;
                    });
                    return FindSendCityRes !== undefined;
                  })
                  .filter((el) => {
                    const selectedDelMethods =
                      this.props.store.my_disp.del_method_filter.filter(
                        (el1) => {
                          return el1.check;
                        }
                      );
                    const FindDelMethodsRes = selectedDelMethods.find((el2) => {
                      return el2.name === el.DelMethod;
                    });
                    return FindDelMethodsRes !== undefined;
                  })
                  .filter((el) => {
                    const selectedStatus =
                      this.props.store.my_disp.status_filter.filter((el1) => {
                        return el1.check;
                      });
                    const FindStatusRes = selectedStatus.find((el2) => {
                      return el2.name === el.Status;
                    });
                    return FindStatusRes !== undefined;
                  })
                  .map((el, index) => {
                    let row_className = "";

                    if (index === this.props.store.my_disp.active_row) {
                      row_className = "active";
                    }

                    return [
                      <tr
                        className={row_className}
                        key={index}
                        onClick={this.tr_click.bind(this, index)}
                        onDoubleClick={this.tr_double_click.bind(this, el)}
                      >
                        <td>
                          <div className="small_table_data">{el.Date}</div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.Num}</div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.SendCity}</div>
                        </td>
                        <td>
                          <div className="small_table_data">
                            {el.SendAdress}
                          </div>
                        </td>
                        <td>
                          <div className="small_table_data">
                            {el.SendCompany}
                          </div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.RecCity}</div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.RecAdress}</div>
                        </td>
                        <td>
                          <div className="small_table_data">
                            {el.RecCompany}
                          </div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.Total}</div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.Weight}</div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.Volume}</div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.DelMethod}</div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.Price}</div>
                        </td>
                        <td>
                          <div
                            className="small_table_data"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            {el.Status}
                            <div
                              className={
                                el.showHistory
                                  ? "open my_disp_button_more"
                                  : "my_disp_button_more"
                              }
                              onClick={() => this.show_history(el.Num)}
                            >
                              <span className="my_disp_button_more-left"></span>
                              <span className="my_disp_button_more-right"></span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.Recient}</div>
                        </td>
                        <td>
                          <div className="small_table_data">{el.RecDate}</div>
                        </td>
                      </tr>,
                      el.history && el.showHistory ? (
                        <tr key={index + "history"}>
                          <td colSpan="16">
                            <table
                              style={{
                                width: "calc(100% - 80px)",
                                margin: "0 auto",
                              }}
                            >
                              <thead>
                                <tr>
                                  <th>Дата</th>
                                  <th>Статус</th>
                                  <th>Комментарий</th>
                                </tr>
                              </thead>
                              <tbody>
                                {el.history.map((historyEl, historyElIndex) => (
                                  <tr key={historyElIndex}>
                                    <td>
                                      <div className="small_table_data">
                                        {historyEl.Date}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="small_table_data">
                                        {historyEl.Status}
                                        {historyEl.Skan !== 0 ? (
                                          <Modal
                                            height="90%"
                                            width="500px"
                                            trigger={
                                              <button
                                                className="disp_skan_button"
                                                onClick={() =>
                                                  this.open_skan(
                                                    historyEl.DocNumber,
                                                    el.Num
                                                  )
                                                }
                                              >
                                                (Получить скан)
                                              </button>
                                            }
                                            onClose={this.close_skan.bind(this)}
                                            header="Вложенное изображение"
                                          >
                                            {this.props.store.my_disp
                                              .skan_loading ? (
                                              <div className="loader_container">
                                                <Dimmer />
                                              </div>
                                            ) : (
                                              <img
                                                alt="alt"
                                                className="disp_skan"
                                                src={
                                                  this.props.store.my_disp.skan
                                                }
                                              />
                                            )}
                                          </Modal>
                                        ) : null}
                                      </div>
                                    </td>
                                    <td>
                                      <div className="small_table_data">
                                        {historyEl.Comment}
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      ) : null,
                    ];
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ store: state }),
  (dispatch) => ({
    set_my_disp_show_skan: (param) => {
      dispatch({ type: "set_my_disp_show_skan", payload: param });
    },
    set_my_disp_skan_loading: (param) => {
      dispatch({ type: "set_my_disp_skan_loading", payload: param });
    },
    set_my_disp_skan: (param) => {
      dispatch({ type: "set_my_disp_skan", payload: param });
    },
    set_my_disp_show_all: (param) => {
      dispatch({ type: "set_my_disp_show_all", payload: param });
    },

    set_show_my_disp_history: (param) => {
      dispatch({ type: "set_show_my_disp_history", payload: param });
    },
    set_my_disp_history: (param) => {
      dispatch({ type: "set_my_disp_history", payload: param });
    },

    set_type_search: (param) => {
      dispatch({ type: "set_type_search", payload: param });
    },
    set_search: (param) => {
      dispatch({ type: "set_search", payload: param });
    },
    set_my_disp_data: (param) => {
      dispatch({ type: "set_my_disp_data", payload: param });
    },
    set_my_disp_date_from: (param) => {
      dispatch({ type: "set_my_disp_date_from", payload: param });
    },
    set_my_disp_date_to: (param) => {
      dispatch({ type: "set_my_disp_date_to", payload: param });
    },
    set_my_disp_active_row: (param) => {
      dispatch({ type: "set_my_disp_active_row", payload: param });
    },

    set_active_window: (param) => {
      dispatch({ type: "set_active_window", payload: param });
    },
    set_data_disp: (param) => {
      dispatch({ type: "set_data_disp", payload: param });
    },
    set_last_window: (param) => {
      dispatch({ type: "set_last_window", payload: param });
    },
    filter_common_string: (param) => {
      dispatch({ type: "filter_common_string", payload: param });
    },

    //set_my_disp_date_sort: () => {dispatch({ type: 'set_my_disp_date_sort'})},

    set_my_disp_num_filter: (param) => {
      dispatch({ type: "set_my_disp_num_filter", payload: param });
    },
    set_my_disp_sender_address: (param) => {
      dispatch({ type: "set_my_disp_sender_address", payload: param });
    },
    set_my_disp_rec_address: (param) => {
      dispatch({ type: "set_my_disp_rec_address", payload: param });
    },

    set_my_disp_focus_all_default: () => {
      dispatch({ type: "set_my_disp_focus_all_default" });
    },

    set_my_disp_focus_input_send_city: () => {
      dispatch({ type: "set_my_disp_focus_input_send_city" });
    },
    set_my_disp_send_city_filter_default: (param) => {
      dispatch({
        type: "set_my_disp_send_city_filter_default",
        payload: param,
      });
    },

    set_my_disp_focus_input_rec_city: () => {
      dispatch({ type: "set_my_disp_focus_input_rec_city" });
    },
    set_my_disp_rec_city_filter_default: (param) => {
      dispatch({
        type: "set_my_disp_rec_city_filter_default",
        payload: param,
      });
    },

    set_my_disp_focus_input_del_method: () => {
      dispatch({ type: "set_my_disp_focus_input_del_method" });
    },
    set_my_disp_del_method_filter_default: (param) => {
      dispatch({
        type: "set_my_disp_del_method_filter_default",
        payload: param,
      });
    },

    set_my_disp_focus_input_status: () => {
      dispatch({ type: "set_my_disp_focus_input_status" });
    },
    set_my_disp_status_filter_default: (param) => {
      dispatch({ type: "set_my_disp_status_filter_default", payload: param });
    },

    set_check_my_disp_send_city: (param) => {
      dispatch({ type: "set_check_my_disp_send_city", payload: param });
    },
    set_check_my_disp_rec_city: (param) => {
      dispatch({ type: "set_check_my_disp_rec_city", payload: param });
    },
    set_check_my_disp_del_method: (param) => {
      dispatch({ type: "set_check_my_disp_del_method", payload: param });
    },
    set_check_my_disp_status: (param) => {
      dispatch({ type: "set_check_my_disp_status", payload: param });
    },
  })
)(Screen);
