import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_data } from "./../common/common_modules";
import { useReactToPrint } from "react-to-print";
import "./disp.css";
import ComponentToPrint from "./disp_print";
import StickerToPrint from "./sticker_print";
import GoogleMapReact from "google-map-react";
import Modal from "../ui-components/modal/modal";
import Dimmer from "../ui-components/dimmer/dimmer";
import { useModules } from "../hooks/useModules";

let g_map;
let g_maps;
let marker;

const Disp = () => {
  const dispForPrint = useRef();
  const stickerForPrint = useRef();

  const handleDispPrint = useReactToPrint({
    content: () => dispForPrint.current,
  });

  const handleStickerPrint = useReactToPrint({
    content: () => stickerForPrint.current,
  });

  const dispData = useSelector((state) => state.disp);
  const userkey = useSelector((state) => state.login.userkey);
  const login = useSelector((state) => state.login);
  const last_window = useSelector((state) => state.general.last_window);

  const date_from = useSelector((state) => state.my_disp.date_from);
  const date_to = useSelector((state) => state.my_disp.date_to);

  const dispatch = useDispatch();
  const modules = useModules();

  const set_active_window = (param) => {
    dispatch({ type: "set_active_window", payload: param });
  };
  const set_search_error = (param) => {
    dispatch({ type: "set_search_error", payload: param });
  };

  const set_disp_history_loading = (param) => {
    dispatch({ type: "set_disp_history_loading", payload: param });
  };
  const set_disp_history = (param) => {
    dispatch({ type: "set_disp_history", payload: param });
  };
  const set_disp_show_history = (param) => {
    dispatch({ type: "set_disp_show_history", payload: param });
  };

  const set_disp_skan_loading = (param) => {
    dispatch({ type: "set_disp_skan_loading", payload: param });
  };
  const set_disp_skan = (param) => {
    dispatch({ type: "set_disp_skan", payload: param });
  };
  const set_disp_show_skan = (param) => {
    dispatch({ type: "set_disp_show_skan", payload: param });
  };

  const set_my_disp_data = (param) => {
    dispatch({ type: "set_my_disp_data", payload: param });
  };

  const set_disp_remove_modal_loading = (param) => {
    dispatch({ type: "set_disp_remove_modal_loading", payload: param });
  };
  const set_disp_text_remove_modal = (param) => {
    dispatch({ type: "set_disp_text_remove_modal", payload: param });
  };
  const set_disp_show_remove_modal = (param) => {
    dispatch({ type: "set_disp_show_remove_modal", payload: param });
  };
  const reset_create_disp_data = () => {
    dispatch({ type: "reset_create_disp_data" });
  };
  const SetCityList = (param) => {
    dispatch({ type: "SetCityList", payload: param });
  };
  const set_disp_remove_confirm = (param) => {
    dispatch({ type: "set_disp_remove_confirm", payload: param });
  };
  const set_copy_disp_data = (param) => {
    dispatch({ type: "set_copy_disp_data", payload: param });
  };
  const set_disp_lat_lng = (param) => {
    dispatch({ type: "set_disp_lat_lng", payload: param });
  };

  const SetSelectedSendCity = (param) => {
    dispatch({ type: "SetSelectedSendCity", payload: param });
  };
  const SetSelectedRecCity = (param) => {
    dispatch({ type: "SetSelectedRecCity", payload: param });
  };
  const SetRecTerminalList = (param) => {
    dispatch({ type: "SetRecTerminalList", payload: param });
  };
  const SetSendTerminalList = (param) => {
    dispatch({ type: "SetSendTerminalList", payload: param });
  };
  const SetRecCity = (param) => {
    dispatch({ type: "SetRecCity", payload: param });
  };
  const SetSendCity = (param) => {
    dispatch({ type: "SetSendCity", payload: param });
  };
  const SetSendTerminal = (param) => {
    dispatch({ type: "SetSendTerminal", payload: param });
  };
  const SetRecTerminal = (param) => {
    dispatch({ type: "SetRecTerminal", payload: param });
  };
  const set_data_disp = (param) => {
    dispatch({ type: "set_data_disp", payload: param });
  };
  const set_disp_search_box = (param) => {
    dispatch({ type: "set_disp_search_box", payload: param });
  };
  const SetIsNew = (param) => {
    dispatch({ type: "SetIsNew", payload: param });
  };

  const save_lat_lng = () => {
    const lat_lng_data = {
      userkey: userkey,
      dispatch: dispData.data.Number,
      lat: dispData.lat,
      lng: dispData.lng,
    };

    get_data("setreclatlng", lat_lng_data).then(
      () => {
        set_active_window("wait");

        const data = {
          userkey: userkey,
          status: "Накладная",
          num: dispData.data.Number,
        };

        get_data("dispatch", data).then(
          (result) => {
            set_data_disp(result);
            set_active_window("disp");
          },
          (err) => {
            modules.set_modal_show(true);
            modules.set_modal_header("Ошибка");
            modules.set_modal_text(err);

            set_active_window("disp");
          },
        );
      },
      (err) => {
        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);

        set_active_window("disp");
      },
    );
  };

  // TODO: починить отправку подов. нужно сделать store с данными. document.getElementById не работает

  // const sendpod = () => {
  //   set_active_window("wait");
  //   const data = {
  //     userkey: userkey,
  //     num: dispData.data.Number,
  //     // date: document.getElementById("date").value,
  //     // time: document.getElementById("time").value,
  //     // summ: document.getElementById("summ").value,
  //     // comment: document.getElementById("comment").value,
  //     // rec: document.getElementById("recient").value,
  //   };
  //   get_data("delivered", data).then(
  //     () => {
  //       const list_data = { userkey: userkey };

  //       get_data("list", list_data).then(
  //         (result) => {
  //           set_list_storage(result);
  //           set_active_window("storage");
  //         },
  //         (err) => {
  //           modules.set_modal_show(true);
  //           modules.set_modal_header("Ошибка");
  //           modules.set_modal_text(err);
  //         },
  //       );
  //     },
  //     (err) => {
  //       modules.set_modal_show(true);
  //       modules.set_modal_header("Ошибка");
  //       modules.set_modal_text(err);

  //       set_active_window("disp");
  //     },
  //   );
  // };

  const reciept = () => {
    set_active_window("wait");
    const data = {
      userkey: userkey,
      num: dispData.data.Number,
    };
    get_data("getdispatch", data).then(
      () => {
        set_active_window("reciept");
        set_search_error(
          `Накладная ${dispData.data.Number} успешно принята на склад`,
        );
      },
      (err) => {
        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);

        set_active_window("disp");
      },
    );
  };

  const openHistory = () => {
    set_disp_history_loading(true);
    set_disp_show_history(true);
    get_data("history", { Number: dispData.data.Number }).then(
      (result) => {
        set_disp_history(result);
        set_disp_history_loading(false);
      },
      (err) => {
        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);
      },
    );
  };

  const closeHistory = () => {
    set_disp_show_history(false);
    set_disp_history([]);
  };

  const openSkan = (DocNumber) => {
    set_disp_skan_loading(true);
    set_disp_show_skan(true);
    const data = {
      num: dispData.data.Number,
      userkey: userkey,
      DocNumber: DocNumber,
    };
    get_data("getskan", data).then(
      (result) => {
        set_disp_skan("data:image/jpg;base64," + result);
        set_disp_skan_loading(false);
      },
      (err) => {
        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);

        set_disp_skan_loading(false);
      },
    );
  };

  const closeSkan = () => {
    set_disp_show_skan(false);
    set_disp_skan("");
  };

  const removeDisp = () => {
    set_disp_remove_confirm(false);
    set_disp_show_remove_modal(true);
  };

  const closeRemoveModal = () => {
    set_disp_show_remove_modal(false);
    if (dispData.remove_confirm) {
      if (last_window === "my_disp") {
        set_active_window("wait");

        const data = {
          userkey,
          date_from,
          date_to,
        };

        get_data("mydisplist", data).then(
          (result) => {
            set_active_window("my_disp");
            set_my_disp_data(result);
          },
          (err) => {
            modules.set_modal_show(true);
            modules.set_modal_header("Ошибка");
            modules.set_modal_text(err);
          },
        );
      } else {
        modules.back();
      }
    }
  };

  const confirmRemoveDisp = () => {
    set_disp_remove_modal_loading(true);
    set_disp_remove_confirm(true);

    const data = {
      userkey: userkey,
      Number: dispData.data.Number,
    };
    get_data("removedisp", data).then(
      (result) => {
        if (result === 1) {
          set_disp_text_remove_modal("Накладная успешно удалена");
        } else {
          set_disp_text_remove_modal("Не удалось удалить накладную");
        }

        set_disp_remove_modal_loading(false);
      },
      (err) => {
        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);
      },
    );
  };

  const selectSendCity = (value) => {
    SetSelectedSendCity(value);

    const city = value.label;
    SetSendCity(city);

    get_data("terminallist", {
      city: city,
      userkey: userkey,
    }).then(
      (result) => {
        SetSendTerminalList(result);
        if (result.length === 0) {
          SetSendTerminal(false);
        }
      },
      (err) => {
        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);
      },
    );
  };

  const selectRecCity = (value) => {
    SetSelectedRecCity(value);

    const city = value.label;
    SetRecCity(city);

    get_data("terminallist", {
      city: city,
      userkey: userkey,
    }).then(
      (result) => {
        SetRecTerminalList(result);
        if (result.length === 0) {
          SetRecTerminal(false);
        }
      },
      (err) => {
        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);
      },
    );
  };

  const copyDisp = (edit) => {
    let number = 0;
    set_active_window("wait");
    const current_disp_data = dispData.data;

    const copy_disp_cargo = dispData.cargo;
    let CargoInfoType;
    reset_create_disp_data();
    get_data("citylist").then(
      (result) => {
        SetCityList(result);

        if (edit) {
          number = dispData.data.Number;
          SetIsNew(false);
        }

        if (
          dispData.cargo.reduce((accum, el) => accum + parseInt(el.Q), 0) ===
          parseInt(dispData.data.Total)
        ) {
          CargoInfoType = {
            label: "Внести информацию о каждом грузе",
            value: false,
          };
        } else {
          CargoInfoType = { label: "Указать итогвые значения", value: true };
        }

        const SelectedSendCity = result.filter(
          (el) => el.value === current_disp_data.SendCity,
        )[0];
        const SelectedRecCity = result.filter(
          (el) => el.value === current_disp_data.RecCity,
        )[0];

        const PayTypeList = [
          {
            label: "Оплата наличными при отправлении",
            value: "ОплатаНаличнымиПриОтправлении",
          },
          {
            label: "Оплата наличными при получении",
            value: "ОплатаНаличнымиПриПолучении",
          },
        ];
        if (!login.cashOnly) {
          PayTypeList.unshift({
            label: "Безналичная оплата",
            value: "БезналичнаяОплата",
          });
        }
        let PayType;
        let PayerSelect;
        if (current_disp_data.CustomerKey === login.customer_key) {
          PayType = PayTypeList.find(
            (ptel) => ptel.label === current_disp_data.PayType,
          );
          PayerSelect = {};
        } else {
          PayType = {
            label: "Оплата получателем по договору",
            value: "БезналичнаяОплатаПолучателем",
          };
          const CurPayer = login.customers.find(
            (e) => e.customerKey === current_disp_data.CustomerKey,
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

        set_copy_disp_data(copy_disp_data);
        if (SelectedSendCity !== undefined) {
          selectSendCity(SelectedSendCity);
        }
        if (SelectedRecCity !== undefined) {
          selectRecCity(SelectedRecCity);
        }

        modules.set_last_window("disp");

        set_active_window("create_disp");
      },
      (err) => {
        modules.set_modal_show(true);
        modules.set_modal_header("Ошибка");
        modules.set_modal_text(err);
      },
    );
  };

  const search = () => {
    let geocoder = new g_maps.Geocoder();
    let position;

    geocoder.geocode(
      { address: dispData.search_box },
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
      },
    );
  };

  let CargoInfoType = false;
  if (
    dispData.cargo.reduce((accum, el) => accum + parseInt(el.Q), 0) ===
    parseInt(dispData.data.Total)
  ) {
    CargoInfoType = true;
  }

  // const set_disp_lat_lng = set_disp_lat_lng;
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
  if (dispData.data.Lat === "") {
    lat = 55.030324;
  } else {
    lat = parseFloat(dispData.data.Lat.replace(/,/, "."));
  }

  if (dispData.data.Lng === "") {
    lng = 82.920938;
  } else {
    lng = parseFloat(dispData.data.Lng.replace(/,/, "."));
  }

  const center = { lat: lat, lng: lng };

  return (
    <div>
      <div className="disp_Number">
        <div className="disp_actions">
          <button onClick={modules.back}>
            <i className="ek-arrow-left" />
          </button>{" "}
          {dispData.data.Type} <b>{dispData.data.Number} </b>
          <button onClick={handleDispPrint}>
            <i className="ek-printer" /> Печать
          </button>
          <div style={{ display: "none" }}>
            <ComponentToPrint
              userkey={userkey}
              disp={[dispData]}
              ref={dispForPrint}
            />
          </div>
          {login.print_ticket ? (
            <button onClick={handleStickerPrint}>
              <i className="ek-printer" /> Печать наклеек
            </button>
          ) : null}
          <div style={{ display: "none" }}>
            <StickerToPrint disp={[dispData]} ref={stickerForPrint} />
          </div>
          <Modal
            trigger={<button onClick={openHistory}>История</button>}
            open={dispData.show_history}
            onClose={closeHistory}
            header={`История накладной ${dispData.data.Number}`}
            height="600px"
          >
            <div>
              {dispData.history_loading ? (
                <div>
                  <Dimmer />
                </div>
              ) : (
                <table className="bordered">
                  <thead className="create_disp_template_list_th">
                    <tr>
                      <th>Дата</th>
                      <th>Статус</th>
                      <th>Комментарий</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dispData.history.map((el, index) => (
                      <tr className="create_disp_template_list_tr" key={index}>
                        <td>{el.Date}</td>
                        <td>
                          {el.Status}
                          {el.Skan !== 0 ? (
                            <Modal
                              trigger={
                                <button
                                  className="disp_skan_button"
                                  onClick={() => {
                                    openSkan(el.DocNumber);
                                  }}
                                >
                                  (Получить скан)
                                </button>
                              }
                              open={dispData.show_skan}
                              onClose={closeSkan}
                              header="Вложенное изображение"
                            >
                              {dispData.skan_loading ? (
                                <div className="loader_container">
                                  <Dimmer />
                                </div>
                              ) : (
                                <img
                                  alt="skan"
                                  className="disp_skan"
                                  src={dispData.skan}
                                />
                              )}
                            </Modal>
                          ) : null}
                        </td>
                        <td>{el.Comment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </Modal>
          {login.create_disp && (login.total_only || CargoInfoType) ? (
            <button
              onClick={() => {
                copyDisp(false);
              }}
            >
              Скопировать
            </button>
          ) : null}
          {login.edit_disp &&
          (dispData.data.Status === "Ожидается от отправителя" ||
            dispData.data.Status === "Заявка на забор") ? (
            <Modal
              closeIcon
              trigger={<button onClick={removeDisp}>Удалить</button>}
              open={dispData.show_remove_modal}
              onClose={closeRemoveModal}
              header={`Удаление накладной ${dispData.data.Number}`}
              onCancel={closeRemoveModal}
              onConfirm={confirmRemoveDisp}
            >
              {`Подтверждаете удаление накладной ${dispData.data.Number} ?`}
            </Modal>
          ) : null}
          {login.edit_disp &&
          (dispData.data.Status === "Ожидается от отправителя" ||
            dispData.data.Status === "Заявка на забор") ? (
            <button
              onClick={() => {
                copyDisp(true);
              }}
            >
              Редактировать
            </button>
          ) : null}
        </div>
      </div>
      <div className="disp_customer_data">
        <div className="disp_data_label">Заказчик:</div>
        <div className="disp_data_el">{dispData.data.Customer}</div>
        <div className="disp_data_label">Вид доставки:</div>
        <div className="disp_data_el">{dispData.data.DelMethod}</div>
        <div className="disp_data_label">Тип оплаты:</div>
        <div className="disp_data_el">{dispData.data.PayType}</div>
        {userkey === "000000187" ||
        userkey === "000000198" ||
        userkey === "000000035" ? (
          <div className="disp_data_label">Срочность:</div>
        ) : null}
        {userkey === "000000187" ||
        userkey === "000000198" ||
        userkey === "000000035" ? (
          <div className="disp_data_el">{dispData.data.DelType}</div>
        ) : null}
      </div>

      <div className="disp_address_data">
        <div className="disp_address_data_header">Данные отправителя</div>
        <div className="disp_address_data_header">Данные получателя</div>
        <div className="disp_address_data_el">
          <div className="disp_data_label"> Город:</div>
          <div className="disp_data_el">{dispData.data.SendCity}</div>
          <div className="disp_data_label"> Адрес:</div>
          <div className="disp_data_el">{dispData.data.SendAdress}</div>
          <div className="disp_data_label"> Компания:</div>
          <div className="disp_data_el">{dispData.data.SendCompany}</div>
          <div className="disp_data_label"> Телефон:</div>
          <div className="disp_data_el">{dispData.data.SendPhone}</div>
          <div className="disp_data_label"> Контактное лицо:</div>
          <div className="disp_data_el">{dispData.data.SendPerson}</div>
          <div className="disp_data_label"> Доп. информация:</div>
          <div className="disp_data_el">{dispData.data.SendAddInfo}</div>
        </div>

        <div className="disp_address_data_el">
          <div className="disp_data_label"> Город:</div>
          <div className="disp_data_el">{dispData.data.RecCity}</div>
          <div className="disp_data_label"> Адрес:</div>
          <div className="disp_data_el">{dispData.data.RecAdress}</div>
          <div className="disp_data_label"> Компания:</div>
          <div className="disp_data_el">{dispData.data.RecCompany}</div>
          <div className="disp_data_label"> Телефон:</div>
          <div className="disp_data_el">{dispData.data.RecPhone}</div>
          <div className="disp_data_label"> Контактное лицо:</div>
          <div className="disp_data_el">{dispData.data.RecPerson}</div>
          <div className="disp_data_label"> Доп. информация:</div>
          <div className="disp_data_el">{dispData.data.RecAddInfo}</div>
          {login.disp_map ? (
            <div className="disp_data_label"> Широта:</div>
          ) : null}
          {login.disp_map ? (
            <div className="disp_data_el">{dispData.data.Lat}</div>
          ) : null}
          {login.disp_map ? (
            <div className="disp_data_label"> Долгота:</div>
          ) : null}
          {login.disp_map ? (
            <div className="disp_data_el">{dispData.data.Lng}</div>
          ) : null}
        </div>
      </div>
      <div className="disp_cargo_table">
        <div className="disp_cargo_table_header">Данные о грузах:</div>
        <div className="disp_cargo_table_data">
          {CargoInfoType ? (
            <table className="bordered">
              <thead>
                <tr>
                  <th>Вес</th>
                  <th>Длина</th>
                  <th>Ширина</th>
                  <th>Высота</th>
                  <th>Об. вес</th>
                  <th>Количество</th>
                  <th>Итоговый вес</th>
                  <th>Итог. об. вес</th>
                  <th>Тип груза</th>
                  <th colSpan="2">Комментарий</th>
                </tr>
              </thead>
              <tbody>
                {dispData.cargo.map((cargo, index) => (
                  <tr key={index}>
                    <td>{cargo.Weight}</td>
                    <td>{cargo.L}</td>
                    <td>{cargo.W}</td>
                    <td>{cargo.H}</td>
                    <td>{cargo.Volume}</td>
                    <td>{cargo.Q}</td>
                    <td>{cargo.TotalWeight}</td>
                    <td>{cargo.TotalVolume}</td>
                    <td>{cargo.Type}</td>
                    <td>{cargo.Comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
        </div>
      </div>
      <div className="disp_cargo_data">
        <div className="disp_data_label">Хрупкий груз:</div>
        <input
          type="checkbox"
          className="input-checkbox"
          checked={dispData.data.Fragile}
        />

        {login.probably_termo
          ? [
              <div key={1} className="disp_data_label">
                Терморежим:
              </div>,
              <input
                type="checkbox"
                className="input-checkbox"
                key={2}
                checked={dispData.data.Termo}
              />,
            ]
          : null}

        {dispData.data.Termo
          ? [
              <div key={1} className="disp_data_label">
                Терморежим минимум:
              </div>,
              <div key={2} className="disp_data_el">
                {dispData.data.TMin}
              </div>,
              <div key={3} className="disp_data_label">
                Терморежим максимум:
              </div>,
              <div key={4} className="disp_data_el">
                {dispData.data.TMax}
              </div>,
            ]
          : null}

        <div className="disp_data_label">Общее количество мест:</div>
        <div className="disp_data_el">{dispData.data.Total}</div>
        <div className="disp_data_label">Общий фактический вес:</div>
        <div className="disp_data_el">{dispData.data.Weight}</div>
        <div className="disp_data_label">Общий объемный вес:</div>
        <div className="disp_data_el">{dispData.data.Volume}</div>
      </div>
      <div className="disp_cargo_data">
        <div className="disp_data_label">Страховая стоимость:</div>
        <div className="disp_data_el">{dispData.data.InsureValue}</div>
        <div className="disp_data_label">Наложенный платеж:</div>
        <div className="disp_data_el">{dispData.data.COD}</div>
      </div>

      {/* TODO: починить отправку подов. нужно сделать store с данными. document.getElementById не работает */}

      {/* {dispData.action === "deliver" && dispData.data.Type === "Доставка" ? (
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
          <button onClick={sendpod} className="send_pod">
            Отметить доставленным и закрыть
          </button>
        </div>
      ) : null} */}

      {dispData.action === "reciept" ? (
        <div>
          <button onClick={reciept} className="send_pod">
            Принять на склад и закрыть
          </button>
        </div>
      ) : null}

      {login.disp_map ? (
        <div className="search_box">
          <input
            className="search_input"
            value={dispData.search_box}
            onChange={(e) => set_disp_search_box(e.target.value)}
          ></input>
          <button className="search_button" onClick={search}>
            Найти
          </button>
        </div>
      ) : null}

      {login.disp_map ? (
        <div className="disp_map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_GOOGLE_API_KEY,
            }}
            defaultCenter={center}
            defaultZoom={14}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => onGoogleApiLoaded(map, maps)}
          ></GoogleMapReact>
        </div>
      ) : null}
      {login.disp_map ? (
        <button className="search_box" onClick={save_lat_lng}>
          Сохранить
        </button>
      ) : null}
    </div>
  );
};

export default Disp;
