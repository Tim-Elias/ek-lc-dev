import React from "react";
import { connect } from "react-redux";
import { Table, Loader, Dimmer } from "semantic-ui-react";
import { get_data } from "./../common/common_modules";
import ReactToPrint from "react-to-print";
import "./disp.css";
import ComponentToPrint from "./disp_print";
import StickerToPrint from "./sticker_print";
import GoogleMapReact from "google-map-react";
import Sound from "react-sound";
import test_sound from "./../common/Sound_11084.wav";
import Modal from "../ui-components/modal/modal";

let g_map;
let g_maps;
let marker;

class Screen extends React.Component {
  sound_test = () => {
    this.props.set_test_sound(Sound.status.PLAYING);
  };

  save_lat_lng = () => {
    const lat_lng_data = {
      userkey: this.props.store.login.userkey,
      dispatch: this.props.store.disp.data.Number,
      lat: this.props.store.disp.lat,
      lng: this.props.store.disp.lng,
    };

    get_data("setreclatlng", lat_lng_data).then(
      (result) => {
        this.props.set_active_window("wait");

        const data = {
          userkey: this.props.store.login.userkey,
          status: "Накладная",
          num: this.props.store.disp.data.Number,
        };

        get_data("dispatch", data).then(
          (result) => {
            this.props.set_data_disp(result);
            this.props.set_active_window("disp");
          },
          (err) => {
            console.log(err);

            this.props.modules.set_modal_show(true);
            this.props.modules.set_modal_header("Ошибка");
            this.props.modules.set_modal_text(err);

            this.props.set_active_window("disp");
          }
        );
      },
      (err) => {
        console.log(err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);

        this.props.set_active_window("disp");
      }
    );
  };

  render_markers = () => {
    let lat;
    let lng;

    if (this.props.store.disp.lat !== "" && this.props.store.disp.lng !== "") {
      lat = parseFloat(this.props.store.disp.lat.replace(/,/, "."));
      lng = parseFloat(this.props.store.disp.lng.replace(/,/, "."));

      if (marker !== undefined) {
        marker.setMap(null);
      }

      marker = new g_maps.Marker({
        position: { lat: lat, lng: lng },
        map: g_map,
      });

      marker.addListener("click", function () {});
    }
  };

  back = () => {
    const last_window =
      this.props.store.general.last_window[
        this.props.store.general.last_window.length - 1
      ];
    this.props.pop_last_window();
    this.props.set_active_window(last_window);
  };

  sendpod = () => {
    this.props.set_active_window("wait");
    const data = {
      userkey: this.props.store.login.userkey,
      num: this.props.store.disp.data.Number,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      summ: document.getElementById("summ").value,
      comment: document.getElementById("comment").value,
      rec: document.getElementById("recient").value,
    };
    get_data("delivered", data).then(
      (result) => {
        const list_data = { userkey: this.props.store.login.userkey };

        get_data("list", list_data).then(
          (result) => {
            this.props.set_list_storage(result);
            this.props.set_active_window("storage");
          },
          (err) => {
            console.log(err);

            this.props.modules.set_modal_show(true);
            this.props.modules.set_modal_header("Ошибка");
            this.props.modules.set_modal_text(err);
          }
        );
      },
      (err) => {
        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);

        this.props.set_active_window("disp");
        console.log(err);
      }
    );
  };

  reciept = () => {
    this.props.set_active_window("wait");
    const data = {
      userkey: this.props.store.login.userkey,
      num: this.props.store.disp.data.Number,
    };
    get_data("getdispatch", data).then(
      (result) => {
        this.props.set_active_window("reciept");
        this.props.set_search_error(
          `Накладная ${this.props.store.disp.data.Number} успешно принята на склад`
        );
      },
      (err) => {
        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);

        this.props.set_active_window("disp");
        console.log(err);
      }
    );
  };

  open_history = () => {
    this.props.set_disp_history_loading(true);
    this.props.set_disp_show_history(true);
    get_data("history", { Number: this.props.store.disp.data.Number }).then(
      (result) => {
        this.props.set_disp_history(result);
        this.props.set_disp_history_loading(false);
      },
      (err) => {
        console.log(err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  close_history = () => {
    this.props.set_disp_show_history(false);
    this.props.set_disp_history([]);
  };

  open_skan = (DocNumber) => {
    this.props.set_disp_skan_loading(true);
    this.props.set_disp_show_skan(true);
    const data = {
      num: this.props.store.disp.data.Number,
      userkey: this.props.store.login.userkey,
      DocNumber: DocNumber,
    };
    get_data("getskan", data).then(
      (result) => {
        this.props.set_disp_skan("data:image/jpg;base64," + result);
        this.props.set_disp_skan_loading(false);
      },
      (err) => {
        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);

        console.log(err);
        this.props.set_disp_skan_loading(false);
      }
    );
  };

  close_skan = () => {
    this.props.set_disp_show_skan(false);
    this.props.set_disp_skan("");
  };

  remove_disp = () => {
    this.props.set_disp_remove_confirm(false);
    this.props.set_disp_show_remove_modal(true);
  };

  close_remove_modal = () => {
    this.props.set_disp_show_remove_modal(false);
    if (this.props.store.disp.remove_confirm) {
      if (this.props.store.general.last_window === "my_disp") {
        this.props.set_active_window("wait");

        const data = {
          userkey: this.props.store.login.userkey,
          date_from: this.props.store.my_disp.date_from,
          date_to: this.props.store.my_disp.date_to,
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
      } else {
        this.back();
      }
    }
  };

  confirm_remove_disp = () => {
    this.props.set_disp_remove_modal_loading(true);
    this.props.set_disp_remove_confirm(true);

    const data = {
      userkey: this.props.store.login.userkey,
      Number: this.props.store.disp.data.Number,
    };
    get_data("removedisp", data).then(
      (result) => {
        if (result === 1) {
          this.props.set_disp_text_remove_modal("Накладная успешно удалена");
        } else {
          this.props.set_disp_text_remove_modal("Не удалось удалить накладную");
        }

        this.props.set_disp_remove_modal_loading(false);
      },
      (err) => {
        console.log(err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  SelectSendCity = (value) => {
    this.props.SetSelectedSendCity(value);

    const city = value.label;
    this.props.SetSendCity(city);

    get_data("terminallist", {
      city: city,
      userkey: this.props.store.login.userkey,
    }).then(
      (result) => {
        this.props.SetSendTerminalList(result);
        if (result.length === 0) {
          this.SetSendTerminal(false);
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
    this.props.SetSelectedRecCity(value);

    const city = value.label;
    this.props.SetRecCity(city);

    get_data("terminallist", {
      city: city,
      userkey: this.props.store.login.userkey,
    }).then(
      (result) => {
        this.props.SetRecTerminalList(result);
        if (result.length === 0) {
          this.SetRecTerminal(false);
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

  copy_disp = (edit) => {
    let number = 0;
    this.props.set_active_window("wait");
    const current_disp_data = this.props.store.disp.data;

    const copy_disp_cargo = this.props.store.disp.cargo;
    let CargoInfoType;
    this.props.reset_create_disp_data();
    get_data("citylist").then(
      (result) => {
        this.props.SetCityList(result);

        if (edit) {
          number = this.props.store.disp.data.Number;
          this.props.SetIsNew(false);
        }

        if (
          this.props.store.disp.cargo.reduce(
            (accum, el) => accum + parseInt(el.Q),
            0
          ) === parseInt(this.props.store.disp.data.Total)
        ) {
          CargoInfoType = {
            label: "Внести информацию о каждом грузе",
            value: false,
          };
        } else {
          CargoInfoType = { label: "Указать итогвые значения", value: true };
        }

        const SelectedSendCity = result.filter(
          (el) => el.value === current_disp_data.SendCity
        )[0];
        const SelectedRecCity = result.filter(
          (el) => el.value === current_disp_data.RecCity
        )[0];

        const PayTypeList = [
          { label: "Безналичная оплата", value: "БезналичнаяОплата" },
          {
            label: "Оплата наличными при отправлении",
            value: "ОплатаНаличнымиПриОтправлении",
          },
          {
            label: "Оплата наличными при получении",
            value: "ОплатаНаличнымиПриПолучении",
          },
        ];
        let PayType;
        let PayerSelect;
        if (
          current_disp_data.CustomerKey === this.props.store.login.customer_key
        ) {
          PayType = PayTypeList.find(
            (ptel) => ptel.label === current_disp_data.PayType
          );
          PayerSelect = {};
        } else {
          PayType = {
            label: "Оплата получателем по договору",
            value: "БезналичнаяОплатаПолучателем",
          };
          const CurPayer = this.props.store.login.customers.find(
            (e) => e.customerKey === current_disp_data.CustomerKey
          );
          PayerSelect = {
            label: CurPayer.customer,
            value: CurPayer.customerKey,
            template: CurPayer.template,
          };
        }

        let RecTerminal = false;
        let SendTerminal = false;

        switch (current_disp_data.DelMethod) {
          case "Склад-Дверь":
            SendTerminal = true;

            break;
          case "Склад-Склад":
            RecTerminal = true;
            SendTerminal = true;

            break;
          case "Дверь-Склад":
            RecTerminal = true;

            break;
          default:
            break;
        }

        const copy_disp_data = {
          Number: number,
          RecTerminal: RecTerminal,
          SendTerminal: SendTerminal,
          PayType: PayType,
          PayerSelect: PayerSelect,

          InsureValue: current_disp_data.InsureValue,
          COD: current_disp_data.COD,

          SendAdress: current_disp_data.SendAdress,
          SendCompany: current_disp_data.SendCompany,
          SendPhone: current_disp_data.SendPhone,
          SendPerson: current_disp_data.SendPerson,
          SendAddInfo: current_disp_data.SendAddInfo,
          SendEmail: current_disp_data.SendEmail,

          RecAdress: current_disp_data.RecAdress,
          RecCompany: current_disp_data.RecCompany,
          RecPhone: current_disp_data.RecPhone,
          RecPerson: current_disp_data.RecPerson,
          RecAddInfo: current_disp_data.RecAddInfo,
          RecEmail: current_disp_data.RecEmail,

          CargoInfoType: CargoInfoType,

          Cargo: copy_disp_cargo,

          Total: current_disp_data.Total,
          Weight: current_disp_data.Weight,
          Volume: current_disp_data.Volume,
          Fragile: current_disp_data.Fragile,
          Termo: current_disp_data.Termo,
          TMax: current_disp_data.TMax,
          TMin: current_disp_data.TMin,
        };

        this.props.set_copy_disp_data(copy_disp_data);
        if (SelectedSendCity !== undefined) {
          this.SelectSendCity(SelectedSendCity);
        }
        if (SelectedRecCity !== undefined) {
          this.SelectRecCity(SelectedRecCity);
        }

        this.props.modules.set_last_window("disp");

        this.props.set_active_window("create_disp");
      },
      (err) => {
        console.log(err);

        this.props.modules.set_modal_show(true);
        this.props.modules.set_modal_header("Ошибка");
        this.props.modules.set_modal_text(err);
      }
    );
  };

  SetSendTerminal = (param) => {
    let DelMethod;

    if (this.props.store.create_disp.RecTerminal) {
      if (param) {
        DelMethod = "Склад - Склад";
      } else {
        DelMethod = "Дверь - Склад";
      }
    } else {
      if (param) {
        DelMethod = "Склад - Дверь";
      } else {
        DelMethod = "Дверь - Дверь";
      }
    }

    const data = {
      SendTerminal: param,
      DelMethod: DelMethod,
    };

    this.props.SetSendTerminal(data);
  };

  SetRecTerminal = (param) => {
    let DelMethod;
    if (param) {
      if (this.props.store.create_disp.SendTerminal) {
        DelMethod = "Склад - Склад";
      } else {
        DelMethod = "Дверь - Склад";
      }
    } else {
      if (this.props.store.create_disp.SendTerminal) {
        DelMethod = "Склад - Дверь";
      } else {
        DelMethod = "Дверь - Дверь";
      }
    }

    const data = {
      RecTerminal: param,
      DelMethod: DelMethod,
    };
    this.props.SetRecTerminal(data);
  };

  search = () => {
    let geocoder = new g_maps.Geocoder();
    let position;
    const set_disp_lat_lng = this.props.set_disp_lat_lng;

    geocoder.geocode(
      { address: this.props.store.disp.search_box },
      function (results, status) {
        if (status === "OK") {
          position = results[0].geometry.location;

          g_map.setCenter(position);
          const latlng = position;
          const cur_lat = latlng.lat().toString();
          const cur_lng = latlng.lng().toString();

          const set_disp_lat_lng_param = {
            lat: cur_lat,
            lng: cur_lng,
          };
          set_disp_lat_lng(set_disp_lat_lng_param);
          console.log(marker);
          if (marker === undefined) {
            marker = new g_maps.Marker({
              position: latlng,
              map: g_map,
            });
          } else {
            marker.setPosition(latlng);
          }

          geocoder.geocode({ location: latlng }, function (results, status) {
            if (status === "OK") {
              if (results[0]) {
                let infowindow = new g_maps.InfoWindow();
                infowindow.setContent(results[0].formatted_address);
                infowindow.open(g_map, marker);
              } else {
                window.alert("No results found");
              }
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          });
        }
      }
    );
  };

  render() {
    document.onkeydown = function (event) {};

    let CargoInfoType = false;
    if (
      this.props.store.disp.cargo.reduce(
        (accum, el) => accum + parseInt(el.Q),
        0
      ) === parseInt(this.props.store.disp.data.Total)
    ) {
      CargoInfoType = true;
    }

    const render_markers = this.render_markers;
    const set_disp_lat_lng = this.props.set_disp_lat_lng;
    const onGoogleApiLoaded = (map, maps) => {
      g_map = map;
      g_maps = maps;

      g_maps.event.addListenerOnce(g_map, "tilesloaded", () => {
        render_markers();
      });

      g_maps.event.addListener(g_map, "click", function (e) {
        const latlng = e.latLng;
        const cur_lat = latlng.lat().toString();
        const cur_lng = latlng.lng().toString();

        const set_disp_lat_lng_param = {
          lat: cur_lat,
          lng: cur_lng,
        };
        set_disp_lat_lng(set_disp_lat_lng_param);

        if (marker === undefined) {
          marker = new g_maps.Marker({
            position: latlng,
            map: g_map,
          });
        } else {
          marker.setPosition(latlng);
        }
        let geocoder = new g_maps.Geocoder();
        geocoder.geocode({ location: latlng }, function (results, status) {
          if (status === "OK") {
            if (results[0]) {
              let infowindow = new g_maps.InfoWindow();
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(g_map, marker);
            } else {
              window.alert("No results found");
            }
          } else {
            window.alert("Geocoder failed due to: " + status);
          }
        });
      });
    };

    let lat;
    let lng;
    if (this.props.store.disp.data.Lat === "") {
      lat = 55.030324;
    } else {
      lat = parseFloat(this.props.store.disp.data.Lat.replace(/,/, "."));
    }

    if (this.props.store.disp.data.Lng === "") {
      lng = 82.920938;
    } else {
      lng = parseFloat(this.props.store.disp.data.Lng.replace(/,/, "."));
    }

    // const lat = parseFloat(this.props.store.disp.data.Lat.replace(/,/, '.'))
    // const lng = parseFloat(this.props.store.disp.data.Lng.replace(/,/, '.'))

    const center = { lat: lat, lng: lng };
    return (
      <div>
        <div className="disp_Number">
          <div>
            <button onClick={this.back.bind(this)}>
              <i className="ek-arrow-left" />
            </button>{" "}
            {this.props.store.disp.data.Type}{" "}
            <b>{this.props.store.disp.data.Number} </b>
            <ReactToPrint
              trigger={() => (
                <button>
                  <i className="ek-printer" /> Печать
                </button>
              )}
              content={() => this.componentRef}
            />
            <div style={{ display: "none" }}>
              <ComponentToPrint
                userkey={this.props.store.login.userkey}
                disp={[this.props.store.disp]}
                ref={(el) => (this.componentRef = el)}
              />
            </div>
            {this.props.store.login.print_ticket ? (
              <ReactToPrint
                trigger={() => (
                  <button>
                    <i className="ek-printer" /> Печать наклеек
                  </button>
                )}
                content={() => this.stickerRef}
              />
            ) : null}
            <div style={{ display: "none" }}>
              <StickerToPrint
                disp={[this.props.store.disp]}
                ref={(el) => (this.stickerRef = el)}
              />
            </div>
            <Modal
              trigger={
                <button onClick={this.open_history.bind(this)}>История</button>
              }
              open={this.props.store.disp.show_history}
              onClose={this.close_history.bind(this)}
              header={`История накладной ${this.props.store.disp.data.Number}`}
            >
              <div>
                {this.props.store.disp.history_loading ? (
                  <div>
                    <Dimmer active inverted>
                      <Loader inverted content="Загрузка" />
                    </Dimmer>
                  </div>
                ) : (
                  <Table celled compact="very">
                    <Table.Header className="create_disp_template_list_th">
                      <Table.Row>
                        <Table.HeaderCell>Дата</Table.HeaderCell>
                        <Table.HeaderCell>Статус</Table.HeaderCell>
                        <Table.HeaderCell>Комментарий</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {this.props.store.disp.history.map((el, index) => (
                        <Table.Row
                          className="create_disp_template_list_tr"
                          key={index}
                        >
                          <Table.Cell>{el.Date}</Table.Cell>
                          <Table.Cell>
                            {el.Status}
                            {el.Skan !== 0 ? (
                              <Modal
                                trigger={
                                  <button
                                    className="disp_skan_button"
                                    onClick={this.open_skan.bind(
                                      this,
                                      el.DocNumber
                                    )}
                                  >
                                    (Получить скан)
                                  </button>
                                }
                                open={this.props.store.disp.show_skan}
                                onClose={this.close_skan.bind(this)}
                                header="Вложенное изображение"
                              >
                                {this.props.store.disp.skan_loading ? (
                                  <div className="loader_container">
                                    <Dimmer active inverted>
                                      <Loader size="large">Загрузка</Loader>
                                    </Dimmer>
                                  </div>
                                ) : (
                                  <img
                                    alt="skan"
                                    className="disp_skan"
                                    src={this.props.store.disp.skan}
                                  />
                                )}
                              </Modal>
                            ) : null}
                          </Table.Cell>
                          <Table.Cell>{el.Comment}</Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                )}
              </div>
            </Modal>
            {this.props.store.login.create_disp &&
            (this.props.store.login.total_only || CargoInfoType) ? (
              <button onClick={this.copy_disp.bind(this, false)}>
                Скопировать
              </button>
            ) : null}
            {this.props.store.login.edit_disp &&
            this.props.store.disp.data.Status === "Ожидается от отправителя" ? (
              <Modal
                closeIcon
                trigger={
                  <button onClick={this.remove_disp.bind(this)}>Удалить</button>
                }
                open={this.props.store.disp.show_remove_modal}
                onClose={this.close_remove_modal.bind(this)}
                header={`Удаление накладной ${this.props.store.disp.data.Number}`}
                onCancel={this.close_remove_modal.bind(this)}
                onConfirm={this.confirm_remove_disp.bind(this)}
              >
                {`Подтверждаете удаление накладной ${this.props.store.disp.data.Number} ?`}
              </Modal>
            ) : null}
            {this.props.store.login.edit_disp &&
            this.props.store.disp.data.Status === "Ожидается от отправителя" ? (
              <button onClick={this.copy_disp.bind(this, true)}>
                Редактировать
              </button>
            ) : null}
          </div>
        </div>
        <div className="disp_customer_data">
          <div className="disp_data_label">Заказчик:</div>
          <div className="disp_data_el">
            {this.props.store.disp.data.Customer}
          </div>
          <div className="disp_data_label">Вид доставки:</div>
          <div className="disp_data_el">
            {this.props.store.disp.data.DelMethod}
          </div>
          <div className="disp_data_label">Тип оплаты:</div>
          <div className="disp_data_el">
            {this.props.store.disp.data.PayType}
          </div>
          {this.props.store.login.userkey === "000000187" ||
          this.props.store.login.userkey === "000000198" ||
          this.props.store.login.userkey === "000000035" ? (
            <div className="disp_data_label">Срочность:</div>
          ) : null}
          {this.props.store.login.userkey === "000000187" ||
          this.props.store.login.userkey === "000000198" ||
          this.props.store.login.userkey === "000000035" ? (
            <div className="disp_data_el">
              {this.props.store.disp.data.DelType}
            </div>
          ) : null}
        </div>

        <div className="disp_address_data">
          <div className="disp_address_data_header">Данные отправителя</div>
          <div className="disp_address_data_header">Данные получателя</div>
          <div className="disp_address_data_el">
            <div className="disp_data_label"> Город:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.SendCity}
            </div>
            <div className="disp_data_label"> Адрес:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.SendAdress}
            </div>
            <div className="disp_data_label"> Компания:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.SendCompany}
            </div>
            <div className="disp_data_label"> Телефон:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.SendPhone}
            </div>
            <div className="disp_data_label"> Контактное лицо:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.SendPerson}
            </div>
            <div className="disp_data_label"> Доп. информация:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.SendAddInfo}
            </div>
          </div>

          <div className="disp_address_data_el">
            <div className="disp_data_label"> Город:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.RecCity}
            </div>
            <div className="disp_data_label"> Адрес:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.RecAdress}
            </div>
            <div className="disp_data_label"> Компания:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.RecCompany}
            </div>
            <div className="disp_data_label"> Телефон:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.RecPhone}
            </div>
            <div className="disp_data_label"> Контактное лицо:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.RecPerson}
            </div>
            <div className="disp_data_label"> Доп. информация:</div>
            <div className="disp_data_el">
              {this.props.store.disp.data.RecAddInfo}
            </div>
            {this.props.store.login.disp_map ? (
              <div className="disp_data_label"> Широта:</div>
            ) : null}
            {this.props.store.login.disp_map ? (
              <div className="disp_data_el">
                {this.props.store.disp.data.Lat}
              </div>
            ) : null}
            {this.props.store.login.disp_map ? (
              <div className="disp_data_label"> Долгота:</div>
            ) : null}
            {this.props.store.login.disp_map ? (
              <div className="disp_data_el">
                {this.props.store.disp.data.Lng}
              </div>
            ) : null}
          </div>
        </div>
        <div className="disp_cargo_table">
          <div className="disp_cargo_table_header">Данные о грузах:</div>
          <div className="disp_cargo_table_data">
            {CargoInfoType ? (
              <Table compact celled size="small">
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Вес</Table.HeaderCell>
                    <Table.HeaderCell>Длина</Table.HeaderCell>
                    <Table.HeaderCell>Ширина</Table.HeaderCell>
                    <Table.HeaderCell>Высота</Table.HeaderCell>
                    <Table.HeaderCell>Об. вес</Table.HeaderCell>
                    <Table.HeaderCell>Количество</Table.HeaderCell>
                    <Table.HeaderCell>Итоговый вес</Table.HeaderCell>
                    <Table.HeaderCell>Итог. об. вес</Table.HeaderCell>
                    <Table.HeaderCell>Тип груза</Table.HeaderCell>
                    <Table.HeaderCell colSpan="2">Комментарий</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.props.store.disp.cargo.map((cargo, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>{cargo.Weight}</Table.Cell>
                      <Table.Cell>{cargo.L}</Table.Cell>
                      <Table.Cell>{cargo.W}</Table.Cell>
                      <Table.Cell>{cargo.H}</Table.Cell>
                      <Table.Cell>{cargo.Volume}</Table.Cell>
                      <Table.Cell>{cargo.Q}</Table.Cell>
                      <Table.Cell>{cargo.TotalWeight}</Table.Cell>
                      <Table.Cell>{cargo.TotalVolume}</Table.Cell>
                      <Table.Cell>{cargo.Type}</Table.Cell>
                      <Table.Cell>{cargo.Comment}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            ) : null}
          </div>
        </div>
        <div className="disp_cargo_data">
          <div className="disp_data_label">Хрупкий груз:</div>
          <input
            type="checkbox"
            className="input-checkbox"
            checked={this.props.store.disp.data.Fragile}
          />

          {this.props.store.login.probably_termo
            ? [
                <div key={1} className="disp_data_label">
                  Терморежим:
                </div>,
                <input
                  type="checkbox"
                  className="input-checkbox"
                  key={2}
                  checked={this.props.store.disp.data.Termo}
                />,
              ]
            : null}

          {this.props.store.disp.data.Termo
            ? [
                <div key={1} className="disp_data_label">
                  Терморежим минимум:
                </div>,
                <div key={2} className="disp_data_el">
                  {this.props.store.disp.data.TMin}
                </div>,
                <div key={3} className="disp_data_label">
                  Терморежим максимум:
                </div>,
                <div key={4} className="disp_data_el">
                  {this.props.store.disp.data.TMax}
                </div>,
              ]
            : null}

          <div className="disp_data_label">Общее количество мест:</div>
          <div className="disp_data_el">{this.props.store.disp.data.Total}</div>
          <div className="disp_data_label">Общий фактический вес:</div>
          <div className="disp_data_el">
            {this.props.store.disp.data.Weight}
          </div>
          <div className="disp_data_label">Общий объемный вес:</div>
          <div className="disp_data_el">
            {this.props.store.disp.data.Volume}
          </div>
        </div>
        <div className="disp_cargo_data">
          <div className="disp_data_label">Страховая стоимость:</div>
          <div className="disp_data_el">
            {this.props.store.disp.data.InsureValue}
          </div>
          <div className="disp_data_label">Наложенный платеж:</div>
          <div className="disp_data_el">{this.props.store.disp.data.COD}</div>
        </div>
        {this.props.store.disp.action === "deliver" &&
        this.props.store.disp.data.Type === "Доставка" ? (
          <div>
            <div className="pod_header">Внести данные о доставке:</div>
            <div className="pod_data">
              <div className="disp_data_label">Дата доставки</div>
              <div className="disp_data_input">
                <input id="date" className="pod_input" type="date"></input>
              </div>
              <div className="disp_data_label">Время доставки</div>
              <div className="disp_data_input">
                <input id="time" className="pod_input" type="time"></input>
              </div>
              <div className="disp_data_label">ФИО получателя</div>
              <div className="disp_data_input">
                <input id="recient" className="pod_input" type="text"></input>
              </div>
              <div className="disp_data_label">Принятая сумма наличных</div>
              <div className="disp_data_input">
                <input id="summ" className="pod_input" type="number"></input>
              </div>
              <div className="disp_data_label">Комментарий</div>
              <div className="disp_data_input">
                <input id="comment" className="pod_input" type="text"></input>
              </div>
            </div>
            <button onClick={this.sendpod.bind(this)} className="send_pod">
              Отметить доставленным и закрыть
            </button>
          </div>
        ) : null}

        {this.props.store.disp.action === "reciept" ? (
          <div>
            <button onClick={this.reciept.bind(this)} className="send_pod">
              Принять на склад и закрыть
            </button>
          </div>
        ) : null}

        {this.props.store.login.disp_map ? (
          <div className="search_box">
            <input
              className="search_input"
              value={this.props.store.disp.search_box}
              onChange={(e) => this.props.set_disp_search_box(e.target.value)}
            ></input>
            <button className="search_button" onClick={this.search.bind(this)}>
              Найти
            </button>
          </div>
        ) : null}

        {this.props.store.login.disp_map ? (
          <div className="disp_map">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_API_KEY,
              }}
              defaultCenter={center}
              defaultZoom={14}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) =>
                onGoogleApiLoaded(map, maps)
              }
            ></GoogleMapReact>
          </div>
        ) : null}
        {this.props.store.login.disp_map ? (
          <button className="search_box" onClick={this.save_lat_lng.bind(this)}>
            Сохранить
          </button>
        ) : null}
        {this.props.store.login.disp_map ? (
          <button className="search_box" onClick={this.sound_test.bind(this)}>
            Тест звука
          </button>
        ) : null}
        <Sound
          url={test_sound}
          playStatus={this.props.store.general.test_sound}
          playFromPosition={100 /* in milliseconds */}
          onLoading={console.log("1")}
          onPlaying={console.log("2")}
          onFinishedPlaying={console.log("3")}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    store: state,
  }),
  (dispatch) => ({
    set_list_storage: (param) => {
      dispatch({ type: "set_list_storage", payload: param });
    },
    set_active_window: (param) => {
      dispatch({ type: "set_active_window", payload: param });
    },
    set_search_error: (param) => {
      dispatch({ type: "set_search_error", payload: param });
    },

    set_disp_history_loading: (param) => {
      dispatch({ type: "set_disp_history_loading", payload: param });
    },
    set_disp_history: (param) => {
      dispatch({ type: "set_disp_history", payload: param });
    },
    set_disp_show_history: (param) => {
      dispatch({ type: "set_disp_show_history", payload: param });
    },

    set_disp_skan_loading: (param) => {
      dispatch({ type: "set_disp_skan_loading", payload: param });
    },
    set_disp_skan: (param) => {
      dispatch({ type: "set_disp_skan", payload: param });
    },
    set_disp_show_skan: (param) => {
      dispatch({ type: "set_disp_show_skan", payload: param });
    },

    set_my_disp_data: (param) => {
      dispatch({ type: "set_my_disp_data", payload: param });
    },

    set_disp_remove_modal_loading: (param) => {
      dispatch({ type: "set_disp_remove_modal_loading", payload: param });
    },
    set_disp_text_remove_modal: (param) => {
      dispatch({ type: "set_disp_text_remove_modal", payload: param });
    },
    set_disp_show_remove_modal: (param) => {
      dispatch({ type: "set_disp_show_remove_modal", payload: param });
    },
    reset_create_disp_data: () => {
      dispatch({ type: "reset_create_disp_data" });
    },
    SetCityList: (param) => {
      dispatch({ type: "SetCityList", payload: param });
    },
    set_disp_remove_confirm: (param) => {
      dispatch({ type: "set_disp_remove_confirm", payload: param });
    },
    set_copy_disp_data: (param) => {
      dispatch({ type: "set_copy_disp_data", payload: param });
    },
    set_disp_lat_lng: (param) => {
      dispatch({ type: "set_disp_lat_lng", payload: param });
    },

    SetSelectedSendCity: (param) => {
      dispatch({ type: "SetSelectedSendCity", payload: param });
    },
    SetSelectedRecCity: (param) => {
      dispatch({ type: "SetSelectedRecCity", payload: param });
    },
    SetRecSelectTerminal: (param) => {
      dispatch({ type: "SetRecSelectTerminal", payload: param });
    },
    SetRecTerminalList: (param) => {
      dispatch({ type: "SetRecTerminalList", payload: param });
    },
    SetSendSelectTerminal: (param) => {
      dispatch({ type: "SetSendSelectTerminal", payload: param });
    },
    SetSendTerminalList: (param) => {
      dispatch({ type: "SetSendTerminalList", payload: param });
    },
    SetRecCity: (param) => {
      dispatch({ type: "SetRecCity", payload: param });
    },
    SetSendCity: (param) => {
      dispatch({ type: "SetSendCity", payload: param });
    },
    SetSendTerminal: (param) => {
      dispatch({ type: "SetSendTerminal", payload: param });
    },
    SetRecTerminal: (param) => {
      dispatch({ type: "SetRecTerminal", payload: param });
    },
    pop_last_window: () => {
      dispatch({ type: "pop_last_window" });
    },
    set_data_disp: (param) => {
      dispatch({ type: "set_data_disp", payload: param });
    },
    set_disp_search_box: (param) => {
      dispatch({ type: "set_disp_search_box", payload: param });
    },
    set_test_sound: (param) => {
      dispatch({ type: "set_test_sound", payload: param });
    },

    SetIsNew: (param) => {
      dispatch({ type: "SetIsNew", payload: param });
    },
  })
)(Screen);
